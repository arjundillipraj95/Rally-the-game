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
  army: { sword: { name: 'Swordsmen', tiers: ['Drengr', 'Huskarl', 'Úlfheðnar'], role: 'Axes and round shields; the wolf-pelts close in at a burst' },
    cav: { name: 'Cavalry', tiers: ['Riders', 'Spear riders', 'Barded riders'], role: 'Fjord horses: charge, ride past, wheel' } },
  // her lines (config SWORD_TIERS, CAV_TIERS renamed); the Úlfheðnar's charge-in burst: `x` pace for `t` s onto a foe
  // within `near` m (not closer than `min`), every `cd` s
  tiers: { sword: [{ name: 'Drengr' }, { name: 'Huskarl' }, { name: 'Úlfheðnar', burst: { x: 1.5, t: .8, cd: 8, near: 7, min: 2 } }],
    cav: [{ name: 'Riders' }, { name: 'Spear riders' }, { name: 'Barded riders' }] },
  upNames: { sw1: ['Huskarl', 'Pursuit: the first hit on a runner slows him; x1.5 from behind'], sw2: ['Úlfheðnar', 'Mail and wolf pelts: +30% health, +15% damage, a charge-in burst'],
    cav1: ['Spear riders', 'Lances: +40% charge damage, +10 horse health'], cav2: ['Barded riders', 'Barding: horse health +50%, harder to hit at a gallop'] },
  influence: null,
  lines: {
    self: ['Your gate was more of a suggestion.', 'Fast is a kind of armour.', 'They\'ll sing about this. I\'ll see to it.', 'Ships don\'t wait. Neither do I.'],
    army: {},
  },
};
