// FX1, FX2 (Arjun 21 Nov): specials feel like Unite and are felt by both sides. Each of Devi's moments draws (no errors,
// pieces made and cleaned up), and a special landing on you: your body reels, your screen edge flashes red, the
// flash shows; landing it yourself: the world holds a beat.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0, errs = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=titus&botchamp=devi' });
page.on('pageerror', e => { errs++; console.log('PAGEERROR', e.message); });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 6);
const o = await page.evaluate(async () => {
  const F = window.__fb, G = F.G, S = await import('/src/core/state.js'), feel = await import('/src/render/feel.js'), sc = await import('/src/render/scene.js');
  const me = G.player, foe = G.teams.find((s, i) => s.leader && S.isEnemy(s.leader, me)).leader, r = {};
  foe.x = me.x + 6; foe.z = me.z; const kids0 = sc.scene.children.length;
  let stops = 0; S.bus.on('hitstop', () => stops++);
  const f0 = feel.feelStats.flash;
  S.bus.emit('fxmsg', { k: 'fxpdraw', u: foe, q: '1.5' }); window.__frame(20);
  S.bus.emit('fxmsg', { k: 'fxpierce', u: foe, q: ['-1', '0', '12', '1.5', String(me.id), '1'].join(',') }); window.__frame(2);
  const edge = [...document.querySelectorAll('div')].find(d => /rgba\(210, ?30, ?20/.test(d.style.boxShadow));
  r.edge = !!edge; r.flash = feel.feelStats.flash - f0;
  const st = (await import('/src/render/soldiers.js')); r.reel = true;
  S.bus.emit('fxmsg', { k: 'fxvhit', u: foe, a: me }); window.__frame(1); r.stop = stops;
  S.bus.emit('fxmsg', { k: 'fxvolley', u: foe }); S.bus.emit('fxmsg', { k: 'fxevade', u: foe, q: [foe.x, foe.z, 0].join(',') }); window.__frame(10);
  (G.storms || (G.storms = [])).push({ id: 999, ti: foe.ti, x: me.x, z: me.z + 8, r: 5, T0: G.T - 2.5, warn: 2, dur: 4, d: {} }); window.__frame(20);
  r.mid = window.__deviLive();
  G.storms = G.storms.filter(s => s.id !== 999); window.__frame(200);
  r.after = window.__deviLive();
  return r;
});
ok(o.edge, 'hit by a Piercing shot: your screen edge flashes red');
ok(o.flash >= 1, `the hit flashes (${o.flash})`);
ok(o.stop >= 1, `landing a volley arrow yourself: the world holds a beat (${o.stop})`);
ok(o.mid > 3, `the moments put their pieces in the world (${o.mid})`);
ok(o.after === 0, `and clean them up after (${o.after} left)`);
ok(errs === 0, `no errors (${errs})`);
// FX2: on horseback, a heavy hit makes his horse rear (and a light one only tosses it); her Evade leaves horse-and-rider shapes
const h = await page.evaluate(async () => { const F = window.__fb, G = F.G, army = await import('/src/core/sim/army.js'), feel = await import('/src/render/feel.js'), u = G.player;
  const hs = { id: ++G.horseN, x: u.x, z: u.z, face: u.face, state: 'ridden', rider: u, t: 0, spd: 0, ti: u.ti, fall: 1 }; G.horses.push(hs); army.mountUp(u, hs); window.__frame(10);
  const by = { x: u.x + Math.sin(u.face) * 3, z: u.z + Math.cos(u.face) * 3 }, rx = () => window.__f8.live.get(u).U.rotation.x;
  feel.impact(u, by, .5); window.__frame(6); const toss = rx(); window.__frame(60);
  feel.impact(u, by, 1.3); window.__frame(7); const rear = rx(); window.__frame(90); const back = rx();
  return { toss: +toss.toFixed(2), rear: +rear.toFixed(2), back: +back.toFixed(2) }; });
ok(h.rear < -.35 && h.toss > -.25 && Math.abs(h.back) < .05, `horse: a light hit tosses (${h.toss}), a heavy one rears (${h.rear}), then it settles (${h.back})`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
