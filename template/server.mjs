import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4173);
const publicFiles = new Set(['index.html', 'styles.css', 'app.js', 'data.js', 'model.js', 'favicon.svg']);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    const filename = new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html';
    if (!publicFiles.has(filename)) { res.writeHead(404).end('Not found'); return; }
    const content = await readFile(path.join(root, filename));
    res.writeHead(200, {
      'Content-Type': `${types[path.extname(filename)]}; charset=utf-8`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
    });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(500).end('Unable to serve the template'); }
}).listen(port, '127.0.0.1', () => console.log(`Living Project Atlas template: http://127.0.0.1:${port}`));
