import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'site');
const port = Number(process.env.PORT ?? 8765);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.rsc': 'text/x-component',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};
http
  .createServer((req, res) => {
    try {
      let pathname = decodeURIComponent(
        new URL(req.url, 'http://localhost').pathname,
      );
      const base = process.env.BASE_PATH ?? '';
      if (base && (pathname === base || pathname.startsWith(base + '/')))
        pathname = pathname.slice(base.length) || '/';
      if (pathname === '/__pl300_offline_health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ app: 'PL300 Offline', version: '2.7.0' }));
        return;
      }
      let target = path.resolve(root, '.' + pathname);
      if (target !== root && !target.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      if (fs.existsSync(target) && fs.statSync(target).isDirectory())
        target = path.join(target, 'index.html');
      if (!fs.existsSync(target)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, {
        'Content-Type':
          types[path.extname(target)] ?? 'application/octet-stream',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      });
      if (req.method === 'HEAD') res.end();
      else fs.createReadStream(target).pipe(res);
    } catch {
      res.writeHead(400);
      res.end('Bad request');
    }
  })
  .listen(port, '127.0.0.1', () =>
    console.log(`PL-300 Offline: http://127.0.0.1:${port}/`),
  );
