// Champion page: Titus Cassius, Roman Vanguard (C3; design doc, Titus card and "Base champion", 17 Nov). Shown
// numbers: slow and heavy, 30 a hit at 1.2 a second, paid back with 480 health. His soldiers take the same shares
// off the base (champions/army.js).
export default {
  id: 'titus', name: 'Titus Cassius', cls: 'vanguard', origin: 'Roman',
  stats: { hp: 480, dmg: 30, rate: 1.2, reach: 1.4, spd: 5.9 },
  weapons: ['sword'], // gladius and scutum
  look: { shield: 'scutum_titus', sword: 'gladius_titus', model: 'titus' }, // his own pieces (models/<name>.glb, <model>_anim.glb: body, helmet, cloak); team-colour areas stay shared
  combo: { bash: true, stun: .45 }, // slash, slash, shield bash: his boosted hit (1.5x, as every champion's third), a stagger of `stun` s
  mount: { kind: 'horse', hp: 200, spd: 11.2 }, // Roman battle horse: health, m/s riding
  recruits: ['foot', 'arch'], spearmen: true, // his footmen carry the spear from the start
  influence: null, // shield discipline: the designer decides
  // Testudo march (C3e, agreed 17 Nov), from the full horn: his soldiers within `r` m lock shields in `form` s (heal
  // `heal`), march `dist` m in `march` s the way he faces (`gap` m apart) and shout, shoving enemies within `shoutR` m
  // of the front `shove` m. From a front of `arc` rad blows are turned (an ult lands at `ultX`); arrows do nothing.
  // his lines and his army's (design doc, Titus card: dry humour, he loves Rome), shown as speech bubbles (C3j) until
  // they are recorded: his own when he comes back, kills a champion or calls an ult; his men's by the moment
  lines: {
    self: ['I would have built Rome in a day.', 'Rome forgot. Rome will remember.', 'For my father!', 'The eagle goes where I go. Keep up.',
      'Hold the line. I\'ll be back to inspect it.', 'Exiled, not defeated.', 'The Senate sends its regards. I return them.',
      'A Cassius never retreats. He relocates.', 'Shields up. Opinions down.', 'The Crown, then home. In that order.'],
    army: {
      march: ['Move, move, spears!', 'Left, right, left. Mostly left.', 'Wherever he goes, we go. Sadly.', 'Keep pace with the general!', 'My feet signed up for this. I didn\'t.'],
      charge: ['For Titus! For Rome!', 'Pila first, questions later!', 'Charge! Wait, all of us?', 'Into them, lads!', 'Last one there carries the eagle!'],
      hold: ['Spears down! Brace!', 'We hold. It\'s what we do.', 'Nobody passes. Nobody.', 'Plant your feet, Marcus!'],
      testudo: ['Testudo!', 'Shields up, heads down!', 'Lock them tight, I can see daylight!', 'Step. Drum. Step. Drum.', 'Arrows? We don\'t hear arrows.'],
      kill: ['Go Titus! Go Titus! Go Titus!', 'Did you see that?!', 'That\'s our general!', 'Rome remembers that one.'],
      fell: ['The general\'s down!', 'Hold until he\'s back!', 'He\'s only resting!'],
      back: ['He\'s back! Look busy!', 'The general rides again!', 'Told you he was resting.'],
      taken: ['The castle is ours!', 'Raise the eagle!', 'Nice walls. We\'ll keep them.', 'Somebody tell the Senate.', 'Another one for Rome!'],
      attacked: ['They\'re at the gate!', 'To the walls!', 'We\'ll be back for it!', 'Not our castle! Not today!'],
      upgraded: ['New shields! Finally!', 'Promoted! Same pay.', 'Triarii now. Show some respect.'],
      archers: ['Loose!', 'Aim for the shiny ones!', 'Cretan arrows, Roman targets.'],
      rout: ['Back! Back!', 'This is a tactical walk!', 'Regroup on the eagle!'],
      crown: ['The Sceptre! Grab it!', 'The Crown! Up the mountain!', 'Titus, Crown, home. In that order.'],
    },
  },
  armyUlt: { name: 'Testudo march', short: 'Testudo', aimFace: true, range: 10, r: 15, form: .6, march: 4, dist: 10, heal: .25, gap: .95,
    arc: 2 * Math.PI / 3, ultX: .3, shove: 1, shoutR: 2,
    ai: (u, foe, fd, B) => fd < 12 && B.ownMen(u, 15).length >= 4, // (a computer Titus: with his men round him and a fight close)
    run(u, at, B) { B.testudo(u, at, this); } },
  // Shield of Cassius (C3c, agreed 17 Nov): tap raises the scutum for up to `up` s, tap again drops it. Blocks all from
  // a front arc of `arc` rad, for him and his side in a zone `zone` m behind (`rideZone` from the saddle), `zw` m to
  // either side. He can't attack; moves at `pace`, turning `turn` rad/s toward where he walks (never round to walk
  // backward). An ult breaks it and lands at `ultX`. Recharge `cd` s from when it drops.
  sp2: { name: 'Shield of Cassius', short: 'Shield', cd: 10, up: 4, toggle: true, mounted: true, arc: 2 * Math.PI / 3, zone: 6, rideZone: 4, zw: 2.5, pace: .7, turn: 2.5, ultX: .3,
    ai: (u, foe, fd, B) => (!!foe.leader && fd < 6 && u.hp < u.max * .75) || B.circle(u, u.x, u.z, 14).filter(o => o.kind === 'arch').length >= 4,
    run(u, at, B) { B.raise(u, this); } },
  // Ram of Cassius (C3b, agreed 17 Nov): tap rushes the way he faces; a `wind` s wind-up, then `dist` m in `dur` s
  // (`rideDist` m from the saddle, still mounted), `w` m either side of his line. Soldiers: `soldier`, shoved aside at
  // `shove` m/s, stumbling `stumble` s. The first champion: `champ`, knocked back `kb` m, stunned `stun` s; into a
  // wall, gate or rock `wall` and `wallStun` s. A braced spear line stops it (the horse takes their blows x`horseX`).
  // Damage +`lvlUp` a level from 3. Recharge `cd` s.
  sp1: { name: 'Ram of Cassius', short: 'Ram', cd: 6, range: 5, aimFace: true, mounted: true, wind: .15, dist: 5, rideDist: 8, dur: .35, w: .7,
    soldier: 20, shove: 6, stumble: .3, champ: 35, kb: 2, stun: .5, wall: 70, wallStun: 1, horseX: 1.2, lvlUp: .05,
    run(u, at, B) { B.ram(u, at, this); } },
  // Eagle's fall (C3d, agreed 17 Nov): a leap of up to `range` m onto the spot marked when he jumps (tap: the nearest
  // enemy champion); a `crouch` s crouch, an `air` s arc `h` m high, the slam, `after` s to stand. Within `r` m of it:
  // `champ` to enemy champions (+`lvlUp` a level from 7), `soldier` to soldiers, down for `down` s; allies take `guard`
  // less for `guardT` s. In the air he takes `airTaken` of a blow. Recharge `cd` s.
  ult: { name: "Eagle's fall", short: 'Eagle', cd: 60, range: 10, crouch: .2, air: .8, after: .2, h: 3, r: 4,
    champ: 100, lvlUp: .05, soldier: 40, down: 1, guard: .2, guardT: 4, airTaken: .5,
    ai: (u, foe, fd, B) => { const a = B.autoAim(u, 9.5); return a.u && a.u.leader && Math.hypot(a.x - u.x, a.z - u.z) > 2.5 ? a : false; }, // (a computer Titus: onto a champion 2.5-9.5 m away)
    run(u, at, B) { B.leap(u, at, this); } },
};
