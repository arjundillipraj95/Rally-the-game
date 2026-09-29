// Soldiers' banter: short speech bubbles at the funny moments (sent flying, a big clout, the
// captain falling, seeing stars, your orders, the odd grumble on the march). Purely cosmetic and
// worked out on each device from what it can see, so it behaves the same solo, hosting or joined.
// Kept rare on purpose: a line every now and then lands, a wall of them is noise.
import { G, bus, isEnemyTi } from '../core/state.js';
import { camTarget } from './camera.js';

const LINES = {
  launch: ['Wheeee!', 'I can fly!', 'Not agaaain!', 'Mummyyy!', 'Worth it!', 'My sandals!', 'Tell my goat…', 'Bye!', 'Too high!', 'Wasn’t ready!'],
  clout: ['Not the face!', 'Ow! My everything!', 'Rude!', 'That’ll bruise.', 'I felt that.', 'Ow, ow, ow.', 'My helmet!', 'Oof.'],
  stars: ['Pretty stars…', 'Mummy?', 'Which way is up?', 'Three of you now?', 'Is it Tuesday?'],
  capDown: ['Who’s in charge now?', 'Captain?! …Captain?', 'Run! Er, regroup!', 'I’m the captain now!', 'Nobody panic!', 'AAAAH!'],
  march: ['Are we there yet?', 'My feet hurt.', 'I joined for the free sandals.', 'Is it lunch yet?', 'Tell my goat I loved him.',
    'For the… uh… glory!', 'Who packed the snacks?', 'I think I left the oven on.', 'Left, right, left… which is left?', 'Nice day for it.'],
  win: ['We did it?', 'Victory! And snacks!', 'Glory!', 'Told you so.', 'Did everyone see that?', 'Home for lunch!'],
  flee: ['Run away!', 'Tactical retreat!', 'Every man for himself!', 'Mummyyy!', 'Not the face!'],
  follow: ['With me, lads!', 'This way!', 'Follow the shiny helmet!', 'Keep up!'],
  hold: ['Hold the line!', 'Hold! …which line?', 'Stay! Good soldiers.', 'Nobody move!'],
  charge: ['CHAAARGE!', 'At them!', 'For glory! And lunch!', 'GO GO GO!'],
  shieldwall: ['Shields up!', 'Wall! Not that high, Marcus.', 'Turtle time!', 'Lock shields!'],
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
  if (!force && (quietT > 0 || bubbles.length >= 3)) return;
  if (bubbles.some(b => b.u === u)) return;
  bubbles.push({ u, text: pick(kind), t: 0, dur: kind === 'launch' ? 1.4 : 2.1, big: force });
  quietT = force ? .6 : 1.3 + Math.random() * 1.2;
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
      if (u.dead && !s.dead && u.launch && Math.random() < .45) say(u, 'launch');
      else if (!u.dead && s.hp - u.hp > u.max * .3 && Math.random() < .22) say(u, 'clout');
      else if (!u.dead && u.seesStars && !s.stars && Math.random() < .3) say(u, 'stars');
    }
    s.hp = u.hp; s.dead = u.dead; s.stars = !!u.seesStars;
  }
  // the odd grumble from your own ranks while nothing much is happening
  if (marchT <= 0) {
    marchT = 18 + Math.random() * 16;
    const quiet = !G.units.some(o => !o.dead && isEnemyTi(o.ti, G.myTi) && Math.hypot(o.x - T.x, o.z - T.z) < 18);
    const mine = G.units.filter(o => !o.dead && !o.leader && o.ti === G.myTi && Math.hypot(o.x - T.x, o.z - T.z) < 14);
    if (quiet && mine.length) say(mine[(Math.random() * mine.length) | 0], 'march');
  }
}
export function clearBanter() { bubbles.length = 0; quietT = 2; marchT = 12; }

// the whistle: a couple of winners crow, one loser flees shrieking
bus.on('end', ({ w }) => {
  const T = camTarget(); if (!T || w < 0) return;
  const near = G.units.filter(o => !o.dead && Math.hypot(o.x - T.x, o.z - T.z) < 22);
  const winners = near.filter(o => G.ALLY[o.ti % 4] === w), losers = near.filter(o => G.ALLY[o.ti % 4] !== w);
  const one = l => l[(Math.random() * l.length) | 0];
  if (winners.length) { say(one(winners), 'win', true); setTimeout(() => winners.length > 1 && say(one(winners), 'win', true), 700); }
  if (losers.length) setTimeout(() => say(one(losers), 'flee', true), 350);
});
// your orders are shouted by your captain; when a captain falls, one of his men panics
bus.on('shout', ({ u, kind }) => say(u, kind, true));
bus.on('shownMsg', m => {
  if (m.k !== 'capDown' && m.k !== 'fell') return;
  const ti = m.a[0], T = camTarget(); if (!T) return;
  const men = G.units.filter(o => !o.dead && !o.leader && o.ti === ti && Math.hypot(o.x - T.x, o.z - T.z) < 24);
  if (men.length) setTimeout(() => say(men[(Math.random() * men.length) | 0], 'capDown'), 500);
});
