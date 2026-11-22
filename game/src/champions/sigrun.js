// Champion page: Sigrun, Viking Raider (C5; Sigrun chat 21 Nov, card docs/tickets/C5.md). Fast and fragile: 27 a hit
// at 1.65 a second (44.6 a second), quick feet and a quicker wolf, paid for with 300 health. Her mount is a great grey
// wolf (mount.kind 'wolf': its own model, gait, strikes and reactions; the horse rules otherwise). Her soldiers take
// the same shares off the base (champions/army.js): swordsmen with Viking axes and round shields, and cavalry on fjord
// horses. Her moves are in core/sim/sigrun.js.
export default {
  id: 'sigrun', name: 'Sigrun', cls: 'raider', origin: 'Viking',
  lore: 'Sigrun won her longship in a dice game in Hedeby and has raided from Birka to Lindisfarne since. The skalds say whoever wears the Crown is never forgotten. She doesn\'t want a kingdom. She wants a saga.',
  difficulty: 3, ranged: false, title: 'The Uninvited',
  // budget (C1g): health -25%, damage a second +6%, foot +10%, mount +9% = -0.3%
  stats: { hp: 300, dmg: 27, rate: 1.65, reach: 1.3, spd: 6.8 },
  weapons: ['sword'], // (the bearded axe and round shield: the rules use the sword's)
  // her own pieces: body (models/sigrun_anim.glb), axe in her right hand, round shield, the wolf; her men's bodies, the
  // Úlfheðnar's at the top tier, their axes and shields, her riders' fjord horses
  look: { model: 'sigrun', shield: 'roundshield_sigrun', sword: 'axe_sigrun', horse: 'wolf_sigrun',
    swordsman: 'swordsman_viking', swordTop: 'ulfhednar', cavHorse: 'horse_fjord', soldierShield: 'roundshield_sigrun', soldierWeapon: 'axe_sigrun' },
  // the great grey wolf: health, m/s, reach from its back (claws and teeth), the horse rules otherwise (FEEL.wolf)
  mount: { kind: 'wolf', hp: 170, spd: 12.2, reach: 1.6 },
  recruits: ['sword', 'cav'],
  // (C5b) her basic hits, at her rate. On foot: slash, slash, and the boosted third an overhead chop over `arc` rad in
  // front, at most `n` hit, shoved `kb`. On the wolf: claw, claw, bite (the boosted third) on what is within `aim` m,
  // the bite slowing `slow` for `slowT` s; they ride on at `pace` for `paceT` s a strike, never a dead stop
  combo: { chop: { arc: 2 * Math.PI / 3, n: 6, kb: .9, reachB: .2 } },
  wolfHits: { aim: 3.4, slow: .2, slowT: 1, pace: .7, paceT: .35, t: .15 },
  army: { sword: { name: 'Swordsmen', tiers: ['Drengr', 'Huskarl', 'Úlfheðnar'], role: 'Axes and round shields; the wolf-pelts close in at a burst' },
    cav: { name: 'Cavalry', tiers: ['Riders', 'Spear riders', 'Barded riders'], role: 'Fjord horses: charge, ride past, wheel' } },
  // her lines (config SWORD_TIERS, CAV_TIERS renamed); the Úlfheðnar's charge-in burst: `x` pace for `t` s onto a foe
  // within `near` m (not closer than `min`), every `cd` s
  tiers: { sword: [{ name: 'Drengr' }, { name: 'Huskarl' }, { name: 'Úlfheðnar', burst: { x: 1.5, t: .8, cd: 8, near: 7, min: 2 } }],
    cav: [{ name: 'Riders' }, { name: 'Spear riders' }, { name: 'Barded riders' }] },
  upNames: { sw1: ['Huskarl', 'Pursuit: the first hit on a runner slows him; x1.5 from behind'], sw2: ['Úlfheðnar', 'Mail and wolf pelts: +30% health, +15% damage, a charge-in burst'],
    cav1: ['Spear riders', 'Lances: +40% charge damage, +10 horse health'], cav2: ['Barded riders', 'Barding: horse health +50%, harder to hit at a gallop'] },
  influence: null,
  // Pounce (C5c, level 3): tap, the nearest enemy; drag, the one nearest the spot (within `pick` m). A `crouch` s crouch,
  // a low `air` s arc (`h` m high, `rideH` on the wolf) of up to `range` m (`rideRange` on the wolf) onto him: `champ`
  // to a champion, `soldier` to a soldier, +`lvlUp` a level from 3. A kill takes the recharge down to `killCd` of it.
  sp1: { name: 'Pounce', short: 'Pounce', cd: 7, range: 5, rideRange: 8, pick: 2.5, tapNear: true, mounted: true, crouch: .15, air: .3, after: .15, h: .9, rideH: .7,
    champ: 45, soldier: 30, lvlUp: .05, killCd: .5,
    ai: (u, foe, fd) => (fd > 2 && fd < (u.mounted ? 7.5 : 4.8) ? { x: foe.x, z: foe.z } : false), // (a computer Sigrun: onto whoever she's after, from a little way off)
    run(u, at, B) { B.pounce(u, at, this); } },
  // Spin (C5d, level 5): on the wolf a `rideDist` m charge in `rideDur` s the way she aims (tap: ahead), the axe spinning,
  // cutting through all in its `w` m width (no shove): `soldier` each, `champ` a champion; a braced spear line stops it,
  // the wolf taking their spears (x`horseX`). On foot `dur` s of spin: `ticks` blows of `tick` within `r` m, +`pace`
  // speed, her slows gone; no basic hits. +`lvlUp` a level from 5.
  sp2: { name: 'Spin', short: 'Spin', cd: 9, range: 10, rideRange: 10, aimFace: true, mounted: true, rideDist: 10, rideDur: .6, w: 1.1, soldier: 25, champ: 35, horseX: 1.2,
    dur: 2.5, ticks: 4, tick: 12, r: 2.3, pace: .2, lvlUp: .05,
    ai: (u, foe, fd, B) => (u.mounted ? fd < 9 && B.line(u, 10, 1.1).length >= 2 : fd < 3.5 && (!!foe.leader || B.circle(u, u.x, u.z, 2.5).length >= 2)) ? { x: foe.x, z: foe.z } : false, // (a computer Sigrun: through a crowd on the wolf; on foot when they're on her)
    run(u, at, B) { B.spin(u, at, this); } },
  // The Hunt (C5e, ult, level 7): only on an enemy champion below `below` of his health within `range` m (`rideRange`
  // on the wolf); the button is dark without one (never wasted). Tap: the lowest of them; drag: the one by the spot. It
  // strikes in `strike` s and kills; shields don't hold it; an untouchable dash at that moment dodges it. `after` s
  // for the shake or the chop to finish; `slow` s of slow motion on both.
  ult: { name: 'The Hunt', short: 'Hunt', needText: 'Nobody wounded enough, close enough', cd: 35, range: 6, rideRange: 12, below: .2, strike: .3, after: .5, slow: .5, mounted: true,
    need(u, B) { return !!B.huntTarget(u, this); },
    ai(u, foe, fd, B) { const t = B.huntTarget(u, this); return t ? { x: t.x, z: t.z } : false; }, // (a computer Sigrun: as soon as there's one)
    run(u, at, B) { B.hunt(u, at, this); } },
  // Svinfylkingar, the boar's snout (C5f, army ult, from the full horn): her riders within `reach` m wedge up behind her
  // (`gap` m apart) for `warn` s, then charge `dur` s at `spd` m/s the way she drags; each strikes whoever he rides into
  // for `hit`, braces don't stop it, and a soldier struck is out of formation `disarray` s. Her swordsmen sprint in
  // behind (x`sprintX` for `sprint` s). With no rider by her the horn gives the usual rally cry instead.
  armyUlt: { name: 'Svinfylkingar', short: 'Snout', range: 30, reach: 40, gap: 2.4, warn: 1, dur: 3, spd: 13, hit: 30, disarray: 3, sprint: 4, sprintX: 1.5,
    need(u, B) { return B.riders(u, this).length > 0; },
    ai(u, foe, fd, B) { return B.riders(u, this).length >= 2 && fd < 22 ? { x: foe.x, z: foe.z } : false; }, // (a computer Sigrun: with two riders or more and a fight ahead)
    run(u, at, B) { B.svin(u, at, this); } },
  // (C5g) her lines and her army's (dry, quick, cocky but understated; she wants a saga), shown as speech bubbles (C3j)
  // until recorded: her own when she comes back, kills a champion or hunts; her men's by the moment
  lines: {
    self: ['Your gate was more of a suggestion.', 'Fast is a kind of armour.', 'They\'ll sing about this. I\'ll see to it.', 'Ships don\'t wait. Neither do I.',
      'I came for the Crown. The rest is souvenirs.', 'Run if you like. She enjoys that.', 'Every saga needs a villain. Volunteers?', 'I lost at dice once. Never a fight.',
      'Hedeby to here. Nobody invited me either.', 'Make it a good verse. I\'m in it.'],
    army: {
      march: ['Keep up, she won\'t wait!', 'Row, walk. Same thing.', 'Longship legs, lads.', 'Follow the wolf.', 'Somebody tell the skald we\'re moving.'],
      charge: ['For Sigrun!', 'Axes up!', 'Uninvited and on time!', 'Shields together, then not!', 'Into them!'],
      hold: ['Shields here. Nobody passes.', 'Hold, then raid.', 'We stand. Briefly.', 'Plant your feet, Leif!'],
      testudo: ['Skjaldborg!', 'Shields locked!', 'Rim to rim!', 'Wall up, wolves!'],
      snout: ['Svinfylking!', 'Boar\'s snout!', 'Wedge up! Point first!', 'Through them, not round them!', 'Ride! Ride!'],
      kill: ['Sigrun! Sigrun! Sigrun!', 'The skalds will want that one!', 'That\'s our raider!', 'Hunted!'],
      fell: ['Sigrun\'s down!', 'Hold till she\'s back!', 'She\'s only resting. Loudly.'],
      back: ['She\'s back!', 'The wolf\'s back!', 'Told you. She never misses a raid.'],
      taken: ['The castle is ours!', 'Loot first, cheer later!', 'Nice walls. Ours now.', 'Another one for the saga!', 'Raise the raven!'],
      attacked: ['They\'re at the gate!', 'To the walls!', 'Not our castle!', 'Shields to the gate!'],
      upgraded: ['Mail! Finally!', 'Wolf pelts. Smells about right.', 'Lances for the riders!'],
      rout: ['Back to the ships!', 'Regroup on the wolf!', 'This is a tactical row!'],
      crown: ['The Sceptre! Grab it!', 'The Crown! Up the mountain!', 'A crown for the saga!'],
    },
  },
};
