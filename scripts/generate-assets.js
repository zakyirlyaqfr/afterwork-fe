const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC = path.join(__dirname, '..', 'public');

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function createPlaceholderSVGs() {
  const whiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="400" height="120">
  <!-- PLACEHOLDER FOR logo short white afterwork caffeine.PNG -->
  <!-- REPLACE THIS FILE OR THE PNG IN /public/brand/ WITH YOUR ACTUAL LOGO -->
  <rect width="100%" height="100%" fill="none"/>
  <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="#F5F5F5" font-family="'Alte Haas Grotesk', 'Space Grotesk', sans-serif" font-weight="900" font-size="34" letter-spacing="-1">AFTERWORK</text>
  <text x="50%" y="78%" dominant-baseline="middle" text-anchor="middle" fill="#E05D29" font-family="'Alte Haas Grotesk', 'Space Grotesk', sans-serif" font-weight="700" font-size="14" letter-spacing="4">CAFFEINE</text>
</svg>`;

  const blackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="400" height="120">
  <!-- PLACEHOLDER FOR logo short black afterwork caffeine.PNG -->
  <!-- REPLACE THIS FILE OR THE PNG IN /public/brand/ WITH YOUR ACTUAL LOGO -->
  <rect width="100%" height="100%" fill="none"/>
  <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="#000000" font-family="'Alte Haas Grotesk', 'Space Grotesk', sans-serif" font-weight="900" font-size="34" letter-spacing="-1">AFTERWORK</text>
  <text x="50%" y="78%" dominant-baseline="middle" text-anchor="middle" fill="#E05D29" font-family="'Alte Haas Grotesk', 'Space Grotesk', sans-serif" font-weight="700" font-size="14" letter-spacing="4">CAFFEINE</text>
</svg>`;

  fs.writeFileSync(path.join(PUBLIC, 'brand', 'logo-short-white-placeholder.svg'), whiteSvg);
  fs.writeFileSync(path.join(PUBLIC, 'brand', 'logo-short-black-placeholder.svg'), blackSvg);
}

async function generateIntroSequence() {
  const seqDir = path.join(PUBLIC, 'sequence', 'intro');
  await ensureDir(seqDir);

  const whiteLogoBuffer = fs.readFileSync(path.join(PUBLIC, 'brand', 'logo-short-white.png'));

  // 30 frames
  for (let i = 1; i <= 30; i++) {
    const frameNum = String(i).padStart(3, '0');
    const filename = `frame-${frameNum}.webp`;
    const filepath = path.join(seqDir, filename);

    // Frame canvas size 600x600 for fast loading and crisp rendering
    if (i <= 5) {
      // Tiny pulsating orange dot + coordinate text
      const dotRadius = 3 + i * 1.5;
      const opacity = 0.3 + (i / 5) * 0.7;
      const svgOverlay = `<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="600" fill="#000000"/>
        <circle cx="300" cy="300" r="${dotRadius}" fill="#E05D29" opacity="${opacity}"/>
        <text x="300" y="340" fill="#262626" font-family="monospace" font-size="10" text-anchor="middle" letter-spacing="3">07°15'32"S 112°44'51"E</text>
      </svg>`;
      await sharp(Buffer.from(svgOverlay))
        .webp({ quality: 80 })
        .toFile(filepath);
    } else if (i <= 15) {
      // Concentric rings expanding + crosshair
      const r1 = (i - 5) * 12;
      const r2 = Math.max(0, (i - 8) * 14);
      const crossSize = 10 + (i - 5) * 4;
      const svgOverlay = `<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="600" fill="#000000"/>
        <circle cx="300" cy="300" r="${r1}" stroke="#E05D29" stroke-width="1.5" fill="none" opacity="0.8"/>
        ${r2 > 0 ? `<circle cx="300" cy="300" r="${r2}" stroke="#262626" stroke-width="1" fill="none"/>` : ''}
        <circle cx="300" cy="300" r="4" fill="#E05D29"/>
        <line x1="${300 - crossSize}" y1="300" x2="${300 + crossSize}" y2="300" stroke="#F5F5F5" stroke-width="0.75" opacity="0.5"/>
        <line x1="300" y1="${300 - crossSize}" x2="300" y2="${300 + crossSize}" stroke="#F5F5F5" stroke-width="0.75" opacity="0.5"/>
        <text x="300" y="520" fill="#E05D29" font-family="monospace" font-size="11" text-anchor="middle" letter-spacing="4">AW // 09:00 — 02:00</text>
      </svg>`;
      await sharp(Buffer.from(svgOverlay))
        .webp({ quality: 80 })
        .toFile(filepath);
    } else {
      // Logo emerges and resolves
      const logoScale = 0.6 + ((i - 15) / 15) * 0.4;
      const ringRadius = 120 + (i - 15) * 8;
      const ringOpacity = Math.max(0, 1 - (i - 15) / 15);

      const resizedLogo = await sharp(whiteLogoBuffer)
        .resize(Math.round(280 * logoScale), Math.round(280 * logoScale))
        .png()
        .toBuffer();

      const svgOverlay = `<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="600" fill="#000000"/>
        <circle cx="300" cy="300" r="${ringRadius}" stroke="#E05D29" stroke-width="1" fill="none" opacity="${ringOpacity}"/>
        <text x="300" y="470" fill="#F5F5F5" font-family="sans-serif" font-weight="900" font-size="13" text-anchor="middle" letter-spacing="6">AFTERWORK CAFFEINE</text>
        <text x="300" y="492" fill="#E05D29" font-family="monospace" font-size="9" text-anchor="middle" letter-spacing="3">SURABAYA // ALL DAY ALL NIGHT</text>
      </svg>`;

      await sharp(Buffer.from(svgOverlay))
        .composite([{
          input: resizedLogo,
          top: Math.round(300 - (280 * logoScale) / 2 - 20),
          left: Math.round(300 - (280 * logoScale) / 2),
          blend: 'over'
        }])
        .webp({ quality: 80 })
        .toFile(filepath);
    }
  }
}

async function generateEditorialImage(width, height, title, subtitle, filename, destDir, baseImage = null) {
  await ensureDir(destDir);
  const outPath = path.join(destDir, filename);

  if (baseImage && fs.existsSync(baseImage)) {
    await sharp(baseImage)
      .resize(width, height, { fit: 'cover', position: 'center' })
      .modulate({ brightness: 0.95, saturation: 0.85 })
      .jpeg({ quality: 85 })
      .toFile(outPath);
    return;
  }

  const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  };

  const safeTitle = escapeXml(title.toUpperCase());
  const safeSubtitle = escapeXml(subtitle.toUpperCase());

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1c1c1c"/>
        <stop offset="60%" stop-color="#0d0d0d"/>
        <stop offset="100%" stop-color="#000000"/>
      </radialGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="40" y2="0" stroke="#262626" stroke-width="0.5" opacity="0.3"/>
        <line x1="0" y1="0" x2="0" y2="40" stroke="#262626" stroke-width="0.5" opacity="0.3"/>
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#vignette)"/>
    <rect width="${width}" height="${height}" fill="url(#grid)"/>
    <circle cx="${width * 0.8}" cy="${height * 0.2}" r="${Math.min(width, height) * 0.25}" stroke="#E05D29" stroke-width="1" opacity="0.2" fill="none"/>
    <line x1="${width * 0.1}" y1="${height * 0.85}" x2="${width * 0.9}" y2="${height * 0.85}" stroke="#E05D29" stroke-width="1" opacity="0.6"/>
    <text x="${width * 0.1}" y="${height * 0.82}" fill="#F5F5F5" font-family="'Alte Haas Grotesk', 'Space Grotesk', sans-serif" font-weight="900" font-size="${Math.max(20, Math.round(width * 0.04))}" letter-spacing="-0.5">${safeTitle}</text>
    <text x="${width * 0.1}" y="${height * 0.89}" fill="#E05D29" font-family="monospace" font-size="${Math.max(10, Math.round(width * 0.016))}" letter-spacing="3">${safeSubtitle}</text>
    <text x="${width * 0.9}" y="${height * 0.89}" fill="#666666" font-family="monospace" font-size="${Math.max(10, Math.round(width * 0.016))}" text-anchor="end" letter-spacing="2">09AM → 02AM</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85 })
    .toFile(outPath);
}

async function main() {
  console.log('Generating assets...');
  await createPlaceholderSVGs();
  await generateIntroSequence();

  const srcImg = (name) => path.join(PUBLIC, 'images', name);

  // Home images
  await generateEditorialImage(2400, 1600, 'Afterwork Signature', 'Direct Flash / Stainless Steel', 'home-hero-01.jpg', path.join(PUBLIC, 'images', 'home'), srcImg('hero-barista.jpg'));
  await generateEditorialImage(1600, 2000, 'Brutalist Interior', 'Surabaya / All Night', 'home-about-01.jpg', path.join(PUBLIC, 'images', 'home'), srcImg('interior-brutalist.jpg'));
  await generateEditorialImage(1200, 1600, 'Espresso Tonic', '01 / Cold Craft', 'home-gallery-01.jpg', path.join(PUBLIC, 'images', 'home'), srcImg('product-espresso-tonic.jpg'));
  await generateEditorialImage(1400, 1000, 'Nitro Cold Brew', '02 / Bottled Drink', 'home-gallery-02.jpg', path.join(PUBLIC, 'images', 'home'), srcImg('product-nitro-coldbrew.jpg'));
  await generateEditorialImage(1000, 1400, 'Midnight Cruffin', '03 / Comfort Food', 'home-gallery-03.jpg', path.join(PUBLIC, 'images', 'home'), srcImg('product-midnight-cruffin.jpg'));
  await generateEditorialImage(1600, 1100, 'Geisha Pour-Over', '04 / Slow Extraction', 'home-gallery-04.jpg', path.join(PUBLIC, 'images', 'home'), srcImg('product-geisha-pourover.jpg'));
  await generateEditorialImage(1200, 1500, 'Kouign-Amann', '05 / Morning to Midnight', 'home-gallery-05.jpg', path.join(PUBLIC, 'images', 'home'), srcImg('product-kouign-amann.jpg'));

  // About images
  await generateEditorialImage(2000, 1300, 'The Architecture', 'Concrete & Extraction', 'about-hero.jpg', path.join(PUBLIC, 'images', 'about'), srcImg('interior-brutalist.jpg'));
  await generateEditorialImage(1400, 1800, 'Crafted Detail', 'Dialed in Daily', 'about-interior.jpg', path.join(PUBLIC, 'images', 'about'), srcImg('hero-barista.jpg'));
  await generateEditorialImage(1200, 1600, 'Bottled Production', 'Cold Infusion Process', 'about-detail.jpg', path.join(PUBLIC, 'images', 'about'), srcImg('product-nitro-coldbrew.jpg'));
  await generateEditorialImage(1800, 1200, '01:45 AM Atmosphere', 'Subtle Neon & Low Beats', 'about-night.jpg', path.join(PUBLIC, 'images', 'about'), srcImg('product-espresso-tonic.jpg'));

  // Menu images
  await generateEditorialImage(1200, 1200, 'Espresso Tonic', 'Double Shot / Fever Tree / Orange Twist', 'menu-coffee.jpg', path.join(PUBLIC, 'images', 'menu'), srcImg('product-espresso-tonic.jpg'));
  await generateEditorialImage(1200, 1200, 'Nitro Cold Brew', '24H Steeped / Amber Glass Bottle', 'menu-bottle.jpg', path.join(PUBLIC, 'images', 'menu'), srcImg('product-nitro-coldbrew.jpg'));
  await generateEditorialImage(1200, 1200, 'Midnight Cruffin', 'Smoked Pastrami & Cream Cheese', 'menu-food.jpg', path.join(PUBLIC, 'images', 'menu'), srcImg('product-midnight-cruffin.jpg'));
  await generateEditorialImage(1200, 1200, 'Artisanal Matcha', 'Single Origin Uji / Oat Milk', 'menu-noncoffee.jpg', path.join(PUBLIC, 'images', 'menu'), srcImg('product-geisha-pourover.jpg'));

  // Navigation hover previews
  await generateEditorialImage(1000, 1400, 'About Afterwork', 'Philosophy & Culture', 'nav-about.jpg', path.join(PUBLIC, 'images', 'navigation'), srcImg('interior-brutalist.jpg'));
  await generateEditorialImage(1000, 1400, 'Craft Menu', 'Coffee & Bottled Drinks', 'nav-menu.jpg', path.join(PUBLIC, 'images', 'navigation'), srcImg('product-espresso-tonic.jpg'));
  await generateEditorialImage(1000, 1400, 'Express Delivery', 'Gojek & Grab Available', 'nav-delivery.jpg', path.join(PUBLIC, 'images', 'navigation'), srcImg('product-nitro-coldbrew.jpg'));
  await generateEditorialImage(1000, 1400, 'Archive Gallery', 'Moments 09AM to 02AM', 'nav-gallery.jpg', path.join(PUBLIC, 'images', 'navigation'), srcImg('hero-barista.jpg'));
  await generateEditorialImage(1000, 1400, 'Surabaya Space', 'Storefront & Contact', 'nav-contact.jpg', path.join(PUBLIC, 'images', 'navigation'), srcImg('product-kouign-amann.jpg'));
  await generateEditorialImage(1000, 1400, 'Information', 'Frequently Asked Questions', 'nav-faq.jpg', path.join(PUBLIC, 'images', 'navigation'), srcImg('product-geisha-pourover.jpg'));

  // Gallery 16 items with varying aspect ratios
  const galleryConfigs = [
    { name: 'gallery-01.jpg', w: 1200, h: 1600, t: 'Barista in Flow', sub: 'Surabaya / 22:15', base: srcImg('hero-barista.jpg') },
    { name: 'gallery-02.jpg', w: 1600, h: 1000, t: 'Concrete Bar & Chrome', sub: 'Industrial Architecture', base: srcImg('interior-brutalist.jpg') },
    { name: 'gallery-03.jpg', w: 1100, h: 1500, t: 'Nitro Amber Bottle', sub: 'Damn Good Bottled Drinks', base: srcImg('product-nitro-coldbrew.jpg') },
    { name: 'gallery-04.jpg', w: 1400, h: 1400, t: 'Espresso Tonic Glow', sub: 'High Contrast Flash', base: srcImg('product-espresso-tonic.jpg') },
    { name: 'gallery-05.jpg', w: 1600, h: 1100, t: 'Geisha Ritual', sub: 'Manual Brew Counter', base: srcImg('product-geisha-pourover.jpg') },
    { name: 'gallery-06.jpg', w: 1000, h: 1400, t: 'Laminated Layers', sub: 'Pastry Laboratory', base: srcImg('product-kouign-amann.jpg') },
    { name: 'gallery-07.jpg', w: 1400, h: 1000, t: 'Midnight Cruffin', sub: 'Comfort Food 9PM', base: srcImg('product-midnight-cruffin.jpg') },
    { name: 'gallery-08.jpg', w: 1200, h: 1600, t: 'Steam Wand Pressure', sub: 'Custom Modded Synesso', base: null },
    { name: 'gallery-09.jpg', w: 1500, h: 1000, t: 'Late Night Gathering', sub: 'Conversations 01:20', base: null },
    { name: 'gallery-10.jpg', w: 1100, h: 1500, t: 'Packaging Detail', sub: 'Minimalist Seal', base: null },
    { name: 'gallery-11.jpg', w: 1600, h: 1200, t: 'Storefront Facade', sub: 'After Dark Entrance', base: null },
    { name: 'gallery-12.jpg', w: 1200, h: 1600, t: 'Cold Drip Extraction', sub: '12-Hour Slow Yield', base: null },
    { name: 'gallery-13.jpg', w: 1400, h: 1000, t: 'Counter Lighting', sub: 'Warm Steel & Onyx', base: null },
    { name: 'gallery-14.jpg', w: 1000, h: 1400, t: 'Bottled Batch Reserve', sub: 'Grab & Go Cold Storage', base: null },
    { name: 'gallery-15.jpg', w: 1500, h: 1000, t: 'Surabaya Street View', sub: 'Night Shift Transition', base: null },
    { name: 'gallery-16.jpg', w: 1200, h: 1500, t: 'Portafilter Tamp', sub: 'Precision 58.5mm', base: null }
  ];

  for (const item of galleryConfigs) {
    await generateEditorialImage(item.w, item.h, item.t, item.sub, item.name, path.join(PUBLIC, 'images', 'gallery'), item.base);
  }

  // Contact storefront and night
  await generateEditorialImage(1800, 1200, 'Surabaya HQ', 'Jl. Gubeng Pojok No. 12', 'contact-storefront.jpg', path.join(PUBLIC, 'images', 'contact'), srcImg('interior-brutalist.jpg'));
  await generateEditorialImage(1400, 1800, '01:30 AM Entrance', 'Open Until 02:00 AM', 'contact-night.jpg', path.join(PUBLIC, 'images', 'contact'), srcImg('hero-barista.jpg'));

  console.log('All dummy assets and sequence frames created successfully!');
}

main().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
