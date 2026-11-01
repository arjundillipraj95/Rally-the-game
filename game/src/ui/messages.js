// Turns rule announcements ('castleDown', 'flagTaken'...) into banners, sounds and buzzes,
// worded for this player. Hosts and clients use the same wording.
import { TEAMS, MODES, CAPS_TO_WIN, UPGRADES } from '../config.js';
import { G, isEnemyTi, colorOf, bus, rules } from '../core/state.js';
import { allianceCaps, horseCooldown } from '../core/sim.js';
import { groundY } from '../core/world.js';
import { banner } from './hud.js';
import { sfx, buzz } from './audio.js';
import { floatText } from '../render/effects.js';
import { cam } from '../render/camera.js';

export const allyNames = a => TEAMS.filter((_, i) => G.ALLY[i] === a).map(t => t.name).join(' & ');

export function msgText(k, a) {
  const myTi = G.myTi, nm = i => TEAMS[colorOf(i)].name, css = i => TEAMS[colorOf(i)].css, mine = i => i === myTi, ally = i => !isEnemyTi(i, myTi);
  switch (k) {
    case 'start': return [MODES[G.mode].name, G.mode === 'conquest' ? 'Tear down every enemy castle' : G.mode === 'dm' ? 'Last side with tickets wins' : G.mode === 'ctrl' ? 'Hold the points to build your score' : `Bring the banner home ${rules().caps} times`];
    // a[0] here is the castle's color: a Duo teammate shares it, so both see it as "your castle"
    case 'castleDown': return colorOf(a[0]) === colorOf(myTi) ? ['Your castle has fallen!', 'No more recruits. Stay alive.', '#e0352b']
      : [`${nm(a[0])} castle destroyed!`, a[1] === myTi ? 'Your doing' : `by ${nm(a[1])}`, css(a[0])];
    case 'tickets0': return [`${nm(a[0])} out of tickets!`, mine(a[0]) ? 'No more respawns' : ally(a[0]) ? 'Protect your ally' : 'Finish them off', css(a[0])];
    case 'bounty': return [`Bounty on ${nm(a[0])}'s captain`, mine(a[0]) ? 'Everyone is coming for you' : 'Double gold for the kill', css(a[0])];
    case 'bountyClaimed': return mine(a[0]) ? ['Bounty claimed!', '+50 gold', '#ffcf3a'] : null;
    case 'capDown': return mine(a[1]) ? [`${nm(a[0])} captain down`, '', css(a[0])] : null;
    case 'fell': return mine(a[0]) ? ['You fell!', a[1] ? 'Back in the fight in 5 seconds' : 'No way back. Your allies fight on.', '#e0352b'] : null;
    case 'respawn': return mine(a[0]) ? ['Back on your feet', 'Rally your squad'] : null;
    case 'horseDown': return mine(a[0]) ? ['Your horse is down!', `New horse in ${horseCooldown(a[0])} seconds`, '#e0352b'] : null;
    case 'rideNo': return mine(a[0]) ? (a[1] === 'banner' ? ['Not with the banner', 'Carry it home on foot'] : a[1] === 'rest' ? ['Your horse is resting', `Ready in ${a[2]} seconds`] : ['Too hot to call your horse', 'Get clear of the fight first']) : null;
    case 'flagTaken': return mine(a[0]) ? ['You have the banner!', 'Carry it home. Your squad will escort you.', css(a[0])]
      : [`${nm(a[0])} has the banner!`, ally(a[0]) ? 'Escort them home' : 'Stop the carrier', css(a[0])];
    case 'flagDropped': return mine(a[0]) ? ['Banner dropped!', 'Grab it again before it returns'] : [`${nm(a[0])} dropped the banner`, '', css(a[0])];
    case 'flagHome': return ['The banner returns to the fort', ''];
    case 'capture': return [`${nm(a[0])} captures the banner!`, `${allianceCaps(G.ALLY[colorOf(a[0])])} of ${rules().caps}`, css(a[0])];
    case 'upgrade': { const u = UPGRADES.find(x => x.id === a[1]); return mine(a[0]) && u ? [`${u.name} level ${a[2]}`, u.desc, '#ffcf3a'] : null; }
    case 'rout': return mine(a[0]) ? ['Your men are breaking!', G.teams[myTi] && G.teams[myTi].rally >= 100 ? 'Hold the Order button to sound the rally!' : 'Stay alive: they regroup in a few seconds', '#e0352b']
      : [`${nm(a[0])}'s army breaks and runs!`, ally(a[0]) ? 'Cover them' : 'Cut them down', css(a[0])];
    case 'focusDone': return mine(a[0]) ? ['Group destroyed', 'Your men fall back in', '#ffcf3a'] : null;
    case 'left': return [`${nm(a[0])}'s player left`, 'The computer takes over their army', css(a[0])];
    case 'holdTaken': { // a[0]: the alliance that took it, a[1]: what it is
      const ours = a[0] === G.ALLY[colorOf(myTi)], oasis = a[1] === 'oasis', what = oasis ? 'the Oasis' : 'a village';
      return ours ? [`Your side holds ${what}!`, oasis ? 'Your men heal in it, and gold flows in' : 'It will send you footmen', '#ffcf3a']
        : [`${allyNames(a[0])} took ${what}`, oasis ? 'They heal there and grow rich. Take it back' : 'It sends them men. Take it back', '#e0352b'];
    }
    case 'breach': { // a[0]: the castle (color) breached, a[1]: by whom
      if (colorOf(a[0]) === colorOf(myTi)) return ['Your palisade is breached!', 'Hold the gap', '#e0352b'];
      return !isEnemyTi(a[1], myTi) ? [`Breach in ${nm(a[0])}'s palisade!`, a[1] === myTi ? 'Your doing: through the gap!' : 'Through the gap!', css(a[0])] : null;
    }
    case 'fortUp': // a[0]: the castle, a[1]: its Fortify level now
      if (colorOf(a[0]) === colorOf(myTi)) return [a[1] >= 2 ? 'Gate towers built' : 'Palisade built', a[1] >= 2 ? 'They shoot whoever comes at your gates' : 'Two gates: hold them (drag Order onto a gate)', '#ffcf3a'];
      return !isEnemyTi(a[0], myTi) ? null : [`${nm(a[0])} ${a[1] >= 2 ? 'built gate towers' : 'built a palisade'}`, 'Find a gate, or hack a breach', css(a[0])];
    case 'pointCaptured': return mine(a[0]) ? [`You captured Point ${a[1]}!`, '', css(a[0])] : [`${nm(a[0])} captured Point ${a[1]}!`, ally(a[0]) ? 'Reinforce them' : 'Take it back', css(a[0])];
  }
  return null;
}

export function showMsg(k, a) {
  bus.emit('shownMsg', { k, a });
  const myTi = G.myTi;
  if (k === 'gold') { if (a[0] === myTi) { floatText(a[1], groundY(a[1], a[2]) + 2.6, a[2], `+${a[3]} gold`, '#ffcf3a'); sfx.coin(); } return; }
  if (k === 'holdMen') { const p = G.player; if (a[0] === myTi && p && !p.dead) floatText(p.x, p.y + 3.4, p.z, '+1 footman from the village', '#ffcf3a'); return; }
  if (k === 'holdTaken') { sfx.capture(); if (a[0] === G.ALLY[colorOf(myTi)]) { sfx.cheer(); buzz([50, 30, 50]); } }
  const m = msgText(k, a); if (!m) return;
  banner(m[0], m[1], m[2]);
  if (k === 'horseDown' && a[0] === myTi) { buzz(120); cam.shake = .5; }
  if (k === 'capture') { sfx.capture(); sfx.cheer(); if (!isEnemyTi(a[0], myTi)) buzz([60, 40, 60]); }
  if (k === 'castleDown') { sfx.crumble(); sfx.cheer(); cam.shake = .6; if (a[0] === myTi) buzz([100, 60, 100]); }
  if (k === 'flagTaken' && a[0] === myTi) { sfx.order(); buzz(50); }
}
