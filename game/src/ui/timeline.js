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

export function renderPointsV2(el, w) {
  tlTick();
  const mine = G.ALLY[colorOf(G.myTi)], sides = sidesNow(), fin = Object.fromEntries(sides.map(a => [a, c2Breakdown(a)]));
  const order = [...sides].sort((x, y) => fin[y].total - fin[x].total), top = Math.max(1, ...sides.map(a => fin[a].total));
  const name = a => esc(allyNames(a)) + (a === mine ? ' <em class="you">You</em>' : '');
  // 1. the scoreline: each side's total, split by source
  const score = order.map(a => { const p = parts(fin[a]);
    return `<div class="ps-row${a === mine ? ' me' : ''}${a === w ? ' won' : ''}"><span class="ps-nm">${dots(a)}${name(a)}</span>
      <span class="ps-bar">${SRC.map(([k, , c]) => p[k] ? `<i style="width:${p[k] / top * 100}%;background:${c}" title="${k} ${p[k]}"></i>` : '').join('')}</span><b>${fin[a].total}</b></div>`; }).join('');
  const legend = `<div class="ps-leg">${SRC.map(([, l, c]) => `<span><i style="background:${c}"></i>${l}</span>`).join('')}</div>`;
  // 2. the timeline
  const S = TL.samples.length ? TL.samples : [{ T: G.T, by: fin }], T1 = Math.max(600, S[S.length - 1].T), top0 = Math.max(...S.flatMap(s => Object.values(s.by).map(b => b.total))), step = [2, 5, 10, 20, 25, 50].find(n => top0 / n <= 5) || 100, Y1 = Math.max(step * 2, Math.ceil(top0 / step) * step);
  const W = 600, H = 210, L = 26, R = 30, B = 22, Tp = 14, X = t => L + t / T1 * (W - L - R), Y = v => Tp + (1 - v / Y1) * (H - Tp - B);
  let g = '';
  for (let v = 0; v <= Y1; v += step) g += `<line x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}" class="tl-grid"/><text x="${L - 5}" y="${Y(v) + 3}" class="tl-ax" text-anchor="end">${Math.round(v)}</text>`;
  for (let m = 0; m <= T1 / 60; m += 2) g += `<text x="${X(m * 60)}" y="${H - 6}" class="tl-ax" text-anchor="middle">${m}:00</text>`;
  let mk = 0; const mark = (t, label, c) => `<line x1="${X(t)}" x2="${X(t)}" y1="${Tp - 4}" y2="${H - B}" class="tl-mk" style="stroke:${c}"/><text x="${X(t) + 3}" y="${Tp + 4 + (mk++ % 2) * 11}" class="tl-ml" style="fill:${c}">${label}</text>`; // (labels alternate rows, so close ones don't overlap)
  g += mark(CROWN2.night, 'Night', '#8fa3d8');
  if (glory.chest) g += mark(glory.chest.T, 'Chest', '#e0803a');
  if (glory.crown) g += mark(glory.crown.T, 'Crown', '#9fdcf5');
  for (const a of order.slice().reverse()) { const pts = S.filter(s => s.by[a]).map(s => `${X(s.T).toFixed(1)},${Y(s.by[a].total).toFixed(1)}`).join(' ');
    g += `<polyline points="${pts}" fill="none" stroke="${lineCol(a)}" stroke-width="${a === mine ? 3.4 : 2.2}" stroke-linejoin="round" stroke-linecap="round" opacity="${a === mine ? 1 : .85}"/>`;
  }
  { const ends = order.filter(a => S[S.length - 1].by[a]).map(a => ({ a, v: S[S.length - 1].by[a].total, y: Y(S[S.length - 1].by[a].total) + 4 })).sort((p, q) => p.y - q.y);
    for (let i = 1; i < ends.length; i++) ends[i].y = Math.max(ends[i].y, ends[i - 1].y + 12); // (close finishes: the numbers step apart)
    const over = ends.length ? Math.max(0, ends[ends.length - 1].y - (H - B + 4)) : 0;
    for (const e of ends) g += `<text x="${W - R + 4}" y="${e.y - over}" class="tl-end" style="fill:${lineCol(e.a)}">${e.v}</text>`; }
  g += `<line class="tl-cur" x1="0" x2="0" y1="${Tp}" y2="${H - B}" visibility="hidden"/>`;
  const momentsTxt = [glory.chest ? `War chest to ${glory.chest.a === mine ? 'your side' : esc(allyNames(glory.chest.a))} at ${mmss(glory.chest.T)}` : '', glory.crown ? `Crown to ${glory.crown.a === mine ? 'your side' : esc(allyNames(glory.crown.a))} at ${mmss(glory.crown.T)}` : ''].filter(Boolean).join(' · ');
  // 3. your places: everywhere your side held, when it was taken, and whether it stayed yours
  const myPlaces = [...TL.places.values()].filter(p => p.hist.some(x => x.owner === mine)).map(p => {
    const h = p.h, endOwner = h.owner, gotAt = [...p.hist].reverse().find(x => x.owner === mine), lostAt = endOwner !== mine ? p.hist.find(x => x.T > (gotAt ? gotAt.T : 0) && x.owner !== mine) : null;
    const pts = h.kind === 'castle' ? CROWN2.points.castle : CROWN2.points.village, kind = h.keep ? 'Keep' : h.kind === 'castle' ? 'Castle' : 'Village';
    const who = gotAt && gotAt.by != null ? (gotAt.by === G.myTi ? 'you' : esc(nameOf(gotAt.by))) : '';
    return { held: endOwner === mine, html: `<div class="pp${endOwner === mine ? ' held' : ' lost'}"><span class="pp-k">${kind}</span><b>${esc(short(h.name))}</b>
      <span class="pp-s">${endOwner === mine ? `taken ${gotAt ? mmss(gotAt.T) : ''}${who ? ' by ' + who : ''}` : `lost${lostAt ? ' at ' + mmss(lostAt.T) : ''}${lostAt && lostAt.owner >= 0 ? ' to ' + (dots(lostAt.owner)) : ''}`}</span><em>${endOwner === mine ? '+' + pts : '–'}</em></div>` }; })
    .sort((x, y) => y.held - x.held).map(x => x.html).join('') || '<p class="pv-none">Your side held no places this battle.</p>';
  // 4. captains: the enemy captains, ticked if your side cut them down (who, and for what)
  const foes = G.teams.map((t, i) => i).filter(i => G.teams[i] && G.teams[i].active && G.ALLY[colorOf(i)] !== mine);
  const capChip = (side, i) => { const c = claimed[side + ':' + i], P = CROWN2.points;
    const who = c ? (c.by === G.myTi ? (c.v >= P.killCaptain ? 'you' : 'your men') : (c.v >= P.killCaptain ? esc(nameOf(c.by)) : esc(nameOf(c.by)) + "'s men")) : '';
    return `<div class="cc${c ? ' got' : ''}"><i style="background:${TEAMS[colorOf(i)].css}"></i><b>${esc(nameOf(i))}</b><span>${c ? `✓ ${who} +${c.v}` : 'not cut down'}</span></div>`; };
  const others = order.filter(a => a !== mine).map(a => { const theirFoes = G.teams.map((t, i) => i).filter(i => G.teams[i] && G.teams[i].active && G.ALLY[colorOf(i)] !== a);
    return `<div class="cc-side"><span>${dots(a)}${name(a)} · ${fin[a].caps} pts</span><div class="cc-grid">${theirFoes.map(i => capChip(a, i)).join('')}</div></div>`; }).join('');
  el.innerHTML = `<div class="pv">
    <div class="pv-main">
      <h2 class="ptitle">${w < 0 ? 'A draw on points' : (w === mine ? 'Your side wins on points' : `${esc(allyNames(w))} ${allyNames(w).includes('&') ? 'win' : 'wins'} on points`)}</h2>
      <div class="ps">${score}</div>${legend}
      <h4>How the points went <small>tap the chart</small></h4>
      <svg class="tl" viewBox="0 0 ${W} ${H}">${g}</svg>
      <div class="tl-at">${momentsTxt || 'Tap the chart to see any moment'}</div>
    </div>
    <div class="pv-side">
      <h4>Your places <small>count if held at the end</small></h4><div class="pp-list">${myPlaces}</div>
      <h4>Enemy captains <small>${CROWN2.points.killCaptain} by a captain, ${CROWN2.points.killArmy} by his men · once each</small></h4><div class="cc-grid">${foes.map(i => capChip(mine, i)).join('')}</div>
      <details class="cc-more"><summary>Every side's captains</summary>${others}</details>
    </div></div>`;
  // tap or drag on the chart: that moment's points for every side, by source
  const svg = el.querySelector('.tl'), cur = el.querySelector('.tl-cur'), at = el.querySelector('.tl-at');
  const show = ev => { const r = svg.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * W, t = Math.max(0, Math.min(T1, (x - L) / (W - L - R) * T1));
    let s = S[0]; for (const q of S) if (Math.abs(q.T - t) < Math.abs(s.T - t)) s = q;
    cur.setAttribute('x1', X(s.T)); cur.setAttribute('x2', X(s.T)); cur.setAttribute('visibility', 'visible');
    at.innerHTML = `<b>${mmss(s.T)}</b> ` + order.filter(a => s.by[a]).map(a => { const p = parts(s.by[a]); return `<span class="tl-s">${dots(a)}<b>${s.by[a].total}</b> <small>${SRC.filter(([k]) => p[k]).map(([k, l]) => `${l.toLowerCase()} ${p[k]}`).join(', ') || 'nothing yet'}</small></span>`; }).join(''); };
  svg.addEventListener('pointerdown', ev => { show(ev); svg.setPointerCapture(ev.pointerId); });
  svg.addEventListener('pointermove', ev => { if (ev.buttons || ev.pointerType === 'mouse') show(ev); });
}
