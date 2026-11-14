// F2 One lobby: the matchmade lobby as a pop-up over the warm-up (four armies' seats, your lane, Done =
// ready, tap a computer's seat to move there), a small bar while you warm up (Lobby reopens the pop-up),
// and the 10 s versus screen before the battle loads. The service keeps the seats (online/src/index.js).
import { TEAMS } from '../config.js';
import { ON, online } from '../net/online.js';
import { G } from '../core/state.js';

const $ = id => document.getElementById(id);
export const LANE_NAME = { L: 'Left', J: 'Jungle', R: 'Right' };
const FMT = ['Solo', 'Duo', 'Trio'];
const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ML = { room: null, open: false, ask: null, L: null };
const mine = L => { const me = ON.me && ON.me.id; for (const [c, sd] of L.sides.entries()) { const k = sd.findIndex(x => x && x.id === me); if (k >= 0) return { c, k, x: sd[k] }; } return null; };

function el(id, cls, html) {
  let e = $(id); if (!e) { e = document.createElement('div'); e.id = id; e.className = cls; document.body.appendChild(e); }
  if (html != null) e.innerHTML = html; return e;
}
function bind() {
  const pop = el('mlPop', 'mlpop');
  if (pop.dataset.bound) return; pop.dataset.bound = '1'; pop.hidden = true;
  pop.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || !ML.L) return;
    const me = mine(ML.L);
    if (b.dataset.lane) { online.lane(b.dataset.lane); if (me) me.x.lane = b.dataset.lane; render(); }
    else if (b.dataset.done != null) { online.ready(true); ML.open = false; render(); }
    else if (b.dataset.seat) {
      const [c, k] = b.dataset.seat.split(',').map(Number);
      const party = ON.party && ON.party.members && ON.party.members.length > 1;
      if (me && c !== me.c && party) { ML.ask = { c, k }; render(); } // (a party member moving to another army: ask first)
      else online.seat(c, k, false);
    }
    else if (b.dataset.yes != null) { const a = ML.ask; ML.ask = null; if (a) online.seat(a.c, a.k, true); render(); }
    else if (b.dataset.no != null) { ML.ask = null; render(); }
    else if (b.dataset.cancel != null) online.cancel();
  });
}
// the lobby message from the service (v: 2). Opens the pop-up for a new lobby until you tap Done.
export function mlRender(L) {
  bind(); ML.L = L;
  if (L.room !== ML.room) { ML.room = L.room; const me = mine(L); ML.open = !(me && me.x.ready); ML.ask = null; }
  L.at = performance.now(); render();
}
export function mlOpen() { if (!ML.L) return; ML.open = true; render(); }
export function mlHide() { ML.html = null; ML.L = null; ML.room = null; ML.open = false; ML.ask = null; const p = $('mlPop'); if (p) p.hidden = true; }
export function mlClock() { const L = ML.L; return L ? Math.max(0, L.endsIn - (performance.now() - L.at)) : 0; }
export const mlState = () => ML;

function render() {
  const L = ML.L, pop = $('mlPop'); if (!L || !pop) return;
  pop.hidden = !ML.open;
  const me = mine(L), cap = L.sides[0].length, filled = L.sides.flat().filter(Boolean).length;
  if (!ML.open) return;
  const lane = me && me.x.lane;
  const seat = (x, c, k) => {
    if (!x) return `<button type="button" class="mlseat cpu" data-seat="${c},${k}"><b>Computer</b><small>Tap to sit here</small></button>`;
    const you = me && x.id === me.x.id;
    return `<div class="mlseat${you ? ' me' : ''}"><b>${esc(x.nick)}${you ? ' <em>you</em>' : ''}</b><small>${x.lane ? LANE_NAME[x.lane] : c === (me && me.c) ? 'No lane yet' : ''}${x.ready ? ' <i>✓ Ready</i>' : ''}</small></div>`;
  };
  const html = `<div class="mlbox">
    <div class="mlhead"><b>${FMT[L.fmt]} · ${filled}/${cap * 4} players</b><span id="mlClock">${ML.clockTxt || ''}</span></div>
    <div class="mlsides">${L.sides.map((sd, c) => `<div class="mlside${me && me.c === c ? ' mine' : ''}" style="--c:${TEAMS[c].css}"><h4>Army ${'ABCD'[c]}${me && me.c === c ? ' · yours' : ''}</h4>${sd.map((x, k) => seat(x, c, k)).join('')}</div>`).join('')}</div>
    <div class="mlpick"><span>Your lane</span>${['L', 'J', 'R'].map(l => `<button type="button" class="mllane${lane === l ? ' on' : ''}" data-lane="${l}" aria-pressed="${lane === l}">${LANE_NAME[l]}</button>`).join('')}
      <button type="button" class="go mldone" data-done ${lane ? '' : 'disabled'}>Done</button>
      <button type="button" class="go ghost mlcancel" data-cancel>Leave</button></div>
    <small class="mlnote">${lane ? 'Left and Right are your two castles as your screen shows them; Jungle is the village behind. Only your army sees your lane.' : 'Pick a lane, then Done. You can warm up and come back here to change it.'}</small>
    ${ML.ask ? `<div class="mlask"><p>Are you sure you want to leave the party?</p><button type="button" class="go" data-yes>Yes, move</button><button type="button" class="go ghost" data-no>No</button></div>` : ''}
  </div>`;
  if (html !== ML.html) { ML.html = html; pop.innerHTML = html; } // (only when something changed: a rebuild under a finger loses the tap)
}
setInterval(() => { const c = $('mlClock'); if (ML.L) { const s = Math.ceil(mlClock() / 1000); ML.clockTxt = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; if (c && c.textContent !== ML.clockTxt) c.textContent = ML.clockTxt; } }, 250);

// ---------- the versus screen: every army, its captains and their lanes, for 10 s ----------
let vsTimer = 0;
export function showVersus(m) {
  const v = el('vsScreen', 'vsscreen'), cap = [1, 2, 3][m.fmt | 0], me = ON.me && ON.me.id;
  const at = {}; for (const [id, ti] of Object.entries(m.seats || {})) at[ti] = id;
  v.innerHTML = `<div class="vscols">${TEAMS.map((t, c) => `<div class="vscol" style="--c:${t.css}"><h3>Army ${'ABCD'[c]}</h3>${Array.from({ length: cap }, (_, k) => {
    const id = at[c + 4 * k], ln = id && m.lanes && m.lanes[id];
    return `<p class="${id === me ? 'me' : id ? '' : 'cpu'}"><b>${id ? esc((m.nicks || {})[id] || 'Captain') : 'Computer'}</b><small>${ln ? LANE_NAME[ln] : ''}</small></p>`;
  }).join('')}</div>`).join('<i class="vsx">vs</i>')}</div><div class="vsfoot" id="vsFoot"></div>`;
  v.hidden = false; v.classList.remove('out'); v.dataset.shown = performance.now();
  const until = performance.now() + (m.vs || 10e3);
  clearInterval(vsTimer);
  vsTimer = setInterval(() => {
    const left = until - performance.now(), f = $('vsFoot');
    if (left > 0) { if (f) f.textContent = `The battle starts in ${Math.ceil(left / 1000)}`; return; }
    if (G.state === 'play') { clearInterval(vsTimer); v.classList.add('out'); setTimeout(() => { v.hidden = true; }, 400); return; }
    if (f) f.textContent = 'Linking up with everyone…';
    if (left < -40e3) { clearInterval(vsTimer); v.hidden = true; } // (it never happened: back to wherever the game is; a failed link-up hides it at once, see startMatchmade)
  }, 200);
  return until;
}
// the battle is built: fade the versus screen out (called as the battle's view is made, on every phone)
export function endVersus() { const v = $('vsScreen'); if (!v || v.hidden) return; clearInterval(vsTimer); v.classList.add('out'); setTimeout(() => { v.hidden = true; }, 400); }
export function hideVersus() { clearInterval(vsTimer); const v = $('vsScreen'); if (v) v.hidden = true; }
