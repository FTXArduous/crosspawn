const { app, BrowserWindow } = require("electron");
const http = require("http");
const fs = require("fs");
const path = require("path");

let server;

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

function safePath(root, urlPath) {
  const decoded = decodeURIComponent((urlPath || "/").split("?")[0]);
  const rel = decoded === "/" ? "/index.html" : decoded;
  const joined = path.join(root, rel);
  const normalized = path.normalize(joined);
  if (!normalized.startsWith(path.normalize(root))) {
    return null;
  }
  return normalized;
}

function createStaticServer(rootPath, port) {
  return new Promise((resolve, reject) => {
    const staticServer = http.createServer((req, res) => {
      const target = safePath(rootPath, req.url);
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
          res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
          res.end(content);
        });
      });
    });

    staticServer.listen(port, "127.0.0.1", () => resolve(staticServer));
    staticServer.on("error", reject);
  });
}

async function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 740,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true
    }
  });

  await window.loadURL("http://127.0.0.1:8790/index.html");
}

app.whenReady().then(async () => {
  try {
    server = await createStaticServer(__dirname, 8790);
    await createWindow();
  } catch (err) {
    console.error("Failed to start desktop app:", err);
    app.quit();
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (server) {
    server.close();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});
