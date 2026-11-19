// BS1-BS4 the battle screen's live parts (layout and look in battle.css): it is on (body.bs) for a champion with
// specials. Each frame: in a duel Special 1 reads Block and Special 2 Evade; the ult's charge ring; the army ult's horn
// bar; Fortify while you stand in a castle you hold; the Upgrade popup cut to one button per soldier type (its next
// tier) and Armour; the weapon button only for a champion with more than one weapon. Tapping the clock shows the points.
import './battle.css';
import { G } from '../core/state.js';
import { castleHere, upgradeCost } from '../core/sim.js';
import { cdLeft, slotDef, unlocked } from '../core/sim/abilities.js';
import { champOf } from '../champions/index.js';

const $ = id => document.getElementById(id);
let wasDuel = null, clockBound = false, iconFor = '';
// each button's small picture of what it does (by the move's short name; a duel swaps in Block and Evade)
const svg = d => `<svg class="abI" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = { Ram: '<rect x="3" y="6" width="7" height="12" rx="2"/><path d="M12 12h9M17 8l4 4-4 4"/>', Shield: '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/>',
  Eagle: '<path d="M2 9l6 2 4-5 4 5 6-2-5 7H7z"/><path d="M12 16v5"/>', Block: '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M8 12h8"/>', Evade: '<path d="M4 16c3-8 9-10 16-8"/><path d="M16 4l4 4-4 4"/>' };
function icons(duel) {
  const key = G.myTi + ':' + duel; if (iconFor === key) return; iconFor = key;
  for (let k = 1; k <= 3; k++) { const b = $('ab' + k), d = slotDef(G.myTi, ['sp1', 'sp2', 'ult'][k - 1]); if (!b || !d) continue;
    const name = duel && k < 3 ? (k === 1 ? 'Block' : 'Evade') : d.short; b.querySelectorAll('.abI').forEach(n => n.remove());
    if (ICON[name]) b.insertAdjacentHTML('afterbegin', svg(ICON[name])); }
}
const set = (el, k, v) => { if (el && el[k] !== v) el[k] = v; };

export function battleHud() {
  const p = G.player, me = G.teams[G.myTi], on = !!slotDef(G.myTi, 'sp1');
  document.body.classList.toggle('bs', on);
  if (!clockBound && $('clock')) { clockBound = true; $('clock').addEventListener('pointerdown', () => $('points').classList.toggle('open')); }
  if (!on || !me) return;
  // a duel: Ram is Block, Shield is Evade
  const duel = !!(p && p.duelId && !p.dead);
  for (const [k, w] of [[1, 'Block'], [2, 'Evade']]) {
    const b = $('ab' + k); if (!b) continue;
    if (duel !== wasDuel) b.dataset.sig = ''; // (the slot's own label comes back after)
    b.classList.toggle('duelSw', duel);
    if (duel) { set(b.querySelector('.abL'), 'textContent', w); set(b.querySelector('.abC'), 'textContent', ''); b.classList.remove('wait', 'locked'); }
  }
  wasDuel = duel; icons(duel);
  // the ult's ring fills as it recharges
  { const b = $('ab3'), d = slotDef(G.myTi, 'ult'); if (b && d) { const lock = !unlocked(G.myTi, 'ult'), cd = cdLeft(G.myTi, 'ult'), f = lock ? 0 : d.cd ? 1 - cd / d.cd : 1;
    b.style.setProperty('--chg', Math.max(0, Math.min(1, f)).toFixed(3)); b.classList.toggle('ready', !lock && cd <= 0); } }
  { const w = $('wpn'); if (w) w.classList.toggle('onew', (champOf(G.myTi).weapons || []).length <= 1); }
  // the army ult: the horn's bar; lit when full
  { const b = $('armyBtn'), d = slotDef(G.myTi, 'armyUlt'); set(b, 'hidden', !d);
    if (d) { const r = Math.min(100, me.rally || 0), lock = !unlocked(G.myTi, 'armyUlt');
      b.querySelector('#armyBar b').style.width = r + '%'; set($('armyT'), 'textContent', lock ? 'Locked' : d.short || d.name);
      b.classList.toggle('ready', r >= 100 && !lock); b.setAttribute('aria-label', `Army ult: ${d.name}${r >= 100 ? ', ready' : ''}`); } }
  // Fortify: only in a castle you hold
  { const b = $('fortBtn'), cw = G.mode === 'crown' && p && !p.dead ? castleHere(G.myTi) : null; set(b, 'hidden', !cw);
    if (cw) { const st = G.cgates && G.cgates[cw.hid], lv = (st && st.lv) | 0, cost = upgradeCost(G.myTi, 'fort');
      set($('fortT'), 'textContent', cost == null ? `Castle Lv ${lv} · Maxed` : `Fortify · Lv ${lv + 1} · ${cost}`);
      b.setAttribute('aria-disabled', cost == null || (me.gold || 0) < cost ? 'true' : 'false'); } }
  // the Upgrade popup: each soldier type's next tier, Armour (and the Crown's watchtower); the rest are bought elsewhere
  const up = me.up || {};
  document.querySelectorAll('#upTray button').forEach(b => {
    const id = b.dataset.up, pre = id.replace(/\d$/, ''), unit = { foot: 'foot', arch: 'arch', thr: 'thrower' }[pre];
    const hide = id === 'aura' || id === 'horse' || id === 'fort' || (unit && !champOf(G.myTi).recruits.includes(unit)) // (ARCH2: his own soldiers' columns only)
      || ((pre === 'foot' || pre === 'arch' || pre === 'thr') && (id.endsWith('2') ? !up[pre + '1'] : !!up[pre + '1'])); // (each column: its next tier)
    b.classList.toggle('bsHide', !!hide);
  });
  document.querySelectorAll('#upTray .ucol').forEach(c => c.classList.toggle('bsHide', ![...c.querySelectorAll('button')].some(b => !b.hidden && !b.classList.contains('bsHide'))));
}
