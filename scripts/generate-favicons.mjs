import fs from "fs";
import path from "path";
import sharp from "sharp";

async function generateFavicons() {
  console.log("Generating high-contrast, multi-theme favicons...");

  const sourceWhite = path.resolve("public/brand/logo-short-white.png");
  if (!fs.existsSync(sourceWhite)) {
    throw new Error(`Source file not found: ${sourceWhite}`);
  }

  // 1. Generate Master 512x512 Badge Icon
  // Sleek dark rounded rectangle (#080808) with brand orange accent border (#E05D29) and white logo
  const size = 512;
  const radius = 100;
  const borderWidth = 18;

  const svgBackground = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${borderWidth / 2}" y="${borderWidth / 2}" 
            width="${size - borderWidth}" height="${size - borderWidth}" 
            rx="${radius}" ry="${radius}" 
            fill="#050505" stroke="#E05D29" stroke-width="${borderWidth}" />
    </svg>
  `);

  // Resize the white logo to fit nicely with breathing room inside the badge (78% of size)
  const logoSize = Math.round(size * 0.78);
  const logoResized = await sharp(sourceWhite)
    .resize(logoSize, logoSize, { fit: "contain" })
    .toBuffer();

  const masterBadgeBuffer = await sharp(svgBackground)
    .composite([{ input: logoResized, gravity: "center" }])
    .png()
    .toBuffer();

  // Save 512x512
  fs.writeFileSync("public/brand/apple-touch-icon.png", masterBadgeBuffer);
  fs.writeFileSync("src/app/apple-icon.png", masterBadgeBuffer);
  fs.writeFileSync("src/app/icon.png", masterBadgeBuffer);
  fs.writeFileSync("public/brand/logo-badge.png", masterBadgeBuffer);

  // 2. Generate 192x192 (for Android/PWA)
  const icon192 = await sharp(masterBadgeBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync("public/brand/icon-192.png", icon192);

  // 3. Generate 32x32 and 16x16 PNGs
  const icon32 = await sharp(masterBadgeBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync("public/brand/favicon-32x32.png", icon32);

  const icon16 = await sharp(masterBadgeBuffer).resize(16, 16).png().toBuffer();
  fs.writeFileSync("public/brand/favicon-16x16.png", icon16);

  const icon48 = await sharp(masterBadgeBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync("public/brand/favicon-48x48.png", icon48);

  // 4. Create multi-resolution ICO file containing 16x16, 32x32, 48x48
  // Simple ICO builder from PNG buffers:
  function createIco(pngBuffers) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // type 1 = ICO
    header.writeUInt16LE(pngBuffers.length, 4); // number of images

    let offset = 6 + (16 * pngBuffers.length);
    const directoryEntries = [];

    for (const { buffer, size } of pngBuffers) {
      const entry = Buffer.alloc(16);
      entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
      entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
      entry.writeUInt8(0, 2); // color palette (0 = no palette)
      entry.writeUInt8(0, 3); // reserved
      entry.writeUInt16LE(1, 4); // color planes
      entry.writeUInt16LE(32, 6); // bits per pixel
      entry.writeUInt32LE(buffer.length, 8); // image data size
      entry.writeUInt32LE(offset, 12); // image data offset

      directoryEntries.push(entry);
      offset += buffer.length;
    }

    return Buffer.concat([
      header,
      ...directoryEntries,
      ...pngBuffers.map(p => p.buffer)
    ]);
  }

  const icoBuffer = createIco([
    { buffer: icon16, size: 16 },
    { buffer: icon32, size: 32 },
    { buffer: icon48, size: 48 }
  ]);

  fs.writeFileSync("public/favicon.ico", icoBuffer);
  fs.writeFileSync("src/app/favicon.ico", icoBuffer);

  // 5. Generate Adaptive SVG Favicon (for modern browsers)
  // Adapts automatically to user theme if SVG is supported
  const svgFavicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="60" height="60" rx="12" fill="#080808" stroke="#E05D29" stroke-width="2.5"/>
  <text x="32" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="18" fill="#F5F5F5" text-anchor="middle" letter-spacing="-0.05em">AF</text>
  <circle cx="48" cy="18" r="5" fill="#E05D29"/>
</svg>`;
  fs.writeFileSync("public/brand/favicon.svg", svgFavicon.trim());

  console.log("✅ All favicons and title icons successfully generated!");
}

generateFavicons().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
