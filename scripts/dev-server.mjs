import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = new Map([
  ['/index.html', 'text/html; charset=utf-8'],
  ['/src/content.js', 'text/javascript; charset=utf-8'],
  ['/src/content-en.js', 'text/javascript; charset=utf-8'],
  ['/src/content-official.js', 'text/javascript; charset=utf-8'],
  ['/src/content-sloop.js', 'text/javascript; charset=utf-8'],
  ['/src/firmwares.js', 'text/javascript; charset=utf-8'],
  ['/src/locales.js', 'text/javascript; charset=utf-8'],
  ['/src/core.js', 'text/javascript; charset=utf-8'],
  ['/src/app.js', 'text/javascript; charset=utf-8'],
  ['/src/styles.css', 'text/css; charset=utf-8'],
]);

export async function serveResource(request, root = projectRoot) {
  if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url).pathname); }
  catch { return new Response('Invalid URL', { status: 400 }); }
  if (pathname === '/') pathname = '/index.html';
  if (!assets.has(pathname)) return new Response(request.method === 'HEAD' ? null : 'Not found', { status: 404 });
  try {
    const body = await readFile(path.join(root, pathname));
    return new Response(request.method === 'HEAD' ? null : body, {
      headers: { 'Content-Type': assets.get(pathname), 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' },
    });
  } catch (error) {
    if (error.code === 'ENOENT') return new Response(request.method === 'HEAD' ? null : 'Not found', { status: 404 });
    throw error;
  }
}

function argument(name, fallback) {
  const index = process.argv.indexOf(name);
  return index < 0 ? fallback : process.argv[index + 1];
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const host = argument('--host', '127.0.0.1');
  const port = Number(argument('--port', '4173'));
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid --port');
  const root = process.argv.includes('--dist') ? path.join(projectRoot, 'dist', 'client') : projectRoot;
  const server = createServer(async (request, response) => {
    try {
      const result = await serveResource(new Request(new URL(request.url, 'http://local.preview'), { method: request.method }), root);
      response.writeHead(result.status, Object.fromEntries(result.headers));
      response.end(Buffer.from(await result.arrayBuffer()));
    } catch {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Unable to serve preview');
    }
  });
  server.on('error', (error) => { console.error(`Preview unavailable: ${error.code} (${error.message})`); process.exitCode = 1; });
  server.listen(port, host, () => console.log(`Felucca manual: http://${host}:${port}`));
}
