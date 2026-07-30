const fs = require("fs");
const path = require("path");
const http = require("http");

const root = __dirname;
const port = Number(process.argv[2]) || 8787;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const rel = decoded === "/" ? "/index.html" : decoded;
  const joined = path.join(root, rel);
  const normalized = path.normalize(joined);
  if (!normalized.startsWith(path.normalize(root))) {
    return null;
  }
  return normalized;
}

const server = http.createServer((req, res) => {
  const target = safePath(req.url || "/");
  if (!target) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(target, (err, stat) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const filePath = stat.isDirectory() ? path.join(target, "index.html") : target;
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Server error");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const headers = {
        "Content-Type": mime[ext] || "application/octet-stream",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Expires: "0"
      };
      res.writeHead(200, headers);
      res.end(content);
    });
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`CrossPawn website running at http://127.0.0.1:${port}`);
});
