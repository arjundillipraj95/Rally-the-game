// Champion page: the Legionary. Today's captain kept as a champion (C1a), so a battle with nobody chosen plays as it
// did: three weapons (sword, spear, javelins), the horse, the footman and archer army. No special attacks or ults:
// his level-ups bring stats only. Replaced as the default once Titus is built.
export default {
  id: 'legionary', name: 'Legionary', cls: 'vanguard', origin: 'Roman',
  // (C1g) shown numbers: health, damage a hit, hits a second, reach (m), m/s on foot; the base champion (CHAMP_BASE)
  stats: { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, spd: 6.2 },
  weapons: ['sword', 'spear', 'jav'],
  mount: { kind: 'horse', hp: 200, spd: 11.2 }, // (C1g: the horse's health and m/s riding)
  recruits: ['foot', 'arch'],
  influence: null,
  sp1: null, sp2: null, ult: null, armyUlt: null,
};
