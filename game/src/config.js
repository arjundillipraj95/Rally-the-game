// Game data shared by the rules, the renderer and the UI. No engine code here,
// so this file carries over unchanged if Rally ever moves to a native engine.

export const TEAMS = [
  { name: 'Blue',   hex: 0x3a5cf0, css: '#3a5cf0', pos: [-56,  56] },
  { name: 'Red',    hex: 0xe0352b, css: '#e0352b', pos: [ 56, -56] },
  { name: 'Green',  hex: 0x2fbf46, css: '#2fbf46', pos: [-56, -56] },
  { name: 'Yellow', hex: 0xf0c419, css: '#f0c419', pos: [ 56,  56] },
];

// Faction sets a team's look only; every faction plays the same.
export const FACTIONS = {
  roman:     { name: 'Romans' },
  greek:     { name: 'Greeks' },
  barbarian: { name: 'Barbarians' },
};

export const PRESETS = { ffa: [0, 1, 2, 3], '2v2': [0, 1, 1, 0], '2v1v1': [0, 1, 2, 0], '3v1': [0, 1, 0, 0] };
export const AL_LETTER = ['A', 'B', 'C', 'D'];

export const MODES = {
  conquest: { name: 'Conquest', time: 600, title: 'Castle Strength', desc: 'Knock down every enemy castle. A castle only takes damage from fighters on foot.' },
  dm:       { name: 'Deathmatch', time: 480, title: 'Tickets', desc: 'Each team has 150 tickets. A lost soldier costs 1, a lost captain 5. The leading captain carries a bounty worth double gold.' },
  ctf:      { name: 'Capture the Fort', time: 600, title: 'Captures', desc: 'A banner waits in the fort at the centre. Carry it home on foot to score. Allies pool captures; first side to 3 wins.' },
};

export const MAPS = {
  dunes:  { id: 'dunes',  name: 'Dune Field',  desc: 'Open sand and scattered fences. Straight fights.', sky: 0xdcd6c6, fog: [70, 190], g1: 0xc9a978, g2: 0xb8956a, g3: 0xa88a62, hill: 0x6e6258, rock: 0x8d8174 },
  river:  { id: 'river',  name: 'River Ford',  desc: 'A river splits the field. Two bridges and a shallow ford that slows everyone crossing it.', sky: 0xcfdde0, fog: [70, 190], g1: 0x7f9a4c, g2: 0x6c8a42, g3: 0x5d6f40, hill: 0x5b6a55, rock: 0x8a8d86 },
  forest: { id: 'forest', name: 'Pine Forest', desc: 'Dense pine clusters. Trees stop arrows and hide ambushes.', sky: 0xb9c8b0, fog: [34, 120], g1: 0x55733a, g2: 0x62803f, g3: 0x44582f, hill: 0x3e4c34, rock: 0x7a7c70 },
  frost:  { id: 'frost',  name: 'Frost Hill',  desc: 'A snowy hill at the centre. Fighting downhill deals +20% damage and archers on top shoot 30% farther.', sky: 0xe4ecf2, fog: [60, 170], g1: 0xeef3f6, g2: 0xd7e0e8, g3: 0xb8c4ce, hill: 0x9aa6b2, rock: 0x8e969c },
};

export const KINDS = ['captain', 'foot', 'spear', 'arch'];
export const STATS = {
  captain: { hp: 150, dmg: 22, reach: 1.3,  cd: .6,  spd: 5.4, r: .62, block: .3 },
  foot:    { hp: 60,  dmg: 13, reach: 1.25, cd: .95, spd: 5.4, r: .55, block: .3,  cost: 40, name: 'Footman' },
  spear:   { hp: 55,  dmg: 14, reach: 2.4,  cd: 1.1, spd: 5.0, r: .55, block: .08, cost: 45, name: 'Spearman' },
  arch:    { hp: 38,  dmg: 6,  reach: 1.1,  cd: 1.2, spd: 5.3, r: .5,  block: 0,   cost: 50, name: 'Archer', range: 22, shoot: 2.3, arrow: 10 },
};
export const HUMAN_CAPTAIN = { dmg: 30, spd: 6.3 };
export const RECRUITS = ['foot', 'spear', 'arch'];

export const DIFF = [{ name: 'Recruit', dmg: .7, income: 2.2 }, { name: 'Soldier', dmg: 1, income: 3 }, { name: 'Warlord', dmg: 1.25, income: 4 }];

export const SQUAD_CAP = 12;
export const STRESS_SQUAD_CAP = 20;
export const CASTLE_R = 9.5, CASTLE_REACH = 11;
export const HORSE_HP = 120, HORSE_CD = 20;
export const DM_TICKETS = 150, CAPS_TO_WIN = 3;
export const WORLD_LIMIT = 88;
