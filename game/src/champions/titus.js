// Champion page: Titus Cassius, Roman Vanguard (C3; design doc, Titus card and "Base champion", 17 Nov). Shown
// numbers: slow and heavy, 30 a hit at 1.2 a second, paid back with 480 health. His soldiers take the same shares
// off the base (champions/army.js).
export default {
  id: 'titus', name: 'Titus Cassius', cls: 'vanguard', origin: 'Roman',
  stats: { hp: 480, dmg: 30, rate: 1.2, reach: 1.4, spd: 5.9 },
  weapons: ['sword'], // gladius and scutum
  combo: { bash: true, stunMax: 1 }, // slash, slash, shield bash (staggers, never over stunMax s)
  mount: { kind: 'horse', hp: 200, spd: 11.2 }, // Roman battle horse: health, m/s riding
  recruits: ['foot', 'arch'], spearmen: true, // his footmen carry the spear from the start
  influence: null, // shield discipline: the designer decides
  sp1: null, sp2: null, ult: null, armyUlt: null,
};
