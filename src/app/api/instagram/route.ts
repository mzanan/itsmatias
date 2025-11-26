import { NextResponse } from "next/server";
import {
  getCachedData,
  setCachedData,
  setCachedImage,
  getCachedImage,
} from "@/lib/cache";
import axios from "axios";

export async function GET() {
  try {
    console.log(`[Instagram API] Checking cache...`);
    const cached = await getCachedData<{ images: string[] }>("instagram_images");
    console.log(`[Instagram API] Cache result:`, cached ? `Found ${cached.images?.length || 0} URLs` : "Not found");

    if (cached) {
      console.log(`[Instagram API] URLs cache found, checking image cache...`);
      const missingImages: string[] = [];
      for (const imageUrl of cached.images) {
        const cachedImage = await getCachedImage(imageUrl);
        if (!cachedImage) {
          missingImages.push(imageUrl);
        }
      }

      if (missingImages.length > 0) {
        console.log(`[Instagram API] Found ${missingImages.length} missing images, downloading from Instagram...`);
        const downloadPromises = missingImages.map(async (imageUrl, index) => {
          try {
            const imageResponse = await axios.get(imageUrl, {
              responseType: "arraybuffer",
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                Referer: "https://www.instagram.com/",
              },
              timeout: 15000,
            });

            const contentType =
              imageResponse.headers["content-type"] || "image/jpeg";
            const buffer = Buffer.from(imageResponse.data);

            await setCachedImage(imageUrl, buffer, contentType);
            console.log(`[Instagram API] Downloaded missing image ${index + 1}/${missingImages.length}`);
          } catch (error) {
            console.error(`[Instagram API] Error downloading missing image ${index + 1}/${missingImages.length}:`, error);
          }
        });

        await Promise.allSettled(downloadPromises);
        console.log(`[Instagram API] All missing images downloaded`);
      } else {
        console.log(`[Instagram API] ✓ All ${cached.images.length} images are cached, serving from cache (NO API call to Instagram)`);
      }

      const imageData: Record<string, string> = {};
      for (const imageUrl of cached.images) {
        const cachedImage = await getCachedImage(imageUrl);
        if (cachedImage) {
          imageData[imageUrl] = `data:${cachedImage.contentType};base64,${cachedImage.buffer.toString("base64")}`;
        }
      }

      console.log(`[Instagram API] Returning ${Object.keys(imageData).length} images from cache`);
      return NextResponse.json({ ...cached, imageData });
    }

    console.log(`[Instagram API] No cache found, fetching from Instagram API...`);

    const username = "matizanan";

    try {
      const response = await axios.get(
        `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "X-IG-App-ID": "936619743392459",
          },
          timeout: 10000,
        }
      );

      if (
        response.data?.data?.user?.edge_owner_to_timeline_media?.edges
      ) {
        const posts =
          response.data.data.user.edge_owner_to_timeline_media.edges;
        const images: string[] = [];

        for (const post of posts) {
          const node = post.node;

          if (node.edge_sidecar_to_children?.edges) {
            for (const child of node.edge_sidecar_to_children.edges) {
              images.push(child.node.display_url);
            }
          } else {
            images.push(node.display_url);
          }

          if (images.length >= 40) break;
        }

        if (images.length > 0) {
          const imageUrls = images.slice(0, 40);

          console.log(`[Instagram API] Starting download of ${imageUrls.length} images...`);

          const downloadPromises = imageUrls.map(async (imageUrl, index) => {
            try {
              const cached = await getCachedImage(imageUrl);
              if (cached) {
                console.log(`[Instagram API] Image ${index + 1}/${imageUrls.length} already cached`);
                return;
              }

              const imageResponse = await axios.get(imageUrl, {
                responseType: "arraybuffer",
                headers: {
                  "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                  Referer: "https://www.instagram.com/",
                },
                timeout: 15000,
              });

              const contentType =
                imageResponse.headers["content-type"] || "image/jpeg";
              const buffer = Buffer.from(imageResponse.data);

              await setCachedImage(imageUrl, buffer, contentType);
            } catch (error) {
              console.error(`[Instagram API] Error downloading image ${index + 1}/${imageUrls.length}:`, error);
            }
          });

          const results = await Promise.allSettled(downloadPromises);
          const successful = results.filter((r) => r.status === "fulfilled").length;
          console.log(`[Instagram API] Download complete: ${successful}/${imageUrls.length} images cached`);

          const imageData: Record<string, string> = {};
          for (const imageUrl of imageUrls) {
            const cached = await getCachedImage(imageUrl);
            if (cached) {
              imageData[imageUrl] = `data:${cached.contentType};base64,${cached.buffer.toString("base64")}`;
            }
          }

          const result = { images: imageUrls, imageData };
          await setCachedData("instagram_images", result);
          return NextResponse.json(result);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log("[Instagram API] Authentication required - using cached data or returning empty");
        } else {
          console.error("[Instagram API] Request failed:", error.response?.status || error.message);
        }
      } else {
        console.error("[Instagram API] Error:", error);
      }
    }

    return NextResponse.json({
      images: [],
      imageData: {},
      error: "Unable to fetch Instagram images",
    });
  } catch (error) {
    console.error("Instagram route error:", error);
    return NextResponse.json({
      images: [],
      error: String(error),
    });
  }
}

