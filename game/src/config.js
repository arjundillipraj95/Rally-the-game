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
  dm:       { name: 'Deathmatch', time: 480, title: 'Tickets', desc: 'Each team has {tickets} tickets. A lost soldier costs 1, a lost captain 5. The leading captain carries a bounty worth double gold.' },
  ctf:      { name: 'Capture the Fort', time: 600, title: 'Captures', desc: 'A banner waits in the fort at the centre. Carry it home on foot to score. Allies pool captures; first side to {caps} wins.' },
  ctrl:     { name: 'Control', time: 600, title: 'Control Score', desc: 'Five points are scattered across the map. Whoever has the most soldiers on a point owns it, and every point you hold adds to your score each second. Allies pool their score; first alliance to {win} wins.' },
};
// Match length. Quick (the default) is a 4-5 minute battle: lower targets, castles that fall faster
// and computer armies that march out with smaller squads. Standard is the original full-length war.
export const LENGTHS = {
  quick: { name: 'Quick', time: { conquest: 300, dm: 240, ctf: 270, ctrl: 240 }, tickets: 150, caps: 3, win: 280, castle: 2.2, gather: .6, gold: 1.5 },
  standard: { name: 'Standard', time: { conquest: 600, dm: 480, ctf: 600, ctrl: 600 }, tickets: 250, caps: 6, win: 720, castle: 1, gather: 1, gold: 1 },
};
// Control mode: capture points, how they flip, and how fast score builds.
export const CTRL = { points: 5, captureTime: 5, rate: 1, win: 450, radius: 5 };

export const MAPS = {
  forum:     { id: 'forum',     name: 'Forum',        desc: 'A Roman city. Rows of houses wall off every corner, so armies meet in the streets and fight for the gates between them. Four temples give the high ground: fighting down their steps deals +20% damage and archers on top shoot 30% farther.', sky: 0xdcd6c6, fog: [70, 200], g1: 0xd9cdb4, g2: 0xc8b99c, g3: 0xb5a584, hill: 0x8a7c66, rock: 0x9b9384 },
  colosseum: { id: 'colosseum', name: 'Colosseum',    desc: 'An arena ringed by a roaring crowd. The inner pit has four gates that slam shut for 20 seconds every minute.', sky: 0xdcd6c6, fog: [80, 220], g1: 0xdcc08e, g2: 0xcdae78, g3: 0xb89a6a, hill: 0x8a7c66, rock: 0x9b9384 },
  desert:    { id: 'desert',    name: 'Desert Fort',  desc: 'A walled fortress on a plateau, ringed by sandstone mesas. Lanes wind round them to the four ramps up to the fort, and the oases lie in the passes between corners (wading them is slow). Hold the ramps and you hold the high ground.', sky: 0xe6d6b8, fog: [70, 230], g1: 0xe2bd82, g2: 0xd2a468, g3: 0xb98f5c, hill: 0x9c7a50, rock: 0xa58a68 },
  wooden:    { id: 'wooden',    name: 'Wooden Fort',  desc: 'Every castle sits inside a log palisade with two gates, in a green valley of huts and watchtowers. Defenders fight at the gates.', sky: 0xcfdde0, fog: [60, 210], g1: 0x7fa04a, g2: 0x6c8a42, g3: 0x5d6f40, hill: 0x5b6a55, rock: 0x8a8d86 },
  valley:    { id: 'valley',    name: 'Grass Valley', desc: 'Rolling farmland cut by rocky ridges. Two lanes lead out of every corner, and a pass through a wheat field (slow going) joins each pair of neighbours. Climb the ridge slopes and your archers shoot farther.', sky: 0xcfdde0, fog: [60, 220], g1: 0x8aad50, g2: 0x76983f, g3: 0x5d6f40, hill: 0x5b6a55, rock: 0x8f8f86 },
  dunes:  { id: 'dunes',  name: 'Dune Field',  desc: 'Open sand and scattered fences. Straight fights.', sky: 0xdcd6c6, fog: [70, 190], g1: 0xc9a978, g2: 0xb8956a, g3: 0xa88a62, hill: 0x6e6258, rock: 0x8d8174 },
  river:  { id: 'river',  name: 'River Ford',  desc: 'A river splits the field. Two bridges and a shallow ford that slows everyone crossing it.', sky: 0xcfdde0, fog: [70, 190], g1: 0x7f9a4c, g2: 0x6c8a42, g3: 0x5d6f40, hill: 0x5b6a55, rock: 0x8a8d86 },
  forest: { id: 'forest', name: 'Pine Forest', desc: 'Dense pine clusters. Trees stop arrows and hide ambushes.', sky: 0xb9c8b0, fog: [34, 120], g1: 0x55733a, g2: 0x62803f, g3: 0x44582f, hill: 0x3e4c34, rock: 0x7a7c70 },
  frost:  { id: 'frost',  name: 'Frost Hill',  desc: 'A snowy hill in the middle, walled off by pine forests and crags, with frozen ponds in two of the passes: on the ice you slide. Fighting downhill deals +20% damage and archers on top shoot 30% farther.', sky: 0xe4ecf2, fog: [60, 170], g1: 0xeef3f6, g2: 0xd7e0e8, g3: 0xb8c4ce, hill: 0x9aa6b2, rock: 0x8e969c },
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
export const VOLLEY = { cd: 9, spread: 2.6 }; // spread: how far an aimed volley scatters around the mark
// Horse charge: a burst of speed that bowls over everyone in front (braced spears still stop it)
// A held line: footmen in their places take this share of the damage and knockback from the front,
// and a charge into them stalls, hurting the horse.
export const HOLD = { dmg: .7, kb: .3, horse: 30 };
export const CHARGE = { dur: 2.2, cd: 12, spd: 1.45, dmg: 32, kb: 15 };
// The player captain's three weapons, switched with one button. The sword chains a 3-hit combo
// (the 3rd hit cleaves), the spear trades speed for reach and pierces a second man, javelins are
// a limited, regenerating ranged burst. Attacking in mid-air is a leap slam that hits a whole arc.
export const WEAPONS = ['sword', 'spear', 'jav'];
export const WEAPON_NAMES = { sword: 'Sword', spear: 'Spear', jav: 'Javelins' };
export const CAPTAIN_COMBAT = {
  sword: { cd: .36, finisherCd: .62, window: .85, mult: 1, finisherMult: 1.5, aim: 3.6 },
  spear: { cd: .66, reachB: 1.1, mult: 1.15, pierce: .7, aim: 4.6 },
  jav: { cd: .8, dmg: 30, range: 16, ammo: Infinity, regen: 4 }, // unlimited: the gap between throws is the limit
  jump: { v: 7.6, g: 22, cd: .3 },
  leap: { mult: 1.4, range: 3, arc: 1.3, stun: .6, cd: .7 },
};

// Progression: XP earned per battle climbs these ranks, and each rank unlocks a crest colour for
// your captain's helmet plume and shield trim (purely a look; everyone fights the same).
export const RANKS = [
  { name: 'Recruit', xp: 0, joke: 'still has all ten fingers' }, { name: 'Legionary', xp: 150, joke: 'owns a pointy stick' },
  { name: 'Veteran', xp: 400, joke: 'has seen things (mostly mud)' }, { name: 'Centurion', xp: 800, joke: 'can count to a hundred, mostly' },
  { name: 'Tribune', xp: 1400, joke: 'has a nicer helmet than you' }, { name: 'Legate', xp: 2200, joke: 'hasn\u2019t walked anywhere in years' },
  { name: 'General', xp: 3200, joke: 'points at maps, dramatically' }, { name: 'Warlord', xp: 4500, joke: 'even the goats salute' },
];
export const CRESTS = [
  { name: 'Gold', hex: 0xffcf3a, css: '#ffcf3a' }, { name: 'Silver', hex: 0xd8dde3, css: '#d8dde3' }, { name: 'Crimson', hex: 0xc0262d, css: '#c0262d' },
  { name: 'Obsidian', hex: 0x2a2a30, css: '#2a2a30' }, { name: 'Royal', hex: 0x6a3fb5, css: '#6a3fb5' }, { name: 'Ivory', hex: 0xf4efe1, css: '#f4efe1' },
  { name: 'Emerald', hex: 0x2fa35a, css: '#2fa35a' }, { name: 'Flame', hex: 0xff6a1a, css: '#ff6a1a' },
]; // crest i unlocks at rank i
// Cheek for the results screen and the menu.
export const QUIPS = {
  win: ['Glory! And only slightly fewer sandals.', 'The bards will sing of this. Badly.', 'Victory! Somebody fetch the goats.', 'Flawless. Well, mostly flawless.', 'They\u2019ll be finding helmets for weeks.'],
  lose: ['A tactical retreat. Very tactical.', 'We\u2019ll call that a rehearsal.', 'At least the helmets had fun.', 'In fairness, they had more pointy sticks.', 'Morale is… present.'],
  draw: ['Everybody lost. Mostly the goats.', 'A draw. Nobody tell the emperor.', 'Honours even. Bruises everywhere.'],
};
export const TIPS = [
  'Hitting people is faster than asking nicely.', 'Spears beat horses. Horses beat feet. Nobody beats the goat.',
  'A shieldwall stops arrows, not gossip.', 'Jump, then hit. Physics does the rest.', 'Archers aim for the head. Wear a helmet. Keep it on.',
  'Three sword swings in a row: the third one really means it.', 'Your aura makes men braver. Or at least louder.',
  'Horses are fast. Stopping them is a spearman\u2019s hobby.', 'Castles only take damage from men on foot. Horses refuse to help.',
];
export const XP = { base: 25, perKill: 4, maxKills: 40, win: 75, draw: 35, diffMult: [.75, 1, 1.35] };

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
