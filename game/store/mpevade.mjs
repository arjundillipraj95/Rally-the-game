// Dev check: a joiner's evade over the network. The joiner sidesteps; their phone moves them, and the
// host must mark the evade (the untouchable moment) and then play the follow-up when they attack.
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
await A.evaluate(bTi => { const G = window.__fb.G, L = G.teams[bTi].leader; const foe = [0, 1, 2, 3].find(i => i !== G.myTi && i !== bTi && G.ALLY[i] !== G.ALLY[bTi]); const E = G.teams[foe].leader; window.__E = E;
  for (const u of G.units) if (u !== L && u !== E && u !== G.player) { u.dead = true; u.x = 300; } for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; s.thinkT = 1e9; }
  E.hp = E.max = 1e6; E.stun = 99; E.cd = 99; E.x = L.x + 2.2; E.z = L.z; window.__pin = setInterval(() => { E.stun = 99; E.cd = 99; if (Math.hypot(E.x - L.x, E.z - L.z) > 3) { E.x = L.x + 2.2; E.z = L.z; } }, 50);
  window.__seen = null; window.__watch = setInterval(() => { if (L.evade && !window.__seen) window.__seen = { kind: L.evade.kind, ifr: +L.iframeT.toFixed(2) }; }, 10); }, bTi);
await B.waitForTimeout(800);
await B.evaluate(() => { window.__moveOverride = () => ({ wx: 0, wz: 1, mag: 1, camYaw: 0 }); window.__fb.jump(); window.__moveOverride = () => ({ wx: 0, wz: 0, mag: 0, camYaw: 0 }); });
await B.waitForTimeout(120);
const h0 = await A.evaluate(() => window.__E.hp);
await B.evaluate(() => window.__fb.attack());
await B.waitForTimeout(900);
const host = await A.evaluate(([bTi, h0]) => ({ seen: window.__seen, dmg: Math.round(h0 - window.__E.hp) }), [bTi, h0]);
console.log('host saw the evade:', JSON.stringify(host.seen), '| follow-up damage on host:', host.dmg);
await ab.close(); await bb.close();
