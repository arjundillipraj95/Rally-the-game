// Scoreboard, clock, health, gold, squad count and button labels.
import { TEAMS, MODES, STATS, DM_TICKETS, CAPS_TO_WIN, CTRL, AL_LETTER, ORDER_NAMES, UPGRADES } from '../config.js';
import { G, isFfa, colorOf } from '../core/state.js';
import { colorOut, colorScore, colorHuman, squadOf, canRecruit, horseMax, upgradeCost } from '../core/sim.js';
import { session, isClient } from '../net/session.js';

const $ = id => document.getElementById(id);
export const fmt = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

export function buildHud() {
  $('ptsTitle').textContent = MODES[G.mode].title;
  $('tpRows').innerHTML = TEAMS.map((t, i) => `<div class="tp${i === colorOf(G.myTi) ? ' me' : ''}" id="tp${i}"><span class="al">${isFfa() ? '' : AL_LETTER[G.ALLY[i]]}</span><div class="bar"><i style="background:${t.css}"></i></div><b>0</b></div>`).join('');
  $('pips').innerHTML = TEAMS.map((t, i) => `<span class="pip" id="pip${i}" style="background:${t.css}">${t.name[0]}</span>`).join('');
  $('clockMax').textContent = fmt(MODES[G.mode].time);
}
export function showHud() {
  ['ovTitle', 'ovEnd', 'ovBrowse', 'ovLobby'].forEach(id => $(id).hidden = true);
  $('hudWrap').hidden = false; $('joyhint').style.opacity = 1;
}

// lastSnapAt: when a client last heard from the host
export function updateHud(lastSnapAt) {
  TEAMS.forEach((t, i) => {
    const row = $('tp' + i); if (!row) return;
    const v = colorScore(i), max = G.mode === 'conquest' ? 100 : G.mode === 'dm' ? DM_TICKETS : G.mode === 'ctrl' ? CTRL.win : CAPS_TO_WIN;
    row.querySelector('i').style.transform = `scaleX(${Math.max(0, v) / max})`;
    row.querySelector('b').textContent = G.mode === 'ctf' ? `${v}/${CAPS_TO_WIN}` : Math.max(0, Math.ceil(v));
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
    b.querySelector('em').textContent = cost == null ? 'Max' : (locked ? 'Locked' : cost + 'g');
    b.setAttribute('aria-disabled', (cost == null || gold < cost || locked) ? 'true' : 'false');
  });
  let t1 = 'Ride', t2 = 'horse';
  if (p && p.mounted) { t1 = 'Walk'; t2 = 'get off'; } else if (p && p.summon) { t1 = '…'; t2 = 'coming'; } else if (p && p.horseCd > 0) { t1 = Math.ceil(p.horseCd) + 's'; t2 = 'resting'; }
  $('mntT').textContent = t1; $('mntS').textContent = t2;
  $('mnt').classList.toggle('dim', !p || (!p.mounted && (p.horseCd > 0 || p.carrying || p.dead)));
  $('blk').classList.toggle('dim', !p || p.mounted);
  $('atk').classList.toggle('dim', !p || p.carrying);
  $('vlyT').textContent = me.volleyCd > 0 ? Math.ceil(me.volleyCd) + 's' : 'Volley';
  $('vly').classList.toggle('dim', !p || p.dead || me.volleyCd > 0);
  const o = me.order || 'follow';
  $('cmdT').textContent = ORDER_NAMES[o] || ORDER_NAMES.follow;
  const cc = o === 'follow' ? 'var(--green)' : o === 'hold' ? 'var(--yellow)' : o === 'shieldwall' ? 'var(--blue)' : 'var(--red)';
  $('cmdBtn').style.borderLeftColor = cc; $('cmdBtn').querySelector('.ic').style.background = cc;
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
