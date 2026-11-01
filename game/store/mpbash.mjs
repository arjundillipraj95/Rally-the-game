// Dev check: a joiner's shield bash over the network (Block tapped, then Attack). Was: a joiner's evade over the network. The joiner sidesteps; their phone moves them, and the
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
await A.evaluate(() => { const E = window.__E; clearInterval(window.__pin); E.stun = 0; E.cd = 99; E.guardT = 9; E.guardCd = 0; window.__pin = setInterval(() => { E.cd = 99; E.guardT = Math.max(E.guardT, 1); }, 50); window.__bashSeen = 0; });
await A.evaluate(() => { window.__bus && 0; });
// Block tapped, then Attack
await B.evaluate(async () => { window.__moveOverride = () => ({ wx: 0, wz: 0, mag: 0, camYaw: 0, block: true }); await new Promise(r => setTimeout(r, 60)); window.__moveOverride = () => ({ wx: 0, wz: 0, mag: 0, camYaw: 0 }); await new Promise(r => setTimeout(r, 60)); window.__fb.attack(); });
await A.waitForTimeout(700);
const host = await A.evaluate(bTi => { const L = window.__fb.G.teams[bTi].leader, E = window.__E; return { swingKind: L.swingKind, bashCd: +((L.bashCd || 0) - window.__fb.G.T).toFixed(2), Estun: +E.stun.toFixed(2), guardT: +(E.guardT || 0).toFixed(2) }; }, bTi);
console.log('host after joiner Block->Attack:', JSON.stringify(host));
await ab.close(); await bb.close();
