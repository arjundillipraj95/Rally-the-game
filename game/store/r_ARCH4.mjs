// ARCH4: her archers under a raining Arrow storm kneel low (crouchIdle on the legs, bowOverdraw above) while they
// stand; walking they keep walking; once the storm is over they stand again. (Close shots: store/look.mjs.)
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const p = await open(b, 900, 700, { q: '?crown2=1&champ=devi' });
await p.click('#segMode button[data-v="crown"]'); await p.click('#goBtn'); await frames(p, 20);
await p.evaluate(() => { const G = window.__fb.G; G.T = 30; window.__fb.step(30); const u = G.units.find(o => o.ti === G.myTi && o.kind === 'arch' && !o.dead); window.__u = u;
  G.storms = [{ id: 99, ti: u.ti, x: u.x + 15, z: u.z, r: 5, T0: G.T - 2.5, warn: 2, dur: 1e4, d: { every: 1e4, reach: 0 }, next: 1e9 }]; });
const read = () => p.evaluate(() => { const u = window.__u, h = window.__live.get(u), R = h && h.R; u.vx = u.vz = 0; return { sky: !!(h && h.sky), lo: R ? R.lo.list[0].name : '', up: R ? R.up.list[0].name : '' }; });
await frames(p, 60); const s = await read();
ok(s.sky && s.lo === 'crouchIdle' && s.up === 'bowOverdraw', `under the storm, standing: legs ${s.lo}, arms ${s.up}`);
await p.evaluate(() => { window.__fb.G.storms = []; }); await frames(p, 60); const e = await read();
ok(!e.sky && e.lo !== 'crouchIdle', `storm over: up again (legs ${e.lo})`);
await b.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
