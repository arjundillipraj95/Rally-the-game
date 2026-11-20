// Touch joystick, camera drag, hold/tap buttons and keyboard.
// Produces a move vector already turned by the camera; buttons call the actions main.js hands in.
import { G } from '../core/state.js';
import { clamp } from '../core/world.js';
import { view } from '../render/scene.js';
import { cam } from '../render/camera.js';
import { initAudio } from './audio.js';
import { floatText } from '../render/effects.js';
import { aimStart, aimMove, aimEnd, aimCancel } from './volleyaim.js';
import { holdStart, holdMove, holdEnd, holdCancel, hold as holdSt } from './holdaim.js';
import * as AB from './abilaim.js';
import { RALLY, PINGS } from '../config.js';
import { miniToWorld } from './pings.js';
import { installUpInfo } from './upinfo.js';

const $ = id => document.getElementById(id);
export const inp = { joy: { active: false, id: null, ox: 0, oy: 0, x: 0, y: 0 }, look: { id: null, lx: 0, ly: 0 }, keys: {}, attackHeld: false, blockHeld: false, trayIsOpen: false, upIsOpen: false };
let A = { rally() {}, attack() {}, ride() {}, order() {}, recruit() {}, upgrade() {}, volley() {}, jump() {}, weapon() {}, duel() {} };

export function trayOpen(on) { inp.trayIsOpen = on; $('tray').hidden = !on; $('recBtn').classList.toggle('open', on); if (on) upOpen(false); }
export function upOpen(on) { inp.upIsOpen = on; $('upTray').hidden = !on; $('upBtn').classList.toggle('open', on); if (on) trayOpen(false); }
// the weapon wheel: open around the Weapon button; closes by itself if left alone
let wheelT = 0;
function volleyTip() {
  let n = 0; try { n = +localStorage.getItem('rally-volley-tip') || 0; localStorage.setItem('rally-volley-tip', n + 1); } catch (_) { n = 9; }
  if (n < 2 && G.player) floatText(G.player.x, G.player.y + 3.4, G.player.z, 'Tip: hold Volley and slide to aim', '#ffcf3a');
}
function holdTip() {
  let n = 0; try { n = +localStorage.getItem('rally-hold-tip') || 0; localStorage.setItem('rally-hold-tip', n + 1); } catch (_) { n = 9; }
  if (n < 2 && G.player) floatText(G.player.x, G.player.y + 3.4, G.player.z, 'Tip: press Order and drag to place the line', '#ffcf3a');
}
const mouse = { x: 0, y: 0 };
export function wheelOpen(on) {
  inp.wheelIsOpen = on; const w = $('wheel'); $('wpn').classList.toggle('open', on);
  clearTimeout(wheelT);
  if (on) { w.hidden = false; requestAnimationFrame(() => w.classList.add('show')); }
  else { w.classList.remove('show'); w.hidden = true; w.querySelectorAll('.hot').forEach(b => b.classList.remove('hot')); }
}
export function releaseAll() { inp.keys = {}; inp.attackHeld = inp.blockHeld = false; inp.joy.active = false; inp.joy.x = inp.joy.y = 0; inp.look.id = null; }

// the stick as it is right now (for the evade's direction), without turning the camera
export function moveNow() {
  const { joy, keys } = inp; let mx = joy.x, my = joy.y;
  if (keys.KeyA) mx -= 1; if (keys.KeyD) mx += 1; if (keys.KeyW) my -= 1; if (keys.KeyS) my += 1; if (keys.ArrowUp) my -= 1; if (keys.ArrowDown) my += 1;
  let mag = Math.hypot(mx, my); if (mag > 1) { mx /= mag; my /= mag; mag = 1; }
  const y = cam.yaw, fx = Math.sin(y), fz = Math.cos(y), rx = -Math.cos(y), rz = Math.sin(y);
  return { wx: fx * (-my) + rx * mx, wz: fz * (-my) + rz * mx, mag };
}
export function readMove(dt) {
  const { joy, keys } = inp;
  let mx = joy.x, my = joy.y;
  if (keys.KeyA) mx -= 1; if (keys.KeyD) mx += 1; if (keys.KeyW) my -= 1; if (keys.KeyS) my += 1;
  if (keys.ArrowLeft) cam.yaw += dt * 2.4; if (keys.ArrowRight) cam.yaw -= dt * 2.4;
  if (keys.ArrowUp) my -= 1; if (keys.ArrowDown) my += 1;
  let mag = Math.hypot(mx, my); if (mag > 1) { mx /= mag; my /= mag; mag = 1; }
  const y = cam.yaw, fx = Math.sin(y), fz = Math.cos(y), rx = -Math.cos(y), rz = Math.sin(y);
  return { wx: fx * (-my) + rx * mx, wz: fz * (-my) + rz * mx, mag, block: inp.blockHeld, attackHeld: inp.attackHeld, camYaw: y };
}

export function bindInput(actions) {
  A = actions;
  const endPtr = e => { const { joy, look } = inp; if (e.pointerId === joy.id) { joy.active = false; joy.id = null; joy.x = joy.y = 0; } if (e.pointerId === look.id) look.id = null; };
  AB.setChargeEnd(() => { if (AB.aim.on && AB.aim.charge) { AB.aimCancel(); A.chargeEnd && A.chargeEnd(false); } }); // (FIX9)
  const touch = $('touch'), { joy, look } = inp;
  // (FIX12) two thumbs: a thumb whose lift was lost (it ended on a button, the phone took the touch) must never keep the
  // stick or the camera to itself: every finger on the screen is tracked, and one that's gone frees its job
  const live = new Set();
  addEventListener('pointerdown', e => live.add(e.pointerId), true);
  const gone = e => { live.delete(e.pointerId); endPtr(e); };
  addEventListener('pointerup', gone, true); addEventListener('pointercancel', gone, true);
  touch.addEventListener('pointerdown', e => {
    if (G.state !== 'play') return; initAudio(); e.preventDefault(); trayOpen(false); upOpen(false); if (inp.wheelIsOpen) wheelOpen(false);
    if (joy.active && !live.has(joy.id)) { joy.active = false; joy.id = null; joy.x = joy.y = 0; }
    if (look.id !== null && !live.has(look.id)) look.id = null;
    if (e.clientX < view.W * .42 && !joy.active) {
      joy.active = true; joy.id = e.pointerId; joy.ox = e.clientX; joy.oy = e.clientY; joy.x = joy.y = 0; $('joyhint').style.opacity = 0;
    } else if (look.id === null) { look.id = e.pointerId; look.lx = e.clientX; look.ly = e.clientY; }
    try { touch.setPointerCapture(e.pointerId); } catch (_) {}
  });
  touch.addEventListener('pointermove', e => {
    if (e.pointerId === joy.id) {
      const dx = e.clientX - joy.ox, dy = e.clientY - joy.oy, R = 50, d = Math.hypot(dx, dy);
      if (d > R) { joy.ox += dx * (1 - R / d) * .4; joy.oy += dy * (1 - R / d) * .4; }
      joy.x = clamp(dx / R, -1, 1); joy.y = clamp(dy / R, -1, 1); const m = Math.hypot(joy.x, joy.y); if (m > 1) { joy.x /= m; joy.y /= m; }
    } else if (e.pointerId === look.id) {
      cam.yaw -= (e.clientX - look.lx) * .0075; cam.pitch = clamp(cam.pitch + (e.clientY - look.ly) * .004, .12, .75);
      look.lx = e.clientX; look.ly = e.clientY;
    }
  });
  touch.addEventListener('pointerup', endPtr); touch.addEventListener('pointercancel', endPtr); touch.addEventListener('lostpointercapture', endPtr);

  const holdBtn = (el, on, off) => {
    el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); initAudio(); try { el.setPointerCapture(e.pointerId); } catch (_) {} el.classList.add('held'); on(); });
    const up = () => { el.classList.remove('held'); off(); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('lostpointercapture', up);
  };
  const tapBtn = (el, fn) => {
    el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); initAudio(); fn(); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } });
  };
  holdBtn($('atk'), () => { inp.attackHeld = true; A.attack(); }, () => { inp.attackHeld = false; });
  holdBtn($('blk'), () => { inp.blockHeld = true; }, () => { inp.blockHeld = false; });
  tapBtn($('mnt'), () => A.ride());
  { // (BS2) the army ult: a tap sounds it the way you face, a drag places it, back onto the button cancels; not full: says so
    const el = $('armyBtn');
    el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); initAudio();
      if (!el.classList.contains('ready')) { A.rally(); return; } try { el.setPointerCapture(e.pointerId); } catch (_) {} AB.aimStart(3, el, e); });
    el.addEventListener('pointermove', e => AB.aimMove(e));
    el.addEventListener('pointerup', () => { const at = AB.aimEnd(); if (at) A.rally(at.x != null ? at : null); });
    el.addEventListener('pointercancel', () => AB.aimCancel());
  }
  tapBtn($('fortBtn'), () => A.upgrade('fort')); // (BS3)
  tapBtn($('jmp'), () => A.jump());
  [1, 2, 3].forEach(k => { // (C1c; C3l: press and drag to aim, let go to fire, back onto the button to cancel; a tap fires as before)
    const el = $('ab' + k);
    // (BS1) in a duel, Special 1 is Block (held) and Special 2 is Evade (a tap)
    const duelSw = () => k < 3 && el.classList.contains('duelSw');
    el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); initAudio();
      if (duelSw()) { el.classList.add('held'); if (k === 1) inp.blockHeld = true; else A.jump(); return; }
      if (A.chargeOf && A.chargeOf(k - 1)) { if (A.chargeStart(k - 1)) { try { el.setPointerCapture(e.pointerId); } catch (_) {} AB.aimStart(k - 1, el, e, true); } return; } // (FIX9: drawn while held)
      if (!A.abilityReady || A.abilityReady(k - 1)) { try { el.setPointerCapture(e.pointerId); } catch (_) {} AB.aimStart(k - 1, el, e); } });
    el.addEventListener('pointermove', e => { AB.aimMove(e); if (AB.aim.on && AB.aim.charge) { const a = AB.dragAngle(); if (a != null) A.chargeAim(a); } });
    el.addEventListener('pointerup', () => { el.classList.remove('held'); if (k === 1) inp.blockHeld = false;
      if (AB.aim.on && AB.aim.charge) { const cancel = AB.aim.cancel; AB.aimCancel(); A.chargeEnd(cancel); return; }
      const at = AB.aimEnd(); if (at && A.ability) A.ability(k - 1, at.x != null ? at : null); });
    el.addEventListener('pointercancel', () => { el.classList.remove('held'); if (k === 1) inp.blockHeld = false; const ch = AB.aim.on && AB.aim.charge; AB.aimCancel(); if (ch) A.chargeEnd(false); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); A.ability && A.ability(k - 1); } });
  });
  // Weapon: press opens the wheel; slide onto a weapon and let go to take it, or let go on the button
  // and tap one. Either way it's one quick gesture, not cycling through the ones you don't want.
  const wpn = $('wpn'), chips = [...document.querySelectorAll('#wheel button')];
  // the chip nearest the finger, if it's on or close to one (a little generous: thumbs are fat)
  const chipAt = (x, y) => {
    let best = null, bd = 1e9;
    for (const b of chips) { const r = b.getBoundingClientRect(), d = Math.hypot(x - (r.x + r.width / 2), y - (r.y + r.height / 2)); if (d < r.width * .75 && d < bd) { bd = d; best = b; } }
    return best;
  };
  let wheelDrag = null;
  wpn.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation(); initAudio();
    if (inp.wheelIsOpen) { wheelOpen(false); return; }
    wheelOpen(true); wheelDrag = e.pointerId; try { wpn.setPointerCapture(e.pointerId); } catch (_) {}
  });
  wpn.addEventListener('pointermove', e => {
    if (e.pointerId !== wheelDrag) return;
    const c = chipAt(e.clientX, e.clientY); chips.forEach(b => b.classList.toggle('hot', b === c));
  });
  const wpnUp = e => {
    if (e.pointerId !== wheelDrag) return; wheelDrag = null;
    const c = e.type === 'pointerup' ? chipAt(e.clientX, e.clientY) : null;
    if (c) { A.weapon(c.dataset.w); wheelOpen(false); }
    else if (inp.wheelIsOpen) { clearTimeout(wheelT); wheelT = setTimeout(() => wheelOpen(false), 3000); } // left open for a tap: tidy it away if unused
  };
  wpn.addEventListener('pointerup', wpnUp); wpn.addEventListener('pointercancel', wpnUp);
  wpn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); wheelOpen(!inp.wheelIsOpen); } });
  chips.forEach(b => tapBtn(b, () => { A.weapon(b.dataset.w); wheelOpen(false); }));
  // Volley: tap to loose at will; hold and slide to put the target ring where you want it, let go to fire
  const vly = $('vly'); let vlyPtr = null;
  vly.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation(); initAudio();
    if (!aimStart(e.clientX, e.clientY)) { A.volley(); return; } // (on cooldown: the button just says so)
    vlyPtr = e.pointerId; vly.classList.add('held'); try { vly.setPointerCapture(e.pointerId); } catch (_) {}
  });
  vly.addEventListener('pointermove', e => { if (e.pointerId === vlyPtr) aimMove(e.clientX, e.clientY, e.pointerType !== 'mouse'); });
  const vlyUp = e => {
    if (e.pointerId !== vlyPtr) return; vlyPtr = null; vly.classList.remove('held');
    if (e.type === 'pointerup') {
      const pt = aimEnd(); if (pt !== undefined) A.volley(pt);
      if (pt === null) volleyTip(); // a plain tap: mention, once or twice, that it can be aimed
    } else aimCancel();
  };
  vly.addEventListener('pointerup', vlyUp); vly.addEventListener('pointercancel', vlyUp);
  vly.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); A.volley(); } });
  // keyboard: hold V and point with the mouse
  addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; if (e.pointerType === 'mouse' && inp.keys.KeyV) aimMove(e.clientX, e.clientY, false); });
  // Order: tap to step to the next order; press and drag to place a held line where you point
  // (drag onto enemy men: attack that group; with the rally horn full, press and hold still: sound it)
  const cmd = $('cmdBtn'); let cmdPtr = null, rallyT = null, rallied = false;
  // a tap steps to the next order; a quick double tap: Follow me (from whatever it was)
  let lastTapAt = 0;
  const tapOrder = () => {
    const now = performance.now();
    if (now - lastTapAt < 330) { lastTapAt = 0; A.order('follow'); return; }
    lastTapAt = now; A.order(); if (G.teams[G.myTi] && G.teams[G.myTi].order === 'hold') holdTip();
  };
  cmd.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation(); initAudio();
    if (!holdStart(e.clientX, e.clientY)) { tapOrder(); return; }
    cmdPtr = e.pointerId; cmd.classList.add('held'); rallied = false; try { cmd.setPointerCapture(e.pointerId); } catch (_) {}
    const me = G.teams[G.myTi];
    clearTimeout(rallyT);
    if (me && me.rally >= 100) rallyT = setTimeout(() => { if (cmdPtr === e.pointerId && !holdSt.moved) { rallied = true; holdCancel(); A.rally(); } }, RALLY.hold * 1000);
  });
  cmd.addEventListener('pointermove', e => { if (e.pointerId === cmdPtr) holdMove(e.clientX, e.clientY, e.pointerType !== 'mouse'); });
  const cmdUp = e => {
    if (e.pointerId !== cmdPtr) return; cmdPtr = null; cmd.classList.remove('held'); clearTimeout(rallyT);
    if (rallied) return;
    if (e.type !== 'pointerup') { holdCancel(); return; }
    const pt = holdEnd();
    if (pt && pt.focus) A.order('focus', pt);
    else if (pt) A.order('hold', pt); else tapOrder();
  };
  cmd.addEventListener('pointerup', cmdUp); cmd.addEventListener('pointercancel', cmdUp);
  cmd.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); A.order(); } });
  tapBtn($('recBtn'), () => trayOpen(!inp.trayIsOpen));
  const shoutOpen = on => { $('shoutTray').hidden = !on; $('shoutBtn').classList.toggle('open', on); };
  tapBtn($('shoutBtn'), () => shoutOpen($('shoutTray').hidden));
  document.querySelectorAll('#shoutTray button').forEach(b => tapBtn(b, () => { const n = +b.dataset.s, p = G.player; A.shout(n, n >= PINGS.from && p ? (n === PINGS.from ? { x: p.x + Math.sin(p.face) * 8, z: p.z + Math.cos(p.face) * 8 } : { x: p.x, z: p.z }) : null); shoutOpen(false); })); // (BS2: a ping marks a place: ahead of you for Attack, where you stand for the rest)
  $('mini').addEventListener('pointerdown', e => { if (!document.body.classList.contains('bs')) return; e.preventDefault(); e.stopPropagation(); const pt = miniToWorld(e); if (pt) A.shout(PINGS.from, pt); }); // (BS2: tap the minimap: Attack here!)
  document.querySelectorAll('#tray button').forEach(b => tapBtn(b, () => A.recruit(b.dataset.kind)));
  tapBtn($('upBtn'), () => upOpen(!inp.upIsOpen));
  document.querySelectorAll('#upTray button').forEach(b => tapBtn(b, () => A.upgrade(b.dataset.up)));
  installUpInfo(); // (ARCH2: an "i" on each upgrade: what it changes)

  addEventListener('keydown', e => {
    if (G.state !== 'play') return; if (e.target && e.target.tagName === 'INPUT') return;
    initAudio(); inp.keys[e.code] = true;
    if (e.code === 'Space') { e.preventDefault(); inp.attackHeld = true; if (!e.repeat) A.attack(); }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') inp.blockHeld = true;
    if (e.repeat) return;
    if (e.code === 'KeyQ') A.order('follow');
    if (e.code === 'KeyF') A.order('hold');
    if (e.code === 'KeyE') A.order('charge');
    if (e.code === 'KeyT') A.order('shieldwall');
    if (e.code === 'KeyG') A.rally();
    if (e.code === 'KeyV') { if (aimStart(mouse.x, mouse.y)) aimMove(mouse.x, mouse.y, false, true); else A.volley(); } // aims at the mouse
    if (e.code === 'KeyC') A.jump();
    if (e.code === 'KeyX') A.duel();
    { const k = ['KeyJ', 'KeyK', 'KeyL'].indexOf(e.code); if (k >= 0 && A.ability) A.ability(k); } // (C1c)
    if (e.code === 'KeyR') A.weapon();
    if (e.code === 'KeyU') upOpen(!inp.upIsOpen);
    if (e.code === 'KeyG') { const t = $('shoutTray'); t.hidden = !t.hidden; $('shoutBtn').classList.toggle('open', !t.hidden); }
    const up = ['Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9'].indexOf(e.code);
    if (up >= 0) A.upgrade(['foot1', 'foot2', 'arch1', 'arch2', 'aura', 'horse', 'fort'][up]);
    if (e.code === 'KeyH') A.ride();
    if (e.code === 'Digit1') A.recruit('foot'); if (e.code === 'Digit2') A.recruit('arch');
  });
  addEventListener('keyup', e => { if (e.code === 'KeyV') { const pt = aimEnd(); if (pt !== undefined) A.volley(pt); }
    inp.keys[e.code] = false; if (e.code === 'Space') inp.attackHeld = false; if (e.code.startsWith('Shift')) inp.blockHeld = false; });
  addEventListener('blur', releaseAll);
}
