// The 2D layer drawn over the 3D view: sparks, floating text, health bars, names,
// the banner pointer, the joystick and the red tint while you are down. Also the minimap.
import * as THREE from 'three';
import { TEAMS, DUEL, STREAK, RHYTHM, CAPTAIN_COMBAT, ARMOUR, STAMINA, DUEL_DIR } from '../config.js';
import { bus } from '../core/state.js';
import { G, isEnemyTi, isFfa, colorOf, isOut, noCastle } from '../core/state.js';
import { claimed } from '../ui/messages.js';
import { fogGrid } from './fog.js';
import { groundY, clamp, W } from '../core/world.js';
import { camera, view } from './scene.js';
import { cam } from './camera.js';
import { parts, floats, pows } from './effects.js';
import { bubbles } from './banter.js';
import { sideCss } from './holds.js';

const fx = document.getElementById('fx'), ctx = fx.getContext('2d');
const mini = document.getElementById('mini'), mctx = mini.getContext('2d');
const v3 = new THREE.Vector3(), v3b = new THREE.Vector3();

export function resizeOverlay() { fx.width = Math.round(view.W * view.DPR); fx.height = Math.round(view.H * view.DPR); }
export function proj(x, y, z) { v3.set(x, y, z).project(camera); return v3.z <= 1 ? [(v3.x + 1) / 2 * view.W, (1 - v3.y) / 2 * view.H, true] : [0, 0, false]; }
export function clearOverlay() { ctx.setTransform(view.DPR, 0, 0, view.DPR, 0, 0); ctx.clearRect(0, 0, view.W, view.H); }

// opts: { joy, nickFor(ti) }
// A heavy blow being wound up: a red wedge on the ground where it will land, deepening as it comes,
// flashing gold at the glint (the moment to parry).
const windAt = new WeakMap();
function drawWindups() {
  const now = performance.now();
  for (const u of G.units) {
    const on = !u.dead && u.leader && !u.mounted && !u.fog && u !== G.player && (u.windup > 0 || u.heavyCharge > 0);
    if (!on) { windAt.delete(u); continue; }
    if (!windAt.has(u)) windAt.set(u, now);
    if (Math.hypot(u.x - camera.position.x, u.z - camera.position.z) > 30) continue;
    const k = Math.min(1, (now - windAt.get(u)) / 800), R = 3.4, A = .95, n = 10, pts = [[u.x, u.z]];
    for (let i = 0; i <= n; i++) { const a = u.face - A + 2 * A * i / n; pts.push([u.x + Math.sin(a) * R, u.z + Math.cos(a) * R]); }
    ctx.beginPath(); let ok = true;
    pts.forEach(([x, z], i) => { const [px, py, on2] = proj(x, groundY(x, z) + .08, z); if (!on2) ok = false; if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); });
    if (!ok) continue;
    ctx.closePath();
    ctx.fillStyle = u.glint ? 'rgba(255,214,90,.5)' : `rgba(255,70,50,${.1 + .25 * k})`; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = u.glint ? 'rgba(255,240,180,.95)' : `rgba(255,90,60,${.3 + .45 * k})`; ctx.stroke();
  }
}
// Duels: his blow on its way shows as a red arrow on the side it comes from (overhead: above you);
// while you hold Block a gold shield marks the side your guard is turned to. Match them.
let duelTipped = false;
function chevron(x, y, ang, col, a) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.globalAlpha = a;
  ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-10, -14); ctx.lineTo(-4, 0); ctx.lineTo(-10, 14); ctx.closePath();
  ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.stroke(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); ctx.globalAlpha = 1;
}
function shieldMark(x, y) {
  ctx.beginPath(); ctx.moveTo(x - 9, y - 10); ctx.lineTo(x + 9, y - 10); ctx.lineTo(x + 9, y + 1); ctx.quadraticCurveTo(x + 8, y + 9, x, y + 13); ctx.quadraticCurveTo(x - 8, y + 9, x - 9, y + 1); ctx.closePath();
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.stroke(); ctx.fillStyle = '#ffd23a'; ctx.fill();
}
function drawDuelSide() {
  const me = G.player; if (!me || me.dead || !me.duelId) return;
  const d = (G.duels || []).find(x => x.id === me.duelId && x.state === 'on'); if (!d) return;
  const foe = d.a === me ? d.b : d.a; if (!foe || foe.dead) return;
  if (!duelTipped) { duelTipped = true; bus.emit('fighttip', 'duelDir'); }
  if (foe.sideT != null && foe.swingSide != null && G.T - foe.sideT < DUEL_DIR.tell + .12) {
    const th = Math.atan2(me.x - foe.x, me.z - foe.z), lx = Math.cos(th), lz = -Math.sin(th), s = foe.swingSide; // (the side as his blow reckons it)
    const [px, py, ok] = proj(me.x + lx * s * 1.3, me.y + (s ? 1.9 : 3.4), me.z + lz * s * 1.3), [cx, cy] = proj(me.x, me.y + 1.9, me.z);
    if (ok) chevron(px, py, s ? Math.atan2(cy - py, cx - px) : Math.PI / 2, '#ff4a3a', 1);
  }
  if (me.blocking) {
    const th = Math.atan2(foe.x - me.x, foe.z - me.z), g = me.stickSide | 0;
    const [px, py, ok] = proj(me.x + Math.cos(th) * g * 1.0, me.y + (g ? 1.6 : 3.0), me.z - Math.sin(th) * g * 1.0);
    if (ok) shieldMark(px, py);
  }
}
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
  drawPows();
  const player = G.player;
  // your own captain: health (and armour, stamina, horse) over his head, where your eyes already are
  if (G.state === 'play' && player && !player.dead) {
    const [sx, sy, ok] = proj(player.x, player.y + 3.3 + (player.mounted ? 1.2 : 0), player.z);
    if (ok) { const w = 58, k = Math.max(0, player.hp / player.max), low = k < .3;
      ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(sx - w / 2 - 1, sy - 1, w + 2, 8);
      ctx.fillStyle = low ? (Math.sin(G.T * 10) > 0 ? '#ff5a4a' : '#c0302a') : '#b8d43a'; ctx.fillRect(sx - w / 2, sy, w * k, 6);
      let y = sy + 8; const thin = (v, col) => { ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(sx - w / 2, y, w, 3); ctx.fillStyle = col; ctx.fillRect(sx - w / 2, y, w * Math.min(1, Math.max(0, v)), 3); y += 4; };
      const st = player.st ?? STAMINA.max; if (st < STAMINA.max - 1) thin(st / STAMINA.max, st < STAMINA.low ? '#e0703a' : '#f2dc8a');
      if (player.mounted && player.horseK != null) thin(player.horseK, '#b07a42');
      if (player.armour > .5) { ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(sx - w / 2, sy - 5, w, 3); ctx.fillStyle = '#c9d2dc'; ctx.fillRect(sx - w / 2, sy - 5, w * Math.min(1, player.armour / ARMOUR.hp), 3); } }
  }
  if (G.state === 'play') {
    for (const u of G.units) {
      if (u.dead || u.fog || u === player || (u.hp >= u.max - .5 && !u.leader)) continue;
      const d = Math.hypot(u.x - camera.position.x, u.z - camera.position.z); if (d > 34) continue;
      const [sx, sy, ok] = proj(u.x, u.y + (u.leader ? 3.2 : 2.8) + (u.mounted ? 1.2 : 0), u.z); if (!ok) continue;
      const w = u.leader ? 40 : 26;
      ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(sx - w / 2, sy, w, 4);
      ctx.fillStyle = TEAMS[colorOf(u.ti)].css; ctx.fillRect(sx - w / 2, sy, w * Math.max(0, u.hp / u.max), 4);
      if (u.leader && (u.st ?? STAMINA.max) < STAMINA.max - 1) { ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(sx - w / 2, sy + 5, w, 2.5); ctx.fillStyle = u.st < STAMINA.low ? '#e0703a' : '#f2dc8a'; ctx.fillRect(sx - w / 2, sy + 5, w * Math.max(0, u.st) / STAMINA.max, 2.5); } // (stamina, when it's not full)
      if (u.leader && u.armour > .5) { ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(sx - w / 2, sy - 4, w, 3); ctx.fillStyle = '#c9d2dc'; ctx.fillRect(sx - w / 2, sy - 4, w * Math.min(1, u.armour / ARMOUR.hp), 3); } // (armour: a steel bar over the health)
      if (u.leader && u.ti !== G.myTi && opts.nickFor) { // (every captain's name over his head)
        const nick = opts.nickFor(u.ti);
        if (nick) { ctx.font = '800 12px "Barlow Semi Condensed", sans-serif'; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.strokeText(nick, sx, sy - 6); ctx.fillStyle = '#fff'; ctx.fillText(nick, sx, sy - 6);
          // the mountain: an enemy captain your side hasn't cut down yet is worth a point: a gold +1 by his name
          const myMine = G.teams[G.myTi] && G.teams[G.myTi].mine;
          if (myMine && myMine.id === u.id && G.T < myMine.until) { ctx.strokeStyle = '#ffcf3a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(sx, sy - 10, 13 + Math.sin(G.T * 6) * 1.5, 0, Math.PI * 2); ctx.stroke(); } // ("He's mine!": a gold ring round his name)
          const own = G.ALLY[colorOf(G.myTi)];
          if (G.c2 && isEnemyTi(u.ti, G.myTi) && !((G.c2.kills[own] || {})[u.ti]) && !claimed[own + ':' + u.ti]) {
            const tw = ctx.measureText(nick).width, bx = sx + tw / 2 + 12, by = sy - 10;
            ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.beginPath(); ctx.arc(bx, by, 8, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffcf3a'; ctx.font = '800 10px "Barlow Semi Condensed", sans-serif'; ctx.fillText('+2', bx, by + 3.5); ctx.font = '800 12px "Barlow Semi Condensed", sans-serif';
          } }
      }
      if (G.mode === 'dm' && u.leader && u.ti === G.bounty) {
        ctx.font = 'italic 16px Bangers, Impact, sans-serif'; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.6)';
        ctx.strokeText('BOUNTY', sx, sy - 20); ctx.fillStyle = '#ffcf3a'; ctx.fillText('BOUNTY', sx, sy - 20);
      }
    }
    drawWindups(); drawDuelSide(); drawDuels(); drawBeat(); drawStars(); drawFinish(); drawStreak();
    drawBubbles();
    if (G.flag) drawFlagPointer();
    if (G.mode === 'ctrl') drawControlLabels(); drawHoldLabels();
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

// Comic sound words: a spiky burst that pops in big, settles, then fades.
function drawPows() {
  for (const p of pows) {
    const [sx, sy, ok] = proj(p.x, p.y + p.t * .8, p.z); if (!ok) continue;
    const pop = p.t < .09 ? .4 + .9 * (p.t / .09) : p.t < .16 ? 1.3 - .3 * ((p.t - .09) / .07) : 1;
    ctx.save(); ctx.translate(sx, sy); ctx.rotate(p.rot); ctx.scale(pop, pop);
    ctx.globalAlpha = p.t > .5 ? Math.max(0, 1 - (p.t - .5) / .25) : 1;
    ctx.font = 'italic 26px Bangers, Impact, sans-serif';
    const w = ctx.measureText(p.text).width, rx = w * .62 + 10, ry = 24;
    ctx.beginPath();
    for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, r = i % 2 ? .78 : 1.08 + (i % 4 ? 0 : .12); ctx.lineTo(Math.cos(a) * rx * r, Math.sin(a) * ry * r); }
    ctx.closePath(); ctx.fillStyle = p.color; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#1b1512'; ctx.stroke();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 5; ctx.strokeStyle = '#1b1512'; ctx.strokeText(p.text, 0, 1); ctx.fillStyle = '#fff'; ctx.fillText(p.text, 0, 1);
    ctx.restore();
  }
  ctx.globalAlpha = 1; ctx.textBaseline = 'alphabetic';
}

// Speech bubbles over soldiers' heads: white, rounded, a little tail, popping in and fading out.
function drawBubbles() {
  for (const b of bubbles) {
    const u = b.u, [sx, sy0, ok] = proj(u.x, u.y + (u.leader ? 3.3 : 2.9) + (u.dead ? -1.2 : 0) + (u.mounted ? 1.2 : 0), u.z); if (!ok) continue;
    const pop = Math.min(1, b.t / .12), fade = Math.min(1, (b.dur - b.t) / .3), sy = sy0 - 10 * (1 - pop);
    ctx.globalAlpha = Math.max(0, fade);
    ctx.font = `800 ${b.big ? 15 : 13}px "Barlow Semi Condensed", sans-serif`;
    const w = ctx.measureText(b.text).width + 16, h = b.big ? 26 : 23, x = sx - w / 2, y = sy - h - 8;
    ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, 10) : ctx.rect(x, y, w, h);
    ctx.moveTo(sx - 6, y + h); ctx.lineTo(sx, y + h + 8); ctx.lineTo(sx + 6, y + h); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1b1512'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(b.text, sx, y + h / 2 + 1); ctx.textBaseline = 'alphabetic';
  }
  ctx.globalAlpha = 1;
}
// A beaten enemy captain with none of his men about him: FINISH over his head, pulsing, while your
// captain is close enough to see it (Attack in reach executes him).
function drawFinish() {
  const me = G.player; if (!me || me.dead) return;
  const now = performance.now() / 1000, txt = me.mounted ? 'RIDE HIM DOWN' : 'FINISH HIM'; // (on horseback: a perfect ride-by at full gallop does it)
  for (const u of G.units) {
    if (!u.leader || u.dead || u.fog || !u.execReady || !isEnemyTi(u.ti, me.ti)) continue;
    if (Math.hypot(u.x - me.x, u.z - me.z) > (me.mounted ? 18 : 9)) continue;
    const [sx, sy, ok] = proj(u.x, u.y + 3.5, u.z); if (!ok) continue;
    const p = 1 + .1 * Math.sin(now * 9), sz = Math.round(17 * p);
    ctx.textAlign = 'center'; ctx.font = `900 italic ${sz}px Bangers, Impact, sans-serif`; ctx.lineWidth = 5; ctx.strokeStyle = '#1a0606';
    ctx.strokeText(txt, sx, sy); ctx.fillStyle = '#ff3b2e'; ctx.fillText(txt, sx, sy);
  }
}
// The duels: a gold ring on the ground round each one that's on, the time left over it; a challenge
// waiting for an answer shows over the man called out.
function drawDuels() {
  const ds = G.duels; if (!ds || !ds.length) return;
  const now = performance.now() / 1000;
  for (const d of ds) {
    if (Math.hypot(d.x - camera.position.x, d.z - camera.position.z) > 60) continue;
    if (d.state === 'on') {
      ctx.beginPath(); let pen = false;
      for (let k = 0; k <= 64; k++) {
        const a = k / 64 * Math.PI * 2, x = d.x + Math.sin(a) * DUEL.ring, z = d.z + Math.cos(a) * DUEL.ring, [sx, sy, ok] = proj(x, groundY(x, z) + .08, z);
        if (!ok) { pen = false; continue; } if (pen) ctx.lineTo(sx, sy); else { ctx.moveTo(sx, sy); pen = true; }
      }
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,210,58,.75)'; ctx.setLineDash([10, 7]); ctx.lineDashOffset = -now * 12; ctx.stroke(); ctx.setLineDash([]);
      const [sx, sy, ok] = proj(d.x, groundY(d.x, d.z) + 5.2, d.z);
      if (ok) { const t = Math.max(0, d.t | 0), txt = `⚔ ${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
        ctx.textAlign = 'center'; ctx.font = 'italic 20px Bangers, Impact, sans-serif'; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.strokeText(txt, sx, sy); ctx.fillStyle = t <= 10 ? '#ff8a3a' : '#ffd23a'; ctx.fillText(txt, sx, sy); }
    } else if (d.a === G.player) { // you called him out: his answer is coming
      const v = d.b, [sx, sy, ok] = proj(v.x, v.y + 3.6, v.z); if (!ok) continue;
      ctx.textAlign = 'center'; ctx.font = 'italic 17px Bangers, Impact, sans-serif'; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.6)';
      const txt = `CHALLENGED ${Math.max(0, Math.ceil(d.t))}`; ctx.strokeText(txt, sx, sy); ctx.fillStyle = '#ffd23a'; ctx.fillText(txt, sx, sy);
    }
  }
}
// The sword's beat: after each blow of a combo a ring closes in on your captain; press as it meets him
// (it flashes gold) and the blow's on the beat. Two on the beat, and the third is the rhythm finisher.
function drawBeat() {
  const p = G.player; if (!p || p.dead || p.mounted || (p.weapon || 'sword') !== 'sword' || !p.pressAt) return;
  const t = (performance.now() - p.pressAt) / 1000; if (t > RHYTHM.at + RHYTHM.w + .1 || p.swingKind === 4) return;
  const k = Math.min(1, t / RHYTHM.at), r = 2.6 - 1.7 * k, hot = Math.abs(t - RHYTHM.at) <= RHYTHM.w;
  ctx.beginPath(); let pen = false;
  for (let i = 0; i <= 28; i++) {
    const a = i / 28 * Math.PI * 2, x = p.x + Math.sin(a) * r, z = p.z + Math.cos(a) * r, [sx, sy, ok] = proj(x, groundY(x, z) + .12, z);
    if (!ok) { pen = false; continue; } if (pen) ctx.lineTo(sx, sy); else { ctx.moveTo(sx, sy); pen = true; }
  }
  ctx.lineWidth = hot ? 4 : 2; ctx.strokeStyle = hot ? 'rgba(255,210,58,.95)' : `rgba(255,255,255,${.15 + .35 * k})`; ctx.stroke();
}
// Your streak: blows landed in a row, over your captain's head from the second; full, the whirlwind's ready.
function drawStreak() {
  const p = G.player; if (!p || p.dead || p.mounted) return;
  const n = p.streak | 0; if (n < 2) return;
  const [sx, sy, ok] = proj(p.x, p.y + 3.5, p.z); if (!ok) return;
  const full = n >= STREAK.n, pulse = full ? 1 + .1 * Math.sin(performance.now() / 1000 * 10) : 1;
  ctx.textAlign = 'center'; ctx.font = `italic ${Math.round((full ? 20 : 15 + Math.min(5, n * .6)) * pulse)}px Bangers, Impact, sans-serif`; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.65)';
  const txt = full ? 'RAMPAGE READY' : `x${n}`;
  ctx.strokeText(txt, sx, sy); ctx.fillStyle = full ? '#ffd23a' : n >= 5 ? '#ffb13a' : '#ffffff'; ctx.fillText(txt, sx, sy);
}
// Stunned soldiers see stars: three little ones circling the head.
function drawStars() {
  const now = performance.now() / 1000;
  ctx.textAlign = 'center';
  for (const u of G.units) {
    if (u.dead || u.fog || !u.seesStars) continue;
    const d = Math.hypot(u.x - camera.position.x, u.z - camera.position.z); if (d > 30) continue;
    const sz = clamp(260 / d, 9, 20), hy = u.y + (u.leader ? 2.75 : 2.4) + (u.mounted ? 1.2 : 0);
    for (let k = 0; k < 3; k++) {
      const a = now * 5 + k * 2.094 + u.id, [sx, sy, ok] = proj(u.x + Math.cos(a) * .45, hy + Math.sin(a * 2) * .06, u.z + Math.sin(a) * .45); if (!ok) continue;
      ctx.font = `${sz}px sans-serif`; ctx.lineWidth = 2.5; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.strokeText('★', sx, sy); ctx.fillStyle = '#ffd84a'; ctx.fillText('★', sx, sy);
    }
  }
}
// The map's holdings: a name over each banner in its holder's colour, with a bar while it's being taken.
function drawHoldLabels() {
  const hs = G.holds; if (!hs || !hs.length) return;
  for (const h of hs) {
    const px = h.px ?? h.x, pz = h.pz ?? h.z, [sx, sy, ok] = proj(px, groundY(px, pz) + 7.4, pz); if (!ok) continue;
    const d = Math.hypot(px - camera.position.x, pz - camera.position.z), sz = Math.round(clamp(900 / d, 12, 22));
    const name = (h.name || (h.kind === 'oasis' ? 'the Oasis' : 'a village')).replace(/^(the|a) /i, '').toUpperCase();
    ctx.textAlign = 'center'; ctx.font = `italic ${sz}px Bangers, Impact, sans-serif`; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.6)';
    ctx.strokeText(name, sx, sy); ctx.fillStyle = h.owner >= 0 ? sideCss(h.owner) : '#efe9d8'; ctx.fillText(name, sx, sy);
    if (h.chest) { ctx.font = `italic ${Math.round(sz * .85)}px Bangers, Impact, sans-serif`; const t = h.chest === 2 ? 'WAR CHEST!' : 'WAR CHEST COMING'; ctx.strokeText(t, sx, sy - sz * 1.05); ctx.fillStyle = (performance.now() / 300 | 0) % 2 ? '#ffd23a' : '#fff4c0'; ctx.fillText(t, sx, sy - sz * 1.05); ctx.font = `italic ${sz}px Bangers, Impact, sans-serif`; }
    if (h.contested) { ctx.font = `800 ${Math.round(sz * .6)}px "Barlow Semi Condensed", sans-serif`; ctx.fillStyle = '#ffcf3a'; ctx.strokeText('CONTESTED', sx, sy + sz * .8); ctx.fillText('CONTESTED', sx, sy + sz * .8); }
    else if (h.cap >= 0 && h.prog > 0) { const w = sz * 2.6; ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(sx - w / 2, sy + 6, w, 5); ctx.fillStyle = sideCss(h.cap); ctx.fillRect(sx - w / 2, sy + 6, w * Math.min(1, h.prog), 5); }
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
    const label = c ? `${TEAMS[colorOf(c.ti)].name.toUpperCase()} ${G.mode === 'crown' ? 'HAS THE CROWN' : 'CARRIER'}` : G.mode === 'crown' ? (G.flag.state === 'cased' ? 'THE CROWN (BREAK IT FREE)' : 'THE CROWN') : 'BANNER';
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
  for (const s of G.layout.solids || []) { c.beginPath(); s.pts.forEach(([x, z], i) => i ? c.lineTo(x * k, z * k) : c.moveTo(x * k, z * k)); c.closePath(); c.fill(); } // (mesas: solid)
  if (G.layout.round) { c.strokeStyle = 'rgba(20,18,16,.6)'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, G.layout.round * k, 0, Math.PI * 2); c.stroke(); }
  c.restore();
}
// the fog on the minimap: what your side can't see, shaded dark (redrawn when the fog changes)
let fogCv = null, fogCtx = null, fogImg = null;
function drawFogMini(k) {
  const F = fogGrid(); if (!F || !F.grid) return;
  if (!fogCv || fogCv.width !== F.N) { fogCv = document.createElement('canvas'); fogCv.width = fogCv.height = F.N; fogCtx = fogCv.getContext('2d'); fogImg = fogCtx.createImageData(F.N, F.N); }
  const d = fogImg.data; for (let i = 0; i < F.grid.length; i++) { d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = 12; d[i * 4 + 3] = F.grid[i] ? 0 : 150; }
  fogCtx.putImageData(fogImg, 0, 0);
  mctx.imageSmoothingEnabled = true; mctx.drawImage(fogCv, -F.half * k, -F.half * k, F.half * 2 * k, F.half * 2 * k);
}
function drawMini() {
  if (G.state !== 'play') return;
  const S = mini.width, k = S / (W.R * 2 + 8), o = S / 2;
  mctx.clearRect(0, 0, S, S);
  mctx.save(); mctx.translate(o, o); mctx.rotate(cam.yaw + Math.PI);
  const id = G.map.id;
  if (id === 'river') { mctx.fillStyle = 'rgba(63,127,166,.8)'; mctx.fillRect(-95 * k, -5 * k, 190 * k, 10 * k); mctx.fillStyle = 'rgba(107,74,46,.9)'; mctx.fillRect(-34.5 * k, -7 * k, 5 * k, 14 * k); mctx.fillRect(29.5 * k, -7 * k, 5 * k, 14 * k); }
  if (id === 'frost') { mctx.fillStyle = 'rgba(255,255,255,.2)'; mctx.beginPath(); mctx.arc(0, 0, 24 * k, 0, Math.PI * 2); mctx.fill(); }
  if (G.layout) { if (miniFor !== G.layout) buildMiniLayer(S, k); mctx.drawImage(miniLayer, -o, -o); }
  TEAMS.forEach((t, i) => {
    if (noCastle(i)) return;
    mctx.fillStyle = (G.mode !== 'conquest' || G.teams[i].alive) ? t.css : '#555'; mctx.fillRect(t.pos[0] * k - 9, t.pos[1] * k - 9, 18, 18);
    if (!isFfa() && !isEnemyTi(i, G.myTi)) { mctx.strokeStyle = '#fff'; mctx.lineWidth = 2; mctx.strokeRect(t.pos[0] * k - 9, t.pos[1] * k - 9, 18, 18); }
  });
  if (id === 'mount' && G.layout && G.layout.homes) { // the mountain: the river, the arena, and every side's home
    const L = G.layout; mctx.strokeStyle = 'rgba(63,127,166,.85)'; mctx.lineWidth = Math.max(2, L.river.w * 2 * k); mctx.beginPath(); mctx.arc(0, 0, Math.hypot(L.river.pts[0][0], L.river.pts[0][1]) * k, 0, Math.PI * 2); mctx.stroke();
    mctx.fillStyle = 'rgba(191,230,245,.55)'; mctx.beginPath(); mctx.arc(0, 0, L.arena.r * k, 0, Math.PI * 2); mctx.fill();
    for (const h of L.homes) { mctx.fillStyle = TEAMS[h.c].css; mctx.fillRect(h.x * k - 8, h.z * k - 8, 16, 16); if (h.c === colorOf(G.myTi)) { mctx.strokeStyle = '#fff'; mctx.lineWidth = 2; mctx.strokeRect(h.x * k - 8, h.z * k - 8, 16, 16); } }
  }
  for (const h of G.holds || []) { // the map's holdings: a ring in the holder's colour
    mctx.lineWidth = 3; mctx.strokeStyle = h.contested || (h.cap >= 0 && h.prog > 0) ? '#ffcf3a' : h.owner >= 0 ? sideCss(h.owner) : 'rgba(255,255,255,.75)';
    mctx.beginPath(); mctx.arc(h.x * k, h.z * k, Math.max(6, h.r * k), 0, Math.PI * 2); mctx.stroke();
  }
  if (fogGrid()) drawFogMini(k);
  for (const u of G.units) { if (u.dead || u.leader || u.fog) continue; mctx.fillStyle = TEAMS[colorOf(u.ti)].css; mctx.fillRect(u.x * k - 1.75, u.z * k - 1.75, 3.5, 3.5); }
  // captains stand out: your side's in a white ring (a bigger one for a player), the enemy's in a dark one
  const me = G.player, now = performance.now() / 1000;
  for (const u of G.units) {
    if (u.dead || !u.leader || u === me || u.fog) continue;
    const ally = !isEnemyTi(u.ti, G.myTi), r = u.human ? 7.5 : 6;
    mctx.beginPath(); mctx.arc(u.x * k, u.z * k, r, 0, Math.PI * 2); mctx.fillStyle = TEAMS[colorOf(u.ti)].css; mctx.fill();
    mctx.lineWidth = ally ? 3 : 2; mctx.strokeStyle = ally ? '#ffffff' : 'rgba(10,8,6,.9)'; mctx.stroke();
  }
  // you: a white arrow pointing the way you face, in a pulsing ring
  if (me && !me.dead) {
    const x = me.x * k, z = me.z * k;
    mctx.beginPath(); mctx.arc(x, z, 11 + Math.sin(now * 5) * 2.5, 0, Math.PI * 2); mctx.strokeStyle = 'rgba(255,255,255,.7)'; mctx.lineWidth = 2.5; mctx.stroke();
    mctx.save(); mctx.translate(x, z); mctx.rotate(Math.PI - me.face);
    mctx.beginPath(); mctx.moveTo(0, -10); mctx.lineTo(7, 7); mctx.lineTo(0, 3.5); mctx.lineTo(-7, 7); mctx.closePath();
    mctx.fillStyle = '#ffffff'; mctx.fill(); mctx.lineWidth = 2; mctx.strokeStyle = TEAMS[colorOf(G.myTi)].css; mctx.stroke();
    mctx.restore();
  }
  if (G.flag) {
    const fc = G.flag.state === 'carried' && G.flag.carrier ? G.flag.carrier : G.flag;
    mctx.fillStyle = '#fff'; mctx.strokeStyle = '#000'; mctx.lineWidth = 1.5; mctx.beginPath(); mctx.arc(fc.x * k, fc.z * k, 5, 0, Math.PI * 2); mctx.fill(); mctx.stroke();
  }
  mctx.restore();
}
