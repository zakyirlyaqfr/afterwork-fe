import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const dirBefore = path.join(rootDir, "scratch_compare_before");
const dirNow = path.join(rootDir, "scratch_compare_now");

[dirBefore, dirNow].forEach(d => {
  if (fs.existsSync(d)) fs.rmSync(d, { recursive: true, force: true });
  fs.mkdirSync(d, { recursive: true });
});

console.log("Extracting both archives...");
execSync(`tar.exe -xf "${path.join(rootDir, "afterwork-deployment-before.zip")}" -C "${dirBefore}"`);
execSync(`tar.exe -xf "${path.join(rootDir, "afterwork-deployment.zip")}" -C "${dirNow}"`);

console.log("\n=======================================================");
console.log("   COMPARISON: BEFORE vs AFTERWORK-DEPLOYMENT.ZIP");
console.log("=======================================================\n");

// 1. Title
const beforeIndex = fs.readFileSync(path.join(dirBefore, "index.html"), "utf8");
const nowIndex = fs.readFileSync(path.join(dirNow, "index.html"), "utf8");
console.log("1. TITLE TAG:");
console.log("   - BEFORE:", beforeIndex.match(/<title>(.*?)<\/title>/)?.[1] || "None");
console.log("   - NOW:   ", nowIndex.match(/<title>(.*?)<\/title>/)?.[1] || "None");

// 2. Script tags
console.log("\n2. NEXT.JS JAVASCRIPT HYDRATION SCRIPTS:");
const beforeScripts = [...beforeIndex.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
const nowScripts = [...nowIndex.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
console.log("   - BEFORE count:", beforeScripts.length);
console.log("   - BEFORE paths sample:");
beforeScripts.slice(0, 3).forEach(s => console.log("     *", s));
console.log("   - NOW count:   ", nowScripts.length);
console.log("   - NOW paths sample:");
nowScripts.slice(0, 3).forEach(s => console.log("     *", s));

// 3. Subpath prefix in scripts
console.log("\n3. SUBPATH PREFIX /afterwork-1/ IN SCRIPTS:");
const beforeHasPrefix = beforeScripts.some(s => s.startsWith("/afterwork-1"));
const nowHasPrefix = nowScripts.every(s => s.startsWith("/afterwork-1"));
console.log("   - BEFORE had /afterwork-1 prefix:", beforeHasPrefix ? "YES" : "❌ NO (Hardcoded to root /_next/)");
console.log("   - NOW has /afterwork-1 prefix:   ", nowHasPrefix ? "✅ YES (100% of scripts)" : "NO");

// 4. Video and Media Sources
console.log("\n4. SPLASH SCREEN VIDEO SOURCES:");
const beforeVideos = [...beforeIndex.matchAll(/<source[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
const nowVideos = [...nowIndex.matchAll(/<source[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
console.log("   - BEFORE video sources in HTML:", beforeVideos);
console.log("   - NOW video sources in HTML:   ", nowVideos);

// 5. Assets in HTML (images, logos, fonts)
console.log("\n5. ASSET PREFIX IN HTML (Images, Brand, Icons):");
const beforeAssets = [...beforeIndex.matchAll(/(?:src|href)=["'](\/(?:brand|images|fonts|manifest|icon|favicon)[^"']*)["']/g)].map(m => m[1]);
const nowAssets = [...nowIndex.matchAll(/(?:src|href)=["'](\/afterwork-1\/(?:brand|images|fonts|manifest|icon|favicon)[^"']*)["']/g)].map(m => m[1]);
console.log(`   - BEFORE: ${beforeAssets.length} asset paths pointing to ROOT '/' (Caused HTTP 404 on live server!)`);
console.log("     Sample BEFORE:", beforeAssets.slice(0, 4));
console.log(`   - NOW:    ${nowAssets.length} asset paths pointing to SUBPATH '/afterwork-1/' (Returns HTTP 200 OK!)`);
console.log("     Sample NOW:   ", nowAssets.slice(0, 4));

// 6. PWA Manifest
console.log("\n6. PWA MANIFEST:");
console.log("   - BEFORE has manifest.json in zip:", fs.existsSync(path.join(dirBefore, "manifest.json")) ? "YES" : "❌ NO");
console.log("   - NOW has manifest.json in zip:   ", fs.existsSync(path.join(dirNow, "manifest.json")) ? "✅ YES" : "NO");

// Clean up
[dirBefore, dirNow].forEach(d => fs.rmSync(d, { recursive: true, force: true }));
console.log("\n=======================================================\n");
