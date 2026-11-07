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
const sgn = v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v);
const ord = n => n + (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th');
const counts = L => `${L.ev.filter(e => e.k === 'take').length} taken · ${L.ev.filter(e => e.k === 'lose').length} lost · ${L.ev.filter(e => e.k === 'kill').length} captains`;

// Three levels, each a tap deeper: the game (every side), a team (its points by source, its captains, its
// places), a captain (his running total, a dot per point won or lost, his ledger). A breadcrumb steps back.
let focus = null, cap = null, pick = null; // (the side followed, the captain followed, the ledger line tapped)
export function renderPointsV2(el, w) { tlTick(); focus = cap = pick = null; draw(el, w); }
function draw(el, w) {
  const mine = sideOf(G.myTi), sides = sidesNow(), fin = Object.fromEntries(sides.map(a => [a, c2Breakdown(a)]));
  const order = [...sides].sort((x, y) => fin[y].total - fin[x].total), top = Math.max(1, ...sides.map(a => fin[a].total));
  const capsOf = a => G.teams.map((t, i) => i).filter(i => G.teams[i] && G.teams[i].active && sideOf(i) === a);
  const nets = new Map(G.teams.map((t, i) => i).filter(i => G.teams[i] && G.teams[i].active).map(i => [i, ledger(i)]));
  const name = a => esc(allyNames(a)) + (a === mine ? ' <em class="you">You</em>' : '');
  const lvl = cap != null ? 3 : focus != null ? 2 : 1;
  // the scoreline (tap a side to follow it; tap it again to let go)
  const score = order.map(a => { const p = parts(fin[a]);
    return `<div class="ps-row${a === mine ? ' me' : ''}${a === w ? ' won' : ''}${focus === a ? ' on' : focus != null ? ' off' : ''}" data-a="${a}" role="button" tabindex="0"><span class="ps-nm">${dots(a)}${name(a)}</span>
      <span class="ps-bar">${SRC.map(([k, , c]) => p[k] ? `<i style="width:${p[k] / top * 100}%;background:${c}"></i>` : '').join('')}</span><b>${fin[a].total}</b></div>`; }).join('');
  const legend = `<div class="ps-leg">${SRC.map(([, l, c]) => `<span><i style="background:${c}"></i>${l}</span>`).join('')}</div>`;
  const crumb = `<div class="pv-crumb"><a data-go="1" class="${lvl === 1 ? 'cur' : ''}">All sides</a>${focus != null ? `<i>›</i><a data-go="2" class="${lvl === 2 ? 'cur' : ''}">${esc(allyNames(focus))}</a>` : ''}${cap != null ? `<i>›</i><a class="cur">${esc(capName(cap))}</a>` : ''}</div>`;
  // the chart
  const S = TL.samples.length ? TL.samples : [{ T: G.T, by: fin }], T1 = Math.max(600, S[S.length - 1].T);
  const capL = cap != null ? nets.get(cap) : null, capTop = capL ? Math.max(0, ...capL.ev.filter(e => e.k !== 'gave').reduce((acc, e) => (acc.push((acc[acc.length - 1] || 0) + e.v), acc), [])) : 0;
  const top0 = Math.max(capTop, ...S.flatMap(s => Object.values(s.by).map(b => b.total))), step = [2, 5, 10, 20, 25, 50].find(n => top0 / n <= 5) || 100, Y1 = Math.max(step * 2, Math.ceil(top0 / step) * step);
  const W = 600, H = 210, L = 26, R = 30, B = 22, Tp = 14, X = t => L + t / T1 * (W - L - R), Y = v => Tp + (1 - Math.max(0, v) / Y1) * (H - Tp - B);
  let g = '';
  for (let v = 0; v <= Y1; v += step) g += `<line x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}" class="tl-grid"/><text x="${L - 5}" y="${Y(v) + 3}" class="tl-ax" text-anchor="end">${Math.round(v)}</text>`;
  for (let m = 0; m <= T1 / 60; m += 2) g += `<text x="${X(m * 60)}" y="${H - 6}" class="tl-ax" text-anchor="middle">${m}:00</text>`;
  if (focus != null) { const pts = S.filter(s => s.by[focus]); let base = pts.map(() => 0);
    for (const [k, , c] of SRC) { const nxt = pts.map((s, i) => base[i] + parts(s.by[focus])[k]); if (nxt.some((v, i) => v !== base[i])) {
      g += `<polygon points="${pts.map((s, i) => `${X(s.T).toFixed(1)},${Y(nxt[i]).toFixed(1)}`).concat(pts.map((s, i) => `${X(s.T).toFixed(1)},${Y(base[i]).toFixed(1)}`).reverse()).join(' ')}" fill="${c}" opacity="${lvl === 3 ? .3 : .8}"/>`; } base = nxt; } }
  let mk = 0; const mark = (t, label, c) => `<line x1="${X(t)}" x2="${X(t)}" y1="${Tp - 4}" y2="${H - B}" class="tl-mk" style="stroke:${c}"/><text x="${X(t) + 3}" y="${Tp + 4 + (mk++ % 2) * 11}" class="tl-ml" style="fill:${c}">${label}</text>`;
  g += mark(CROWN2.night, 'Night', '#8fa3d8');
  if (glory.chest) g += mark(glory.chest.T, 'Chest', '#e0803a');
  if (glory.crown) g += mark(glory.crown.T, 'Crown', '#9fdcf5');
  for (const a of order.slice().reverse()) { const pts = S.filter(s => s.by[a]).map(s => `${X(s.T).toFixed(1)},${Y(s.by[a].total).toFixed(1)}`).join(' ');
    const op = lvl === 1 ? (a === mine ? 1 : .85) : a === focus ? (lvl === 2 ? 1 : .45) : .22;
    g += `<polyline points="${pts}" fill="none" stroke="${lvl === 2 && a === focus ? '#fff' : lineCol(a)}" stroke-width="${a === focus || (lvl === 1 && a === mine) ? 3.2 : 2.2}" stroke-linejoin="round" stroke-linecap="round" opacity="${op}"/>`; }
  let capDots = [];
  if (capL) { // the captain's running total: a step at each point won or lost, a dot you can tap
    let v = 0; const pl = [`${X(0)},${Y(0)}`];
    for (const [i, e] of capL.ev.entries()) { if (e.k === 'gave') continue; pl.push(`${X(e.T).toFixed(1)},${Y(v).toFixed(1)}`); v += e.v; pl.push(`${X(e.T).toFixed(1)},${Y(v).toFixed(1)}`); capDots.push({ i, x: X(e.T), y: Y(v), e }); }
    pl.push(`${X(T1).toFixed(1)},${Y(v).toFixed(1)}`);
    g += `<polyline points="${pl.join(' ')}" fill="none" stroke="#ffcf3a" stroke-width="3" stroke-linejoin="round"/>`;
    for (const d of capDots) g += `<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${pick === d.i ? 5.5 : 3.6}" fill="${d.e.v > 0 ? '#8fe08a' : '#ff7a6e'}" stroke="${pick === d.i ? '#fff' : '#1a1816'}" stroke-width="${pick === d.i ? 2 : 1}"/>`; }
  { const ends = (lvl === 1 ? order : [focus]).filter(a => S[S.length - 1].by[a]).map(a => ({ a, v: S[S.length - 1].by[a].total, y: Y(S[S.length - 1].by[a].total) + 4 })).sort((p, q) => p.y - q.y);
    for (let i = 1; i < ends.length; i++) ends[i].y = Math.max(ends[i].y, ends[i - 1].y + 12);
    const over = ends.length ? Math.max(0, ends[ends.length - 1].y - (H - B + 4)) : 0;
    for (const e of ends) g += `<text x="${W - R + 4}" y="${e.y - over}" class="tl-end" style="fill:${lineCol(e.a)}">${e.v}</text>`;
    if (capL) g += `<text x="${W - R + 4}" y="${Y(capL.net) + 4}" class="tl-end" style="fill:#ffcf3a">${sgn(capL.net)}</text>`; }
  g += `<line class="tl-cur" x1="0" x2="0" y1="${Tp}" y2="${H - B}" visibility="hidden"/>`;
  const evTxt = (e, ti) => `<b>${mmss(e.T)}</b> ${esc(e.t)}${e.to != null && e.to >= 0 ? (e.k === 'lose' ? ' to ' : ' ') + dots(e.to) : ''} <span class="${e.v > 0 ? 'pos' : 'neg'}">${sgn(e.v)}</span>`;
  const moments = [glory.chest ? `War chest to ${glory.chest.a === mine ? 'your side' : esc(allyNames(glory.chest.a))} at ${mmss(glory.chest.T)}` : '', glory.crown ? `Crown to ${glory.crown.a === mine ? 'your side' : esc(allyNames(glory.crown.a))} at ${mmss(glory.crown.T)}` : ''].filter(Boolean).join(' · ');
  const chartTitle = lvl === 1 ? 'How the points went <small>tap a side, or the chart</small>' : lvl === 2 ? `${dots(focus)}${esc(allyNames(focus))}: where the points came from <small>tap the chart</small>` : `${esc(cap === G.myTi ? 'Your' : capName(cap) + "'s")} points through the battle <small>tap a dot</small>`;
  const at = lvl === 3 ? (pick != null && capL.ev[pick] ? evTxt(capL.ev[pick]) : 'Tap a dot to see what it was') : (moments || 'Tap the chart to see any moment');
  // the side panel, by level
  let side = '';
  const capRow = i => { const N = nets.get(i); return `<div class="cap-row${i === G.myTi ? ' me' : ''}" data-cap="${i}" role="button" tabindex="0"><i style="background:${TEAMS[colorOf(i)].css}"></i><span><b>${esc(capName(i))}</b><small>${counts(N)}</small></span><em>${sgn(N.net) || '0'}</em><u>›</u></div>`; };
  if (lvl === 1) {
    const rank = order.indexOf(mine) + 1, p = parts(fin[mine]), lostN = [...TL.places.values()].filter(x => x.hist.some(y => y.owner === mine) && x.h.owner !== mine).length;
    const mates = capsOf(mine).sort((x, y) => nets.get(y).net - nets.get(x).net), myRank = mates.indexOf(G.myTi) + 1, my = nets.get(G.myTi);
    const best = [...nets.entries()].sort((x, y) => y[1].net - x[1].net)[0];
    side = `<h4>Your team</h4><div class="sum" data-go="team" role="button" tabindex="0"><span class="t">${dots(mine)}${esc(allyNames(mine))} · ${ord(rank)} of ${order.length}</span><span class="s">${SRC.filter(([k]) => p[k]).map(([k, l]) => `${l} ${p[k]}`).join(' · ') || 'No points'}${lostN ? ` · lost ${lostN} place${lostN > 1 ? 's' : ''} along the way` : ''}</span><em>${fin[mine].total}</em>
        <span class="mini">${SRC.map(([k, , c]) => p[k] ? `<i style="width:${p[k] / Math.max(1, fin[mine].total) * 100}%;background:${c}"></i>` : '').join('')}</span><span class="go">Tap: your team's story ›</span></div>
      <h4>You</h4><div class="sum me" data-go="me" role="button" tabindex="0"><span class="t">You${mates.length > 1 ? ` · ${ord(myRank)} of ${mates.length} on ${esc(allyNames(mine))}` : ''}</span><span class="s">${counts(my)}${my.gave ? ` · gave away ${my.gave}` : ''}</span><em>${sgn(my.net) || '0'}</em><span class="go">Tap: every point you won or lost ›</span></div>
      ${best && best[0] !== G.myTi && best[1].net > 0 ? `<h4>Best captain of the battle</h4><div class="sum" data-cap="${best[0]}" role="button" tabindex="0"><span class="t"><i class="pd" style="background:${TEAMS[colorOf(best[0])].css}"></i>${esc(capName(best[0]))} · ${esc(allyNames(sideOf(best[0])))}</span><span class="s">${counts(best[1])}</span><em>${sgn(best[1].net)}</em></div>` : ''}`;
  } else if (lvl === 2) {
    const fs = focus, who = fs === mine ? 'Your side' : esc(allyNames(fs));
    const places = [...TL.places.values()].filter(p => p.hist.some(x => x.owner === fs)).map(p => { const h = p.h, held = h.owner === fs;
      return { held, html: `<div class="pp${held ? ' held' : ' lost'}"><span class="pp-k">${h.keep ? 'Keep' : h.kind === 'castle' ? 'Castle' : 'Village'}</span><b>${esc(short(h.name))}</b><em>${held ? '+' + (h.kind === 'castle' ? CROWN2.points.castle : CROWN2.points.village) : '–'}</em></div>` }; })
      .sort((x, y) => y.held - x.held).map(x => x.html).join('') || '<p class="pv-none">No places held this battle.</p>';
    side = `<h4>${who}'s captains <small>tap one</small></h4>${capsOf(fs).sort((x, y) => nets.get(y).net - nets.get(x).net).map(capRow).join('')}
      <h4>${who}'s places <small>held at the end, and lost</small></h4><div class="pp-list compact">${places}</div>`;
  } else {
    const N = capL, rows = N.ev.map((e, i) => `<div class="lg ${e.k}${pick === i ? ' hi' : ''}" data-ev="${i}"><span class="lg-t">${mmss(e.T)}</span><span>${esc(e.t)}${e.to != null && e.to >= 0 ? (e.k === 'lose' ? ' to ' : ' ') + dots(e.to) : ''}</span><b>${e.k === 'gave' ? '+' + e.v + ' to them' : sgn(e.v)}</b></div>`).join('') || '<div class="lg none"><span></span><span>No points won or lost</span><b></b></div>';
    side = `<h4>${cap === G.myTi ? 'You' : esc(capName(cap))} · every point won or lost</h4><div class="sum me"><span class="t">${esc(capName(cap))} · ${esc(allyNames(sideOf(cap)))}</span><span class="s">${counts(N)}${N.gave ? ` · gave away ${N.gave}` : ''}</span><em>${sgn(N.net) || '0'}</em></div><div class="lg-list">${rows}</div>`;
  }
  el.innerHTML = `<div class="pv">
    <div class="pv-main">${crumb}
      <h2 class="ptitle">${w < 0 ? 'A draw on points' : (w === mine ? 'Your side wins on points' : `${esc(allyNames(w))} ${allyNames(w).includes('&') ? 'win' : 'wins'} on points`)}</h2>
      <div class="ps">${score}</div>${legend}
      <h4>${chartTitle}</h4><svg class="tl" viewBox="0 0 ${W} ${H}">${g}</svg><div class="tl-at">${at}</div>
    </div><div class="pv-side">${side}</div></div>`;
  // the taps
  const go = (f, c, p = null) => { focus = f; cap = c; pick = p; draw(el, w); };
  const tap = (sel, fn) => el.querySelectorAll(sel).forEach(n => { n.addEventListener('click', () => fn(n)); n.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(n); } }); });
  tap('.ps-row', n => { const a = +n.dataset.a; go(focus === a && cap == null ? null : a, null); });
  tap('.pv-crumb a[data-go="1"]', () => go(null, null)); tap('.pv-crumb a[data-go="2"]', () => go(focus, null));
  tap('[data-go="team"]', () => go(mine, null)); tap('[data-go="me"]', () => go(mine, G.myTi));
  tap('[data-cap]', n => { const i = +n.dataset.cap; go(sideOf(i), i); });
  tap('.lg[data-ev]', n => go(focus, cap, +n.dataset.ev));
  // the chart: a moment (game, team), or the nearest dot (a captain)
  const svg = el.querySelector('.tl'), cur = el.querySelector('.tl-cur'), atEl = el.querySelector('.tl-at');
  const show = ev => { const r = svg.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * W, y = (ev.clientY - r.top) / r.height * H;
    if (lvl === 3) { let best = null, bd = 1e9; for (const d of capDots) { const dd = Math.hypot(d.x - x, (d.y - y) * .6); if (dd < bd) { bd = dd; best = d; } } if (best && best.i !== pick) go(focus, cap, best.i); return; }
    const t = Math.max(0, Math.min(T1, (x - L) / (W - L - R) * T1)); let s = S[0]; for (const q of S) if (Math.abs(q.T - t) < Math.abs(s.T - t)) s = q;
    cur.setAttribute('x1', X(s.T)); cur.setAttribute('x2', X(s.T)); cur.setAttribute('visibility', 'visible');
    atEl.innerHTML = `<b>${mmss(s.T)}</b> ` + order.filter(a => s.by[a] && (focus == null || a === focus)).map(a => { const p = parts(s.by[a]); return `<span class="tl-s">${dots(a)}<b>${s.by[a].total}</b> <small>${SRC.filter(([k]) => p[k]).map(([k, l]) => `${l.toLowerCase()} ${p[k]}`).join(', ') || 'nothing yet'}</small></span>`; }).join(''); };
  svg.addEventListener('pointerdown', ev => { show(ev); if (lvl !== 3) svg.setPointerCapture(ev.pointerId); });
  svg.addEventListener('pointermove', ev => { if (lvl !== 3 && (ev.buttons || ev.pointerType === 'mouse')) show(ev); });
  if (lvl === 3 && pick != null) { const hi = el.querySelector('.lg.hi'); if (hi) hi.scrollIntoView({ block: 'nearest' }); }
}
