// The battle report on the results screen: a rating for every captain (shown to everyone), a funny
// retrospect with the good and the bad, awards that have to be earned (honours and roasts), the full
// table and the battle's timeline. Honest, not a participation prize: a quiet match gets a low rating
// and a roast, and an award only goes out when someone actually cleared its bar.
import { TEAMS } from '../config.js';
import { G, bus, colorOf, activeArmies, SLOT_NAME } from '../core/state.js';

const pick = a => a[(Math.random() * a.length) | 0];
const pl = (n, one, many) => n === 1 ? one : many.replace('#', n);

// ---------- the timeline: the battle's big beats, with the clock ----------
let timeline = [], firstBlood = false;
export function clearReport() { timeline = []; firstBlood = false; }
const fmt = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
bus.on('shownMsg', ({ k, a }) => {
  if (G.state !== 'play' || !a) return;
  const T = G.T;
  if (k === 'castleDown') timeline.push({ T, k, a: [...a] });
  else if (k === 'holdTaken' || k === 'chestTaken' || k === 'duelWon' || k === 'lastStand' || k === 'gateBroken' || k === 'breach') timeline.push({ T, k, a: [...a] });
  else if (k === 'capDown' && !firstBlood) { firstBlood = true; timeline.push({ T, k, a: [...a] }); } // (first blood only)
  // villages change hands all battle: keep the first few, and every big moment
  const small = timeline.filter(e => e.k === 'holdTaken' || e.k === 'breach');
  if (small.length > 12) timeline.splice(timeline.lastIndexOf(small[small.length - 1]), 1);
});

// ---------- one captain's numbers ----------
function statsOf(i, w) {
  const s = G.teams[i] || {}, h = s.hl || {};
  const capK = s.capK | 0, menK = s.menK | 0;
  return {
    i, capK, menK, kills: capK + menK, falls: s.falls | 0, lost: s.lost | 0,
    earned: Math.round(s.earned || 0), purse: Math.round(s.endGold ?? s.gold ?? 0), dist: Math.round(s.dist || 0),
    castle: h.castle | 0, hold: h.hold | 0, chest: h.chest | 0, duel: h.duel | 0, exec: h.exec | 0, ride: h.ridedown | 0,
    capkill: h.capkill | 0, streak: h.streak | 0, disarm: h.disarm | 0, crown: h.crown | 0,
    result: w < 0 ? 'draw' : G.ALLY[colorOf(i)] === w ? 'win' : 'lose',
  };
}
// Out of 10, measured against the others in this battle (a long, bloody one inflates everyone's numbers).
// Winning matters but can't carry a captain who did nothing; falling more than the rest and wasting men costs.
const place = x => x.castle * 3 + x.hold + x.chest * 2;
export function contextOf(xs) {
  const mx = f => Math.max(1, ...xs.map(f)), mean = f => xs.reduce((n, x) => n + f(x), 0) / Math.max(1, xs.length);
  return { n: xs.length, kills: mx(x => x.kills), capK: mx(x => x.capK), menK: mx(x => x.menK), meanKills: mean(x => x.kills),
    maxFalls: Math.max(0, ...xs.map(x => x.falls)), minFalls: Math.min(...xs.map(x => x.falls)), maxLost: Math.max(0, ...xs.map(x => x.lost)), minCapK: Math.min(...xs.map(x => x.capK)), place: mx(place), earned: mx(x => x.earned), falls: mean(x => x.falls), lost: mx(x => Math.max(0, x.lost - x.kills)) };
}
export function ratingOf(x, c) {
  let r = 2 + (x.result === 'win' ? 2 : x.result === 'draw' ? 1 : 0);
  r += 2.2 * x.kills / c.kills + 1.2 * x.capK / c.capK + 1.6 * place(x) / c.place + .6 * x.earned / c.earned;
  r += Math.min(1, x.duel * .5 + (x.exec + x.ride) * .25) + Math.min(.8, x.crown * .4);
  r -= Math.min(1.8, .6 * x.falls / (c.falls + 1)) + .8 * Math.max(0, x.lost - x.kills) / c.lost;
  return Math.round(Math.max(1, Math.min(10, r)) * 10) / 10;
}

// ---------- the retrospect: one good thing and one bad thing, the strongest that sets him apart ----------
// Each line is [applies, strength, id, text]; the report hands out the strongest one not already used on
// another captain, so four captains who all fell a lot don't all get the same joke.
function retro(x, c) {
  const good = [
    [x.crown >= 1, 10, 'crown', () => pl(x.crown, 'Grabbed the Crown. Wore it well, briefly.', 'Grabbed the Crown # times. Can\'t keep his hands off it.')],
    [x.castle >= 1, 9, 'castle', () => `${pl(x.castle, 'Brought down a castle', 'Brought down # castles')}. ${pick(['Masonry everywhere.', 'The stonemasons are furious.'])}`],
    [x.duel >= 1, 8, 'duel', () => `${pl(x.duel, 'Won a duel', 'Won # duels')}. Treats the ring like his living room.`],
    [x.exec >= 1, 7, 'exec', () => `${pl(x.exec, 'Executed a captain', 'Executed # captains')}. Nobody's inviting him to dinner.`],
    [x.capK >= 5 && x.capK === c.capK, 7, 'capK', () => `Most kills by his own hand: ${x.capK}. The undertakers send their thanks.`],
    [x.chest >= 1, 6, 'chest', () => 'Grabbed the war chest. Greed is good.'],
    [x.menK >= 10 && x.menK === c.menK, 6, 'menK', () => `His men took ${x.menK}, the most of anyone. A master of delegation.`],
    [x.capK >= 5 && x.capK >= .8 * c.capK, 5, 'capK2', () => `${x.capK} kills with his own sword. Busy afternoon.`],
    [x.hold >= 2, 5, 'hold', () => `Helped take ${x.hold} places. Collects villages like fridge magnets.`],
    [x.falls === 0 && x.kills >= 5, 5, 'nofall', () => 'Never fell once. Suspicious.'],
    [x.falls === c.minFalls && c.n > 2, 4, 'fewfalls', () => `Fell the fewest times (${x.falls}). Self-preservation: an underrated skill.`],
    [x.earned >= .9 * c.earned, 4, 'earned', () => `Earned ${x.earned} gold. Counts it in his sleep.`],
    [x.streak >= 8, 4, 'streak', () => `${x.streak} blows in a row. The rhythm of a drummer, the manners of a bull.`],
    [x.menK >= 10 && x.menK >= .8 * c.menK, 3, 'menK2', () => `His men took ${x.menK}. They clearly like him.`],
    [x.capK >= 5, 2, 'capK3', () => `${x.capK} kills of his own. Respectable.`],
    [x.menK >= 5, 1, 'menK3', () => `His men took ${x.menK}. They were trying, at least.`],
  ];
  const bad = [
    [x.kills === 0, 10, 'zero', () => 'Zero kills. A pacifist, or just very lost?'],
    [x.falls >= 4 && x.falls === c.maxFalls && c.n > 1, 9, 'mostfalls', () => `Fell ${x.falls} times, more than anyone. The ground has his outline now.`],
    [x.lost >= 10 && x.lost >= 2 * x.kills, 8, 'waste', () => `Lost ${x.lost} men for ${x.kills} taken. The recruiters have stopped answering his letters.`],
    [x.purse >= 250 && x.purse >= .15 * x.earned, 7, 'purse', () => `Ended with ${x.purse} gold unspent. You can't take it with you.`],
    [x.dist >= 600 && x.kills <= .5 * c.meanKills, 6, 'tourist', () => `Walked ${(x.dist / 1000).toFixed(1)} km and fought very little of it. Saw the sights, though.`],
    [x.lost === c.maxLost && c.n > 2, 5, 'mostlost', () => `Lost the most men (${x.lost}). Their mothers have questions.`],
    [x.capK === c.minCapK && c.n > 2, 5, 'fewkills', () => `Fewest kills by his own hand (${x.capK}). Mostly did the pointing.`],
    [x.falls >= 2 && x.falls >= c.falls, 4, 'falls', () => `Fell ${x.falls} times. That's ${x.falls} bounties paid to the enemy.`],
    [x.result === 'lose', 3, 'lose', () => 'Ended on the losing side, which is the wrong one.'],
    [x.falls >= 1, 2, 'fell', () => pl(x.falls, 'Fell once. Just the once. Everybody saw.', 'Fell # times.')],
    [x.earned < .6 * c.earned, 1, 'poor', () => 'Poor as a church mouse all battle.'],
  ];
  const ok = l => l.filter(e => e[0]).sort((a, b) => b[1] - a[1]);
  return { good: ok(good), bad: ok(bad) };
}
// the strongest line that nobody else got yet (else the strongest), or the fallback
function choose(list, used, none) {
  const e = list.find(e => !used.has(e[2])) || list[0];
  if (!e) return none;
  used.add(e[2]); return e[3]();
}

// ---------- awards: earned only past a bar; honours first, at most 2 per captain, 7 in all ----------
const K = v => () => v; // (a fixed bar)
const AWARDS = [
  { id: 'butcher', name: 'The Butcher', honour: true, val: x => x.kills, min: (xs, m) => Math.max(15, m(x => x.kills) * 1.15), lead: 1.1, line: x => `Most kills: ${x.kills}` },
  { id: 'crown', name: 'Crown Bearer', honour: true, val: x => x.crown, min: K(1), line: x => pl(x.crown, 'Grabbed the Crown', 'Grabbed the Crown # times') },
  { id: 'conq', name: 'Conqueror', honour: true, val: x => x.castle, min: K(1), line: x => pl(x.castle, 'Brought down a castle', 'Brought down # castles') },
  { id: 'head', name: 'Headhunter', honour: true, val: x => x.capkill, min: K(3), lead: 1.25, line: x => `Cut down ${x.capkill} captains` },
  { id: 'duel', name: 'Duelist', honour: true, val: x => x.duel, min: K(1), line: x => pl(x.duel, 'Won a duel', 'Won # duels') },
  { id: 'acct', name: 'The Accountant', honour: true, val: x => x.earned, min: (xs, m) => Math.max(400, m(x => x.earned) * 1.15), lead: 1.1, line: x => `Earned ${x.earned} gold` },
  { id: 'wall', name: 'The Wall', honour: true, val: x => x.menK >= 10 && x.lost <= x.menK / 2 ? x.menK / Math.max(1, x.lost) : 0, min: K(2), line: x => `Took ${x.menK}, lost only ${x.lost}` },
  { id: 'untouch', name: 'Untouchable', honour: true, val: x => x.falls === 0 ? x.capK : 0, min: K(8), line: x => `${x.capK} kills, never fell` },
  { id: 'donor', name: 'Generous Donor', val: x => x.falls, min: (xs, m) => Math.max(4, m(x => x.falls) * 1.25), lead: 1.15, line: x => `Fell ${x.falls} times: a bounty each` },
  { id: 'miser', name: 'The Miser', val: x => x.purse >= x.earned * .15 ? x.purse : 0, min: K(300), line: x => `Ended with ${x.purse} gold unspent` },
  { id: 'tourist', name: 'The Tourist', val: (x, xs) => x.kills <= .5 * xs.reduce((t, y) => t + y.kills, 0) / xs.length ? x.dist : 0, min: K(600), line: x => `Walked ${(x.dist / 1000).toFixed(1)} km for ${x.kills} kills` },
  { id: 'nightmare', name: "Recruiter's Nightmare", val: x => x.lost >= 2 * x.kills ? x.lost : 0, min: K(30), line: x => `Lost ${x.lost} men for ${x.kills} kills` },
  { id: 'pacifist', name: 'Pacifist', val: x => x.kills === 0 ? 1 : 0, min: K(1), line: () => 'Zero kills. Not one.' },
];
// The leader has to clear the bar and, for the ones measured in bulk, be clearly ahead of the runner-up.
function awardsFor(xs) {
  const out = [], count = {}, n = xs.length;
  const mean = f => xs.reduce((t, x) => t + f(x), 0) / Math.max(1, n);
  for (const A of AWARDS) {
    if (out.length >= 7) break;
    const vs = xs.map(x => [A.val(x, xs), x]).sort((a, b) => b[0] - a[0] || (b[1].rating || 0) - (a[1].rating || 0)); // (a tie: the better-rated captain)
    const [bv, best] = vs[0] || [], second = vs[1] ? vs[1][0] : 0;
    if (!best || bv < A.min(xs, mean) || (A.lead && bv < second * A.lead) || (count[best.i] | 0) >= 2) continue;
    count[best.i] = (count[best.i] | 0) + 1;
    out.push({ ...A, who: best.i, text: A.line(best) });
  }
  return out;
}

export function buildReport(w, nickFor) {
  const ids = activeArmies();
  const nameOf = i => i === G.myTi ? 'You' : (nickFor && nickFor(i)) || (TEAMS[colorOf(i)].name + (i >= 4 ? ' ' + SLOT_NAME[i >> 2].toLowerCase() : ''));
  const xs = ids.map(i => statsOf(i, w)), ctx = contextOf(xs);
  for (const x of xs) x.rating = ratingOf(x, ctx);
  const you = t => t.replace(/\bhis\b/g, 'your').replace(/\bHis\b/g, 'Your').replace(/\bhim\b/g, 'you');
  const usedG = new Set(), usedB = new Set();
  const rows = [...xs].sort((a, b) => b.rating - a.rating).map(x => { const rr = retro(x, ctx);
    let good = choose(rr.good, usedG, 'Showed up. That counts for… something.'), bad = choose(rr.bad, usedB, 'Hard to find fault. We tried.');
    if (x.i === G.myTi) { good = you(good); bad = you(bad); }
    return { ...x, name: nameOf(x.i), css: TEAMS[colorOf(x.i)].css, good, bad }; });
  rows.sort((a, b) => b.rating - a.rating || b.kills - a.kills);
  rows.forEach((r, n) => { r.place = n + 1; r.mvp = n === 0 && r.rating >= 8; });
  const awards = awardsFor(xs);
  for (const a of awards) { const r = rows.find(r => r.i === a.who); if (r) (r.awards = r.awards || []).push(a); }
  return { rows, awards, timeline: timeline.slice(), nameOf };
}

// ---------- drawing it ----------
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const MEDAL = ['🥇', '🥈', '🥉'];
const ordinal = n => n + (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th');
export function myLine(rep) {
  const me = rep.rows.find(r => r.i === G.myTi); if (!me) return null;
  return { me, text: `${ordinal(me.place)} of ${rep.rows.length}` };
}
export function renderCaptains(el, rep) {
  el.innerHTML = `<table class="ctab"><thead><tr><th></th><th class="nm">Captain</th><th>Rating</th><th>Kills</th><th>Army</th><th>Fell</th><th>Lost</th><th>Gold</th></tr></thead><tbody>${rep.rows.map(r => `
    <tr class="crow${r.i === G.myTi ? ' me' : ''}" data-i="${r.i}" tabindex="0">
      <td class="pl">${MEDAL[r.place - 1] || r.place}</td>
      <td class="nm"><i style="background:${r.css}"></i>${esc(r.name)}${r.mvp ? ' <em class="mvp">MVP</em>' : ''}${(r.awards || []).map(a => ` <em class="aw${a.honour ? '' : ' roast'}">${esc(a.name)}</em>`).join('')}</td>
      <td><b class="rt${r.rating >= 8 ? ' hi' : r.rating < 4 ? ' lo' : ''}">${r.rating.toFixed(1)}</b></td>
      <td>${r.capK}</td><td>${r.menK}</td><td>${r.falls}</td><td>${r.lost}</td><td>${r.earned}</td>
    </tr>
    <tr class="retro" data-for="${r.i}" hidden><td></td><td colspan="7"><span class="g">👍 ${esc(r.good)}</span><span class="b">👎 ${esc(r.bad)}</span></td></tr>`).join('')}</tbody></table>
    <small class="hint">Tap a captain for his retrospect</small>`;
  el.querySelectorAll('.crow').forEach(tr => {
    const toggle = () => { const rt = el.querySelector(`.retro[data-for="${tr.dataset.i}"]`); rt.hidden = !rt.hidden; tr.classList.toggle('open', !rt.hidden); };
    tr.addEventListener('click', toggle); tr.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
}
const TL = {
  capDown: (e, n) => `First blood: ${n(e.a[1])} cut down ${n(e.a[0])}`,
  castleDown: (e, n) => `${n(e.a[0])}'s castle fell` + (e.a[1] >= 0 ? ` to ${n(e.a[1])}` : ''),
  holdTaken: (e) => `${allyName(e.a[0])} took ${(G.holds && G.holds[e.a[2]] && G.holds[e.a[2]].name) || 'a village'}`,
  chestTaken: (e) => `${allyName(e.a[0])} took the war chest`,
  duelWon: (e, n) => `${n(e.a[0])} beat ${n(e.a[1])} in a duel`,
  lastStand: (e, n) => `${n(e.a[0])} made a last stand`,
  gateBroken: (e, n) => `${n(e.a[1])} broke ${n(e.a[0])}'s gate`,
  breach: (e, n) => `${n(e.a[1])} breached ${n(e.a[0])}'s walls`,
};
const allyName = a => TEAMS.filter((_, i) => G.ALLY[i] === a).map(t => t.name).join(' & ');
export function renderAwards(el, rep) {
  const n = i => i == null || i < 0 ? 'someone' : esc(rep.nameOf(i));
  const aw = rep.awards.length ? rep.awards.map(a => `<div class="acard${a.honour ? '' : ' roast'}"><b>${esc(a.name)}</b><span><i style="background:${TEAMS[colorOf(a.who)].css}"></i>${esc(rep.nameOf(a.who))}</span><small>${esc(a.text)}</small></div>`).join('')
    : '<p class="none">Nobody earned an award this time. Aim higher.</p>';
  // the timeline: the moments that decided it (castles, duels, the chest), and the places changing hands, kept short
  const big = rep.timeline.filter(e => e.k !== 'holdTaken' && e.k !== 'breach'), small = rep.timeline.filter(e => e.k === 'holdTaken');
  const tl = [...big, ...small.slice(0, Math.max(0, 8 - big.length))].sort((a, b) => a.T - b.T).slice(0, 10);
  el.innerHTML = `<div class="acards">${aw}</div>` + (tl.length ? `<h4>How it went</h4><ol class="tline">${tl.map(e => `<li><time>${fmt(e.T)}</time>${TL[e.k](e, n)}</li>`).join('')}</ol>` : '');
}
export function shareText(rep, title) {
  const m = myLine(rep); if (!m) return '';
  const aw = (m.me.awards || [])[0];
  return `${title} in Rally! My rating: ${m.me.rating.toFixed(1)} (${m.text})` + (aw ? `. Award: ${aw.name}, ${aw.text}` : '') + `. "${m.me.bad}"`;
}
