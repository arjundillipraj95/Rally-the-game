import { chromium } from 'playwright';
const [url, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1600, height: 560 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto(url); await p.waitForFunction(() => window.__done, null, { timeout: 60000 });
await p.screenshot({ path: out }); console.log('errors', errs); await b.close();
