// Champion page: Devi, Chola Striker (C4; design doc, Devi card and "Base champion", 18 Nov). The ADC: 24 an arrow at
// 1.75 a second (42 a second, the base's), 14 m, paid for with 300 health and slower feet. Her basic attack is the
// ranged one (RANGE1, core/sim/ranged.js); her specials are in core/sim/deviShots.js. Her soldiers take the same
// shares off the base (champions/army.js): archers and stone throwers.
export default {
  id: 'devi', name: 'Devi', cls: 'striker', origin: 'Chola',
  lore: 'Daughter of a Chola sea captain lost at sea. The old Chola queen was the only bearer ever to give the Crown back; Devi wants it, to learn why.',
  difficulty: 2, title: 'The Captain\'s Daughter',
  stats: { hp: 300, dmg: 24, rate: 1.75, reach: 14, spd: 5.9 },
  ranged: { third: 18 }, // arrows (RANGE1): homing, sticky on a champion; the third shot two arrows of `third`
  weapons: ['sword'], // (duels: two arrows held like daggers, C4g; the rules use the sword's)
  // her own pieces: body (models/devi_anim.glb), bow in her left hand, an arrow in her right (a second in her left in a
  // duel, the bow on her back), her horse, her archers' body; clips: the bow's for walking, shooting and dodging, the
  // daggers' in a duel
  look: { model: 'devi', bow: 'bow_devi', arrow: 'arrow_devi', horse: 'horse_devi', archer: 'archer_chola',
    clips: { idle: 'bowIdle', walk: 'bowWalkF', walkBack: 'bowWalkB', strafeL: 'bowWalkL', strafeR: 'bowWalkR', run: 'bowRun', runBack: 'bowWalkB', strafeRunL: 'bowWalkL', strafeRunR: 'bowWalkR' },
    swings: { 7: 'bowRecoil', 8: 'bowRecoil', 9: 'bowOverdraw' }, duel: { 0: 'stab1', 1: 'stab2', 4: 'doubleStab', 5: 'stab3' } },
  mount: { kind: 'horse', hp: 200, spd: 11.2 }, // southern war horse: health, m/s riding
  recruits: ['arch', 'thrower'],
  // her archers' line (the base archer's tiers, renamed and changed): fire arrows (x3 on stone throwers), then the
  // longbow (26 m, a fifth more damage); stone throwers: fire pots, then reinforced (config THROWER_TIERS)
  tiers: { arch: [{ name: 'Villalar' }, { name: 'Agni Villalar', fireArrows: true }, { name: 'Vil Veeran', range: 26, dmgX: 1.2, fireArrows: true }] },
  upNames: { arch1: ['Agni Villalar', 'Fire arrows: x3 on siege engines'], arch2: ['Vil Veeran', 'Longbows: 26 m, harder'] },
  influence: null,
  lines: {
    self: ['The queen gave it back. I won\'t.', 'My father sailed for the horizon. I aim past it.', 'One arrow. One answer.', 'Too slow. Try again.',
      'Thanjavur sends its greetings. Sharply.', 'Stand still. It\'s kinder.', 'The sea taught me patience. The bow taught me the rest.',
      'Every crown has a weak spot.', 'Draw. Breathe. Loose.', 'I don\'t miss. I wait.'],
    army: {
      march: ['Keep up with the captain!', 'Bows dry, feet moving.', 'Tanjore to the Crown, then.', 'She walks fast for someone who shoots from far.', 'Quivers full? Good.'],
      charge: ['Loose and follow!', 'For Devi!', 'Close in, then back out!', 'Arrows first, apologies never!', 'Forward, Villalar!'],
      hold: ['Hold and shoot!', 'Nobody gets close.', 'Pick them off.', 'Plant your feet, Kannan!'],
      storm: ['Darken the sky!', 'Arrows, everyone, now!', 'Make it rain!', 'All of them, all at once!', 'Nowhere to hide down there.'],
      kill: ['Devi! Devi! Devi!', 'Right through him!', 'One arrow, one answer!', 'That\'s our captain!'],
      fell: ['The captain\'s down!', 'Cover her place!', 'She\'ll be back, keep shooting!'],
      back: ['She\'s back!', 'The captain rides again!', 'Told you. Keep shooting.'],
      taken: ['The castle is ours!', 'Raise the tiger!', 'Good walls. Better now.', 'Another one for the Cholas!', 'Hang the tiger banner!'],
      attacked: ['They\'re at the gate!', 'To the walls, bows ready!', 'Not our castle!', 'Shoot them off the gate!'],
      upgraded: ['Fire arrows! Finally!', 'Longbows, now we\'re talking.', 'Same pay, longer range.'],
      archers: ['Loose!', 'Aim for the shiny ones!', 'Chola arrows, foreign targets.'],
      rout: ['Back! Back!', 'Fall back to the captain!', 'This is a long-range retreat!'],
      crown: ['The Sceptre! Grab it!', 'The Crown! Up the mountain!', 'The queen gave it back. We won\'t.'],
    },
  },
  // Piercing shot (level 3): drag aims down an `len` m line (tap: her mark), a `draw` s draw, then through everything
  // (core/sim/deviShots.js). Recharge `cd` s.
  sp1: { name: 'Piercing shot', short: 'Pierce', cd: 7, range: 18, len: 18, w: .7, draw: .25, champ: 50, soldier: 30, slow: .3, slowT: 1.5, stop: .5, blockX: .3, lvlUp: .05, mounted: true,
    ai: (u, foe, fd, B) => { const L = B.line(u, 18, .7); return (foe.leader && fd < 16) || L.length >= 3 ? { x: foe.x, z: foe.z } : false; },
    run(u, at, B) { B.pierce(u, at, this); } },
  // Evade (level 5): a `dist` m dash in `dur` s the way you drag (tap: away from the nearest enemy), untouchable; on
  // horseback the horse dashes. Recharge `cd` s.
  sp2: { name: 'Evade', short: 'Evade', cd: 8, dist: 5, dur: .2, range: 5, aimAway: true, mounted: true,
    ai: (u, foe, fd, B) => !!foe.leader && fd < 4 ? B.away(u, 5) : false, // (a computer Devi: away from a champion in her face)
    run(u, at, B) { B.evade(u, at, this); } },
  // Tiger's volley (level 7): `n` arrows over `dur` s down a `len` m line, `dmg` each into the first enemy; she turns
  // `turn` rad/s to follow; a raised shield lets 1 in `slip` through. Recharge `cd` s.
  ult: { name: 'Tiger\'s volley', short: 'Volley', cd: 60, range: 18, len: 18, w: .6, n: 20, dur: 2.5, dmg: 8, turn: Math.PI / 2, slip: 4, lvlUp: .05, mounted: true,
    ai: (u, foe, fd) => !!foe.leader && fd < 14 && foe.hp < foe.max * .7,
    run(u, at, B) { B.tigerVolley(u, at, this); } },
  // Arrow storm (army ult, level 7, from the full horn): a `warn` s mark, then for `dur` s her archers within `reach` m
  // shoot into the `r` m circle every `every` s; fire arrows set it burning after.
  armyUlt: { name: 'Arrow storm', short: 'Storm', range: 30, r: 5, warn: 2, dur: 4, every: .5, reach: 45,
    ai: (u, foe, fd, B) => B.ownMen(u, 40).filter(o => o.kind === 'arch').length >= 3 && B.circle(u, foe.x, foe.z, 5).length >= 4 ? { x: foe.x, z: foe.z } : false,
    run(u, at, B) { B.storm(u, at, this); } },
};
