// The 2D layer drawn over the 3D view: sparks, floating text, health bars, names,
// the banner pointer, the joystick and the red tint while you are down. Also the minimap.
import * as THREE from 'three';
import { TEAMS } from '../config.js';
import { G, isEnemyTi, isFfa, colorOf } from '../core/state.js';
import { groundY, clamp } from '../core/world.js';
import { camera, view } from './scene.js';
import { cam } from './camera.js';
import { parts, floats } from './effects.js';

const fx = document.getElementById('fx'), ctx = fx.getContext('2d');
const mini = document.getElementById('mini'), mctx = mini.getContext('2d');
const v3 = new THREE.Vector3(), v3b = new THREE.Vector3();

export function resizeOverlay() { fx.width = Math.round(view.W * view.DPR); fx.height = Math.round(view.H * view.DPR); }
function proj(x, y, z) { v3.set(x, y, z).project(camera); return v3.z <= 1 ? [(v3.x + 1) / 2 * view.W, (1 - v3.y) / 2 * view.H, true] : [0, 0, false]; }
export function clearOverlay() { ctx.setTransform(view.DPR, 0, 0, view.DPR, 0, 0); ctx.clearRect(0, 0, view.W, view.H); }

// opts: { joy, nickFor(ti) }
export function drawOverlay(opts) {
  const W = view.W, H = view.H;
  clearOverlay();
  for (const q of parts) {
    const [sx, sy, ok] = proj(q.x, q.y, q.z); if (!ok) continue;
    const d = camera.position.distanceTo(v3b.set(q.x, q.y, q.z));
    const s = q.s * clamp(14 / d, .3, 2.5);
    ctx.globalAlpha = Math.min(1, q.life * 2); ctx.fillStyle = q.c;
    if (q.s > 4) { ctx.beginPath(); ctx.arc(sx, sy, s, 0, Math.PI * 2); ctx.fill(); } else ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
  }
  ctx.globalAlpha = 1; ctx.textAlign = 'center'; ctx.font = 'italic 20px Bangers, Impact, sans-serif';
  for (const f of floats) {
    const [sx, sy, ok] = proj(f.x, f.y, f.z); if (!ok) continue;
    ctx.globalAlpha = 1 - f.t / 1.3; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.strokeText(f.text, sx, sy); ctx.fillStyle = f.color; ctx.fillText(f.text, sx, sy);
  }
  ctx.globalAlpha = 1;
  const player = G.player;
  if (G.state === 'play') {
    for (const u of G.units) {
      if (u.dead || u === player || (u.hp >= u.max - .5 && !u.leader)) continue;
      const d = Math.hypot(u.x - camera.position.x, u.z - camera.position.z); if (d > 34) continue;
      const [sx, sy, ok] = proj(u.x, u.y + (u.leader ? 3.2 : 2.8) + (u.mounted ? 1.2 : 0), u.z); if (!ok) continue;
      const w = u.leader ? 40 : 26;
      ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(sx - w / 2, sy, w, 4);
      ctx.fillStyle = TEAMS[colorOf(u.ti)].css; ctx.fillRect(sx - w / 2, sy, w * Math.max(0, u.hp / u.max), 4);
      if (u.leader && G.teams[u.ti] && G.teams[u.ti].human && opts.nickFor) {
        const nick = opts.nickFor(u.ti);
        if (nick) { ctx.font = '800 12px "Barlow Semi Condensed", sans-serif'; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.strokeText(nick, sx, sy - 6); ctx.fillStyle = '#fff'; ctx.fillText(nick, sx, sy - 6); }
      }
      if (G.mode === 'dm' && u.leader && u.ti === G.bounty) {
        ctx.font = 'italic 16px Bangers, Impact, sans-serif'; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.6)';
        ctx.strokeText('BOUNTY', sx, sy - 20); ctx.fillStyle = '#ffcf3a'; ctx.fillText('BOUNTY', sx, sy - 20);
      }
    }
    drawStars();
    if (G.flag) drawFlagPointer();
    if (G.mode === 'ctrl') drawControlLabels();
    if (G.mode === 'dm' && G.bounty === G.myTi && player && !player.dead && (performance.now() / 500 % 1) < .7) {
      ctx.font = 'italic 18px Bangers, Impact, sans-serif'; ctx.fillStyle = '#ffcf3a'; ctx.fillText('BOUNTY ON YOU', W / 2, 118);
    }
  }
  const joy = opts.joy;
  if (joy && joy.active) {
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(joy.ox, joy.oy, 50, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(joy.ox + joy.x * 50, joy.oy + joy.y * 50, 22, 0, Math.PI * 2); ctx.fill();
  }
  if (G.state === 'play' && (!player || player.dead)) { ctx.fillStyle = 'rgba(120,0,0,.18)'; ctx.fillRect(0, 0, W, H); }
  drawMini();
}

// Stunned soldiers see stars: three little ones circling the head.
function drawStars() {
  const now = performance.now() / 1000;
  ctx.textAlign = 'center';
  for (const u of G.units) {
    if (u.dead || !u.seesStars) continue;
    const d = Math.hypot(u.x - camera.position.x, u.z - camera.position.z); if (d > 30) continue;
    const sz = clamp(260 / d, 9, 20), hy = u.y + (u.leader ? 2.75 : 2.4) + (u.mounted ? 1.2 : 0);
    for (let k = 0; k < 3; k++) {
      const a = now * 5 + k * 2.094 + u.id, [sx, sy, ok] = proj(u.x + Math.cos(a) * .45, hy + Math.sin(a * 2) * .06, u.z + Math.sin(a) * .45); if (!ok) continue;
      ctx.font = `${sz}px sans-serif`; ctx.lineWidth = 2.5; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.strokeText('★', sx, sy); ctx.fillStyle = '#ffd84a'; ctx.fillText('★', sx, sy);
    }
  }
}
function drawControlLabels() {
  const cps = G.ctrlPoints; if (!cps) return;
  for (const p of cps) {
    const [sx, sy, ok] = proj(p.x, 3.4, p.z); if (!ok) continue;
    const col = p.owner >= 0 ? TEAMS[colorOf(p.owner)].css : '#c9c9c0';
    ctx.font = '800 20px "Barlow Semi Condensed", sans-serif'; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.6)';
    ctx.strokeText(p.letter, sx, sy); ctx.fillStyle = col; ctx.fillText(p.letter, sx, sy);
    if (p.capturer != null && p.capturer !== p.owner && p.prog > 0) {
      const w = 34; ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(sx - w / 2, sy + 8, w, 4);
      ctx.fillStyle = TEAMS[colorOf(p.capturer)].css; ctx.fillRect(sx - w / 2, sy + 8, w * Math.min(1, p.prog), 4);
    }
  }
}
function drawFlagPointer() {
  const W = view.W, H = view.H, flag = G.flag;
  const c = flag.state === 'carried' ? flag.carrier : null;
  if (c && c === G.player) return;
  const x = c ? c.x : flag.x, z = c ? c.z : flag.z, y = (c ? c.y : groundY(x, z)) + 3.4;
  const col = c ? TEAMS[colorOf(c.ti)].css : '#ffffff';
  v3.set(x, y, z).project(camera);
  let sx = (v3.x + 1) / 2 * W, sy = (1 - v3.y) / 2 * H;
  const behind = v3.z > 1;
  if (behind) { sx = W - sx; sy = H - 40; }
  const m = 60, onScreen = !behind && sx > m && sx < W - m && sy > m && sy < H - m;
  ctx.font = 'italic 15px Bangers, Impact, sans-serif'; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.6)';
  if (onScreen) {
    const label = c ? `${TEAMS[colorOf(c.ti)].name.toUpperCase()} CARRIER` : 'BANNER';
    ctx.strokeText(label, sx, sy); ctx.fillStyle = col; ctx.fillText(label, sx, sy);
    return;
  }
  const cx = W / 2, cy = H / 2, ang = Math.atan2(sy - cy, sx - cx);
  const ex = clamp(cx + Math.cos(ang) * W, m, W - m), ey = clamp(cy + Math.sin(ang) * H, m + 50, H - m - 20);
  ctx.save(); ctx.translate(ex, ey); ctx.rotate(ang);
  ctx.fillStyle = col; ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(-8, -11); ctx.lineTo(-8, 11); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}

// Walls, buildings, rocks and trees drawn once per map onto their own layer.
let miniLayer = null, miniFor = null;
function buildMiniLayer(S, k) {
  miniFor = G.layout; miniLayer = miniLayer || document.createElement('canvas'); miniLayer.width = miniLayer.height = S;
  const c = miniLayer.getContext('2d'); c.clearRect(0, 0, S, S); c.save(); c.translate(S / 2, S / 2);
  c.fillStyle = G.map.id === 'forest' ? 'rgba(47,90,52,.7)' : 'rgba(20,18,16,.55)';
  for (const ob of G.layout.obstacles) {
    if (ob.castle) continue;
    if (ob.box) { c.save(); c.translate(ob.x * k, ob.z * k); c.rotate(-ob.rot); c.fillRect(-ob.hw * k, -ob.hd * k, ob.hw * 2 * k, ob.hd * 2 * k); c.restore(); }
    else { const r = Math.max(1.2, ob.r * k); c.fillRect(ob.x * k - r, ob.z * k - r, r * 2, r * 2); }
  }
  if (G.layout.round) { c.strokeStyle = 'rgba(20,18,16,.6)'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, G.layout.round * k, 0, Math.PI * 2); c.stroke(); }
  c.restore();
}
function drawMini() {
  if (G.state !== 'play') return;
  const S = mini.width, k = S / 190, o = S / 2;
  mctx.clearRect(0, 0, S, S);
  mctx.save(); mctx.translate(o, o); mctx.rotate(cam.yaw + Math.PI);
  const id = G.map.id;
  if (id === 'river') { mctx.fillStyle = 'rgba(63,127,166,.8)'; mctx.fillRect(-95 * k, -5 * k, 190 * k, 10 * k); mctx.fillStyle = 'rgba(107,74,46,.9)'; mctx.fillRect(-34.5 * k, -7 * k, 5 * k, 14 * k); mctx.fillRect(29.5 * k, -7 * k, 5 * k, 14 * k); }
  if (id === 'frost') { mctx.fillStyle = 'rgba(255,255,255,.2)'; mctx.beginPath(); mctx.arc(0, 0, 24 * k, 0, Math.PI * 2); mctx.fill(); }
  if (G.layout) { if (miniFor !== G.layout) buildMiniLayer(S, k); mctx.drawImage(miniLayer, -o, -o); }
  TEAMS.forEach((t, i) => {
    mctx.fillStyle = (G.mode !== 'conquest' || G.teams[i].alive) ? t.css : '#555'; mctx.fillRect(t.pos[0] * k - 9, t.pos[1] * k - 9, 18, 18);
    if (!isFfa() && !isEnemyTi(i, G.myTi)) { mctx.strokeStyle = '#fff'; mctx.lineWidth = 2; mctx.strokeRect(t.pos[0] * k - 9, t.pos[1] * k - 9, 18, 18); }
  });
  for (const u of G.units) { if (u.dead) continue; mctx.fillStyle = TEAMS[colorOf(u.ti)].css; const s = u.leader ? 6 : 3.5; mctx.fillRect(u.x * k - s / 2, u.z * k - s / 2, s, s); }
  if (G.flag) {
    const fc = G.flag.state === 'carried' && G.flag.carrier ? G.flag.carrier : G.flag;
    mctx.fillStyle = '#fff'; mctx.strokeStyle = '#000'; mctx.lineWidth = 1.5; mctx.beginPath(); mctx.arc(fc.x * k, fc.z * k, 5, 0, Math.PI * 2); mctx.fill(); mctx.stroke();
  }
  mctx.restore();
  mctx.fillStyle = '#fff'; mctx.beginPath(); mctx.moveTo(o, o - 8); mctx.lineTo(o - 5, o + 5); mctx.lineTo(o + 5, o + 5); mctx.fill();
}
