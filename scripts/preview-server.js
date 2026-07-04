// Minimal static file server for the production export in `out/`.
// Serves clean URLs (/blog/foo -> out/blog/foo.html) and binds to 0.0.0.0 so
// other devices on the LAN (e.g. an iPhone) can load it. Unlike `next dev`,
// this serves real static HTML/CSS/JS files — no HMR, no cross-origin dev
// restrictions — so it renders reliably on a phone and mirrors production.
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "out");
const PORT = 8080;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const resolve = (urlPath) => {
  let p = decodeURIComponent(urlPath.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const candidates = [
    path.join(ROOT, p),
    path.join(ROOT, p + ".html"),
    path.join(ROOT, p, "index.html"),
  ];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
};

http
  .createServer((req, res) => {
    const file = resolve(req.url);
    if (!file) {
      const notFound = path.join(ROOT, "404.html");
      if (fs.existsSync(notFound)) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        fs.createReadStream(notFound).pipe(res);
      } else {
        res.writeHead(404);
        res.end("Not found");
      }
      return;
    }
    res.writeHead(200, {
      "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, "0.0.0.0", () => {
    console.log(`Preview (production build) on http://0.0.0.0:${PORT}`);
  });
