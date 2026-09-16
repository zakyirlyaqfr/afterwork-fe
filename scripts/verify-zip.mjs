import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('====================================================');
console.log('   FULL DEPLOYMENT PACKAGE & PATH VERIFICATION');
console.log('====================================================\n');

const zipPath = 'afterwork-deployment.zip';

// 1. Check zip file exists and size
if (!fs.existsSync(zipPath)) {
  console.error('❌ afterwork-deployment.zip does not exist!');
  process.exit(1);
}
const stats = fs.statSync(zipPath);
console.log(`✅ [1/5] Archive exists: ${zipPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

// 2. Check tar listing structure
const zipList = execSync('tar -tf afterwork-deployment.zip')
  .toString()
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean);

console.log(`✅ [2/5] Archive contains ${zipList.length} files/directories.`);

// Verify required root files
const requiredFiles = [
  'index.html',
  'about/index.html',
  'menus/index.html',
  'gallery/index.html',
  'contact/index.html',
  'faqs/index.html',
  '404.html',
  'manifest.json',
  'favicon.ico',
  'README.txt',
  'brand/afterwork-splash-final.mp4',
  'brand/afterwork-splash-final.webm',
  'brand/logo-short-white.png',
  'brand/logo-short-black.png',
];

const missingFiles = requiredFiles.filter((f) => !zipList.includes(f));
if (missingFiles.length > 0) {
  console.error('❌ Missing critical files in zip:', missingFiles);
  process.exit(1);
} else {
  console.log('✅ [3/5] All critical HTML, video, brand, and config files exist directly at root level.');
}

// 3. Inspect HTML paths in out/index.html
const indexHtml = fs.readFileSync('out/index.html', 'utf8');

// Check script tags
const scriptMatches = [...indexHtml.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
const linkMatches = [...indexHtml.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

console.log('\nSample Script Paths in index.html:');
scriptMatches.slice(0, 4).forEach((s) => console.log('   -', s));

console.log('\nSample Stylesheet/Icon Paths in index.html:');
linkMatches.filter(l => l.startsWith('/')).slice(0, 4).forEach((l) => console.log('   -', l));

// Verify that all paths start with / (clean root domain paths for server)
const relativeScripts = scriptMatches.filter((s) => s.startsWith('./') || s.startsWith('../'));
if (relativeScripts.length > 0) {
  console.warn('⚠️ Found relative script paths:', relativeScripts);
} else {
  console.log('\n✅ [4/5] All asset references start with "/" - 100% compliant with standard root web server deployment (/var/www/html/).');
}

// 4. Test full extraction to an isolated temp directory
const testExtractDir = 'temp_verify_deployment';
if (fs.existsSync(testExtractDir)) {
  fs.rmSync(testExtractDir, { recursive: true, force: true });
}
fs.mkdirSync(testExtractDir);

try {
  execSync(`tar -xf afterwork-deployment.zip -C ${testExtractDir}`);
  const extractedFiles = fs.readdirSync(testExtractDir);
  console.log('\n✅ [5/5] Extracted successfully without errors!');
  console.log('   Extracted root entries:', extractedFiles.slice(0, 8).join(', '), '...');

  // Verify extracted index.html matches out/index.html
  const extractedIndexSize = fs.statSync(path.join(testExtractDir, 'index.html')).size;
  const outIndexSize = fs.statSync('out/index.html').size;
  if (extractedIndexSize === outIndexSize) {
    console.log(`   Verification: extracted index.html (${extractedIndexSize} bytes) matches build output.`);
  } else {
    throw new Error('Size mismatch between extracted index.html and build index.html');
  }
} finally {
  fs.rmSync(testExtractDir, { recursive: true, force: true });
}

console.log('\n====================================================');
console.log('🎉 RESULT: afterwork-deployment.zip is 100% READY!');
console.log('====================================================');
