// dev: screenshot a page at a given size (default 1536x1024) at 2x, once window.__done is set
import { chromium } from 'playwright';
const [url, out, w = 1536, h = 1024] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto(url); await p.waitForFunction(() => window.__done, null, { timeout: 60000 }).catch(() => console.log('timeout', errs));
await p.screenshot({ path: out }); console.log('errors', errs); await b.close();
