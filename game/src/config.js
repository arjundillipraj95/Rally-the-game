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
  roman:     { name: 'Romans', code: 'r' },
  greek:     { name: 'Greeks', code: 'g' },
  barbarian: { name: 'Barbarians', code: 'b' },
};
export const FACTION_IDS = ['roman', 'greek', 'barbarian'];
export const factionFromCode = c => FACTION_IDS.find(f => FACTIONS[f].code === c) || 'roman';

export const PRESETS = { ffa: [0, 1, 2, 3], '2v2': [0, 1, 1, 0], '2v1v1': [0, 1, 2, 0], '3v1': [0, 1, 0, 0] };
export const AL_LETTER = ['A', 'B', 'C', 'D'];

export const MODES = {
  conquest: { name: 'Conquest', time: 600, title: 'Castle Strength', desc: 'Knock down every enemy castle. A castle only takes damage from fighters on foot.' },
  dm:       { name: 'Deathmatch', time: 480, title: 'Tickets', desc: 'Each team has 250 tickets. A lost soldier costs 1, a lost captain 5. The leading captain carries a bounty worth double gold.' },
  ctf:      { name: 'Capture the Fort', time: 600, title: 'Captures', desc: 'A banner waits in the fort at the centre. Carry it home on foot to score. Allies pool captures; first side to 3 wins.' },
  ctrl:     { name: 'Control', time: 600, title: 'Control Score', desc: 'Five points are scattered across the map. Whoever has the most soldiers on a point owns it, and every point you hold adds to your score each second. Allies pool their score; first alliance to 450 wins.' },
};
// Control mode: capture points, how they flip, and how fast score builds.
export const CTRL = { points: 5, captureTime: 5, rate: 1, win: 450, radius: 5 };

export const MAPS = {
  forum:     { id: 'forum',     name: 'Forum',        desc: 'A Roman city. Streets between the houses funnel every army, and four temples give the high ground: fighting down their steps deals +20% damage and archers on top shoot 30% farther.', sky: 0xdcd6c6, fog: [70, 200], g1: 0xd9cdb4, g2: 0xc8b99c, g3: 0xb5a584, hill: 0x8a7c66, rock: 0x9b9384 },
  colosseum: { id: 'colosseum', name: 'Colosseum',    desc: 'An arena ringed by a roaring crowd. The inner pit has four gates that slam shut for 20 seconds every minute.', sky: 0xdcd6c6, fog: [80, 220], g1: 0xdcc08e, g2: 0xcdae78, g3: 0xb89a6a, hill: 0x8a7c66, rock: 0x9b9384 },
  desert:    { id: 'desert',    name: 'Desert Fort',  desc: 'A walled fortress on a plateau in the middle of the sands. Four ramps lead up through its gates; hold them and you hold the high ground.', sky: 0xe6d6b8, fog: [70, 230], g1: 0xe2bd82, g2: 0xd2a468, g3: 0xb98f5c, hill: 0x9c7a50, rock: 0xa58a68 },
  wooden:    { id: 'wooden',    name: 'Wooden Fort',  desc: 'Every castle sits inside a log palisade with two gates, in a green valley of huts and watchtowers. Defenders fight at the gates.', sky: 0xcfdde0, fog: [60, 210], g1: 0x7fa04a, g2: 0x6c8a42, g3: 0x5d6f40, hill: 0x5b6a55, rock: 0x8a8d86 },
  valley:    { id: 'valley',    name: 'Grass Valley', desc: 'Open fields and gentle hills. A ring of rocky outcrops guards the middle with eight passes. Horses shine here; archers need the rocks for cover.', sky: 0xcfdde0, fog: [60, 220], g1: 0x8aad50, g2: 0x76983f, g3: 0x5d6f40, hill: 0x5b6a55, rock: 0x8f8f86 },
  dunes:  { id: 'dunes',  name: 'Dune Field',  desc: 'Open sand and scattered fences. Straight fights.', sky: 0xdcd6c6, fog: [70, 190], g1: 0xc9a978, g2: 0xb8956a, g3: 0xa88a62, hill: 0x6e6258, rock: 0x8d8174 },
  river:  { id: 'river',  name: 'River Ford',  desc: 'A river splits the field. Two bridges and a shallow ford that slows everyone crossing it.', sky: 0xcfdde0, fog: [70, 190], g1: 0x7f9a4c, g2: 0x6c8a42, g3: 0x5d6f40, hill: 0x5b6a55, rock: 0x8a8d86 },
  forest: { id: 'forest', name: 'Pine Forest', desc: 'Dense pine clusters. Trees stop arrows and hide ambushes.', sky: 0xb9c8b0, fog: [34, 120], g1: 0x55733a, g2: 0x62803f, g3: 0x44582f, hill: 0x3e4c34, rock: 0x7a7c70 },
  frost:  { id: 'frost',  name: 'Frost Hill',  desc: 'A snowy hill at the centre. Fighting downhill deals +20% damage and archers on top shoot 30% farther.', sky: 0xe4ecf2, fog: [60, 170], g1: 0xeef3f6, g2: 0xd7e0e8, g3: 0xb8c4ce, hill: 0x9aa6b2, rock: 0x8e969c },
};

export const KINDS = ['captain', 'foot', 'arch'];
export const STATS = {
  captain: { hp: 150, dmg: 22, reach: 1.3,  cd: .6,  spd: 5.4, r: .62, block: .3 },
  foot:    { hp: 95,  dmg: 13, reach: 1.25, cd: .95, spd: 5.4, r: .55, block: .35, cost: 40, name: 'Footman' },
  arch:    { hp: 60,  dmg: 6,  reach: 1.1,  cd: 1.2, spd: 5.3, r: .5,  block: 0,   cost: 50, name: 'Archer', range: 22, shoot: 2.3, arrow: 10, jitter: .8 },
};
export const HUMAN_CAPTAIN = { dmg: 30, spd: 6.3 };
export const RECRUITS = ['foot', 'arch'];

// Footman's 3 tiers: sword & shield -> spear, javelin & a better shield -> heavier armor & hp.
// Index = number of foot upgrades bought (foot1 + foot2), so 0/1/2.
export const FOOT_TIERS = [
  { hp: 95,  dmg: 13, reach: 1.25, cd: .95, spd: 5.4, r: .55, block: .35, javelin: false, name: 'Footman' },
  { hp: 105, dmg: 15, reach: 2.1,  cd: 1.0,  spd: 5.2, r: .55, block: .4,  javelin: true,  name: 'Footman (Arms)' },
  { hp: 130, dmg: 16, reach: 2.1,  cd: 1.0,  spd: 5.0, r: .55, block: .45, javelin: true,  name: 'Footman (Armor)' },
];
// Archer's 3 tiers: base -> a balanced all-round bump -> more range & tighter accuracy.
// jitter is the aim-spread radius (lower = more accurate = more head/critical shots).
export const ARCH_TIERS = [
  { hp: 60, dmg: 6, reach: 1.1, cd: 1.2, spd: 5.3, r: .5, block: 0, range: 22, shoot: 2.3, arrow: 10, jitter: .8,  name: 'Archer' },
  { hp: 68, dmg: 7, reach: 1.1, cd: 1.1, spd: 5.4, r: .5, block: 0, range: 23, shoot: 2.1, arrow: 11, jitter: .7,  name: 'Archer (Training)' },
  { hp: 68, dmg: 7, reach: 1.1, cd: 1.1, spd: 5.4, r: .5, block: 0, range: 29, shoot: 2.0, arrow: 12, jitter: .45, name: 'Archer (Marksman)' },
];
// The captain rides the Footman upgrade line: a small stat bump plus the javelin at tier 1+,
// so playing the captain always mirrors what the squad's Footman upgrades are doing.
export const CAPTAIN_TIERS = [
  { hpB: 0,  dmgB: 0, reachB: 0,  javelin: false },
  { hpB: 15, dmgB: 4, reachB: .3, javelin: true },
  { hpB: 35, dmgB: 7, reachB: .3, javelin: true },
];
// A single javelin throw: reuses the arrow flight/hit pipeline, flat damage, on a cooldown.
export const JAVELIN = { dmg: 24, range: 10, cd: 6.5 };
// Missile volley: a squad-wide "fire at will" command on its own team cooldown, separate from
// individual archer/javelin cooldowns so it stays a burst rather than a free DPS button.
export const VOLLEY = { cd: 9 };

export const DIFF = [{ name: 'Recruit', dmg: .7, income: 8 }, { name: 'Soldier', dmg: 1, income: 10 }, { name: 'Warlord', dmg: 1.25, income: 12 }];
// Gold per second for a human player, and how often the computer tries to hire.
export const ECON = { humanIncome: 10, startGold: 60, aiRecruitEvery: [1.5, 3] };

export const SQUAD_CAP = 20;
export const START_SQUAD = ['foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'arch', 'arch', 'arch'];
export const FULL_SQUAD = ['foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'foot', 'arch', 'arch', 'arch', 'arch', 'arch', 'arch'];
export const ORDERS = ['follow', 'hold', 'charge', 'shieldwall'];
export const ORDER_NAMES = { follow: 'Follow me!', hold: 'Hold here!', charge: 'Charge!', shieldwall: 'Shieldwall!' };

// Upgrades bought with gold during a battle. Footman/Archer tiers are single-purchase (one
// cost each, foot2/arch2 require foot1/arch1 first); Aura/Horse stay repeatable up to 3 levels.
export const UPGRADES = [
  { id: 'foot1', name: 'Arms',     desc: 'Footmen: spear + javelin throw, better sword & shield', cost: [90] },
  { id: 'foot2', name: 'Armor',    desc: 'Footmen: heavier armor, more HP',                        cost: [160] },
  { id: 'arch1', name: 'Training', desc: 'Archers: all-round stat increase',                       cost: [90] },
  { id: 'arch2', name: 'Marksman', desc: 'Archers: +range, +accuracy',                              cost: [160] },
  { id: 'aura',  name: 'Aura',     desc: 'Bigger, stronger aura',                                   cost: [80, 140, 220] },
  { id: 'horse', name: 'Horse',    desc: 'Tougher, faster, back sooner',                             cost: [80, 140, 220] },
];
// The captain's aura: soldiers this close fight harder, block more and move a little faster.
export const AURA = { range: 8, perRange: 3, bonus: .1, perBonus: .05 };
export const CASTLE_R = 9.5, CASTLE_REACH = 11;
export const HORSE_HP = 120, HORSE_CD = 20;
export const DM_TICKETS = 250, CAPS_TO_WIN = 3;
export const WORLD_LIMIT = 88;
