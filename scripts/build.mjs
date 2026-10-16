import { cpSync, mkdirSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.join(root, 'dist', 'client');
rmSync(path.join(root, 'dist'), { recursive: true, force: true });
mkdirSync(destination, { recursive: true });
for (const file of ['index.html', 'src/content.js', 'src/content-en.js', 'src/content-official.js', 'src/content-sloop.js', 'src/firmwares.js', 'src/locales.js', 'src/core.js', 'src/app.js', 'src/styles.css']) {
  mkdirSync(path.dirname(path.join(destination, file)), { recursive: true });
  cpSync(path.join(root, file), path.join(destination, file));
}
console.log(`Built offline manual: dist/client (${statSync(path.join(destination, 'src/content.js')).size} bytes of course content).`);
