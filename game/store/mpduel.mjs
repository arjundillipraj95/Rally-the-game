// Dev check: a duel over the network. The joiner sees the ⚔ tag over an enemy computer captain, taps it;
// the computer takes it up; both phones see the ring; the joiner is kept inside it; the host settles the end.
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
await A.evaluate(bTi => { const G = window.__fb.G, L = G.teams[bTi].leader; const foe = [0, 1, 2, 3].find(i => i !== G.myTi && i !== bTi && G.ALLY[i] !== G.ALLY[bTi]); const E = G.teams[foe].leader; window.__E = E; window.__L = L;
  for (const u of G.units) if (u !== L && u !== E) { u.dead = true; u.x = 300; } for (const s of G.teams) { s.gold = -1e9; s.recruitT = 1e9; }
  G.player.x = 150; G.player.z = -150;
  L.hp = L.max = 1e5; E.x = L.x + 5; E.z = L.z; E.hp = E.max; E.horseCd = 99; if (E.summon) { E.summon.state = 'leaving'; E.summon = null; }
  window.__pin = setInterval(() => { if (!G.duels.length && Math.hypot(E.x - L.x, E.z - L.z) > 6) { E.x = L.x + 5; E.z = L.z; } const o = G.duels.find(d => d.state === 'offer'); if (o) o.aiYes = true; }, 50); }, bTi);
await B.waitForTimeout(1200);
const tag = await B.evaluate(() => { const el = document.getElementById('duelTag'); return { hidden: el.hidden, txt: el.textContent }; });
await B.evaluate(() => document.getElementById('duelTag').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
await B.waitForFunction(() => (window.__fb.G.duels || []).some(d => d.state === 'on'), null, { timeout: 8000 }).catch(() => {});
const onB = await B.evaluate(() => { const G = window.__fb.G, d = G.duels[0]; return d && { state: d.state, t: d.t, mine: G.player.duelId === d.id }; });
const onA = await A.evaluate(() => { const d = window.__fb.G.duels[0]; return d && { state: d.state, guardsN: window.__fb.G.units.filter(u => u.guardOf).length }; });
// the joiner tries to run out of the ring
await B.evaluate(() => { window.__moveOverride = () => ({ wx: 1, wz: 0, mag: 1, camYaw: 0 }); });
await B.waitForTimeout(2500);
const kept = await B.evaluate(() => { const G = window.__fb.G, d = G.duels[0], p = G.player; window.__moveOverride = null; return d ? +Math.hypot(p.x - d.x, p.z - d.z).toFixed(1) : 'no duel'; });
// the host ends it: the computer captain falls to the joiner
await A.evaluate(() => { window.__E.hp = 1; });
await B.evaluate(async () => { const G = window.__fb.G, p = G.player, E = G.units.find(u => u.duelId && u !== p); for (let i = 0; i < 20 && E && !E.dead; i++) { p.face = Math.atan2(E.x - p.x, E.z - p.z); p.x = E.x - Math.sin(p.face) * 2; p.z = E.z - Math.cos(p.face) * 2; window.__fb.attack(); await new Promise(r => setTimeout(r, 350)); } });
await A.waitForTimeout(800);
const end = await A.evaluate(bTi => { const G = window.__fb.G; return { duels: G.duels.length, end: G.lastDuel && G.lastDuel.end, rally: Math.round(G.teams[bTi].rally) }; }, bTi);
console.log('tag:', JSON.stringify(tag), '| joiner sees:', JSON.stringify(onB), '| host:', JSON.stringify(onA), '| joiner kept in ring at', kept, 'm | end:', JSON.stringify(end));
await ab.close(); await bb.close();
