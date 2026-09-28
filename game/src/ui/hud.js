// Scoreboard, clock, health, gold, squad count and button labels.
import { TEAMS, MODES, STATS, HORSE_HP, DM_TICKETS, CAPS_TO_WIN, AL_LETTER } from '../config.js';
import { G, isFfa } from '../core/state.js';
import { teamOut, teamScore, squadOf, canRecruit } from '../core/sim.js';
import { session, isClient } from '../net/session.js';

const $ = id => document.getElementById(id);
export const fmt = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

export function buildHud() {
  $('ptsTitle').textContent = MODES[G.mode].title;
  $('tpRows').innerHTML = TEAMS.map((t, i) => `<div class="tp${i === G.myTi ? ' me' : ''}" id="tp${i}"><span class="al">${isFfa() ? '' : AL_LETTER[G.ALLY[i]]}</span><div class="bar"><i style="background:${t.css}"></i></div><b>0</b></div>`).join('');
  $('pips').innerHTML = TEAMS.map((t, i) => `<span class="pip" id="pip${i}" style="background:${t.css}">${t.name[0]}</span>`).join('');
  $('clockMax').textContent = fmt(MODES[G.mode].time);
}
export function showHud() {
  ['ovTitle', 'ovEnd', 'ovBrowse', 'ovLobby'].forEach(id => $(id).hidden = true);
  $('hudWrap').hidden = false; $('joyhint').style.opacity = 1;
}

// lastSnapAt: when a client last heard from the host
export function updateHud(lastSnapAt) {
  G.teams.forEach((s, i) => {
    const row = $('tp' + i); if (!row) return;
    const v = teamScore(i), max = G.mode === 'conquest' ? 100 : G.mode === 'dm' ? DM_TICKETS : CAPS_TO_WIN;
    row.querySelector('i').style.transform = `scaleX(${Math.max(0, v) / max})`;
    row.querySelector('b').textContent = G.mode === 'ctf' ? `${v}/${CAPS_TO_WIN}` : Math.max(0, Math.ceil(v));
    const out = teamOut(i); row.classList.toggle('out', out);
    const pip = $('pip' + i); pip.classList.toggle('out', out); pip.classList.toggle('hum', !!s.human); pip.textContent = out ? '✕' : TEAMS[i].name[0];
  });
  $('clockT').textContent = fmt(G.T);
  const p = G.player, me = G.teams[G.myTi];
  if (p) {
    $('hpT').textContent = `${Math.max(0, Math.ceil(p.hp))}/${p.max}`;
    $('hpBar').style.transform = `scaleX(${Math.max(0, p.hp) / p.max})`;
    $('horseBarWrap').hidden = !p.mounted;
    $('horseBar').style.transform = `scaleX(${Math.max(0, p.horseHp) / HORSE_HP})`;
  }
  const gold = Math.floor(me.gold); $('gold').textContent = gold;
  const sq = squadOf(G.myTi); $('squadN').textContent = sq.length;
  const c = k => sq.filter(u => u.kind === k).length; $('squadMix').textContent = `F${c('foot')} S${c('spear')} A${c('arch')}`;
  document.querySelectorAll('#tray button').forEach(b => {
    b.setAttribute('aria-disabled', (gold < STATS[b.dataset.kind].cost || sq.length >= G.squadCap || !canRecruit(G.myTi)) ? 'true' : 'false');
  });
  let t1 = 'Ride', t2 = 'horse';
  if (p && p.mounted) { t1 = 'Walk'; t2 = 'get off'; } else if (p && p.summon) { t1 = '…'; t2 = 'coming'; } else if (p && p.horseCd > 0) { t1 = Math.ceil(p.horseCd) + 's'; t2 = 'resting'; }
  $('mntT').textContent = t1; $('mntS').textContent = t2;
  $('mnt').classList.toggle('dim', !p || (!p.mounted && (p.horseCd > 0 || p.carrying || p.dead)));
  $('blk').classList.toggle('dim', !p || p.mounted);
  $('atk').classList.toggle('dim', !p || p.carrying);
  const o = me.order || 'follow';
  $('cmdT').textContent = o === 'follow' ? 'Follow me!' : o === 'hold' ? 'Hold here!' : 'Charge!';
  const cc = o === 'follow' ? 'var(--green)' : o === 'hold' ? 'var(--yellow)' : 'var(--red)';
  $('cmdBtn').style.borderLeftColor = cc; $('cmdBtn').querySelector('.ic').style.background = cc;
  const NET = session.NET, tag = $('netTag');
  if (NET) {
    tag.hidden = false;
    const others = TEAMS.map((t, i) => i).filter(i => G.teams[i].human && i !== G.myTi).map(i => TEAMS[i].name);
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
