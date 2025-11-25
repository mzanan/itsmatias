import { promises as fs } from "fs";
import path from "path";
import { createHash } from "crypto";

const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_DURATION = 60 * 60 * 1000;

const ensureCacheDir = async () => {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.mkdir(path.join(CACHE_DIR, "images"), { recursive: true });
  } catch {
    // Directory already exists or can't be created
  }
};

const getCacheFilePath = (key: string): string => {
  return path.join(CACHE_DIR, `${key}.json`);
};

const getImageCacheFilePath = (url: string): string => {
  const hash = createHash("md5").update(url).digest("hex");
  return path.join(CACHE_DIR, "images", `${hash}.bin`);
};

const getImageCacheMetaPath = (url: string): string => {
  const hash = createHash("md5").update(url).digest("hex");
  return path.join(CACHE_DIR, "images", `${hash}.meta.json`);
};

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    await ensureCacheDir();
    const filePath = getCacheFilePath(key);
    const data = await fs.readFile(filePath, "utf-8");
    const cached = JSON.parse(data);

    const now = Date.now();
    const age = now - cached.timestamp;
    if (age > CACHE_DURATION) {
      console.log(
        `[Cache] Key "${key}" expired (age: ${Math.round(age / 1000)}s, max: ${CACHE_DURATION / 1000}s)`
      );
      await fs.unlink(filePath).catch(() => {});
      return null;
    }

    console.log(`[Cache] Key "${key}" found, age: ${Math.round(age / 1000)}s`);
    return cached.data as T;
  } catch {
    console.log(`[Cache] Key "${key}" not found in cache`);
    return null;
  }
}

export async function setCachedData(key: string, data: unknown): Promise<void> {
  try {
    await ensureCacheDir();
    const filePath = getCacheFilePath(key);
    await fs.writeFile(
      filePath,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      }),
      "utf-8"
    );
    console.log(`[Cache] Key "${key}" saved to cache`);
  } catch (error) {
    console.error(`[Cache] Error saving key "${key}":`, error);
  }
}

export async function getCachedImage(url: string): Promise<{
  buffer: Buffer;
  contentType: string;
} | null> {
  try {
    await ensureCacheDir();
    const metaPath = getImageCacheMetaPath(url);
    const imagePath = getImageCacheFilePath(url);

    const metaData = await fs.readFile(metaPath, "utf-8");
    const meta = JSON.parse(metaData);

    const now = Date.now();
    if (now - meta.timestamp > CACHE_DURATION) {
      await fs.unlink(metaPath).catch(() => {});
      await fs.unlink(imagePath).catch(() => {});
      return null;
    }

    const buffer = await fs.readFile(imagePath);
    return {
      buffer,
      contentType: meta.contentType,
    };
  } catch {
    return null;
  }
}

export async function setCachedImage(
  url: string,
  buffer: Buffer,
  contentType: string
): Promise<void> {
  try {
    await ensureCacheDir();
    const metaPath = getImageCacheMetaPath(url);
    const imagePath = getImageCacheFilePath(url);

    await fs.writeFile(
      metaPath,
      JSON.stringify({
        contentType,
        timestamp: Date.now(),
      }),
      "utf-8"
    );

    await fs.writeFile(imagePath, buffer);
  } catch (error) {
    console.error(`[Cache] Error saving image:`, error);
  }
}
