const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = process.env.PORT || 5173;
const DIST_DIR = path.join(__dirname, 'dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');

// MIME types mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Check and auto-build dist if missing
function ensureDistExists() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.log('[AUTO-BUILD] dist/index.html is missing. Building frontend now...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
      console.log('[AUTO-BUILD] Build completed successfully!');
    } catch (e) {
      console.error('[AUTO-BUILD ERROR] Could not build dist:', e.message);
    }
  }
}

ensureDistExists();

const server = http.createServer((req, res) => {
  // Parse clean URL path
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;

  if (pathname === '/') {
    pathname = '/index.html';
  }

  let filePath = path.join(DIST_DIR, pathname);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  // Check if file exists, else fallback to index.html for Single Page App
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = INDEX_HTML;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        console.error(`[SERVER ERROR] Failed reading: ${filePath}`, readErr.message);

        // Emergency fallback if dist was not built
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Badminton Pro - Khởi động</title>
  <style>
    body { background: #080d14; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .card { background: #0f172a; padding: 30px; border-radius: 16px; border: 1px solid #00f0ff; text-align: center; max-width: 500px; }
    h1 { color: #00f0ff; }
    button { background: #00f0ff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🏸 Badminton Pro Trainer</h1>
    <p>Đang đồng bộ dữ liệu hoặc thư mục dist chưa được tạo. Vui lòng làm mới trang sau 10 giây.</p>
    <button onclick="location.reload()">TẢI LẠI TRANG</button>
  </div>
</body>
</html>`);
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🏸 Badminton Pro Web Server running on port ${PORT}`);
  console.log(`🌐 Serving dist directory at http://0.0.0.0:${PORT}`);
});
