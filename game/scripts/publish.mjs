// Copies the built game to the repository root, where GitHub Pages serves it.
import { cpSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, '../dist'), root = resolve(here, '../..');
for (const p of ['assets']) if (existsSync(resolve(root, p))) rmSync(resolve(root, p), { recursive: true });
cpSync(dist, root, { recursive: true });
console.log('Published build to', root);
