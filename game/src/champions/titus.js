// Champion page: Titus Cassius, Roman Vanguard (C3; design doc, Titus card and "Base champion", 17 Nov). Plain
// numbers, as players see them: slow and heavy, 30 a hit at 1.2 a second, paid back with 480 health.
export default {
  id: 'titus', name: 'Titus Cassius', cls: 'vanguard', origin: 'Roman', plain: true,
  // rate: hits a second; reach: m; spd: m/s on foot
  stats: { hp: 480, dmg: 30, rate: 1.2, reach: 1.4, spd: 5.9 },
  weapons: ['sword'], // gladius and scutum
  // slash, slash, shield bash (staggers, never over `stunMax` s): the wait after each blow, in beats; they average 1 / rate
  combo: { beat: [1, 1, 1.2], bash: 2, stunMax: 1 },
  mount: { kind: 'horse', hp: 200, mps: 11.2 }, // Roman battle horse: health, m/s
  recruits: ['foot', 'arch'], spearmen: true, // his footmen carry the spear from the start
  // army shift (% off the base soldier): no change until the designer sets his numbers
  army: { foot: { hp: 0, dmg: 0, spd: 0 }, arch: { hp: 0, dmg: 0, spd: 0 } },
  influence: null, // shield discipline: the designer decides (army shift or its own effect)
  sp1: null, sp2: null, ult: null, armyUlt: null,
};
