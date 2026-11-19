// MENU2 the Champions screen (replaces LORE1's cards; design doc "Lobby pick" layout and "Where players see it",
// mockup 18 Nov). Left: class tabs. Middle: the launch roster as a picture grid (owned in colour, not owned greyed with
// lock and price, free this week, Coming soon until a champion's page exists, ★ main, B backup). Right: the selected
// champion on the home stage in 3D (the camera brings him into the window; drag to turn), stats with bars from the
// real numbers, his soldiers' shares, lore, skins, Set as main / Set as backup. Opened from the home's Champions
// button or a tap on your champion.
import { CHAMPS, rosterOf, playable, owned, freeWeek, myChamp, myBackup, setMain, setBackup, onMainChange, fromAccount } from '../champions/index.js';
import { bus } from '../core/state.js';
import { online } from '../net/online.js';
import { ROSTER, CHAMP_LIMITS as LIM, CHAMP_BASE as B, ARMY } from '../config.js';
import { portraitImg, splashSrc } from '../ui/portraits.js';
import { setHomeView, previewChamp, homeTurn } from './home.js';

const TABS = [['all', 'All'], ['vanguard', 'Vanguard'], ['striker', 'Striker'], ['raider', 'Raider']];
const CLS = { vanguard: 'Vanguard', striker: 'Striker', raider: 'Raider' };
const ICON = { // (class icons: inline stroke SVG)
  vanguard: '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/>', striker: '<path d="M5 19L19 5M14 5h5v5M5 14l5 5"/>', raider: '<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',
};
const icon = c => `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[c] || ''}</svg>`;
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const silver = n => n.toLocaleString('en-US');
const CS = { tab: 'all', sel: null };
const $ = id => document.getElementById(id);
const nameOf = r => r.name || `${r.culture} ${CLS[r.cls]}`;
// a bar's fill from the real number, between the guardrails' floor and ceiling (10%..100%)
const bar = (v, [lo, hi]) => Math.round(100 * Math.max(.1, Math.min(1, .1 + .9 * (v - lo) / (hi - lo))));

function tile(r) {
  const id = r.id, play = playable(id), own = owned(id), main = myChamp() === id, back = myBackup() === id;
  const state = !play ? 'soon' : own ? 'owned' : 'locked';
  const badge = main ? '<i class="pmain" aria-hidden="true">★</i>' : back ? '<i class="pback" aria-hidden="true">B</i>' : '';
  const corner = !play ? '<span class="psoon">Coming soon</span>' : !own ? `<span class="plock">${lockSvg}${silver(r.price || 0)}</span>` : freeWeek(id) ? '<span class="pfree">Free this week</span>' : '';
  const lbl = `${nameOf(r)}, ${r.culture} ${CLS[r.cls]}${!play ? ', coming soon' : !own ? `, not owned, ${silver(r.price || 0)} Silver` : ''}${main ? ', your main' : back ? ', your backup' : ''}`;
  return `<button type="button" class="ptile ${state}${CS.sel === id ? ' sel' : ''}" data-id="${id}" aria-pressed="${CS.sel === id}" aria-label="${esc(lbl)}">
    <span class="pic">${portraitImg(id)}</span><span class="pcult">${esc(r.culture)}</span>${badge}${corner}<b class="pname">${esc(r.name || '?')}</b></button>`;
}
const lockSvg = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

function statRows(d) {
  const s = d.stats, dps = s.dmg * s.rate, rg = !!d.ranged, horse = (d.mount && d.mount.spd) || B.horse, army = (ARMY[d.cls] || ARMY.vanguard).start;
  const row = (name, shown, pct, kind) => `<div class="csrow"><span>${name}</span><b>${shown}</b><u class="${kind}"><i style="width:${pct}%"></i></u></div>`;
  return row('Health', s.hp, bar(s.hp, LIM.hp), 'tough')
    + row('Attack', `${s.dmg} × ${s.rate}/s`, bar(dps, LIM.dps), 'hit')
    + row('Reach', `${s.reach} m`, rg ? bar(s.reach, LIM.rangedReach) : bar(s.reach, LIM.reach), 'move')
    + row('Speed', `${s.spd} · ${horse} m/s`, bar(s.spd, LIM.spd), 'move')
    + row('Army', `${army} to start`, bar(army, [2, 6]), 'move');
}
// his soldiers take his shares off the base champion (champions/army.js): shown as ▲ / ▼
function soldiers(d) {
  const s = d.stats, pc = v => Math.round((v - 1) * 100), parts = [['health', pc(s.hp / B.hp)], ['damage', pc(s.dmg / B.dmg)], ['rate', pc(s.rate / B.rate)], ['speed', pc(s.spd / B.spd)], [d.ranged ? 'range' : 'reach', pc(d.ranged ? s.reach / B.rangedReach : s.reach / B.reach)]].filter(([, v]) => v);
  return parts.length ? `<p class="cssold">His soldiers: ${parts.map(([k, v]) => `<b class="${v > 0 ? 'up' : 'down'}">${v > 0 ? '▲' : '▼'}${Math.abs(v)}% ${k}</b>`).join(' ')}</p>` : '<p class="cssold">His soldiers: as the base</p>';
}
function panel() {
  const id = CS.sel, r = rosterOf(id), d = CHAMPS[id], play = playable(id);
  const head = `<div class="cstop"><h3>${esc(d ? d.name : nameOf(r))}</h3>${d ? `<span class="csstars" aria-label="Difficulty ${d.difficulty || 1} of 3">${'★'.repeat(d.difficulty || 1)}${'☆'.repeat(3 - (d.difficulty || 1))}</span>` : ''}</div>
    <div class="cstags"><span>${icon(r.cls)}${CLS[r.cls]}</span><span>${esc(r.culture)}</span>${d ? `<span>${d.ranged ? 'Ranged' : 'Melee'}</span>` : ''}</div>`;
  if (!play) return `${head}<p class="csnote">Coming soon.${r.launch === 'buy' ? ` To earn or buy: ${silver(r.price)} Silver.` : ' Free for everyone at launch.'}</p>`;
  const main = myChamp() === id, back = myBackup() === id, own = owned(id);
  const acts = own ? `<button type="button" class="go csmain${main ? ' on' : ''}" data-act="main"${main ? ' aria-pressed="true"' : ''}>${main ? '★ Your main' : '★ Set as main'}</button>
      <button type="button" class="go ghost csback${back ? ' on' : ''}" data-act="backup"${main ? ' disabled' : ''}>${back ? 'Your backup' : 'Set as backup'}</button>`
    : `<button type="button" class="go" disabled>${lockSvg} ${silver(r.price || 0)} Silver · shop soon</button>`;
  return `${head}<div class="csstats">${statRows(d)}</div>${soldiers(d)}<p class="cslore">${esc(d.lore || '')}</p>
    <div class="csskins" role="group" aria-label="Skins"><button type="button" class="skin on" aria-pressed="true" aria-label="Default skin, worn"><span>Default</span></button><span class="skin soon" aria-label="More skins coming with the shop">Soon</span><span class="skin soon" aria-hidden="true">Soon</span></div>
    <div class="csacts">${acts}</div>`;
}
function render() {
  const el = $('champScreen'); if (!el) return;
  const list = ROSTER.filter(r => CS.tab === 'all' || r.cls === CS.tab);
  el.querySelector('.cstabs').innerHTML = TABS.map(([k, n]) => `<button type="button" role="tab" data-tab="${k}" aria-selected="${CS.tab === k}">${k === 'all' ? '' : icon(k)}${n}</button>`).join('');
  el.querySelector('.csgrid').innerHTML = list.map(tile).join('');
  el.querySelector('.csinfo').innerHTML = panel();
  const play = playable(CS.sel), art = el.querySelector('.csart');
  art.hidden = play; if (!play) art.style.backgroundImage = `url(${splashSrc(CS.sel)})`;
  previewChamp(play ? CS.sel : myChamp()); // (his 3D figure in the window; a champion still to come shows his art instead)
}
function build(el) {
  el.innerHTML = `<div class="csmodel" id="csModel" aria-label="Drag to turn"><div class="csart" hidden></div><small>Drag to turn</small></div>
    <header class="cshead"><button type="button" class="csx" data-act="close" aria-label="Back to home"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><h2>Champions</h2><span class="silver"><i aria-hidden="true"></i><b id="csSilver">0</b> Silver</span></header>
    <div class="cstabs" role="tablist" aria-label="Class"></div><div class="csgrid"></div>
    <div class="cslegend"><span><b class="pmainc">★</b> Your main</span><span><b class="pbackc">B</b> Backup</span><span>${lockSvg} Not owned</span><span class="pfree">Free this week</span></div>
    <section class="csinfo" aria-live="polite"></section>`;
  el.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    if (b.dataset.tab) { CS.tab = b.dataset.tab; render(); }
    else if (b.dataset.id) { CS.sel = b.dataset.id; render(); }
    else if (b.dataset.act === 'main') { setMain(CS.sel); render(); }
    else if (b.dataset.act === 'backup') { setBackup(myBackup() === CS.sel ? null : CS.sel); render(); }
    else if (b.dataset.act === 'close') closeChampions();
  });
  const m = el.querySelector('.csmodel'); let px = null; // (drag to turn him)
  m.addEventListener('pointerdown', e => { px = e.clientX; m.setPointerCapture(e.pointerId); });
  m.addEventListener('pointermove', e => { if (px == null) return; homeTurn((e.clientX - px) * .012); px = e.clientX; });
  m.addEventListener('pointerup', () => { px = null; }); m.addEventListener('pointercancel', () => { px = null; });
}
export function showChampions(id) {
  const el = $('champScreen'); if (!el) return;
  if (!el.firstChild) build(el);
  CS.sel = id || CS.sel || myChamp(); if (!rosterOf(CS.sel)) CS.sel = myChamp();
  setHomeView('champs'); render();
}
export function closeChampions() { previewChamp(myChamp()); setHomeView('home'); }
$('champsBtn')?.addEventListener('click', () => showChampions(myChamp()));
// (MENU4) your main and backup live on the account: a sign-in brings them, a change goes up and onto the stage
bus.on('online', ({ k, m }) => { if (k === 'me' && m && m.main) { fromAccount(m.main, m.backup); if ($('champScreen').hidden) previewChamp(myChamp()); } });
onMainChange(() => { online.ch(myChamp(), myBackup()); if ($('champScreen').hidden) previewChamp(myChamp()); });
if (import.meta.env.DEV) window.__cs = { CS, show: showChampions, close: closeChampions };
