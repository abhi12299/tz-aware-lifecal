/**
 * Generates a favicon.ico with an orange dot (#FF6B35) on a transparent background.
 * Uses raw BMP/ICO binary format — no dependencies required.
 *
 * Usage: node scripts/generate-favicon.mjs
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SIZE = 32;
const ORANGE = { r: 255, g: 107, b: 53 };

// Build 32x32 RGBA pixel data — circle centered with ~13px radius
const pixels = Buffer.alloc(SIZE * SIZE * 4, 0);
const cx = SIZE / 2;
const cy = SIZE / 2;
const radius = 13;

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const dx = x + 0.5 - cx;
    const dy = y + 0.5 - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let alpha = 0;
    if (dist <= radius - 0.5) {
      alpha = 255;
    } else if (dist <= radius + 0.5) {
      // Anti-alias the edge
      alpha = Math.round(255 * (radius + 0.5 - dist));
    }

    if (alpha > 0) {
      // BMP stores pixels as BGRA, bottom-to-top
      const bmpY = SIZE - 1 - y;
      const offset = (bmpY * SIZE + x) * 4;
      pixels[offset] = ORANGE.b;
      pixels[offset + 1] = ORANGE.g;
      pixels[offset + 2] = ORANGE.r;
      pixels[offset + 3] = alpha;
    }
  }
}

// BMP header for 32x32 RGBA (BITMAPINFOHEADER, 32bpp, no compression)
const bmpHeaderSize = 40;
const imageDataSize = SIZE * SIZE * 4;
const bmpData = Buffer.alloc(bmpHeaderSize + imageDataSize);

// BITMAPINFOHEADER
bmpData.writeUInt32LE(40, 0);           // biSize
bmpData.writeInt32LE(SIZE, 4);          // biWidth
bmpData.writeInt32LE(SIZE * 2, 8);      // biHeight (doubled for ICO format — includes AND mask)
bmpData.writeUInt16LE(1, 12);           // biPlanes
bmpData.writeUInt16LE(32, 14);          // biBitCount (32bpp BGRA)
bmpData.writeUInt32LE(0, 16);           // biCompression
bmpData.writeUInt32LE(imageDataSize, 20); // biSizeImage

// Copy pixel data after the BMP header
pixels.copy(bmpData, bmpHeaderSize);

// ICO file: header + 1 directory entry + image data
const icoHeaderSize = 6;
const icoDirEntrySize = 16;
const icoDataOffset = icoHeaderSize + icoDirEntrySize;
const ico = Buffer.alloc(icoDataOffset + bmpData.length);

// ICO header
ico.writeUInt16LE(0, 0);               // reserved
ico.writeUInt16LE(1, 2);               // type: 1 = ICO
ico.writeUInt16LE(1, 4);               // count: 1 image

// Directory entry
ico.writeUInt8(SIZE, 6);               // width
ico.writeUInt8(SIZE, 7);               // height
ico.writeUInt8(0, 8);                  // color palette count
ico.writeUInt8(0, 9);                  // reserved
ico.writeUInt16LE(1, 10);              // color planes
ico.writeUInt16LE(32, 12);             // bits per pixel
ico.writeUInt32LE(bmpData.length, 14); // image data size
ico.writeUInt32LE(icoDataOffset, 18);  // offset to image data

// Copy BMP data
bmpData.copy(ico, icoDataOffset);

const outPath = join(__dirname, "..", "app", "favicon.ico");
writeFileSync(outPath, ico);
console.log(`Favicon written to ${outPath} (${ico.length} bytes)`);
