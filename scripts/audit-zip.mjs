import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const zipPath = path.join(rootDir, "afterwork-deployment.zip");
const tempDir = path.join(rootDir, "scratch_audit");

if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir, { recursive: true });

console.log("Extracting afterwork-deployment.zip for verification...");
execSync(`tar.exe -xf "${zipPath}" -C "${tempDir}"`);

console.log("\n=======================================================");
console.log("       FORENSIC AUDIT OF AFTERWORK-DEPLOYMENT.ZIP");
console.log("=======================================================\n");

// 1. Title Check
console.log("1. TITLE & METADATA CHECK:");
const indexHtml = fs.readFileSync(path.join(tempDir, "index.html"), "utf8");
const titleMatch = indexHtml.match(/<title>(.*?)<\/title>/);
console.log("   - Title tag in index.html:", titleMatch ? `"${titleMatch[1]}"` : "❌ NOT FOUND");

// 2. Splash Screen Assets & Markup
console.log("\n2. SPLASH SCREEN ASSET CHECK:");
const videoSources = [...indexHtml.matchAll(/<source[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
console.log("   - Splash video <source> tags in index.html:", videoSources);
const mp4Exists = fs.existsSync(path.join(tempDir, "brand", "afterwork-splash-final.mp4"));
const webmExists = fs.existsSync(path.join(tempDir, "brand", "afterwork-splash-final.webm"));
const logoWhiteExists = fs.existsSync(path.join(tempDir, "brand", "logo-short-white.png"));
const logoBlackExists = fs.existsSync(path.join(tempDir, "brand", "logo-short-black.png"));
console.log("   - Video file MP4 present in zip:", mp4Exists ? "✅ YES" : "❌ NO");
console.log("   - Video file WebM present in zip:", webmExists ? "✅ YES" : "❌ NO");
console.log("   - Splash logo (white) present:", logoWhiteExists ? "✅ YES" : "❌ NO");
console.log("   - Splash logo (black) present:", logoBlackExists ? "✅ YES" : "❌ NO");

// 3. React Hydration & Interactive Scripts
console.log("\n3. REACT HYDRATION & BUTTON/MENU SCRIPTS:");
const scripts = [...indexHtml.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
console.log(`   - Total Next.js script tags in index.html: ${scripts.length} (Previous broken live site had: 0)`);
console.log("   - Sample script paths in HTML:");
scripts.slice(0, 4).forEach(s => console.log(`     * ${s}`));
const allScriptsHavePrefix = scripts.every(s => s.startsWith("/afterwork-1/_next/"));
console.log("   - All scripts correctly prefixed with /afterwork-1/:", allScriptsHavePrefix ? "✅ YES" : "❌ NO");

// 4. Sub-pages
console.log("\n4. SUB-PAGES VERIFICATION:");
const pages = ["about", "menus", "gallery", "contact", "faqs", "404"];
pages.forEach(p => {
  const htmlPath = path.join(tempDir, p, "index.html");
  if (fs.existsSync(htmlPath)) {
    const size = (fs.statSync(htmlPath).size / 1024).toFixed(1);
    const content = fs.readFileSync(htmlPath, "utf8");
    const hasPPageScripts = content.includes("/afterwork-1/_next/static");
    console.log(`   - /${p} page: ✅ EXISTS (${size} KB, Scripts Hydrated: ${hasPPageScripts ? "YES" : "NO"})`);
  } else {
    console.log(`   - /${p} page: ❌ MISSING`);
  }
});

// 5. PWA Manifest & Mobile Capability
console.log("\n5. PWA MANIFEST & MOBILE SETUP:");
const hasManifest = fs.existsSync(path.join(tempDir, "manifest.json"));
const manifestLinked = indexHtml.includes('rel="manifest"') && indexHtml.includes("/afterwork-1/manifest.json");
console.log("   - manifest.json in zip:", hasManifest ? "✅ YES" : "❌ NO");
console.log("   - manifest.json linked with /afterwork-1/ prefix:", manifestLinked ? "✅ YES" : "❌ NO");

// 6. Check for Any Unprefixed Root URLs
console.log("\n6. UNPREFIXED ROOT URL AUDIT (to ensure 0 broken links / 404s):");
const allAttrs = [...indexHtml.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(m => m[1]);
const unprefixed = allAttrs.filter(url => {
  if (url.startsWith("http") || url.startsWith("//") || url.startsWith("data:") || url.startsWith("#") || url === "") return false;
  return !url.startsWith("/afterwork-1");
});
console.log(`   - Unprefixed root links: ${unprefixed.length === 0 ? "✅ NONE (All 100% properly prefixed!)" : unprefixed.join(", ")}`);

// 7. Overall file count & archive health
console.log("\n7. ARCHIVE TOTAL STATS:");
let count = 0;
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else count++;
  }
}
walk(tempDir);
console.log(`   - Total extracted files in zip: ${count}`);
const zipStat = fs.statSync(zipPath);
console.log(`   - Zip file size: ${(zipStat.size / (1024 * 1024)).toFixed(2)} MB`);

// Clean up
fs.rmSync(tempDir, { recursive: true, force: true });
console.log("\n=======================================================");
console.log("             VERIFICATION AUDIT COMPLETE");
console.log("=======================================================\n");
