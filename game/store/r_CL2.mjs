// CL2 Focus the map: the Mountain (the Crown) is the only map in the menus; the others stay behind ?maps=all.
// (1) home sheet + lobby: only the Crown's mode button, no map picker; Battle starts the Crown on the Mountain;
// (2) a stale pick of a hidden mode and map (as an old default) falls back to the Crown on the Mountain; Quick too;
// (3) ?maps=all: every mode and map is back and Conquest on the Forum still plays.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const fails = []; const ck = (c, m, d) => { console.log((c ? 'ok   ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d) : '')); if (!c) fails.push(m); };
const menus = p => p.evaluate(() => { const vis = id => [...document.querySelectorAll(`#${id} button`)].filter(b => !b.hidden).map(b => b.dataset.v), grp = id => !document.getElementById(id).closest('.grp').hidden;
  return { mode: vis('segMode'), map: grp('segMap') && vis('segMap'), lobbyMode: vis('lobbyMode'), lobbyMap: grp('lobbyMap') && vis('lobbyMap'), desc: document.getElementById('desc').textContent }; });
const go = async (p, sel) => { await p.evaluate(() => { window.__noRender = true; }); await p.evaluate(s => document.querySelector(s).click(), sel); await frames(p, 2); return p.evaluate(() => ({ mode: window.__fb.G.mode, map: window.__fb.G.map.id, state: window.__fb.G.state })); };
{
  const p = await open(browser, 640, 360, { q: '?crown2=1' }), m = await menus(p);
  ck(m.mode.join() === 'crown' && !m.map, 'home: only the Crown, no map picker', m);
  ck(m.lobbyMode.join() === 'crown' && !m.lobbyMap, 'lobby: only the Crown, no map picker', { lobbyMode: m.lobbyMode, lobbyMap: m.lobbyMap });
  ck(/The Mountain\./.test(m.desc), 'home: the description names the Mountain', m.desc.slice(0, 160));
  const r = await go(p, '#goBtn'); ck(r.mode === 'crown' && r.map === 'mount' && r.state === 'play', 'Battle: the Crown on the Mountain', r);
  await p.close();
}
{
  const p = await open(browser, 640, 360, { q: '?crown2=1' });
  await p.evaluate(() => { window.__fb.G.mode = 'conquest'; window.__fb.G.map = { id: 'forum' }; }); // (a stale hidden pick)
  const r = await go(p, '#goBtn'); ck(r.mode === 'crown' && r.map === 'mount', 'a stale hidden mode/map falls back to the Crown on the Mountain', r);
  await p.close();
  const q = await open(browser, 640, 360, { q: '?crown2=1' }), r2 = await go(q, '#quickBtn');
  ck(r2.mode === 'crown' && r2.map === 'mount', 'Quick: the Crown on the Mountain', r2); await q.close();
}
{
  const p = await open(browser, 640, 360, { q: '?crown2=1&maps=all' }), m = await menus(p);
  ck(m.mode.length === 5 && m.map && m.map.length === 9 && m.lobbyMap && m.lobbyMap.length >= 4, '?maps=all: every mode and map is back', { mode: m.mode.length, map: m.map && m.map.length, lobbyMap: m.lobbyMap && m.lobbyMap.length });
  await p.click('#segMode button[data-v="conquest"]'); await p.click('#segMap button[data-v="forum"]');
  const r = await go(p, '#goBtn'); ck(r.mode === 'conquest' && r.map === 'forum', '?maps=all: Conquest on the Forum still plays', r);
  await p.close();
}
await browser.close();
console.log(fails.length ? `CL2: ${fails.length} FAIL` : 'CL2: all ok');
process.exit(fails.length ? 1 : 0);
