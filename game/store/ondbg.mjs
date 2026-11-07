import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage(); p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('CON', m.text().slice(0, 200)); });
await p.addInitScript(() => { localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-nick', 'Ravi'); });
await p.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787&crown2=1');
await new Promise(r => setTimeout(r, 8000));
console.log(JSON.stringify(await p.evaluate(() => { const O = window.__on && window.__on.ON; return O ? { up: O.up, me: O.me, keys: Object.keys(O) } : 'no __on'; })));
await b.close();
