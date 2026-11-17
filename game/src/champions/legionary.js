// Champion page: the Legionary. Today's captain kept as a champion (C1a), so a battle with nobody chosen plays as it
// did: three weapons (sword, spear, javelins), the horse, the footman and archer army. No special attacks or ults:
// his level-ups bring stats only. Replaced as the default once Titus is built.
export default {
  id: 'legionary', name: 'Legionary', cls: 'vanguard', origin: 'Roman',
  // health and a hit as shares of an infantryman (config/champs.js UNITS); spd: on foot (m/s); the horse's own share
  stats: { hp: 4, hit: .34, spd: 6.2 },
  weapons: ['sword', 'spear', 'jav'],
  mount: { kind: 'horse', hp: 2, spd: 1 },
  recruits: ['foot', 'arch'],
  influence: null,
  sp1: null, sp2: null, ult: null, armyUlt: null,
};
