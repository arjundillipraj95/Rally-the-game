// The mountain's story, for the results: every phone records, from what it already knows, each side's
// points every 10 s (split by where they came from) and every change of hands at every place. The
// Points tab then draws the scoreline, the timeline (tap it for any moment), your places and your
// captains.
import { G, colorOf } from '../core/state.js';
import { TEAMS, CROWN2 } from '../config.js';
import { c2Breakdown } from '../core/sim.js';
import { claimed, nameOf, glory, allyNames } from './messages.js';

const TL = { seed: null, samples: [], places: new Map(), lastT: -99, final: false };
const sidesNow = () => [...new Set(G.teams.map((t, i) => t && t.active ? G.ALLY[colorOf(i)] : -1).filter(a => a >= 0))];
function reset() { Object.assign(TL, { seed: G.seed, samples: [], places: new Map(), lastT: -99, final: false }); }
function sample() { const s = { T: G.T, by: {} }; for (const a of sidesNow()) s.by[a] = c2Breakdown(a); TL.samples.push(s); TL.lastT = G.T; }
export function tlTick() {
  if (!G.c2 || !G.holds || (G.state !== 'play' && G.state !== 'end')) return;
  if (TL.seed !== G.seed) reset();
  for (const h of G.holds) { // (who held what, and from when)
    let p = TL.places.get(h.id); if (!p) TL.places.set(h.id, p = { h, hist: [] });
    const last = p.hist[p.hist.length - 1];
    if (last ? last.owner !== h.owner : h.owner >= 0) p.hist.push({ T: G.T, owner: h.owner, by: h.by });
    else if (last && last.by == null && h.by != null) last.by = h.by;
  }
  if (G.state === 'play' && G.T - TL.lastT >= 10) sample();
  if (G.state === 'end' && !TL.final) { TL.final = true; sample(); }
}

// ---------- drawing ----------
const SRC = [['places', 'Places', '#d9b45a'], ['chest', 'War chest', '#e0803a'], ['crown', 'Crown', '#9fdcf5'], ['caps', 'Captains', '#e8665a']];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const mmss = t => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
const short = n => String(n).replace(/^Castle /, '').replace(/^the /, '');
const cols = a => TEAMS.map((t, i) => i).filter(i => G.ALLY[i] === a && G.teams.some((s, j) => s && s.active && colorOf(j) === i));
const dots = a => cols(a).map(i => `<i class="pd" style="background:${TEAMS[i].css}"></i>`).join('');
const lineCol = a => TEAMS[cols(a)[0] ?? 0].css;
const parts = b => ({ places: b.castles * CROWN2.points.castle + b.villages * CROWN2.points.village, chest: b.chest, crown: b.crown, caps: b.caps });
const sideOf = ti => G.ALLY[colorOf(ti)];
const capName = ti => ti === G.myTi ? 'You' : nameOf(ti);

// One captain's ledger: every point he won or cost his side, in order. A place is his while he was the last
// to take it: +3 (or +2) when he does, -3 if his side then loses it. His blows on the chest and the glacier,
// the captains he cut down (or his men did). Summed over a side's captains it comes to the side's total.
// Kills against him are listed apart: points he handed the enemy.
export function ledger(ti) {
  const a = sideOf(ti), ev = [], P = CROWN2.points;
  for (const { h, hist } of TL.places.values()) {
    const pts = h.kind === 'castle' ? P.castle : P.village; let taker = null;
    for (const x of hist) {
      if (x.owner === a) { taker = x.by; if (x.by === ti) ev.push({ T: x.T, v: pts, k: 'take', t: `Took ${short(h.name)}` }); }
      else if (taker === ti) { ev.push({ T: x.T, v: -pts, k: 'lose', t: `Lost ${short(h.name)}`, to: x.owner }); taker = null; }
      else taker = null;
    }
  }
  for (const [key, c] of Object.entries(claimed)) { const [sa, vi] = key.split(':').map(Number);
    if (sa === a && c.by === ti) ev.push({ T: c.T ?? 600, v: c.v, k: 'kill', t: c.v >= P.killCaptain ? `Cut down ${nameOf(vi)}` : `Your men cut down ${nameOf(vi)}`.replace('Your', ti === G.myTi ? 'Your' : 'His') });
    if (vi === ti) ev.push({ T: c.T ?? 600, v: c.v, k: 'gave', t: `${nameOf(c.by)} cut you down`.replace('you', ti === G.myTi ? 'you' : 'him'), to: sa }); }
  if (glory.chest && glory.chest.ti === ti) ev.push({ T: glory.chest.T, v: P.chest, k: 'chest', t: 'Broke the war chest' });
  if (glory.crown && glory.crown.ti === ti) ev.push({ T: glory.crown.T, v: P.crown, k: 'crown', t: 'Broke the glacier: the Crown' });
  ev.sort((p, q) => p.T - q.T);
  return { ev, net: ev.filter(e => e.k !== 'gave').reduce((n, e) => n + e.v, 0), gave: ev.filter(e => e.k === 'gave').reduce((n, e) => n + e.v, 0) };
}
function ledgerCard(ti, open) {
  const L = ledger(ti), sgn = v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v);
  const rows = L.ev.map(e => `<div class="lg ${e.k}"><span class="lg-t">${mmss(e.T)}</span><span>${esc(e.t)}${e.to != null && e.to >= 0 ? (e.k === 'lose' ? ' to ' : ' ') + dots(e.to) : ''}</span><b>${e.k === 'gave' ? '+' + e.v + ' to them' : sgn(e.v)}</b></div>`).join('')
    || '<div class="lg none"><span></span><span>No points won or lost</span><b></b></div>';
  return `<details class="lc${ti === G.myTi ? ' me' : ''}"${open ? ' open' : ''}><summary><i style="background:${TEAMS[colorOf(ti)].css}"></i><b>${esc(capName(ti))}</b>
    <span class="lc-n">${L.ev.filter(e => e.k === 'take').length} taken · ${L.ev.filter(e => e.k === 'lose').length} lost · ${L.ev.filter(e => e.k === 'kill').length} captains${L.gave ? ` · gave away ${L.gave}` : ''}</span><em>${sgn(L.net) || '0'}</em></summary>${rows}</details>`;
}

let focus = null; // (a side tapped on the scoreline: the chart and the panel follow it)
export function renderPointsV2(el, w) { tlTick(); focus = null; draw(el, w); }
function draw(el, w) {
  const mine = sideOf(G.myTi), sides = sidesNow(), fin = Object.fromEntries(sides.map(a => [a, c2Breakdown(a)]));
  const order = [...sides].sort((x, y) => fin[y].total - fin[x].total), top = Math.max(1, ...sides.map(a => fin[a].total));
  const name = a => esc(allyNames(a)) + (a === mine ? ' <em class="you">You</em>' : '');
  // 1. the scoreline: tap a side to follow it
  const score = order.map(a => { const p = parts(fin[a]);
    return `<div class="ps-row${a === mine ? ' me' : ''}${a === w ? ' won' : ''}${focus === a ? ' on' : focus != null ? ' off' : ''}" data-a="${a}" role="button" tabindex="0"><span class="ps-nm">${dots(a)}${name(a)}</span>
      <span class="ps-bar">${SRC.map(([k, , c]) => p[k] ? `<i style="width:${p[k] / top * 100}%;background:${c}"></i>` : '').join('')}</span><b>${fin[a].total}</b></div>`; }).join('');
  const legend = `<div class="ps-leg">${SRC.map(([, l, c]) => `<span><i style="background:${c}"></i>${l}</span>`).join('')}</div>`;
  // 2. the timeline: every side's line; a followed side as bands by source, the rest faint behind
  const S = TL.samples.length ? TL.samples : [{ T: G.T, by: fin }], T1 = Math.max(600, S[S.length - 1].T);
  const top0 = Math.max(...S.flatMap(s => Object.values(s.by).map(b => b.total))), step = [2, 5, 10, 20, 25, 50].find(n => top0 / n <= 5) || 100, Y1 = Math.max(step * 2, Math.ceil(top0 / step) * step);
  const W = 600, H = 210, L = 26, R = 30, B = 22, Tp = 14, X = t => L + t / T1 * (W - L - R), Y = v => Tp + (1 - v / Y1) * (H - Tp - B);
  let g = '';
  for (let v = 0; v <= Y1; v += step) g += `<line x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}" class="tl-grid"/><text x="${L - 5}" y="${Y(v) + 3}" class="tl-ax" text-anchor="end">${Math.round(v)}</text>`;
  for (let m = 0; m <= T1 / 60; m += 2) g += `<text x="${X(m * 60)}" y="${H - 6}" class="tl-ax" text-anchor="middle">${m}:00</text>`;
  if (focus != null) { // the followed side: stacked bands (places, chest, Crown, captains)
    const pts = S.filter(s => s.by[focus]); let base = pts.map(() => 0);
    for (const [k, , c] of SRC) { const nxt = pts.map((s, i) => base[i] + parts(s.by[focus])[k]); if (nxt.some((v, i) => v !== base[i])) {
      const up = pts.map((s, i) => `${X(s.T).toFixed(1)},${Y(nxt[i]).toFixed(1)}`), dn = pts.map((s, i) => `${X(s.T).toFixed(1)},${Y(base[i]).toFixed(1)}`).reverse();
      g += `<polygon points="${up.concat(dn).join(' ')}" fill="${c}" opacity=".8"/>`; } base = nxt; } }
  let mk = 0; const mark = (t, label, c) => `<line x1="${X(t)}" x2="${X(t)}" y1="${Tp - 4}" y2="${H - B}" class="tl-mk" style="stroke:${c}"/><text x="${X(t) + 3}" y="${Tp + 4 + (mk++ % 2) * 11}" class="tl-ml" style="fill:${c}">${label}</text>`;
  g += mark(CROWN2.night, 'Night', '#8fa3d8');
  if (glory.chest) g += mark(glory.chest.T, 'Chest', '#e0803a');
  if (glory.crown) g += mark(glory.crown.T, 'Crown', '#9fdcf5');
  for (const a of order.slice().reverse()) { const pts = S.filter(s => s.by[a]).map(s => `${X(s.T).toFixed(1)},${Y(s.by[a].total).toFixed(1)}`).join(' '), f = focus == null ? (a === mine ? 1 : .85) : a === focus ? 1 : .25;
    g += `<polyline points="${pts}" fill="none" stroke="${a === focus ? '#fff' : lineCol(a)}" stroke-width="${a === focus || (focus == null && a === mine) ? 3.2 : 2.2}" stroke-linejoin="round" stroke-linecap="round" opacity="${f}"/>`; }
  { const ends = order.filter(a => S[S.length - 1].by[a]).map(a => ({ a, v: S[S.length - 1].by[a].total, y: Y(S[S.length - 1].by[a].total) + 4 })).sort((p, q) => p.y - q.y);
    for (let i = 1; i < ends.length; i++) ends[i].y = Math.max(ends[i].y, ends[i - 1].y + 12); // (close finishes: the numbers step apart)
    const over = ends.length ? Math.max(0, ends[ends.length - 1].y - (H - B + 4)) : 0;
    for (const e of ends) g += `<text x="${W - R + 4}" y="${e.y - over}" class="tl-end" style="fill:${lineCol(e.a)};opacity:${focus == null || focus === e.a ? 1 : .35}">${e.v}</text>`; }
  g += `<line class="tl-cur" x1="0" x2="0" y1="${Tp}" y2="${H - B}" visibility="hidden"/>`;
  const momentsTxt = [glory.chest ? `War chest to ${glory.chest.a === mine ? 'your side' : esc(allyNames(glory.chest.a))} at ${mmss(glory.chest.T)}` : '', glory.crown ? `Crown to ${glory.crown.a === mine ? 'your side' : esc(allyNames(glory.crown.a))} at ${mmss(glory.crown.T)}` : ''].filter(Boolean).join(' · ');
  // 3. the side panel: your ledger (or the followed side's captains), the side's places, the enemy captains
  const fs = focus ?? mine, caps = G.teams.map((t, i) => i).filter(i => G.teams[i] && G.teams[i].active && sideOf(i) === fs).sort((p, q) => (q === G.myTi) - (p === G.myTi));
  const ledgers = caps.map((i, k) => ledgerCard(i, i === G.myTi || (focus != null && focus !== mine && k === 0))).join('');
  const places = [...TL.places.values()].filter(p => p.hist.some(x => x.owner === fs)).map(p => { const h = p.h, held = h.owner === fs;
    return { held, html: `<div class="pp${held ? ' held' : ' lost'}"><span class="pp-k">${h.keep ? 'Keep' : h.kind === 'castle' ? 'Castle' : 'Village'}</span><b>${esc(short(h.name))}</b><em>${held ? '+' + (h.kind === 'castle' ? CROWN2.points.castle : CROWN2.points.village) : '–'}</em></div>` }; })
    .sort((x, y) => y.held - x.held).map(x => x.html).join('') || '<p class="pv-none">No places held this battle.</p>';
  const foes = G.teams.map((t, i) => i).filter(i => G.teams[i] && G.teams[i].active && sideOf(i) !== fs);
  const capChip = i => { const c = claimed[fs + ':' + i]; return `<div class="cc${c ? ' got' : ''}"><i style="background:${TEAMS[colorOf(i)].css}"></i><b>${esc(capName(i))}</b><span>${c ? `✓ ${esc(capName(c.by))}${c.v >= CROWN2.points.killCaptain ? '' : "'s men"} +${c.v}` : 'not cut down'}</span></div>`; };
  const who = fs === mine ? 'Your side' : esc(allyNames(fs));
  el.innerHTML = `<div class="pv">
    <div class="pv-main">
      <h2 class="ptitle">${w < 0 ? 'A draw on points' : (w === mine ? 'Your side wins on points' : `${esc(allyNames(w))} ${allyNames(w).includes('&') ? 'win' : 'wins'} on points`)}</h2>
      <div class="ps">${score}</div>${legend}
      <h4>${focus != null ? `${dots(focus)}${esc(allyNames(focus))}: where the points came from <small><a class="pv-all" role="button" tabindex="0">show every side</a></small>` : 'How the points went <small>tap a side, or the chart</small>'}</h4>
      <svg class="tl" viewBox="0 0 ${W} ${H}">${g}</svg>
      <div class="tl-at">${momentsTxt || 'Tap the chart to see any moment'}</div>
    </div>
    <div class="pv-side">
      <h4>${fs === mine && caps.length === 1 ? 'Your points' : `${who}'s captains`} <small>every point won or lost</small></h4>${ledgers}
      <h4>${who}'s places <small>count if held at the end</small></h4><div class="pp-list compact">${places}</div>
      <h4>Enemy captains <small>${CROWN2.points.killCaptain} by a captain, ${CROWN2.points.killArmy} by his men · once each</small></h4><div class="cc-grid">${foes.map(capChip).join('')}</div>
    </div></div>`;
  // tap a side (again, or "show every side", to let go)
  const pick = a => { focus = focus === a ? null : a; draw(el, w); };
  el.querySelectorAll('.ps-row').forEach(r => { r.addEventListener('click', () => pick(+r.dataset.a)); r.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(+r.dataset.a); } }); });
  const all = el.querySelector('.pv-all'); if (all) all.addEventListener('click', () => { focus = null; draw(el, w); });
  // tap or drag on the chart: that moment, for every side (or the followed one, by source)
  const svg = el.querySelector('.tl'), cur = el.querySelector('.tl-cur'), at = el.querySelector('.tl-at');
  const show = ev => { const r = svg.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * W, t = Math.max(0, Math.min(T1, (x - L) / (W - L - R) * T1));
    let s = S[0]; for (const q of S) if (Math.abs(q.T - t) < Math.abs(s.T - t)) s = q;
    cur.setAttribute('x1', X(s.T)); cur.setAttribute('x2', X(s.T)); cur.setAttribute('visibility', 'visible');
    at.innerHTML = `<b>${mmss(s.T)}</b> ` + order.filter(a => s.by[a] && (focus == null || a === focus)).map(a => { const p = parts(s.by[a]); return `<span class="tl-s">${dots(a)}<b>${s.by[a].total}</b> <small>${SRC.filter(([k]) => p[k]).map(([k, l]) => `${l.toLowerCase()} ${p[k]}`).join(', ') || 'nothing yet'}</small></span>`; }).join(''); };
  svg.addEventListener('pointerdown', ev => { show(ev); svg.setPointerCapture(ev.pointerId); });
  svg.addEventListener('pointermove', ev => { if (ev.buttons || ev.pointerType === 'mouse') show(ev); });
}
