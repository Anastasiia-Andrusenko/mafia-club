/**
 * Generates the gallery / Thread thumbnails.
 *
 *   public/images/<set>-large/<name>.webp  ->  public/images/<set>-thumb/<name>.webp
 *
 * The `-large` files are the full-size photos shown in the gallery modal; the
 * grid and the Home "Thread" strip only need a small preview. Thumbnails are
 * plain static files (served by the CDN with long cache headers), so no Vercel
 * runtime image-optimization quota is used (next.config.mjs keeps
 * `images.unoptimized`).
 *
 * Run it after adding photos:   npm run media:thumbs        (new/changed only)
 *                               npm run media:thumbs -- --force   (rebuild all)
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const IMAGES_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "images",
);

// Long edge in px. The largest slot is a 268x260 CSS-px crop (176x117 on
// phones at up to 3x DPR); 640 keeps those sharp on high-DPI screens.
const MAX_EDGE = 640;
const WEBP_QUALITY = 70;

const force = process.argv.includes("--force");

const exists = (file) =>
  fs.access(file).then(
    () => true,
    () => false,
  );

const sets = (await fs.readdir(IMAGES_DIR)).filter((dir) =>
  dir.endsWith("-large"),
);

let created = 0;
let skipped = 0;
let bytesIn = 0;
let bytesOut = 0;

for (const largeDir of sets) {
  const thumbDir = largeDir.replace(/-large$/, "-thumb");
  await fs.mkdir(path.join(IMAGES_DIR, thumbDir), { recursive: true });

  const files = (await fs.readdir(path.join(IMAGES_DIR, largeDir))).filter(
    (name) => name.endsWith(".webp"),
  );

  for (const name of files) {
    const source = path.join(IMAGES_DIR, largeDir, name);
    const target = path.join(IMAGES_DIR, thumbDir, name);

    if (!force && (await exists(target))) {
      const [src, dst] = await Promise.all([fs.stat(source), fs.stat(target)]);
      if (dst.mtimeMs >= src.mtimeMs) {
        skipped++;
        continue;
      }
    }

    await sharp(source)
      .rotate() // honour EXIF orientation
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(target);

    bytesIn += (await fs.stat(source)).size;
    bytesOut += (await fs.stat(target)).size;
    created++;
  }

  // Drop thumbnails whose full-size photo no longer exists.
  const wanted = new Set(files);
  for (const name of await fs.readdir(path.join(IMAGES_DIR, thumbDir))) {
    if (name.endsWith(".webp") && !wanted.has(name)) {
      await fs.rm(path.join(IMAGES_DIR, thumbDir, name));
      console.log(`removed orphan ${thumbDir}/${name}`);
    }
  }
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(
  `thumbnails: ${created} written, ${skipped} up to date` +
    (created ? ` (${kb(bytesIn)} full-size -> ${kb(bytesOut)} thumbs)` : ""),
);
