// Dev check: a joining player's ride-by over the network. The joiner calls their horse, gallops at a
// standing enemy (placed by the host), holds Attack and lets go at the strike distance.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const mk = async () => { const b = await chromium.launch(opts), c = await b.newContext({ viewport: { width: 320, height: 160 } });
  await c.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
  const p = await c.newPage(); p.on('pageerror', e => console.log('ERR', e.message)); await p.goto('http://127.0.0.1:8766/'); return [p, b]; };
const [A, ab] = await mk(), [B, bb] = await mk();
await A.click('#mpBtn'); await A.click('#hostBtn'); await A.waitForTimeout(2500);
const code = await A.evaluate(() => document.getElementById('codeTxt').textContent);
await B.click('#mpBtn'); await B.fill('#codeIn', code); await B.click('#joinBtn');
await B.waitForFunction(() => !document.getElementById('ovLobby').hidden, null, { timeout: 30000 }); await B.waitForTimeout(1500);
await A.click('#startBtn'); await A.waitForTimeout(3000);
const bTi = await B.evaluate(() => window.__fb.info.myTi);
await A.evaluate(bTi => { const G = window.__fb.G; for (const u of G.units) if (!u.leader) { u.dead = true; u.x = 300; } for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; } }, bTi);
await B.evaluate(() => window.__fb.ride()); await B.waitForTimeout(5000);
console.log('joiner mounted:', await B.evaluate(() => window.__fb.G.player.mounted));
// host: an enemy dummy 20 m ahead of the joiner, held in place
await A.evaluate(bTi => {
  const G = window.__fb.G, L = G.teams[bTi].leader, me = G.myTi;
  const foe = [0, 1, 2, 3].find(i => i !== me && i !== bTi && G.teams[i].active), E = G.teams[foe].leader; window.__E = E;
  E.human = true; E.hp = E.max = 9999; const f = L.face; window.__EP = [L.x + Math.sin(f) * 20, L.z + Math.cos(f) * 20];
  setInterval(() => { E.x = window.__EP[0]; E.z = window.__EP[1]; E.vx = E.vz = 0; }, 5);
}, bTi);
await B.waitForTimeout(400);
const res = await B.evaluate(() => new Promise(done => {
  const G = window.__fb.G, p = G.player; const E = G.units.filter(u => u.leader && u !== p && !u.dead).sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z))[0];
  const dir = Math.atan2(E.x - p.x, E.z - p.z); let held = false, released = false;
  window.__moveOverride = () => {
    const d = Math.hypot(E.x - p.x, E.z - p.z), at = 2.6 + E.r * .5;
    if (!released && d < 18) held = true;
    if (held && !released && d - at <= 0) { held = false; released = true; setTimeout(() => done('released at ' + d.toFixed(1)), 1500); }
    return { wx: Math.sin(dir), wz: Math.cos(dir), mag: released ? .2 : 1, camYaw: 0, attackHeld: held };
  };
  setTimeout(() => done('timeout'), 9000);
}));
console.log(res, '| enemy hp lost on host:', await A.evaluate(() => Math.round(9999 - window.__E.hp)));
await ab.close(); await bb.close();
