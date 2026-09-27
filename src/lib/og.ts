import { readFile } from "node:fs/promises";
import { join } from "node:path";

const OG_DIR = join(process.cwd(), "src/app/_og");

export const readOgImage = async (file: string) => {
  const data = await readFile(join(OG_DIR, file));
  return `data:image/jpeg;base64,${data.toString("base64")}`;
};
