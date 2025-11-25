import { NextResponse } from "next/server";
import { getCachedImage, setCachedImage } from "@/lib/cache";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
    }

    const cached = await getCachedImage(imageUrl);
    if (cached) {
      console.log(`[Image Proxy] Serving cached image: ${imageUrl.substring(0, 50)}...`);
      return new NextResponse(new Uint8Array(cached.buffer), {
        headers: {
          "Content-Type": cached.contentType,
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }

    console.log(`[Image Proxy] Image not in cache, downloading: ${imageUrl.substring(0, 50)}...`);

    try {
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Referer: "https://www.instagram.com/",
        },
        timeout: 10000,
      });

      const contentType = response.headers["content-type"] || "image/jpeg";
      const buffer = Buffer.from(response.data);

      await setCachedImage(imageUrl, buffer, contentType);

      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

