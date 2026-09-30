// Scoreboard, clock, health, gold, squad count and button labels.
import { TEAMS, MODES, STATS, DM_TICKETS, CAPS_TO_WIN, CTRL, AL_LETTER, ORDER_NAMES, UPGRADES, WEAPON_NAMES } from '../config.js';
import { G, isFfa, colorOf, rules, matchTime } from '../core/state.js';
import { colorOut, colorScore, colorHuman, squadOf, canRecruit, horseMax, upgradeCost, javMax } from '../core/sim.js';
import { session, isClient } from '../net/session.js';

const $ = id => document.getElementById(id);
export const fmt = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

export function buildHud() {
  $('ptsTitle').textContent = MODES[G.mode].title;
  $('tpRows').innerHTML = TEAMS.map((t, i) => `<div class="tp${i === colorOf(G.myTi) ? ' me' : ''}" id="tp${i}"><span class="al">${isFfa() ? '' : AL_LETTER[G.ALLY[i]]}</span><div class="bar"><i style="background:${t.css}"></i></div><b>0</b></div>`).join('');
  $('pips').innerHTML = TEAMS.map((t, i) => `<span class="pip" id="pip${i}" style="background:${t.css}">${t.name[0]}</span>`).join('');
  $('clockMax').textContent = fmt(matchTime());
}
export function showHud() {
  ['ovTitle', 'ovEnd', 'ovBrowse', 'ovLobby'].forEach(id => $(id).hidden = true);
  $('hudWrap').hidden = false; $('joyhint').style.opacity = 1;
}

// The Attack button's icon follows the weapon in hand.
const ICONS = {
  sword: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',
  spear: '<path d="M4 20 16.5 7.5"/><path d="M14 4.5 20.5 3.5 19.5 10z" fill="#fff"/><path d="M6.5 15.5l2 2"/>',
  jav: '<path d="M3 18 16 8"/><path d="M14 5.5 21 4 18.5 10.5z" fill="#fff"/><path d="M3 12h5M5 21.5h5"/>',
};
let atkIcon = null, cmdIcon = null, jmpMode = null;
const JUMP_IC = '<path d="M5 14l7-7 7 7M5 20l7-7 7 7"/>', CHARGE_IC = '<path d="M3 12h11M10 7l5 5-5 5"/><path d="M16 6l5 6-5 6"/>';
const ORDER_SHORT = { follow: 'Follow', hold: 'Hold', charge: 'Charge', shieldwall: 'Wall' };
// the squad order button shows the order in force as an icon (tap cycles; the name pops up in the world)
const ORDER_ICONS = {
  follow: '<path d="M6 21V4h11l-2.5 4 2.5 4H6"/>',
  hold: '<path d="M12 5v16M7 9h10M5 14a7 7 0 0 0 14 0"/><circle cx="12" cy="4" r="1.6"/>',
  charge: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  shieldwall: '<path d="M2.5 7h5.5v5c0 3-2.75 5-2.75 5S2.5 15 2.5 12zM9.25 7h5.5v5c0 3-2.75 5-2.75 5s-2.75-2-2.75-5zM16 7h5.5v5c0 3-2.75 5-2.75 5S16 15 16 12z"/>',
};
// lastSnapAt: when a client last heard from the host
export function updateHud(lastSnapAt) {
  TEAMS.forEach((t, i) => {
    const row = $('tp' + i); if (!row) return;
    const v = colorScore(i), max = G.mode === 'conquest' ? 100 : G.mode === 'dm' ? rules().tickets : G.mode === 'ctrl' ? rules().win : rules().caps;
    row.querySelector('i').style.transform = `scaleX(${Math.max(0, v) / max})`;
    row.querySelector('b').textContent = G.mode === 'ctf' ? `${v}/${rules().caps}` : Math.max(0, Math.ceil(v));
    const out = colorOut(i); row.classList.toggle('out', out);
    const pip = $('pip' + i); pip.classList.toggle('out', out); pip.classList.toggle('hum', colorHuman(i)); pip.textContent = out ? '✕' : t.name[0];
  });
  $('clockT').textContent = fmt(G.T);
  const p = G.player, me = G.teams[G.myTi];
  if (p) {
    $('hpT').textContent = `${Math.max(0, Math.ceil(p.hp))}/${p.max}`;
    $('hpBar').style.transform = `scaleX(${Math.max(0, p.hp) / p.max})`;
    $('horseBarWrap').hidden = !p.mounted;
    $('horseBar').style.transform = `scaleX(${Math.min(1, Math.max(0, p.horseHp) / horseMax(G.myTi))})`;
  }
  const gold = Math.floor(me.gold); $('gold').textContent = gold;
  const sq = squadOf(G.myTi); $('squadN').textContent = sq.length;
  const c = k => sq.filter(u => u.kind === k).length; $('squadMix').textContent = `F${c('foot')} A${c('arch')}`;
  document.querySelectorAll('#tray button').forEach(b => {
    b.setAttribute('aria-disabled', (gold < STATS[b.dataset.kind].cost || sq.length >= G.squadCap || !canRecruit(G.myTi)) ? 'true' : 'false');
  });
  document.querySelectorAll('#upTray button').forEach(b => {
    const id = b.dataset.up, def = UPGRADES.find(u => u.id === id), max = def ? def.cost.length : 0;
    const l = me.up ? me.up[id] : 0, cost = upgradeCost(G.myTi, id);
    const locked = (id === 'foot2' && !(me.up && me.up.foot1)) || (id === 'arch2' && !(me.up && me.up.arch1));
    b.querySelector('.lv').dataset.pips = '●'.repeat(l) + '○'.repeat(Math.max(0, max - l));
    b.querySelector('em').textContent = cost == null ? 'Maxed' : locked ? (id === 'foot2' ? 'Needs Arms first' : 'Needs Training first') : cost + 'g';
    b.dataset.state = cost == null ? 'max' : locked ? 'locked' : gold < cost ? 'poor' : 'ok';
    b.setAttribute('aria-disabled', (cost == null || gold < cost || locked) ? 'true' : 'false');
  });
  // Ride: lit while mounted, a countdown badge while the horse rests
  $('mnt').classList.toggle('on', !!(p && p.mounted));
  $('mntT').textContent = !p ? 'Ride' : p.mounted ? 'Walk' : p.summon ? 'Coming' : p.horseCd > 0 ? Math.ceil(p.horseCd) + 's' : 'Ride';
  $('mnt').setAttribute('aria-label', p && p.mounted ? 'Get off your horse' : 'Call your horse');
  $('mnt').classList.toggle('dim', !p || (!p.mounted && (p.horseCd > 0 || p.carrying || p.dead)));
  $('blk').classList.toggle('dim', !p || p.mounted);
  $('atk').classList.toggle('dim', !p || p.carrying);
  const w = (p && p.weapon) || 'sword';
  if (atkIcon !== w) { atkIcon = w; $('atkIc').innerHTML = ICONS[w]; document.querySelectorAll('#wheel button').forEach(b => { b.classList.toggle('cur', b.dataset.w === w); const s = b.querySelector('svg'); if (!s.innerHTML) s.innerHTML = ICONS[b.dataset.w]; }); }
  const mx = javMax(G.myTi), am = p ? Math.min(mx, p.javAmmo | 0) : 0;
  $('wpnS').textContent = w === 'jav' ? 'Javelin' : WEAPON_NAMES[w];
  // on horseback the Jump button becomes the charge
  const mounted = !!(p && p.mounted), jk = mounted ? (p.chargeCd > 0 ? 'cd' : 'charge') : 'jump';
  if (jmpMode !== jk + (jk === 'cd' ? Math.ceil(p.chargeCd) : '')) {
    jmpMode = jk + (jk === 'cd' ? Math.ceil(p.chargeCd) : '');
    $('jmpIc').innerHTML = mounted ? CHARGE_IC : JUMP_IC;
    $('jmpL').textContent = jk === 'jump' ? 'Jump' : jk === 'charge' ? 'Charge' : Math.ceil(p.chargeCd) + 's';
    $('jmp').setAttribute('aria-label', mounted ? 'Charge' : 'Jump');
  }
  $('jmp').classList.toggle('dim', !p || p.carrying || (mounted && p.chargeCd > 0));
  $('jmp').classList.toggle('on', mounted && p.charge > 0);
  $('vlyT').textContent = me.volleyCd > 0 ? Math.ceil(me.volleyCd) + 's' : 'Volley';
  $('vly').classList.toggle('dim', !p || p.dead || me.volleyCd > 0);
  const o = me.order || 'follow';
  if (cmdIcon !== o) { cmdIcon = o; $('cmdIc').innerHTML = ORDER_ICONS[o] || ORDER_ICONS.follow; $('cmdT').textContent = ORDER_SHORT[o] || 'Follow'; $('cmdBtn').setAttribute('aria-label', 'Squad order: ' + (ORDER_NAMES[o] || ORDER_NAMES.follow)); }
  $('cmdBtn').style.borderColor = o === 'follow' ? 'var(--green)' : o === 'hold' ? 'var(--yellow)' : o === 'shieldwall' ? '#7f9bff' : 'var(--red)';
  const NET = session.NET, tag = $('netTag');
  if (NET) {
    tag.hidden = false;
    const others = G.teams.map((s, i) => i).filter(i => G.teams[i].active && G.teams[i].human && i !== G.myTi).map(i => TEAMS[colorOf(i)].name + (i >= 4 ? ' (co-captain)' : ''));
    if (isClient()) {
      const stale = performance.now() - (lastSnapAt || 0) > 2500;
      tag.textContent = stale ? 'Waiting for the host…' : `Online · ${others.length ? 'with ' + others.join(', ') : 'host'}`;
      tag.classList.toggle('bad', stale);
    } else tag.textContent = `Hosting · ${others.length ? others.join(', ') : 'no one else yet'}`;
  } else tag.hidden = true;
}

let bannerTO;
export function banner(t, sub, color) {
  const b = $('banner'); b.innerHTML = ''; const s1 = document.createElement('span'); s1.textContent = t; s1.style.color = color || '#fff'; b.appendChild(s1);
  if (sub) { const s2 = document.createElement('small'); s2.textContent = sub; b.appendChild(s2); }
  b.classList.add('on');
  clearTimeout(bannerTO); bannerTO = setTimeout(() => b.classList.remove('on'), 2000);
}
