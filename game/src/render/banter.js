import { SHOUTS, CALM } from '../config.js';
// Soldiers' banter: short speech bubbles at the funny moments (sent flying, a big clout, the
// captain falling, seeing stars, your orders, the odd grumble on the march). Purely cosmetic and
// worked out on each device from what it can see, so it behaves the same solo, hosting or joined.
// Kept rare on purpose: a line every now and then lands, a wall of them is noise.
import { G, bus, isEnemyTi, colorOf } from '../core/state.js';
import { camTarget } from './camera.js';

// F18 tone (Arjun, 13 Nov): Roman, proud, battle-hardened. Mostly real battle calls; a dry aside now and
// then (about one line in five), never a gag.
const LINES = {
  launch: ['Aagh!', 'Down!', 'Man down!', 'Ugh…', 'Not like this…'],
  clout: ['Ngh!', 'I’m hit!', 'Still standing.', 'Is that all?', 'That one hurt.'],
  stars: ['On your feet!', 'Get up, soldier!', 'Shake it off.', 'Head’s ringing…'],
  capDown: ['The captain’s down!', 'Hold together!', 'Close ranks!', 'Who leads us now?', 'Avenge him!'],
  march: ['Eyes forward.', 'Keep the pace.', 'Steady, lads.', 'Long road.', 'Rome wasn’t marched in a day.', 'Quiet. Too quiet.'],
  win: ['Victory!', 'For Rome!', 'The field is ours!', 'Glory to the legion!', 'Told you.'],
  flee: ['Fall back!', 'Back to the line!', 'Regroup!', 'Retreat!'],
  follow: ['With me!', 'On the captain!', 'Form up!', 'Keep up!'],
  hold: ['Hold the line!', 'Stand fast!', 'Not one step back!', 'Hold!'],
  charge: ['CHARGE!', 'At them!', 'For the legion!', 'Forward!'],
  shieldwall: ['Shields up!', 'Lock shields!', 'Wall!', 'Testudo!'],
  cheer: ['Ours now!', 'Raise our banner!', 'Taken!', 'The keep is ours!', 'Decent beds, at least.'],
  lost: ['We lost the keep!', 'They took it!', 'Take it back!', 'The keep has fallen!'],
  gasp: ['Brutal.', 'Did you see that?', 'Remind me not to cross him.', 'Respect.', 'Clean.'],
  contact: ['Here they come!', 'Steady…', 'Enemy ahead!', 'Contact!', 'Ready yourselves!'],
  rich: ['Captain, the coffers are full.', 'Spend the gold, sir.', 'More men would help.', 'Armour, sir?'],
  duel: ['Fight!', 'Go on, sir!', 'Finish him!', 'Watch his blade!', 'Don’t blink.'],
  taunt: ['Is that your army?', 'Go home!', 'Kneel.', 'Come and take it!', 'You’ll break.', 'I’ve seen better shields on a cart.'],
  breach: ['They’re through!', 'Breach!', 'Plug the gap!', 'The wall’s down!'],
};
const recent = [];
function pick(kind) {
  const pool = LINES[kind]; let line, n = 0;
  do { line = pool[(Math.random() * pool.length) | 0]; } while (recent.includes(line) && ++n < 6);
  recent.push(line); if (recent.length > 10) recent.shift();
  return line;
}

export const bubbles = []; // {u, text, t, dur, big}
let quietT = 2, marchT = 12;
// Put words in a soldier's mouth. `force` skips the pacing (the player's own orders).
export function say(u, kind, force = false) {
  if (!u || !LINES[kind]) return;
  const crown = G.mode === 'crown' && !force;
  if (!force && (quietT > 0 || bubbles.length >= (crown ? CALM.bubbles : 3))) return;
  if (bubbles.some(b => b.u === u)) return;
  bubbles.push({ u, text: pick(kind), t: 0, dur: kind === 'launch' ? 1.4 : 2.1, big: force });
  quietT = force ? .6 : crown ? CALM.bubbleGap : 1.3 + Math.random() * 1.2;
}

const seen = new WeakMap(); // per soldier: what we saw last frame
export function banterTick(dt) {
  quietT -= dt; marchT -= dt;
  for (let i = bubbles.length - 1; i >= 0; i--) { const b = bubbles[i]; b.t += dt; if (b.t > b.dur) bubbles.splice(i, 1); }
  if (G.state !== 'play') return;
  const T = camTarget(); if (!T) return;
  for (const u of G.units) {
    const d = Math.hypot(u.x - T.x, u.z - T.z);
    let s = seen.get(u);
    if (!s) { s = { hp: u.hp, dead: u.dead, stars: false }; seen.set(u, s); continue; }
    if (d < 26) {
      if (u.dead && !s.dead && u.launch && Math.random() < .2) say(u, 'launch');
      else if (!u.dead && s.hp - u.hp > u.max * .3 && Math.random() < .12) say(u, 'clout');
      else if (!u.dead && u.seesStars && !s.stars && Math.random() < .12) say(u, 'stars');
    }
    s.hp = u.hp; s.dead = u.dead; s.stars = !!u.seesStars;
  }
  // the first clash: someone in your ranks notices the enemy coming
  contactT -= dt; richT -= dt; tauntT -= dt;
  if (contactT <= 0) {
    contactT = 2;
    const foe = G.units.some(o => !o.dead && isEnemyTi(o.ti, G.myTi) && Math.hypot(o.x - T.x, o.z - T.z) < 16);
    if (foe && !inFight) { const mine = myMen(T, 12); if (mine.length) say(mine[(Math.random() * mine.length) | 0], 'contact'); contactT = 20; }
    inFight = foe;
  }
  // gold piling up unspent: the men drop a hint
  const tm = G.teams[G.myTi];
  if (richT <= 0) { richT = 25; if (tm && tm.gold >= 180) { const mine = myMen(T, 14); if (mine.length) say(mine[(Math.random() * mine.length) | 0], 'rich'); } }
  // an enemy captain close to you calls across
  if (tauntT <= 0) {
    tauntT = 25 + Math.random() * 15;
    const cap = G.units.find(o => !o.dead && o.leader && !o.human && isEnemyTi(o.ti, G.myTi) && Math.hypot(o.x - T.x, o.z - T.z) < 18);
    if (cap) say(cap, 'taunt');
  }
  // the odd grumble from your own ranks while nothing much is happening
  if (marchT <= 0) {
    marchT = 40 + Math.random() * 30;
    const quiet = !G.units.some(o => !o.dead && isEnemyTi(o.ti, G.myTi) && Math.hypot(o.x - T.x, o.z - T.z) < 18);
    const mine = G.units.filter(o => !o.dead && !o.leader && o.ti === G.myTi && Math.hypot(o.x - T.x, o.z - T.z) < 14);
    if (quiet && mine.length) say(mine[(Math.random() * mine.length) | 0], 'march');
  }
}
let contactT = 3, richT = 30, tauntT = 15, inFight = false;
const myMen = (T, r) => G.units.filter(o => !o.dead && !o.leader && o.ti === G.myTi && Math.hypot(o.x - T.x, o.z - T.z) < r);
const someone = (l) => l.length ? l[(Math.random() * l.length) | 0] : null;
export function clearBanter() { bubbles.length = 0; quietT = 2; marchT = 12; contactT = 3; richT = 30; tauntT = 15; inFight = false; }

// the whistle: a couple of winners crow, one loser flees shrieking
bus.on('end', ({ w }) => {
  const T = camTarget(); if (!T || w < 0) return;
  const near = G.units.filter(o => !o.dead && Math.hypot(o.x - T.x, o.z - T.z) < 22);
  const winners = near.filter(o => !o.neutral && G.ALLY[o.ti % 4] === w), losers = near.filter(o => !o.neutral && G.ALLY[o.ti % 4] !== w);
  const one = l => l[(Math.random() * l.length) | 0];
  if (winners.length) { say(one(winners), 'win', true); setTimeout(() => winners.length > 1 && say(one(winners), 'win', true), 700); }
  if (losers.length) setTimeout(() => say(one(losers), 'flee', true), 350);
});
// your orders are shouted by your captain; when a captain falls, one of his men panics
bus.on('shout', ({ u, kind }) => say(u, kind, true));
bus.on('shownMsg', m => {
  if (m.k === 'callout') { const u = G.units.find(o => o.leader && !o.dead && o.ti === m.a[0]); if (u && SHOUTS[m.a[1]]) { bubbles.splice(0, bubbles.length, ...bubbles.filter(b => b.u !== u)); bubbles.push({ u, text: SHOUTS[m.a[1]], t: 0, dur: 2.6, big: true }); } return; }
  const T0 = camTarget();
  if (T0 && (m.k === 'holdTaken' || m.k === 'chestTaken')) { // a place taken: your men near you cheer (or groan)
    const ours = m.a[0] === G.ALLY[colorOf(G.myTi)], u = someone(myMen(T0, 20));
    if (u) setTimeout(() => say(u, ours ? 'cheer' : 'lost', ours), 400);
  }
  if (T0 && m.k === 'castleDown') { const u = someone(myMen(T0, 20)); if (u) setTimeout(() => say(u, colorOf(m.a[0]) === colorOf(G.myTi) ? 'lost' : 'cheer', true), 400); }
  if (T0 && (m.k === 'breach' || m.k === 'gateBroken')) { const u = someone(G.units.filter(o => !o.dead && !o.leader && colorOf(o.ti) === colorOf(m.a[0]) && Math.hypot(o.x - T0.x, o.z - T0.z) < 24)); if (u) say(u, 'breach'); }
  if (T0 && m.k === 'duelOn') { const u = someone(G.units.filter(o => !o.dead && !o.leader && (o.ti === m.a[0] || o.ti === m.a[1]) && Math.hypot(o.x - T0.x, o.z - T0.z) < 26)); if (u) setTimeout(() => say(u, 'duel', true), 900); }
  if (m.k !== 'capDown' && m.k !== 'fell') return;
  const ti = m.a[0], T = camTarget(); if (!T) return;
  const men = G.units.filter(o => !o.dead && !o.leader && o.ti === ti && Math.hypot(o.x - T.x, o.z - T.z) < 24);
  if (men.length) setTimeout(() => say(men[(Math.random() * men.length) | 0], 'capDown'), 500);
});

// an execution or a ride-down near you: the onlookers wince
bus.on('fxmsg', d => {
  if (d.k !== 'fxexec' && d.k !== 'fxridedown' && d.k !== 'fxstreak') return;
  const u = d.u, T = camTarget(); if (!u || !T || Math.hypot(u.x - T.x, u.z - T.z) > 24) return;
  const near = G.units.filter(o => !o.dead && !o.leader && o !== u && Math.hypot(o.x - u.x, o.z - u.z) < 14);
  const w = someone(near); if (w) setTimeout(() => say(w, 'gasp', true), 600);
});
