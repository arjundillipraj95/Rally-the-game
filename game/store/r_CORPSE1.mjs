// CORPSE1 the fallen never turn back into the old figure: a soldier who fell out of sight (drawn as the light far
// figure) is drawn in the new body once you come near, lying where he fell (not falling again), and the new body
// stays through the sinking at the end (it used to hand the last moments, deadT > 14 s, to the old figure).
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn');
for (let i = 0; i < 12; i++) { await frames(page, 4); await page.waitForTimeout(150); }
// a soldier far from you falls there
const far = await page.evaluate(async () => { const { die } = await import('/src/core/sim/score.js'); const G = window.__fb.G, me = G.player;
  const u = G.units.filter(x => (x.kind === 'foot' || x.kind === 'arch') && !x.dead && x.ti !== me.ti && !(x.shieldT > G.T)).sort((a, b) => Math.hypot(b.x - me.x, b.z - me.z) - Math.hypot(a.x - me.x, a.z - me.z))[0];
  window.__c = u; u.hp = 0; die(u, null, 0); return u && Math.round(Math.hypot(u.x - me.x, u.z - me.z)); });
ok(far > 40, `a soldier ${far} m away`);
for (let i = 0; i < 20; i++) await frames(page, 4);
const st1 = await page.evaluate(() => { const u = window.__c; return { dead: !!u.dead, deadT: +(u.deadT || 0).toFixed(1), full: !!window.__f8.live.get(u) }; });
ok(st1.dead && st1.deadT > 1.5 && !st1.full, `he fell out of sight as the light figure (${JSON.stringify(st1)})`);
// you come near: the body is brought to you (same as walking up to it)
const place = `(() => { const G = window.__fb.G, me = G.player, u = window.__c; u.x = me.x + 2.5; u.z = me.z + 1.5; })()`;
for (let i = 0; i < 6; i++) { await page.evaluate(place); await frames(page, 2); }
const st2 = await page.evaluate(() => { const u = window.__c, h = window.__f8.live.get(u); if (!h) return { full: false };
  const acts = h.R.mixer ? h.R.mixer._actions.filter(a => a.isRunning() || a.paused || a.enabled).map(a => [a.getClip().name, +(a.time / a.getClip().duration).toFixed(2)]) : [];
  return { full: true, clip: !!h.R.clip, acts: acts.filter(([n]) => /death/.test(n)).map(a => a.join('@')).join(' '), at: Math.min(...acts.filter(([n]) => /death/.test(n)).map(a => a[1])) }; });
ok(st2.full, 'near you he is drawn in the new body');
ok(!st2.clip || st2.at > .95, `already lying, not falling again (${st2.acts || 'code pose'})`);
// the sinking at the end stays in the new body
await page.evaluate(`(() => { window.__c.deadT = 12; })()`);
for (let i = 0; i < 3; i++) { await page.evaluate(place); await frames(page, 2); }
const st3 = await page.evaluate(() => { const u = window.__c, h = window.__f8.live.get(u); return { inList: window.__fb.G.units.includes(u), drawn: !!(h && h.R.root.visible && h.seen) }; });
ok(st3.inList && st3.drawn, `sinking (dead 12 s): still the new body (${JSON.stringify(st3)})`);
await page.screenshot({ path: '/tmp/menu/r_CORPSE1.png' });
await page.close(); await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
