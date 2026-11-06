// dev: record anim.html frames to a folder: node _anim.mjs URL outdir seconds fps
import { chromium } from 'playwright';
import fs from 'fs';
const [url, out, secs = 1.4, fps = 24] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 960, height: 540 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto(url); await p.waitForFunction(() => window.__done, null, { timeout: 60000 });
const n = Math.round(secs * fps);
for (let i = 0; i < n; i++) { await p.evaluate(t => window.frame(t), i / fps); await p.locator('canvas').screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.png` }); }
console.log('frames', n, 'errors', errs); await b.close();
