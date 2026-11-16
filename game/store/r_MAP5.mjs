// MAP5: the new mountain's bushes. 40 bushes (5 per jungle half), in the jungle, walkable, off the roads.
// An enemy captain standing in a bush is hidden from your side (not drawn: u.fog; not picked as a foe by your men);
// seen again when one of yours steps into the same bush, or for a moment after he strikes. Drawn in one draw.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 30);
const r = await page.evaluate(async () => {
  const { G } = window.__fb, L = G.layout, sim = await import('/src/core/sim.js'), fog = await import('/src/render/fog.js'), nav = await import('/src/core/nav.js'), bush = await import('/src/core/sim/bush.js');
  const out = { n: L.bushes.length, inJungle: L.bushes.every(b => { const d = Math.hypot(b.x, b.z); return b.inner ? d > L.chasm.r + L.chasm.w + 2 && d < Math.hypot(...L.river.pts[0]) - L.river.w : d > L.jungle.r0 && d < L.jungle.r1; }) && L.bushes.filter(b => b.inner).length === 8, walk: L.bushes.every(b => nav.walkable(b.x, b.z)) };
  const me = G.player, myA = G.ALLY[me.ti & 3], foe = G.units.find(u => u.leader && G.ALLY[u.ti & 3] !== myA), b = L.bushes[0];
  const mine = G.units.find(u => !u.leader && !u.dead && u.ti === me.ti);
  const place = (u, x, z) => { u.x = x; u.z = z; u.vx = u.vz = 0; };
  const look = () => { bush.bushTick(); fog.fogTick(1); return { fog: foe.fog, picked: sim.nearestFoe(mine, 30, o => o === foe)[0] === foe }; };
  place(me, b.x + 40, b.z); place(mine, b.x + b.r + 3, b.z); place(foe, b.x, b.z); foe.atkT = -99; foe.swing = 0;
  out.hidden = look();
  place(mine, b.x + 1, b.z + .5); out.sameBush = look();
  place(mine, b.x + b.r + 3, b.z); foe.atkT = G.T; out.struck = look();
  foe.atkT = -99; place(foe, b.x + b.r + 6, b.z + b.r + 6); out.outside = look();
  let draws = 0; window.__fb.scene.traverse(o => { if (o.isInstancedMesh && o.geometry.type === 'IcosahedronGeometry' && o.material.color.getHex() === 0x3f6b2a) draws++; }); out.draws = draws;
  return out; });
ok(r.n === 48, `48 bushes: 40 in the jungle, 8 on the inner ring (${r.n})`);
ok(r.inJungle && r.walk, 'every bush in the jungle or on the inner ring, and walkable');
ok(r.hidden.fog && !r.hidden.picked, 'enemy captain in a bush: hidden from your side (not drawn, not picked by your men)');
ok(!r.sameBush.fog && r.sameBush.picked, 'one of your men in the same bush: he is seen');
ok(!r.struck.fog && r.struck.picked, 'he strikes: seen for a moment');
ok(!r.outside.fog && r.outside.picked, 'out of the bush: seen');
ok(r.draws === 1, `bushes drawn in one draw (${r.draws})`);
for (let k = 0; k < 8; k++) { await page.evaluate(() => window.__fb.step(300)); await frames(page, 2); }
ok(!errs.length, `a minute of battle, no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await page.close();
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
