// ARCH2 (Arjun 19 Nov): what an upgrade does. Each upgrade button gets a small "i"; tapping it (not the button: that
// buys) shows a card with the unit's numbers now and after it (health, damage, shots a second, range, speed and the
// new tricks), for this champion's own line (champions/army.js unitRow). Tap anywhere to close it.
import { G } from '../core/state.js';
import { UPGRADES } from '../config.js';
import { unitRow } from '../champions/army.js';
import { champOf } from '../champions/index.js';

const KIND = { foot: 'foot', arch: 'arch', thr: 'thrower', sw: 'sword', cav: 'cav' }; // (C2b)
const r1 = v => (Math.round(v * 10) / 10).toString();
// the rows a unit's card shows: [label, value] (value as shown)
function rows(t, kind) {
  if (!t) return [];
  const hit = kind === 'arch' ? t.arrow : t.dmg, gap = kind === 'foot' || kind === 'sword' || kind === 'cav' ? t.cd : t.shoot;
  const R = [['Health', Math.round(t.hp)], [kind === 'arch' ? 'Arrow' : kind === 'thrower' ? 'Stone' : 'Blow', Math.round(hit)], [kind === 'foot' || kind === 'sword' || kind === 'cav' ? 'Blows a second' : 'Shots a second', r1(1 / gap)]];
  if (t.horse) R.push(['Horse', Math.round(t.horse)]);
  if (t.range != null) R.push(['Range', `${Math.round(t.range)} m`]);
  R.push(['Speed', `${r1(t.spd)} m/s`]);
  if (t.javelin) R.push(['Javelins', 'yes']);
  if (t.fireArrows) R.push(['Fire arrows', 'x3 on throwers, full on buildings']);
  if (t.fire) R.push(['Fire pots', 'every third stone']);
  if (t.pursuit) R.push(['Pursuit', 'slows a runner']);
  if (t.chargeX > 1) R.push(['Charge', `x${r1(t.chargeX)}`]);
  return R;
}
function card(id) {
  const def = UPGRADES.find(u => u.id === id); if (!def) return null;
  const C = champOf(G.myTi), N = C.upNames && C.upNames[id], name = N ? N[0] : def.name, desc = N ? N[1] : def.desc;
  const pre = id.replace(/\d$/, ''), kind = KIND[pre], me = G.teams[G.myTi] || {}, up = me.up || {};
  let html = `<h5>${name}</h5><p>${desc}</p>`;
  if (kind) {
    const now = (up[pre + '1'] ? 1 : 0) + (up[pre + '2'] ? 1 : 0), to = +id.slice(-1);
    const A = rows(unitRow(G.myTi, kind, Math.min(now, to - 1)), kind), B = rows(unitRow(G.myTi, kind, to), kind);
    const lab = [...new Set([...A, ...B].map(r => r[0]))];
    html += `<table><tr><th></th><th>Now</th><th>After</th></tr>${lab.map(l => { const a = (A.find(r => r[0] === l) || [, '—'])[1], b = (B.find(r => r[0] === l) || [, '—'])[1];
      return `<tr${a !== b ? ' class="ch"' : ''}><td>${l}</td><td>${a}</td><td>${b}</td></tr>`; }).join('')}</table>`;
  }
  return html;
}
let box = null;
const close = () => { if (box) box.hidden = true; };
export function installUpInfo() {
  const tray = document.getElementById('upTray'); if (!tray) return;
  for (const b of tray.querySelectorAll('button[data-up]')) { const i = document.createElement('u'); i.className = 'uinfo'; i.textContent = 'i'; i.setAttribute('aria-label', 'What this does'); b.appendChild(i); }
  box = document.createElement('div'); box.id = 'upInfo'; box.hidden = true; document.body.appendChild(box);
  box.addEventListener('pointerdown', e => { e.preventDefault(); close(); });
  tray.addEventListener('pointerdown', e => { // (capture: before the button buys)
    const i = e.target.closest && e.target.closest('.uinfo'); if (!i) { close(); return; }
    e.preventDefault(); e.stopPropagation();
    const html = card(i.parentElement.dataset.up); if (!html) return;
    box.innerHTML = html; box.hidden = false;
  }, true);
}
export const upInfoClose = close;
