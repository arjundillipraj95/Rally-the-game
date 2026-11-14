// F5 the death sequence, on your own phone: your captain falls and the camera stays with him, the screen goes
// grey, a card says who cut you down and with what, a countdown runs, and the respawn is a fade to black and
// back in at home (the camera moves under the black, never across the map in view).
// Driven by what every phone has: the 'fell' announcement (who and how) and your team's respawn clock.
// Timings in FEEL.death (config.js).
import { FEEL, TEAMS } from '../config.js';
import { G, bus, colorOf, isEnemyTi } from '../core/state.js';
import { cam, deathCam } from '../render/camera.js';
import { quality } from '../render/quality.js';

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let nickFor = () => null;
export function initDeath(opts) { if (opts && opts.nickFor) nickFor = opts.nickFor; }
// on: the sequence is running. black: 0 clear, 1 going black, 2 black and waiting, 3 coming back.
const D = { on: false, last: null, body: null, t0: 0, can: true, info: null, v: -1, vAt: 0, black: 0, blackAt: 0, gaveUp: false, seed: null };
export const deathState = D;
// how he fell, in the card's words: [the line above the name, what follows the name]
const HOW = {
  sword: ['Cut down by', 'with a sword'], spear: ['Run through by', 'with a spear'], jav: ['Brought down by', 'with a javelin'], horse: ['Ridden down by', 'on horseback'],
  exec: ['Executed by', ''], arrow: ['Shot down by', '’s archers'], men: ['Cut down by', '’s men'],
  tower: ['Shot down by', 'a watchtower'], garrison: ['Cut down by', 'the garrison'], fall: ['You fell', 'into the chasm'], home: ['You fell', 'inside an enemy home'],
};
function fill() {
  const i = D.info, h = (i && HOW[i.how]) || null, ti = i ? i.by : -1, known = ti >= 0 && TEAMS[colorOf(ti)];
  const name = known ? esc(nickFor(ti) || TEAMS[colorOf(ti)].name) : '', css = known ? TEAMS[colorOf(ti)].css : '#fff';
  const own = i && (i.how === 'arrow' || i.how === 'men'); // (his men did it, not him)
  $('dBy').textContent = !i || !h ? 'You fell' : h[0];
  $('dName').innerHTML = known ? `<b style="color:${css}">${name}</b>${own ? esc(h[1]) : ''}` : (i && (i.how === 'tower' || i.how === 'garrison') ? esc(h[1]) : '');
  $('dHow').textContent = known ? (own ? '' : h[1]) : i && (i.how === 'fall' || i.how === 'home') ? h[1] : '';
  $('dWait').textContent = D.can ? 'Back in' : 'No way back';
  $('dNum').hidden = !D.can;
}
function setBlack(o, secs) { const b = $('blackout'); b.style.transition = secs ? `opacity ${secs}s linear` : 'none'; b.style.opacity = o; }
function grey(on) { document.body.classList.toggle('dead', on); document.body.classList.toggle('deadLow', on && quality.level === 'low'); }
function start(now) {
  D.on = true; D.body = D.last; D.t0 = now; D.v = -1; D.black = 0; D.gaveUp = false;
  deathCam.u = (D.body && D.body.chasmGone && D.body.edge) || D.body; // (F7: over the chasm's edge, the camera stays at the rim)
  fill(); $('deathFx').hidden = false; requestAnimationFrame(() => $('deathFx').classList.add('show'));
  grey(true);
}
function stop() {
  D.on = false; D.body = null; D.info = null; D.can = true; deathCam.u = null;
  $('deathFx').classList.remove('show'); $('deathFx').hidden = true; grey(false);
}
// the camera goes somewhere else: black in this very frame, the camera put straight there, then back in
function cut(now) { setBlack(1, 0); D.black = 3; D.blackAt = now; cam.snap = 2; }
export function deathReset() { stop(); D.last = null; D.black = 0; setBlack(0, 0); }
// (F7) the same fade for the battle's opening: to black over secs, then (fadeBackIn) the camera put straight on him, a beat, back in
export function fadeToBlack(secs) { setBlack(1, secs); D.black = 2; D.blackAt = performance.now(); }
export function fadeBackIn(now) { D.black = 3; D.blackAt = now; cam.snap = 2; }
// the 'fell' announcement: [who fell, can he come back, who did it (-1: nobody), how]
bus.on('shownMsg', ({ k, a }) => {
  if (k !== 'fell' || a[0] !== G.myTi) return;
  D.info = { by: a[2] != null && a[2] >= 0 && isEnemyTi(a[2], G.myTi) ? a[2] : -1, how: a[3] || 'sword' }; D.can = !!a[1];
  if (D.on) fill();
});
// seconds until you're back: the host has the clock itself; a joined phone gets whole seconds, and counts between them
function remaining(now) {
  const s = G.teams && G.teams[G.myTi]; if (!s) return 9;
  if (G.role !== 'client') return s.leaderDeadT;
  const v = s.leaderDeadT | 0; if (v !== D.v) { D.v = v; D.vAt = now; }
  return Math.max(0, v - (now - D.vAt) / 1000);
}
// every frame of a battle, before the camera and the draw
export function deathTick(now) {
  const p = G.player, F = FEEL.death;
  if (D.seed !== G.seed) { D.seed = G.seed; deathReset(); } // (a new battle)
  if (p && !p.dead) {
    if (D.on && p !== D.body) { // back on your feet: the move home happens under black
      stop(); cut(now); cam.yaw = p.face;
    }
    D.last = p;
  } else if (!D.on && D.last && D.last.dead && G.state === 'play') start(now);
  if (D.black === 3 && now - D.blackAt >= F.hold * 1000) { setBlack(0, F.fadeIn); D.black = 0; }
  if (!D.on) return;
  if (G.state !== 'play') { stop(); D.last = null; if (D.black) { setBlack(0, F.fadeIn); D.black = 0; } return; } // (F7: the battle ended on a dark screen: it comes back in, no snap)
  const rem = remaining(now);
  if (D.can) {
    const n = String(Math.max(1, Math.ceil(rem))); if ($('dNum').textContent !== n) $('dNum').textContent = n;
    if (!D.black && !D.gaveUp && rem <= F.fadeOut && now - D.t0 > 600) { setBlack(1, F.fadeOut); D.black = 1; D.blackAt = now; }
    if (D.black === 1 && now - D.blackAt >= F.fadeOut * 1000) D.black = 2;
    if (D.black && now - D.blackAt > F.blackMax * 1000) { setBlack(0, F.fadeIn); D.black = 0; D.gaveUp = true; } // (the respawn never came: don't leave the screen black)
  } else if (now - D.t0 > F.watch * 1000) { stop(); cut(now); } // (no way back: after a look at where he fell, on to an ally)
}
