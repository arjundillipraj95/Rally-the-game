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
    case 'start': if (G.mode === 'crown') return ['The Crown', 'The trumpet sounds in 15 seconds. Pick a castle and run for it!'];
      return [MODES[G.mode].name, G.mode === 'conquest' ? 'Tear down every enemy castle' : G.mode === 'dm' ? 'Last side with tickets wins' : G.mode === 'ctrl' ? 'Hold the points to build your score' : `Bring the banner home ${rules().caps} times`];
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
    case 'rideNo': return mine(a[0]) ? (a[1] === 'banner' ? ['Not with the banner', 'Carry it home on foot'] : a[1] === 'rest' ? ['Your horse is resting', `Ready in ${a[2]} seconds`] : a[1] === 'duel' ? ['Not in a duel', 'Fight it out on foot'] : ['Too hot to call your horse', 'Get clear of the fight first']) : null;
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
    case 'holdTaken': { // a[0]: the alliance that took it, a[1]: what it is, a[2]: which
      const ours = a[0] === G.ALLY[colorOf(myTi)], h = G.holds && G.holds[a[2]], what = (h && h.name) || (a[1] === 'oasis' ? 'the Oasis' : 'a village');
      const give = { castle: ['+5 men for every captain on your side, and gold', 'Their armies grow. Take it back from 4:00'], mine: ['Gold pours in', 'Their purses fill. Take it back'], oasis: ['Your men heal in it, and gold flows in', 'They heal there and grow rich. Take it back'], shrine: ['Gold flows in, and your rally horns fill', 'Their horns fill and they grow rich. Take it back'], village: ['It will send you footmen', 'It sends them men. Take it back'] }[a[1]] || ['', ''];
      return ours ? [`Your side holds ${what}!`, give[0], '#ffcf3a'] : [`${allyNames(a[0])} took ${what}`, give[1], '#e0352b'];
    }
    // the war chest: a[0] the hold it lands in
    case 'chestSoon': return ['A war chest is coming!', `It lands in ${(G.holds && G.holds[a[0]] && G.holds[a[0]].name) || 'the middle'} in ${a[1]} seconds`, '#ffcf3a'];
    case 'chestUp': return ['The war chest has landed!', `${(G.holds && G.holds[a[0]] && G.holds[a[0]].name) || 'The middle'} is up for grabs: take it`, '#ffcf3a'];
    case 'chestTaken': return a[0] === G.ALLY[colorOf(myTi)] ? ['Your side took the war chest!', `+${a[1]} gold for every army, horns full`, '#ffcf3a'] : [`${allyNames(a[0])} took the war chest`, 'Their horns are full: brace yourself', '#e0352b'];
    case 'breach': { // a[0]: the castle (color) breached, a[1]: by whom
      if (colorOf(a[0]) === colorOf(myTi)) return ['Your palisade is breached!', 'Hold the gap', '#e0352b'];
      return !isEnemyTi(a[1], myTi) ? [`Breach in ${nm(a[0])}'s palisade!`, a[1] === myTi ? 'Your doing: through the gap!' : 'Through the gap!', css(a[0])] : null;
    }
    case 'fortUp': // a[0]: the castle, a[1]: its Fortify level now
      if (colorOf(a[0]) === colorOf(myTi)) return [a[1] >= 2 ? 'Gates and towers built' : 'Palisade built', a[1] >= 2 ? 'The gates open for your men only; the towers shoot whoever comes at them' : 'Two gates: hold them (drag Order onto a gate)', '#ffcf3a'];
      return !isEnemyTi(a[0], myTi) ? null : [`${nm(a[0])} ${a[1] >= 2 ? 'built gate towers' : 'built a palisade'}`, 'Find a gate, or hack a breach', css(a[0])];
    // the duel. duelAsk: a[0] calls out a[1]; duelOn/duelDraw: a[0] and a[1]; duelWon: a[0] beat a[1];
    // duelBroken: a[0] forced his way into a[1] and a[2]'s; duelNo: a[0] turned a[1] down
    case 'duelAsk': return mine(a[1]) ? ['⚔ You are challenged!', `${nm(a[0])}'s captain calls you out. Walk up to him, or tap ⚔ Accept`, css(a[0])]
      : mine(a[0]) ? ['⚔ Challenge made', `Waiting for ${nm(a[1])}'s answer`, '#ffcf3a'] : null;
    case 'duelOn': return mine(a[0]) || mine(a[1]) ? ['DUEL!', 'Your men hold the ring. Win it, and his army breaks', '#ffcf3a']
      : ally(a[0]) || ally(a[1]) ? [`${nm(ally(a[0]) ? a[0] : a[1])} is in a duel!`, 'A duel is sacred: you can only watch', '#ffcf3a'] : null;
    case 'duelWon': return mine(a[0]) ? ['You won the duel!', 'Rally horn full. His army breaks!', '#ffcf3a'] : mine(a[1]) ? ['Duel lost', 'Your men break and run', '#e0352b']
      : ally(a[0]) ? [`${nm(a[0])} wins the duel!`, `${nm(a[1])}'s army breaks: cut them down`, css(a[0])] : ally(a[1]) ? [`${nm(a[1])} lost the duel`, 'Cover his men', css(a[0])] : null;
    case 'duelDraw': return mine(a[0]) || mine(a[1]) ? ['Honours even', 'Time ran out: the duel is a draw', '#ffcf3a'] : null;
    case 'duelBroken': return mine(a[0]) ? ['You broke the duel!', 'Your men think the less of you', '#e0352b']
      : mine(a[1]) || mine(a[2]) ? ['The duel is broken!', `${nm(a[0])} forced his way in. Your men take heart`, css(a[0])] : null;
    case 'duelNo': return mine(a[1]) ? [`${nm(a[0])} refuses!`, 'His men lose heart', css(a[0])] : mine(a[0]) ? ['You refused the duel', 'Your men lose heart', '#e0352b'] : null;
    case 'duelSacred': return mine(a[0]) ? ['A duel is sacred', 'You can watch, not step in'] : null;
    case 'volleyCharge': return mine(a[0]) ? ['Volley and charge!', 'They\'re reeling: your men hit harder while it lasts', '#ffcf3a'] : null;
    case 'gateBroken': // a[0]: the castle whose gate fell, a[1]: by whom
      if (colorOf(a[0]) === colorOf(myTi)) return ['Your gate is broken!', 'Mend it from Upgrades: Fortify', '#e0352b'];
      return !isEnemyTi(a[0], myTi) ? [`${nm(a[0])}'s gate is broken!`, 'Help them hold it', css(a[0])] : [`${nm(a[0])}'s gate is down!`, a[1] === myTi ? 'Your doing: through it!' : 'Through it!', css(a[0])];
    case 'gateRepaired': return colorOf(a[0]) === colorOf(myTi) ? ['Gate mended', 'It holds again', '#ffcf3a'] : null;
    case 'armourOn': return mine(a[0]) ? ['Armour on', 'It soaks most of each blow. It won\'t mend: buy it again when it\'s gone', '#ffcf3a'] : null;
    case 'lastStand': // a[0]: the castle (color) breached, a[1]: by whom
      if (colorOf(a[0]) === colorOf(myTi)) return ['Last stand!', 'Your walls are breached. By the castle your men hit harder and won\'t run. Horn ready!', '#e0352b'];
      return !isEnemyTi(a[0], myTi) ? [`${nm(a[0])}'s castle is breached!`, 'Their last stand: get back and help them hold', css(a[0])] : [`${nm(a[0])}'s castle is breached!`, a[1] === myTi ? 'Your doing. Their last stand: finish it' : 'Their last stand: finish it', css(a[0])];
    // the Crown's phases
    case 'crownGo': return ['Go!', 'Claim a castle before someone else does', '#ffcf3a'];
    case 'crownSiegeSoon': return ['The siege starts in 20 seconds', 'Castles can be stormed from 4:00. Man your walls', '#ffcf3a'];
    case 'crownSiege': return ['Siege!', 'Any castle can be taken now: stand in its yard and hold it', '#e0352b'];
    case 'crownSoon': return ['The Crown rises in 20 seconds', 'Head for the plaza', '#ffcf3a'];
    case 'crownRise': return ['The Crown has risen!', 'Walls round the plaza! Inside: break the casing. Outside: hack a gate down', '#ffcf3a'];
    case 'towerUp': return mine(a[0]) ? ['Watchtower going up', 'It sees far through the fog once it\'s built. Enemies can hack it down', '#ffcf3a'] : null;
    case 'towerDown': return !isEnemyTi(a[0], myTi) ? [mine(a[0]) ? 'Your watchtower is down!' : `${nm(a[0])}'s watchtower is down`, a[1] >= 0 ? `Hacked down by ${nm(a[1])}` : '', '#e0352b'] : a[1] === myTi ? ['Watchtower down!', 'They\'re blind there now', '#ffcf3a'] : null;
    case 'castleGate': { // a[0]: the side holding it, a[1]: who broke it, a[2]: the castle
      const nmC = (G.holds && G.holds[a[2]] && G.holds[a[2]].name) || 'a castle';
      if (a[0] === G.ALLY[colorOf(myTi)]) return [`${nmC}'s gate is broken!`, 'Get men into the yard before they take it. It mends itself in a minute', '#e0352b'];
      return a[1] === myTi || !isEnemyTi(a[1], myTi) ? [`${nmC}'s gate is down!`, 'Into the yard and hold it', '#ffcf3a'] : null;
    }
    case 'plazaGate': return [a[1] === myTi ? 'You broke a plaza gate!' : `${nm(a[1])} broke a plaza gate!`, 'The way to the Crown is open', css(a[1])];
    case 'crownFree': return ['The Crown is free!', 'Grab it: whoever carries it at 10:00 wins', '#ffcf3a'];
    case 'crownTaken': return mine(a[0]) ? ['You have the Crown!', 'Stay alive until 10:00. Keep enemies away', '#ffcf3a']
      : [`${nm(a[0])} has the Crown!`, ally(a[0]) ? 'Guard them with your life' : 'Cut them down before 10:00', css(a[0])];
    case 'crownDropped': return mine(a[0]) ? ['You dropped the Crown!', 'Get it back', '#e0352b'] : [`${nm(a[0])} dropped the Crown!`, 'It\'s on the ground: grab it', css(a[0])];
    case 'overtime': return ['Overtime!', a[0] ? 'Enemies are too close to the Crown: it goes on' : 'Nobody has the Crown: grab it!', '#ffcf3a'];
    case 'pointCaptured': return mine(a[0]) ? [`You captured Point ${a[1]}!`, '', css(a[0])] : [`${nm(a[0])} captured Point ${a[1]}!`, ally(a[0]) ? 'Reinforce them' : 'Take it back', css(a[0])];
  }
  return null;
}

export function showMsg(k, a) {
  bus.emit('shownMsg', { k, a });
  const myTi = G.myTi;
  if (k === 'gold') { if (a[0] === myTi) { floatText(a[1], groundY(a[1], a[2]) + 2.6, a[2], `+${a[3]} gold`, '#ffcf3a'); sfx.coin(); } return; }
  if (k === 'holdMen') { const p = G.player; if (a[0] === myTi && p && !p.dead) floatText(p.x, p.y + 3.4, p.z, '+1 footman from the village', '#ffcf3a'); return; }
  if (k === 'chestUp') sfx.horn();
  if (k === 'lastStand') { sfx.crumble(); sfx.horn(); if (colorOf(a[0]) === colorOf(myTi)) { buzz([120, 60, 120]); cam.shake = .5; } }
  if (k === 'chestTaken') { sfx.capture(); if (a[0] === G.ALLY[colorOf(myTi)]) { sfx.coin(); sfx.cheer(); buzz([60, 40, 60]); } }
  if (k === 'holdTaken') { sfx.capture(); if (a[0] === G.ALLY[colorOf(myTi)]) { sfx.cheer(); buzz([50, 30, 50]); } }
  const m = msgText(k, a); if (!m) return;
  banner(m[0], m[1], m[2]);
  if (k === 'horseDown' && a[0] === myTi) { buzz(120); cam.shake = .5; }
  if (k === 'capture') { sfx.capture(); sfx.cheer(); if (!isEnemyTi(a[0], myTi)) buzz([60, 40, 60]); }
  if (k === 'castleDown') { sfx.crumble(); sfx.cheer(); cam.shake = .6; if (a[0] === myTi) buzz([100, 60, 100]); }
  if (k === 'flagTaken' && a[0] === myTi) { sfx.order(); buzz(50); }
}
