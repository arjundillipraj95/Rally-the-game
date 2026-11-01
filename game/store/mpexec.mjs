// Dev check: an execution by a joining player over the network. On the host, an enemy captain is
// beaten down near the joiner's captain with nobody about; the joiner should see him marked, press
// Attack, and the host should play out the execution (both locked, then the kill).
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
await A.evaluate(bTi => {
  const G = window.__fb.G, me = G.myTi, L = G.teams[bTi].leader;
  const foe = [0, 1, 2, 3].find(i => i !== me && i !== bTi && G.teams[i].active && G.ALLY[i] !== G.ALLY[bTi]);
  const E = G.teams[foe].leader; window.__E = E;
  for (const u of G.units) if (u !== L && u !== E && u !== G.player) { u.dead = true; u.x = 300; }
  G.player.x = -80; G.player.z = -80; for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; s.thinkT = 1e9; }
  L.hp = L.max = 2000; E.max = 180; E.hp = 40; E.cd = 99; E.x = L.x + 2.2; E.z = L.z; E.face = -Math.PI / 2;
  setInterval(() => { if (!E.dead && Math.hypot(E.x - L.x, E.z - L.z) > 2.6) { E.x = L.x + 2.2; E.z = L.z; } E.cd = 99; }, 100);
}, bTi);
await B.waitForTimeout(1500);
const seen = await B.evaluate(() => { const G = window.__fb.G, me = G.player, E = G.units.find(u => u.leader && u.execReady); return { marked: !!E, atkGlow: document.getElementById('atk').classList.contains('execReady'), d: E && Math.hypot(E.x - me.x, E.z - me.z).toFixed(2), state: G.state, hudShown: !document.getElementById('hudWrap').hidden, myMounted: me.mounted, fault: document.querySelector('.faultNote') && document.querySelector('.faultNote').textContent }; });
await B.evaluate(() => { window.__fb.attack(); window.__sawA = false; setInterval(() => { if (window.__fb.G.player.execA) window.__sawA = true; }, 50); });
await B.waitForTimeout(3000);
const host = await A.evaluate(() => ({ dead: window.__E.dead }));
console.log('joiner saw mark', JSON.stringify(seen), '| joiner saw own execution pose', await B.evaluate(() => window.__sawA), '| host: victim dead', host.dead);
await ab.close(); await bb.close();
