import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "..", "out");
const PORT = 4000;
const SUBPATH = "/afterwork-1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".txt": "text/plain"
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];
  
  if (urlPath === "/" || urlPath === "") {
    res.writeHead(302, { Location: `${SUBPATH}/` });
    return res.end();
  }

  if (!urlPath.startsWith(SUBPATH)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("404 Not Found - Production build is mapped to " + SUBPATH);
  }

  let relative = urlPath.slice(SUBPATH.length);
  if (relative === "" || relative === "/") {
    relative = "/index.html";
  }

  let filePath = path.join(outDir, relative);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath) && fs.existsSync(filePath + ".html")) {
    filePath = filePath + ".html";
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("404 Not Found: " + relative);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  const stat = fs.statSync(filePath);
  const range = req.headers.range;

  if (range && (ext === ".mp4" || ext === ".webm")) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": contentType
    });
    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": stat.size,
      "Content-Type": contentType,
      "Accept-Ranges": "bytes"
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

server.listen(PORT, () => {
  console.log(`\n=======================================================`);
  console.log(`  PRODUCTION PREVIEW SERVER RUNNING`);
  console.log(`  Access URL: http://localhost:${PORT}${SUBPATH}/`);
  console.log(`=======================================================\n`);
});
