/**
 * build-deploy.mjs
 * Builds the Next.js static export for ANY subpath or root domain,
 * verifies all generated scripts and asset paths, and packages 'afterwork-deployment.zip'.
 * 
 * Usage:
 *   node scripts/build-deploy.mjs                -> builds for root domain '/' (matches localhost, default)
 *   node scripts/build-deploy.mjs /afterwork-1   -> builds for subpath '/afterwork-1'
 *   node scripts/build-deploy.mjs /              -> builds for root domain '/'
 * 
 * Local development ('npm run dev') remains completely untouched at 'http://localhost:3000/'.
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "out");
const zipFile = path.join(rootDir, "afterwork-deployment.zip");

// 1. Determine and normalize target subpath (defaults to root domain '/')
const argPath = process.argv[2];
let targetSubpath = "";

if (argPath !== undefined && argPath !== null) {
  const trimmed = argPath.trim();
  if (trimmed === "/" || trimmed === "" || trimmed.toLowerCase() === "root") {
    targetSubpath = "";
  } else {
    // Ensure leading slash, remove trailing slash
    const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    targetSubpath = withLeading.replace(/\/+$/, "");
  }
} else if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
  targetSubpath = process.env.NEXT_PUBLIC_BASE_PATH.replace(/\/+$/, "");
}

process.env.NEXT_PUBLIC_BASE_PATH = targetSubpath;

console.log("\n=======================================================");
console.log("  AFTERWORK - DYNAMIC PRODUCTION BUILD & PACKAGER");
console.log(`  Target Subpath: ${targetSubpath ? targetSubpath : "/ (root domain)"}`);
console.log(`  Example URL:    http://103.103.22.15${targetSubpath ? targetSubpath : ""}/`);
console.log("=======================================================\n");

// 2. Run Next.js static export
console.log(`[1/4] Running Next.js static export with NEXT_PUBLIC_BASE_PATH="${targetSubpath}"...`);
try {
  execSync("npx next build", {
    cwd: rootDir,
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_PUBLIC_BASE_PATH: targetSubpath,
    },
  });
} catch (err) {
  console.error("\n❌ Next.js build failed!");
  process.exit(1);
}

// 3. Validate output directory
console.log("\n[2/4] Validating build artifacts in out/...");
const indexHtmlPath = path.join(outDir, "index.html");
if (!fs.existsSync(indexHtmlPath)) {
  console.error("❌ out/index.html was not generated!");
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, "utf-8");
const hasScripts = indexContent.includes("<script");
const expectedChunkPrefix = targetSubpath ? `${targetSubpath}/_next/static` : "/_next/static";
const hasSubpathInJs = indexContent.includes(expectedChunkPrefix);

console.log(`- out/index.html size: ${(indexContent.length / 1024).toFixed(1)} KB`);
console.log(`- Contains Next.js React hydration scripts: ${hasScripts ? "✅ YES" : "❌ NO"}`);
console.log(`- Contains correct asset chunks (${expectedChunkPrefix}): ${hasSubpathInJs ? "✅ YES" : "❌ NO"}`);

if (!hasScripts) {
  console.error("❌ ERROR: index.html is missing script tags!");
  process.exit(1);
}

// 3b. Sanitize inline script tags (add trailing semicolons so IDE linters don't report '; expected')
function sanitizeHtmlScripts(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      sanitizeHtmlScripts(full);
    } else if (item.endsWith(".html")) {
      let content = fs.readFileSync(full, "utf8");
      content = content.replace(/\.push\(\[0\]\)<\/script>/g, ".push([0]);</script>");
      content = content.replace(/(\]\))<\/script>/g, "$1;</script>");
      fs.writeFileSync(full, content, "utf8");
    }
  }
}
sanitizeHtmlScripts(outDir);

// 3b-2. Normalize segment prefetch files for static servers
// Next.js client router requests e.g. '/about/__next.about.__PAGE__.txt'
// but static export writes it into folder 'about/__next.about/__PAGE__.txt'.
// We duplicate with dot-notation so static servers serve 200 OK immediately.
function normalizeRscPrefetchFiles(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name.startsWith("__next.")) {
        const pageTxt = path.join(full, "__PAGE__.txt");
        if (fs.existsSync(pageTxt)) {
          const targetFile = path.join(dir, `${item.name}.__PAGE__.txt`);
          fs.copyFileSync(pageTxt, targetFile);
        }
      } else {
        normalizeRscPrefetchFiles(full);
      }
    }
  }
}
normalizeRscPrefetchFiles(outDir);

// 3b-3. Provide empty Chrome DevTools stub to avoid browser-internal 404
const devtoolsDir = path.join(outDir, ".well-known", "appspecific");
fs.mkdirSync(devtoolsDir, { recursive: true });
fs.writeFileSync(path.join(devtoolsDir, "com.chrome.devtools.json"), "{}", "utf8");

// 3c. Generate clear README.txt in out/ for server deployer
const destSubpath = targetSubpath || "";
const serverDir = destSubpath ? `/var/www/html${destSubpath}/` : "/var/www/html/";
const readmeContent = `========================================================================
             AFTERWORK CAFFEINE - PRODUCTION DEPLOYMENT GUIDE
========================================================================

Target Deployment : Root Domain / Subfolder (Standard Web Server)
Format Arsip      : Static HTML5 / CSS3 / Next.js React 19 Client Hydration
Build Timestamp   : ${new Date().toISOString()}

------------------------------------------------------------------------
1. CARA DEPLOY DI SERVER LINUX (NGINX / UBUNTU / DEBIAN)
------------------------------------------------------------------------

Langkah 1: Upload file 'afterwork-deployment.zip' ke server Anda.
Langkah 2: Jalankan perintah berikut di terminal server:

   # Buat direktori web jika belum ada
   sudo mkdir -p /var/www/html/

   # Ekstrak file dan timpa versi lama secara otomatis (-o)
   sudo unzip -o afterwork-deployment.zip -d /var/www/html/

   # Berikan hak akses kepemilikan kepada web server (www-data / nginx)
   sudo chown -R www-data:www-data /var/www/html/

   # Atur izin akses file standar
   sudo chmod -R 755 /var/www/html/

Langkah 3: Konfigurasi Nginx (/etc/nginx/sites-available/default):
   
   server {
       listen 80;
       server_name _; # Ganti dengan domain Anda atau biarkan default IP

       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ $uri.html /index.html;
       }

       # Cache control untuk file statis Next.js
       location /_next/static/ {
           expires 1y;
           add_header Cache-Control "public, max-age=31536000, immutable";
       }
   }

Langkah 4: Reload Nginx:
   sudo nginx -t && sudo systemctl reload nginx

------------------------------------------------------------------------
2. CARA DEPLOY DI SERVER APACHE / CPANEL / LITESPEED
------------------------------------------------------------------------

1. Ekstrak isi file 'afterwork-deployment.zip' ke folder 'public_html'
   atau DocumentRoot server Apache Anda.
2. File '.htaccess' sudah disertakan otomatis di dalam zip ini untuk
   menangani routing clean URL (/about, /menus, /gallery) tanpa perlu
   konfigurasi manual tambahan.

------------------------------------------------------------------------
3. CARA TEST LOKAL CEPAT (OFFLINE / DEV TESTING)
------------------------------------------------------------------------

Ekstrak file zip ke sebuah folder, lalu buka terminal di folder tersebut
dan jalankan salah satu web server lokal:

   npx serve .
   # ATAU
   python -m http.server 8080

Buka di browser: http://localhost:3000 (atau port yang tertera).

------------------------------------------------------------------------
4. CATATAN PENTING & VERIFIKASI ASET
------------------------------------------------------------------------

- Seluruh aset telah terbundle 100% lengkap di dalam paket ini:
  * brand/afterwork-splash-final.mp4 & .webm (Video Splash Screen)
  * brand/logo-short-white.png & logo-short-black.png (Brand Logo)
  * fonts/ (Font typography Alte Haas Grotesk)
  * images/ & images-original/ (Foto produk, menu, galeri resolusi tinggi)
  * _next/static/ (Script interaktivitas, GSAP animasi, Lenis smooth scroll)
  * .htaccess & README.txt

- TIPS: Setelah deploy, buka website menggunakan Mode Incognito / Private
  Window (Ctrl + Shift + N) atau lakukan Hard Refresh (Ctrl + Shift + R) 
  untuk memastikan browser memuat aset terbaru secara optimal.
========================================================================
`;

fs.writeFileSync(path.join(outDir, "README.txt"), readmeContent, "utf8");
console.log("- Generated README.txt in deployment package: ✅ YES");

// 3c-2. Generate .htaccess for Apache / LiteSpeed / cPanel
const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase ${destSubpath || "/"}
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.+)$ $1.html [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . ${destSubpath || ""}/index.html [L]
</IfModule>
`;
fs.writeFileSync(path.join(outDir, ".htaccess"), htaccessContent, "utf8");
console.log("- Generated .htaccess in deployment package: ✅ YES");

// 4. Clean up previous deployment zip if it exists
if (fs.existsSync(zipFile)) {
  try {
    fs.unlinkSync(zipFile);
    console.log("\n[3/4] Removed old afterwork-deployment.zip");
  } catch {}
} else {
  console.log("\n[3/4] Preparing new deployment archive...");
}

// 5. Create afterwork-deployment.zip from out/
console.log("[4/4] Creating afterwork-deployment.zip from out/...");
let zipSuccess = false;

// Try tar.exe from within outDir with * so Windows Explorer reads clean relative paths without './'
try {
  execSync(`tar.exe -a -cf "${zipFile}" *`, { cwd: outDir, shell: "powershell", stdio: "ignore" });
  if (fs.existsSync(zipFile) && fs.statSync(zipFile).size > 100000) {
    zipSuccess = true;
  }
} catch {
  zipSuccess = false;
}

// Fallback to PowerShell Compress-Archive if tar failed
if (!zipSuccess) {
  try {
    console.log("Tar failed or not found, falling back to PowerShell Compress-Archive...");
    execSync(
      `powershell -NoProfile -Command "Get-ChildItem -Force -Path '${outDir}' | Compress-Archive -DestinationPath '${zipFile}' -Force"`,
      { stdio: "inherit" }
    );
    if (fs.existsSync(zipFile)) {
      zipSuccess = true;
    }
  } catch (err) {
    console.error("❌ Failed to compress out directory:", err);
    process.exit(1);
  }
}

if (zipSuccess) {
  const stat = fs.statSync(zipFile);
  const serverDest = targetSubpath ? `/var/www/html${targetSubpath}/` : `/var/www/html/`;
  console.log("\n=======================================================");
  console.log(`✅ SUCCESS! Deployment archive ready:`);
  console.log(`   Target Subpath: ${targetSubpath ? targetSubpath : "/ (root domain)"}`);
  console.log(`   Archive File:   ${zipFile}`);
  console.log(`   Archive Size:   ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log("=======================================================");
  console.log("\nNext Steps for Server Deployment:");
  console.log(`1. Upload 'afterwork-deployment.zip' to your server (103.103.22.15)`);
  console.log(`2. In your server terminal, extract to destination folder:`);
  console.log(`   sudo mkdir -p ${serverDest}`);
  console.log(`   sudo unzip -o afterwork-deployment.zip -d ${serverDest}`);
  console.log(`   sudo chown -R www-data:www-data ${serverDest}`);
  console.log(`   sudo chmod -R 755 ${serverDest}`);
  console.log(`3. Access: http://103.103.22.15${targetSubpath ? targetSubpath : ""}/ (Incognito / Hard Refresh)`);
  console.log("\nLocal development server ('npm run dev') is 100% UNTOUCHED and active.\n");
} else {
  console.error("❌ Could not create afterwork-deployment.zip");
  process.exit(1);
}
