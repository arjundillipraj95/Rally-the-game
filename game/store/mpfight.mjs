// Dev check: a joining player's fighting moves over the network. An enemy captain (on the host) winds
// up heavy blows at the joiner; the joiner taps Block when the glint shows on their screen. Then the
// joiner holds Attack with a sword at a blocking dummy, and lets go.
import { chromium } from 'playwright';
const opts = { executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] };
const mk = async () => { const b = await chromium.launch(opts), c = await b.newContext({ viewport: { width: 320, height: 160 } });
  await c.addInitScript(() => { window.__PEER_OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } }; window.__testSheet = true; localStorage.setItem('rally-tutorial-done', '1'); localStorage.setItem('rally-quality', 'low'); window.__noRender = true; });
  const p = await c.newPage(); p.on('pageerror', e => console.log('ERR', e.message)); await p.goto('http://127.0.0.1:8766/'); return [p, b]; };
const [A, ab] = await mk(), [B, bb] = await mk();
await A.click('#mpBtn'); await A.click('#hostBtn'); await A.waitForTimeout(2500);
const code = await A.evaluate(() => document.getElementById('codeTxt').textContent);
await B.click('#mpBtn'); await B.fill('#codeIn', code); await B.click('#joinBtn');
await B.waitForFunction(() => !document.getElementById('ovLobby').hidden, null, { timeout: 30000 }); await B.waitForTimeout(1500);
await A.click('#startBtn'); await A.waitForTimeout(3000);
const bTi = await B.evaluate(() => window.__fb.info.myTi);
// on the host: clear the field, put an enemy captain on the joiner
await A.evaluate(bTi => {
  const G = window.__fb.G, me = G.myTi, L = G.teams[bTi].leader;
  const foe = [0, 1, 2, 3].find(i => i !== me && i !== bTi && G.teams[i].active);
  window.__foe = foe; const E = G.teams[foe].leader;
  for (const u of G.units) if (u !== L && u !== E && u !== G.player) { u.dead = true; u.x = 300; }
  G.player.x = -80; G.player.z = -80; for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; }
  L.hp = L.max = 2000; E.hp = E.max = 9999; E.x = L.x; E.z = L.z + 2.5; G.teams[foe].plan = { kind: 'hunt', target: L }; G.teams[foe].thinkT = 99;
  window.__heavies = 0; let w = false; setInterval(() => { const ww = E.windup > 0; if (ww && !w) window.__heavies++; w = ww; if (Math.hypot(E.x - L.x, E.z - L.z) > 12) { E.x = L.x; E.z = L.z + 2.5; } }, 10);
}, bTi);
// on the joiner: tap Block when the enemy's blade glints (seen through the snapshots)
await B.evaluate(() => {
  const G = window.__fb.G; window.__blk = false; window.__taps = 0; let g = false;
  setInterval(() => { const me = G.player; const E = G.units.find(u => u.leader && u !== me && !u.dead && u.glint); const now = !!E; if (now && !g) { window.__blk = true; window.__taps++; setTimeout(() => { window.__blk = false; }, 90); } g = now; }, 10);
  window.__moveOverride = () => ({ wx: 0, wz: 0, mag: 0, camYaw: 0, block: window.__blk, attackHeld: false });
});
await B.waitForTimeout(30000);
console.log('heavies', await A.evaluate(() => window.__heavies), 'joiner taps', await B.evaluate(() => window.__taps), 'parries on host', await A.evaluate(bTi => window.__fb.G.teams[bTi].leader.parries || 0, bTi));
await ab.close(); await bb.close();
