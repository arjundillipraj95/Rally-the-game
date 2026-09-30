// First-battle coach: a short card that walks a new player through the captain's controls, one
// thing at a time, moving on as soon as they've actually done it. Shown once per device (solo only);
// Skip ends it for good.
import { G } from '../core/state.js';
import { sfx } from './audio.js';

const $ = id => document.getElementById(id);
const KEY = 'rally-tutorial-done';
const seen = () => { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return true; } };
const markSeen = () => { try { localStorage.setItem(KEY, '1'); } catch (e) {} };
const touch = matchMedia('(pointer: coarse)').matches;

const GOALS = { conquest: 'Now lead your army and tear down the enemy castles.', dm: 'Now fight: the last side with tickets wins.',
  ctf: 'Now grab the banner in the centre fort and carry it home.', ctrl: 'Now take and hold the lettered points on the map.' };

// Each step: what to do, how (touch / keyboard), which button to highlight, and when it's done.
const STEPS = [
  { t: 'Move', s: touch ? 'Drag on the left of the screen' : 'W A S D', hi: 'joyhint',
    start: (p, c) => { c.x = p.x; c.z = p.z; }, done: (p, c) => Math.hypot(p.x - c.x, p.z - c.z) > 5 },
  { t: 'Attack three times, fast', s: touch ? 'Tap the red button: the 3rd hit is a heavy blow' : 'Space ×3: the 3rd hit is a heavy blow', hi: 'atk',
    done: p => p.combo === 2 && G.T - p.lastSwingT < 1 },
  { t: 'Jump, then attack in mid-air', s: touch ? 'A slam that hits everyone in front of you' : 'C, then Space: slams everyone in front of you', hi: 'jmp',
    start: (p, c) => { c.n = p.leaps || 0; }, done: (p, c) => (p.leaps || 0) > c.n },
  { t: 'Pick a weapon', s: touch ? 'Press the weapon button and slide onto Spear or Javelins' : 'R: Sword → Spear → Javelins', hi: 'wpn',
    start: (p, c) => { c.w = p.weapon; }, done: (p, c) => p.weapon !== c.w },
  { t: 'Give your squad an order', s: touch ? 'The Follow button: Follow, Hold, Charge, Shieldwall' : 'Q follow · F hold · E charge · T shieldwall', hi: 'cmdBtn',
    start: (p, c) => { c.o = G.teams[G.myTi].order; }, done: (p, c) => G.teams[G.myTi].order !== c.o },
  { t: 'Hire a soldier', s: touch ? 'The recruit button, then Footman or Archer' : '1 footman · 2 archer', hi: 'recBtn',
    start: (p, c) => { c.r = G.recruited; }, done: (p, c) => G.recruited > c.r },
];

let step = -1, ctx = {}, hiEl = null, doneT = 0;
function highlight(id) {
  if (hiEl) hiEl.classList.remove('coach-hi');
  hiEl = id ? $(id) : null;
  if (hiEl) hiEl.classList.add('coach-hi');
}
function render() {
  const st = STEPS[step];
  $('coachN').textContent = `${step + 1} / ${STEPS.length}`;
  $('coachT').textContent = st.t; $('coachS').textContent = st.s;
  highlight(st.hi);
}
function go(i) {
  step = i; ctx = {};
  if (step >= STEPS.length) { finish(true); return; }
  const p = G.player; if (p && STEPS[step].start) STEPS[step].start(p, ctx);
  render();
}
function finish(completed) {
  markSeen(); highlight(null);
  if (completed) {
    $('coachN').textContent = 'Ready'; $('coachT').textContent = 'You know the basics'; $('coachS').textContent = GOALS[G.mode] || '';
    $('coachSkip').hidden = true; doneT = 4.5; step = STEPS.length; sfx.order();
  } else { $('coach').hidden = true; step = -1; }
}

// Called when a match starts. Only the very first solo battle on this device gets the coach.
export function startTutorial() {
  $('coach').hidden = true; highlight(null); step = -1; doneT = 0;
  if (seen() || G.role !== 'solo') return;
  $('coach').hidden = false; $('coachSkip').hidden = false;
  go(0);
}
export function stopTutorial() { $('coach').hidden = true; highlight(null); step = -1; }
// Called ~10 times a second while playing.
export function tutorialTick(dt) {
  if (step < 0) return;
  if (doneT > 0) { doneT -= dt; if (doneT <= 0) stopTutorial(); return; }
  const p = G.player; if (!p || p.dead || G.state !== 'play') return;
  if (STEPS[step].done(p, ctx)) { sfx.coin(); go(step + 1); }
}
export function bindTutorial() {
  $('tutAgain').addEventListener('click', () => { try { localStorage.removeItem(KEY); } catch (e) {} $('tutAgain').textContent = 'The tutorial will show in your next battle'; });
  $('coachSkip').addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); finish(false); });
}
