import sharp from "sharp";
import { readdirSync } from "fs";
import path from "path";

const dir = path.resolve("src/assets/media");
const files = readdirSync(dir).filter((f) => /^hero_\d{4}\.jpeg$/.test(f));

for (const file of files) {
  const full = path.join(dir, file);
  const before = (await sharp(full).metadata()).size ?? 0;
  const buffer = await sharp(full)
    .resize({ width: 900, height: 1100, fit: "cover" })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  await sharp(buffer).toFile(full.replace(".jpeg", ".tmp.jpeg"));
  console.log(`${file}: ${(buffer.length / 1024).toFixed(0)}KB`);
}
