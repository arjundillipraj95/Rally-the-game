// Touch joystick, camera drag, hold/tap buttons and keyboard.
// Produces a move vector already turned by the camera; buttons call the actions main.js hands in.
import { G } from '../core/state.js';
import { clamp } from '../core/world.js';
import { view } from '../render/scene.js';
import { cam } from '../render/camera.js';
import { initAudio } from './audio.js';

const $ = id => document.getElementById(id);
export const inp = { joy: { active: false, id: null, ox: 0, oy: 0, x: 0, y: 0 }, look: { id: null, lx: 0, ly: 0 }, keys: {}, attackHeld: false, blockHeld: false, trayIsOpen: false, upIsOpen: false };
let A = { attack() {}, ride() {}, order() {}, recruit() {}, upgrade() {}, volley() {}, jump() {}, weapon() {} };

export function trayOpen(on) { inp.trayIsOpen = on; $('tray').hidden = !on; $('recBtn').classList.toggle('open', on); if (on) upOpen(false); }
export function upOpen(on) { inp.upIsOpen = on; $('upTray').hidden = !on; $('upBtn').classList.toggle('open', on); if (on) trayOpen(false); }
export function releaseAll() { inp.keys = {}; inp.attackHeld = inp.blockHeld = false; inp.joy.active = false; inp.joy.x = inp.joy.y = 0; inp.look.id = null; }

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
  const touch = $('touch'), { joy, look } = inp;
  touch.addEventListener('pointerdown', e => {
    if (G.state !== 'play') return; initAudio(); e.preventDefault(); trayOpen(false); upOpen(false);
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
  const endPtr = e => { if (e.pointerId === joy.id) { joy.active = false; joy.id = null; joy.x = joy.y = 0; } if (e.pointerId === look.id) look.id = null; };
  touch.addEventListener('pointerup', endPtr); touch.addEventListener('pointercancel', endPtr);

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
  tapBtn($('jmp'), () => A.jump());
  tapBtn($('wpn'), () => A.weapon());
  tapBtn($('vly'), () => A.volley());
  tapBtn($('cmdBtn'), () => A.order());
  tapBtn($('recBtn'), () => trayOpen(!inp.trayIsOpen));
  document.querySelectorAll('#tray button').forEach(b => tapBtn(b, () => A.recruit(b.dataset.kind)));
  tapBtn($('upBtn'), () => upOpen(!inp.upIsOpen));
  document.querySelectorAll('#upTray button').forEach(b => tapBtn(b, () => A.upgrade(b.dataset.up)));

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
    if (e.code === 'KeyV') A.volley();
    if (e.code === 'KeyC') A.jump();
    if (e.code === 'KeyR') A.weapon();
    if (e.code === 'KeyU') upOpen(!inp.upIsOpen);
    const up = ['Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8'].indexOf(e.code);
    if (up >= 0) A.upgrade(['foot1', 'foot2', 'arch1', 'arch2', 'aura', 'horse'][up]);
    if (e.code === 'KeyH') A.ride();
    if (e.code === 'Digit1') A.recruit('foot'); if (e.code === 'Digit2') A.recruit('arch');
  });
  addEventListener('keyup', e => { inp.keys[e.code] = false; if (e.code === 'Space') inp.attackHeld = false; if (e.code.startsWith('Shift')) inp.blockHeld = false; });
  addEventListener('blur', releaseAll);
}
