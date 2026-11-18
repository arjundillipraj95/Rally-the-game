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
  sp2: null, armyUlt: null,
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
