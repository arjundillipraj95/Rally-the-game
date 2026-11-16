// How the battle looks and sounds: listens to the rules' events (sparks, sounds, hit-stop, the big fight moments).
import { TEAMS, DUEL, PARRY, CAPKILL_SLOW, FEEL } from '../config.js';
import { G, bus, colorOf } from '../core/state.js';
import { endMatch } from '../core/sim.js';
import { groundY } from '../core/world.js';
import { spark, splat, dust, floatText, pow, shockwave } from '../render/effects.js';
import { cam, camTarget } from '../render/camera.js';
import { sfx, buzz, gateS, musicCue } from '../ui/audio.js';
import { showMsg } from '../ui/messages.js';
import { updateHud } from '../ui/hud.js';
import { C } from '../net/netgame.js';
import { S } from './state.js';

// ---------- presentation listens to the rules ----------
bus.on('msg', m => showMsg(m.k, m.a));
bus.on('spark', d => spark(d.x, d.y, d.z, d.c, d.n));
bus.on('splat', d => { splat(d.x, d.z, d.s, d.ti); dust(d.x, d.z); });
bus.on('float', d => floatText(d.x, d.y, d.z, d.text, d.color));
bus.on('sfx', d => { const f = sfx[d.name]; if (f) f(d.x, d.z); });
bus.on('shake', v => { cam.shake = v; });
// the Crown: the plaza's walls grind up out of the ground
bus.on('wallsRise', () => { sfx.crumble(); sfx.horn(); cam.shake = Math.max(cam.shake, .5); buzz([80, 40, 80]); for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; dust(Math.cos(a) * 17.5, Math.sin(a) * 17.5); } });
// hit-stop: the world freezes for a few frames when your blow lands, so it reads as weight
S.hitstop = 0; S.hitstopN = 0; S.slowmo = 0; // (hitstopN: how many have been asked for, for the tests)
bus.on('hitstop', t => { S.hitstop = Math.max(S.hitstop, t); S.hitstopN++; });
bus.on('buzz', ms => buzz(ms));
// the big moments of a fight: a parry, a guard smashed open, a rider skewered or knocked off his horse.
// (On the host these come straight from the rules; on a joining player's phone, with the next snapshot.)
const FIGHT_POW = { fxwrong: ['WRONG SIDE!', '#ff6a4a'], fxtired: ['WINDED!', '#e0a060'], fxgate: ['', ''], fxridedown: ['', ''], fxarmour: ['', ''], fxpush: ['', ''], fxrhythm: ['', ''], fxvland: ['', ''], fxvcharge: ['', ''], fxbreach: ['', ''], fxdisarm: ['DISARMED!', '#ff8a3a'], fxbash: ['BASH!', '#ffffff'], fxstreak: ['RAMPAGE!', '#ffd23a'], fxduelask: ['', ''], fxduel: ['', ''], fxduelwin: ['', ''], fxdueldraw: ['', ''], fxduelbreak: ['', ''], fxduelno: ['', ''], fxevade: ['EVADED!', '#9fe3ff'], fxback: ['BACKSTAB!', '#ff8a3a'], fxexec: ['EXECUTED!', '#ff3b2e'], fxexecgo: ['', ''], fxcapkill: ['CAPTAIN SLAIN!', '#ffd23a'], fxrally: ['RALLY!', '#ffd23a'], fxrout: ['', ''], fxride: ['', ''], fxjoust: ['JOUSTED!', '#ffd23a'], fxparry: ['PARRY!', '#ffffff'], fxbreak: ['GUARD BROKEN!', '#ff8a3a'], fximpale: ['SKEWERED!', '#ffd23a'], fxunhorse: ['UNHORSED!', '#ffd23a'], fxint: ['STAGGERED!', '#ffd23a'] };
bus.on('fxmsg', d => {
  const u = d.u, me = G.player;
  if (d.k === 'fxmarch') { if (!u) return; // (F7: stepping out of the yard: a dust puff at his feet, bigger for a captain; your own captain's horn)
    const ct = camTarget(); if (!ct || Math.hypot(u.x - ct.x, u.z - ct.z) < 45) { const n = d.heavy ? 3 : 1, f = u.face; for (let k = 0; k < n; k++) dust(u.x - Math.sin(f) * .6 + (k - 1) * .5 * Math.cos(f), u.z - Math.cos(f) * .6 - (k - 1) * .5 * Math.sin(f)); }
    if (d.heavy && u === me) sfx.horn(); return; }
  if (d.k === 'fxopen') { if (u && d.a === me) bus.emit('fighttip', 'shield'); return; } // (your blow knocked his shield aside)
  if (!u || !FIGHT_POW[d.k]) return;
  const near = me && Math.hypot(u.x - me.x, u.z - me.z) < (d.k === 'fxbreach' ? 1e9 : d.k === 'fxrally' || d.k === 'fxrout' || d.k === 'fxcapkill' ? 40 : 22), mine = u === me;
  if (!near && !mine && d.a !== me) return;
  if (d.k === 'fxrally') { // a captain sounds the rally: a ring of gold rolls out from him, and the horn
    pow(u.x, u.y + 3.4, u.z, 'RALLY!', '#ffd23a', 3); shockwave(u.x, u.z, 18, teamCss(u)); sfx.horn(); if (near || mine) cam.shake = Math.max(cam.shake, .35); if (mine) { buzz(80); musicCue('rally'); }
    return;
  }
  if (d.k === 'fxcapkill') { // a captain cut down by a captain: both of them in slow motion, a drum like thunder
    if (!near && d.a !== me && !mine) return;
    u.slowT = Math.max(u.slowT || 0, CAPKILL_SLOW); if (d.a) d.a.slowT = Math.max(d.a.slowT || 0, CAPKILL_SLOW);
    pow(u.x, u.y + 3.4, u.z, mine ? 'YOU FELL!' : 'CAPTAIN SLAIN!', mine ? '#e0352b' : '#ffd23a', 3); sfx.heavy(u.x, u.z); musicCue(mine ? 'fell' : d.a === me ? 'slain' : 'capdown');
    cam.shake = Math.max(cam.shake, .5); if (d.a === me) buzz(90);
    return;
  }
  if (d.k === 'fxrout') { // an army breaks
    if (near) { pow(u.x, u.y + 3.4, u.z, 'ROUT!', '#e0352b', 3); sfx.heavy(u.x, u.z); }
    const ti = d.ti ?? u.ti; musicCue(ti === G.myTi ? 'routMine' : G.ALLY[ti % 4] !== G.ALLY[G.myTi % 4] ? 'routEnemy' : 'capdown');
    return;
  }
  if (d.k === 'fxbreach') { // a castle's walls give: a burst of dust and fire at it, seen from across the field
    const c = colorOf(d.ti ?? u.ti), [x, z] = TEAMS[c].pos;
    pow(x, groundY(x, z) + 9, z, 'BREACH!', '#e0352b', 3); shockwave(x, z, 26, '#e0352b');
    if (me && Math.hypot(x - me.x, z - me.z) < 60) cam.shake = Math.max(cam.shake, .5);
    return;
  }
  if (d.k === 'fxgate') { // a castle's gate hacked down
    if (!near && !mine) return;
    pow(u.x, u.y + 3.6, u.z, 'GATE BROKEN!', '#ff8a3a', 3); dust(u.x, u.z); sfx.crumble(); cam.shake = Math.max(cam.shake, .4);
    return;
  }
  if (d.k === 'fxridedown') { // a beaten captain ridden down at full gallop
    if (!near && !mine && d.a !== me) return;
    pow(u.x, u.y + 3.4, u.z, 'RIDDEN DOWN!', '#ff3b2e', 3); shockwave(u.x, u.z, 14, '#ff3b2e'); sfx.heavy(u.x, u.z); sfx.trample(u.x, u.z);
    u.slowT = Math.max(u.slowT || 0, .7); if (d.a) d.a.slowT = Math.max(d.a.slowT || 0, .7);
    musicCue(mine ? 'fell' : d.a === me ? 'slain' : 'capdown'); cam.shake = Math.max(cam.shake, .6); if (d.a === me || mine) buzz(120);
    return;
  }
  if (d.k === 'fxarmour') { pow(u.x, u.y + 3.1, u.z, 'ARMOUR BROKEN!', '#c9d2dc', 2); spark(u.x, u.y + 1.8, u.z, '#c9d2dc', 18); sfx.guardbreak(u.x, u.z); if (mine) { buzz([60, 30, 60]); cam.shake = Math.max(cam.shake, .4); bus.emit('fighttip', 'armour'); } return; }
  if (d.k === 'fxpush') { const f = u.face; if (mine) pow(u.x + Math.sin(f) * 3, u.y + 2.6, u.z + Math.cos(f) * 3, 'PUSH!', '#ffffff', 1); if (d.heavy) { dust(u.x + Math.sin(f) * 3, u.z + Math.cos(f) * 3); cam.shake = Math.max(cam.shake, mine ? .4 : .2); } if (mine) buzz(d.heavy ? [40, 20, 60] : 20); return; }
  if (d.k === 'fxrhythm') { if (mine) pow(u.x, u.y + 3.3, u.z, 'RHYTHM!', '#ffd23a', 1); sfx.heavy(u.x, u.z); if (mine) { buzz([30, 20, 30, 20, 60]); cam.shake = Math.max(cam.shake, .4); } return; }
  if (d.k === 'fxvland') { if (mine) bus.emit('fighttip', 'vcharge'); return; } // (your volley's landed: the moment to charge)
  if (d.k === 'fxvcharge') { pow(u.x, u.y + 3.4, u.z, 'VOLLEY & CHARGE!', '#ffd23a', 2); shockwave(u.x, u.z, 12, teamCss(u)); sfx.charge && sfx.charge(u.x, u.z); if (mine) { buzz([40, 30, 60]); cam.shake = Math.max(cam.shake, .35); } return; }
  if (d.k === 'fxdisarm') { // a perfect parry: his blade knocked from his hand
    if (!near && !mine && d.a !== me) return;
    pow(u.x, u.y + 3.1, u.z, 'DISARMED!', '#ff8a3a', 3); sfx.parry(u.x, u.z); sfx.heavy(u.x, u.z);
    if (mine) { buzz([40, 30, 40]); if (G.role === 'client') C.localCd = Math.max(C.localCd || 0, PARRY.disarm); }
    if (d.a === me) { buzz(50); cam.shake = Math.max(cam.shake, .35); }
    return;
  }
  if (d.k === 'fxbash') { // the shield bash: a thud, and his guard flung open (heavy: it was up)
    if (!near && !mine && d.a !== me) return;
    if (d.heavy && (mine || d.a === me)) pow(u.x, u.y + 2.9, u.z, 'GUARD OPEN!', '#ff8a3a', 1); sfx.guardbreak(u.x, u.z);
    if (d.a === me) { buzz(35); cam.shake = Math.max(cam.shake, .25); bus.emit('hitstop', .06); }
    return;
  }
  if (d.k === 'fxstreak') { // the streak's whirlwind
    if (!near && !mine) return;
    pow(u.x, u.y + 3.4, u.z, 'RAMPAGE!', '#ffd23a', 3); shockwave(u.x, u.z, 8, teamCss(u)); sfx.heavy(u.x, u.z);
    if (mine) { buzz([50, 30, 80]); cam.shake = Math.max(cam.shake, .45); }
    return;
  }
  if (d.k.startsWith('fxduel')) { // the duel: called out, on, won, drawn, broken, refused
    const inIt = mine || d.a === me;
    if (!near && !inIt) return;
    if (d.k === 'fxduelask') { const a = d.a || u; pow(a.x, a.y + 3.2, a.z, 'I CHALLENGE YOU!', '#ffd23a', 3); sfx.windup(a.x, a.z); if (mine) buzz([40, 40, 40]); }
    else if (d.k === 'fxduel') { const a = d.a || u, mx = (a.x + u.x) / 2, mz = (a.z + u.z) / 2;
      { const now = performance.now(); let n = 0; for (const o of G.units) { if (o.dead || o === a || o === u || Math.hypot(o.x - mx, o.z - mz) > DUEL.ring + .3) continue; o.shoveAt = now; if (n++ < FEEL.duel.dust) dust(o.x, o.z); } } /* (F7: everyone in the ring is shoved out: a stumble and dust) */
      pow(mx, u.y + 3.4, mz, 'DUEL!', '#ffd23a', 3); shockwave(mx, mz, DUEL.ring + 1, '#ffd23a'); sfx.horn(); if (inIt) { buzz(80); cam.shake = Math.max(cam.shake, .4); musicCue('rally'); } }
    else if (d.k === 'fxduelwin') { pow(u.x, u.y + 3.4, u.z, mine ? 'DUEL WON!' : 'VICTOR!', '#ffd23a', 3); shockwave(u.x, u.z, 16, '#ffd23a'); sfx.cheer(); if (mine) buzz([60, 40, 90]); }
    else if (d.k === 'fxdueldraw') pow(u.x, u.y + 3.2, u.z, 'DRAW', '#ffffff', 3);
    else if (d.k === 'fxduelbreak') { pow(u.x, u.y + 3.2, u.z, 'DISHONOUR!', '#e0352b', 3); sfx.heavy(u.x, u.z); }
    else if (d.k === 'fxduelno') pow(u.x, u.y + 3.2, u.z, 'REFUSED!', '#c9c2b2', 2);
    return;
  }
  if (d.k === 'fxexecgo') { // an execution begins: a drum, the camera closes in (render/camera.js reads the pose flags)
    if (near || mine || d.a === me) { sfx.windup(u.x, u.z); if (d.a === me) buzz(40); }
    return;
  }
  if (d.k === 'fxexec') { // ...and the blow falls
    if (!near && !mine && d.a !== me) return;
    S.slowmo = Math.max(S.slowmo, FEEL.exec.slowT); // (F7: the blow in slow motion on every phone watching; the drawing slows, the rules don't)
    pow(u.x, u.y + 3.4, u.z, { spear: 'RUN THROUGH!', jav: 'PINNED!' }[d.q] || 'EXECUTED!', '#ff3b2e', 3); shockwave(u.x, u.z, 14, '#ff3b2e'); sfx.heavy(u.x, u.z);
    if (d.q === 'spear') sfx.trample(u.x, u.z); if (d.q === 'jav') sfx.thud(u.x, u.z);
    musicCue(mine ? 'fell' : d.a === me ? 'slain' : 'capdown'); cam.shake = Math.max(cam.shake, .6); if (d.a === me || mine) buzz(120);
    return;
  }
  if (d.k === 'fxback' && d.a === me) sfx.heavy(u.x, u.z); // (a backstab of yours: a heavier thud under the word)
  if (d.k === 'fxtired' && mine) bus.emit('fighttip', 'tired');
  if (d.k === 'fxevade') { if (!mine && d.a !== me) return; if (mine) { buzz(20); bus.emit('fighttip', 'counter'); } }
  if (d.k === 'fxride') { // your ride-by blow: how well you timed it
    if (d.a !== me) return;
    const R = { perfect: ['PERFECT!', '#ffd23a'], good: ['HIT!', '#ffffff'], graze: ['TOO LATE', '#c9c2b2'], miss: ['TOO EARLY', '#c9c2b2'] }[d.q] || ['', ''];
    const at = d.q === 'miss' || u === me ? me : u; if (d.q === 'perfect' || d.q === 'miss' || d.q === 'graze') pow(at.x, at.y + 3.1, at.z, R[0], R[1], 1);
    if (d.q === 'perfect') { sfx.heavy(u.x, u.z); buzz(40); }
    return;
  }
  // the rest are small beats: a word only for the big ones (a rider brought down), or for your own parry / guard break
  const [txt, col] = FIGHT_POW[d.k], big = d.k === 'fxjoust' || d.k === 'fximpale' || d.k === 'fxunhorse';
  if (big) pow(u.x, u.y + 2.9, u.z, txt, col, 2);
  else if (txt && (d.k === 'fxparry' || d.k === 'fxbreak' || d.k === 'fxback') && (mine || d.a === me)) pow(u.x, u.y + 2.9, u.z, txt, col, 1);
  if (d.k === 'fxjoust') { sfx.heavy(u.x, u.z); cam.shake = Math.max(cam.shake, .45); if (d.a === me) buzz(60); }
  if (d.k === 'fxparry') {
    spark(u.x + Math.sin(u.face) * .8, u.y + 1.6, u.z + Math.cos(u.face) * .8, '#ffffff', 16); sfx.parry(u.x, u.z);
    // the two men in it move in slow motion for a beat (the rules slow them on the host; this slows how they're drawn everywhere)
    const t = PARRY.slowT * (d.heavy ? 1.2 : 1); u.slowT = Math.max(u.slowT || 0, t); if (d.a) d.a.slowT = Math.max(d.a.slowT || 0, t);
    if (mine || d.a === me) { buzz(30); cam.shake = Math.max(cam.shake, .3); }
    if (d.byAI && d.a === me) bus.emit('fighttip', 'guard');
  }
  if (d.k === 'fxbreak') { sfx.guardbreak(u.x, u.z); if (mine) { buzz(60); cam.shake = Math.max(cam.shake, .45); bus.emit('fighttip', 'break'); } }
  if (d.k === 'fximpale' || d.k === 'fxunhorse') { sfx.heavy(u.x, u.z); cam.shake = Math.max(cam.shake, .35); }
});
bus.on('hint', text => { const p = G.player; if (p && gateS('mhint', 2500)) floatText(p.x, p.y + 3.4, p.z, text, '#fff'); });
bus.on('respawnMe', L => { cam.yaw = L.face; });
bus.on('hud', () => { if (G.state === 'play') updateHud(C.lastSnapAt); });
bus.on('hostEnd', res => endMatch(res[0], res[1]));

// F18: ability bursts glow in the caster's team colour
function teamCss(u) { const t = TEAMS[colorOf(u.ti)]; return (t && t.css) || '#ffd23a'; }
