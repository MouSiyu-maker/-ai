import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const preferredPort = Number(process.env.PORT || 3000);
const hasExplicitPort = Boolean(process.env.PORT);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function toFilePath(url) {
  const cleanPath = decodeURIComponent(new URL(url, `http://localhost:${preferredPort}`).pathname);
  const requestedPath = cleanPath === '/' ? '/index.html' : cleanPath;
  const filePath = resolve(root, `.${normalize(requestedPath)}`);
  return filePath.startsWith(resolve(root)) ? filePath : null;
}

function createStaticServer() {
  return createServer(async (request, response) => {
  try {
    const filePath = toFilePath(request.url || '/');
    if (!filePath) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
  });
}

function listen(port, attemptsLeft = 20) {
  const server = createStaticServer();

  server.on('error', error => {
    if (error.code === 'EADDRINUSE' && !hasExplicitPort && attemptsLeft > 0) {
      listen(port + 1, attemptsLeft - 1);
      return;
    }

    console.error(error.message);
    process.exit(1);
  });

  server.listen(port, '127.0.0.1', () => {
    console.log(`文化种草机 v3.0 is running at http://127.0.0.1:${port}`);
  });
}

listen(preferredPort);
