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
// Match length, in minutes: Quick, Standard (the default) or Long. A shorter battle runs hotter: more
// gold, and computer armies march out with smaller squads (gather).
export const TIMES = [[5, 'Quick'], [10, 'Standard'], [15, 'Long']];
export const PACE = { 5: { gather: .6, gold: 1.5 }, 10: { gather: 1, gold: 1 }, 15: { gather: 1.15, gold: .9 } };
// Each mode's own target, chosen before the battle: how hard castles are to knock down (the damage
// they take is multiplied by it), tickets each side has, captures to win, score to win.
export const TARGETS = {
  conquest: { label: 'Castles', key: 'castle', def: 1.4, opts: [[2.2, 'Weak'], [1.4, 'Normal'], [1, 'Strong']] },
  dm: { label: 'Tickets', key: 'tickets', def: 150, opts: [[100, '100'], [150, '150'], [200, '200']] },
  ctf: { label: 'Captures to win', key: 'caps', def: 5, opts: [[3, '3'], [5, '5'], [7, '7']] },
  ctrl: { label: 'Score to win', key: 'win', def: 450, opts: [[250, '250'], [450, '450'], [650, '650']] },
};
// Control mode: capture points, how they flip, and how fast score builds.
export const CTRL = { points: 5, captureTime: 5, rate: 1, win: 450, radius: 5 };

export const MAPS = {
  forum:     { id: 'forum',     name: 'Forum',        desc: 'A Roman city. Rows of houses wall off every corner, so armies meet in the streets and fight for the gates between them. Four temples give the high ground: fighting down their steps deals +20% damage and archers on top shoot 30% farther.', sky: 0xdcd6c6, fog: [70, 200], g1: 0xd9cdb4, g2: 0xc8b99c, g3: 0xb5a584, hill: 0x8a7c66, rock: 0x9b9384 },
  colosseum: { id: 'colosseum', name: 'Colosseum',    desc: 'An arena ringed by a roaring crowd. The inner pit has four gates that slam shut for 20 seconds every minute.', sky: 0xdcd6c6, fog: [80, 220], g1: 0xdcc08e, g2: 0xcdae78, g3: 0xb89a6a, hill: 0x8a7c66, rock: 0x9b9384 },
  desert:    { id: 'desert',    name: 'Desert Fort',  desc: 'Canyon country: a maze of sandstone mesas between the castles and an old walled fort. Narrow canyons, blind ends, and you never see far. Inside the fort is a spring: hold it to heal your men and earn extra gold.', sky: 0xe6d6b8, fog: [70, 230], g1: 0xe2bd82, g2: 0xd2a468, g3: 0xb98f5c, hill: 0x9c7a50, rock: 0xa58a68 },
  wooden:    { id: 'wooden',    name: 'Wooden Fort',  desc: 'Every castle sits inside a log palisade with two gates, in a green valley of huts and watchtowers. Defenders fight at the gates.', sky: 0xcfdde0, fog: [60, 210], g1: 0x7fa04a, g2: 0x6c8a42, g3: 0x5d6f40, hill: 0x5b6a55, rock: 0x8a8d86 },
  valley:    { id: 'valley',    name: 'Grass Valley', desc: 'Open farmland: no ridges, only hedgerows and stone walls, so any direction is a way through. Good ground for horses and flanking. A village on each side sends footmen to whoever holds it.', sky: 0xcfdde0, fog: [60, 220], g1: 0x8aad50, g2: 0x76983f, g3: 0x5d6f40, hill: 0x5b6a55, rock: 0x8f8f86 },
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
// Fighting as a captain. Enemy captains (and veteran footmen) wind up their heavy blows where you can
// see them: a raised weapon, a shout, then a glint as it comes down. Tap Block during the glint to
// parry: the blow is turned, the attacker staggers, and your next couple of hits land harder and
// can't be blocked. Hold Block against a heavy blow and your guard is broken instead.
// window: how long before the blow a Block tap still parries (s); remote: extra allowance for a
// joining player's press crossing the network; lock: a second tap this soon after the last doesn't
// open a window (no parrying by mashing); light: the tighter window for an ordinary, unannounced blow.
// The streak: a player captain's blows that land, one after another, without being hit back (gap: the
// most seconds between them). At n, his next Attack is a finisher: a whirlwind that can't be blocked.
export const STREAK = { gap: 3, n: 8, mult: 2.2, kb: 2.2, stun: .9, cleaveN: 5 };
// The shield bash: Block tapped, then Attack within window s (not at once: one after the other). A shove
// with the shield: little damage, but it knocks a raised shield or guard aside (open s stunned). Unless
// that Block press parried something: then it's the riposte as ever.
export const BASH = { window: .3, cd: 1.5, mult: .3, kb: 1.8, stun: .45, open: 1.1, reach: 2.6 };
export const PARRY = { perfect: .08, disarm: 2.5, window: .26, light: .14, remote: .28, lock: .6, slow: .25, slowT: .4, stun: .8, heavyStun: 1.3, riposteT: 1.8, riposteN: 2, riposteMult: 1.5 };
// slow/slowT: a parry slows the two men in it (only them) to this speed for this long.
// Enemy captains raise their guard in spells you can see (shield up, pressing in). While guarded they
// turn most light blows aside, staggering the attacker; a heavy blow smashes the guard and leaves them
// reeling. share: about how much of a fight each difficulty spends guarded (Recruit, Soldier, Warlord);
// punish: how often a captain cuts in with a quick blow when you wind up a heavy one in his face.
// A footman squaring up to a captain fights in a rhythm you can read: shield up for a moment (he
// blocks everything from the front), then down to strike (he can't block). share: the part of each
// cycle spent behind the shield, by footman tier; a shield wall or a held line keeps it up longer.
// A sword blow on a raised shield knocks it aside: open for a moment, so the next blow lands.
export const SHIELD = { cycle: [1.6, 2.3], share: [.35, .42, .5], wall: .3, held: .12, r: 4.5, open: .9, openStun: .3 };
export const GUARD = { share: [.1, .25, .4], dur: 1.4, parry: 1, stun: .55, broken: 1.1, punish: [0, .5, .85] };
// windup by difficulty (Recruit, Soldier, Warlord); chance: how often a ready captain picks one
export const HEAVY = { windup: [.95, .8, .68], chance: [.22, .32, .4], vetChance: .12, mult: 1.75, kb: 1.8, reach: 1.1, guardBreak: .6, guardDmg: .55 };
// Holding Attack does something different with each weapon: the sword winds up a guard-breaking
// heavy blow; the spear is planted (braced) and skewers whoever runs or rides onto it; javelins are
// drawn back for a harder, longer throw that can knock a rider off his horse.
export const HOLD_ATK = { sword: .38, swordFull: .7, brace: .28, braceCd: .65, braceSlow: .15, jav: .22, javFull: .85, javMult: .75, javRange: 9, unhorse: .7 };
// Fighting on horseback. Riding straight builds a gallop (gallop: seconds from a trot to full speed);
// turning hard loses it. Hold Attack to lock onto whoever is ahead (within lockR, inside lockCone of
// straight on): a ring closes on him as you come in. Let go as it meets his inner ring (turns gold)
// and the ride-by blow lands in full, harder the faster you're going. perfect/good: how far off the
// strike distance (m) still counts; remote: extra for a joining player's release crossing the network.
// at: the strike distance for each weapon; mult: its power. A tap (shorter than `tap` s) is a weak swipe.
// ai: how often a computer rider times it perfectly / well, per difficulty (the rest only graze).
export const RIDE = { gallop: 1.6, turnLoss: 1.1, lockR: 16, lockCone: .9, perfect: 1.2, good: 2.6, remote: .9, tap: .2, tapMult: .55,
  sword: { at: 2.6, mult: 1.45 }, spear: { at: 3.6, mult: 1.65 }, perfectX: 1.7, goodX: 1.0, grazeX: .45, ai: { perfect: [.2, .4, .6], good: [.45, .4, .3] } };
// Morale. Every army has the heart to fight (0-100). Losing men drains it (more when they fall to a
// blow from the side or behind: flankAng is how far off their front that counts), and so does losing
// its captain; it comes back while the captain stands and no enemy is close. At `rout` the army breaks:
// its men run for home for routT seconds, taking flankX damage as they go, then regroup at `regroup`.
// Blows from the side or behind always land flankX harder on soldiers.
export const MORALE = { death: 7, flankDeath: 5, captain: 35, regen: 3, calmR: 15, rout: 20, waver: 40, regroup: 45, routT: 6, steady: 12, homeR: 32, flankAng: 2.0, flankX: 1.25 };
// (steady: after regrouping, an army can't break again for this long; homeR: men this close to their own castle fight with their backs to the wall and don't break)
// Places on a map worth taking: each map's own question. Stand in one with more of your side's men
// than anyone else's and, after capture s (quicker with more men), it turns your side's colour; allies
// share it. oasis: your men in it heal, and every army on your side earns gold. village: every `every`
// seconds a footman walks out to the army on your side with the most men there.
export const HOLDS = { capture: 7, oasis: { r: 13, heal: 6, gold: 2.5, name: 'the Oasis' }, village: { r: 11, every: 15, name: 'a village' }, shrine: { r: 12, gold: 1.5, rally: 1.4 } };
// Every map's middle is worth having (conquest and deathmatch): a holding with the map's own name.
// kind: what it gives (oasis: heals and pays; shrine: pays and fills the rally horns). Desert's oasis is its own.
export const CENTRES = { forum: ['shrine', 'the Forum'], colosseum: ['shrine', 'the Arena'], wooden: ['shrine', 'the Market'], dunes: ['oasis', 'the Well'], river: ['shrine', 'the Ford'],
  forest: ['shrine', 'the Grove'], frost: ['shrine', 'the Summit'], valley: ['shrine', 'the Stones'] };
// Once a match, the war chest: warned warn s ahead, it lands in the middle at at of the match time and
// the middle goes back up for grabs; the side that takes it gets gold for every army and full horns.
export const CHEST = { at: .4, warn: 20, gold: 150, hold: 2.2, last: 75 }; // (hold: it takes this many times longer to take than the middle does; last: s after landing, it goes to whoever has most men there)
// The evade (the Jump button, on foot): which way depends on the stick, judged against the enemy
// you're facing. Toward him: a pounce; to the side: a sidestep; away (or no stick): a backstep. Each
// starts with iframe s untouchable (joiners get remote more, for the trip to the host), then cd s
// before the next; two in a row within chain s and you're winded (tired). Attack within follow s of
// one is its follow-up: the pounce a leap strike, the sidestep a flank cut, the backstep a counter-lunge.
// A pounce clears low walls and hedges. Computer captains evade a captain's blow at ai[difficulty].
export const EVADE = { iframe: .2, remote: .12, cd: .45, tired: 1.3, chain: 1.1, follow: .45, rally: 8,
  pounce: { v: 12.5, dash: .2, hop: 5.5 }, side: { v: 9, dash: .16, hop: 3.2 }, back: { v: 10, dash: .17, hop: 3.2 },
  flank: { mult: 1.35, stun: .45 }, counter: { mult: 1.3, lunge: 8, dash: .14, reachB: .7 }, ai: [.12, .25, .4] };
// The duel: a captain challenges an enemy captain within offerR (both on foot, neither marked for
// execution, neither duelled yet this life); he has offerT s to accept. Then both armies' men within
// guardR form a guard ring (ring metres round the two) facing outward and only fight outsiders; the
// two fight it out inside, untouchable by anyone else, for up to time s (then it's a draw). The winner's
// army: rally horn full, morale +winMorale; the loser's army breaks. Refusing costs morale (decline).
// An outsider's man or an enemy captain getting into the ring breaks it: his army loses heart (broken)
// and the duellists' armies get rally (brokenRally). Computer captains accept at accept[difficulty];
// they challenge a player at aiChallenge[difficulty] per second when in range (aiVsAi between themselves).
export const DUEL = { offerR: 10, ring: 6, guardR: 25, offerT: 5, time: 60, accept: [.55, .75, .9], aiChallenge: [.02, .045, .08], aiVsAi: .02, decline: 8, winMorale: 30, broken: 20, brokenRally: 25, draw: 10 };
// A blow from behind (a captain's): harder, and it staggers. Circle him.
export const BACKSTAB = { mult: 1.6, stun: .5 };
// The execution: an enemy captain beaten down (hp at or under hp of his max, or hpStunned while
// reeling) with none of his own men within clearR of him is marked to finish. Attack within reach
// executes him: he drops to his knees, the blow comes down at strikeAt into dur; both untouchable.
export const EXEC = { hp: .3, hpStunned: .45, clearR: 5, reach: 2.9, markR: 7, dur: 1.3, strikeAt: .75, gap: 1.95, beatenSpd: .7, beatenCd: 1.8, morale: 15, rally: 20 };
// a captain cut down by another: the two of them in slow motion for this long (like a parry, only them)
export const CAPKILL_SLOW = .7;
// The rally horn. A captain fills it fighting well (per kill, captain kill, parry, perfect ride-by, guard
// smashed, rider unhorsed); full, he can sound it: his army's morale +morale and any rout ends, his men
// within r surge (dmg, spd) for buffT s, and enemies within enemyR flinch and lose enemyMorale.
export const RALLY = { kill: 9, capKill: 30, parry: 15, ride: 12, guardBreak: 10, unhorse: 15, r: 18, morale: 45, buffT: 8, dmg: 1.25, spd: 1.15, enemyR: 11, enemyMorale: 15, hold: .45 };
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
  sword: { cd: .36, finisherCd: .62, window: .85, mult: 1, finisherMult: 1.5, aim: 3.6, step: 2.2, spinN: 3 }, // the third blow of a combo is a spin that cuts all round
  spear: { cd: .8, reachB: 1.1, mult: 1.3, pierce: .8, pierceN: 1, kb: 1.7, stun: .35, lunge: 5, aim: 4.6, shieldDmg: .3,
    window: 1.15, cd2: .7, // thrust, a quicker second thrust from the hip, then the skewer: a running lunge through the whole line
    skewer: { mult: 1.6, reachB: 2.6, pierce: .75, pierceN: 3, kb: 2.4, stun: .6, lunge: 11, dash: .19, aim: 6, cd: 1.05, t: .2, line: .45 } }, // fewer, heavier thrusts: a lunge that shoves and runs through
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
export const ORDER_NAMES = { follow: 'Follow me!', hold: 'Hold here!', charge: 'Charge!', shieldwall: 'Shieldwall!', focus: 'Take them!' };
// (focus, the attack on one enemy group, is given by dragging the order button onto them; not in the tap cycle)

// Upgrades bought with gold during a battle. Footman/Archer tiers are single-purchase (one
// cost each, foot2/arch2 require foot1/arch1 first); Aura/Horse stay repeatable up to 3 levels.
export const UPGRADES = [
  { id: 'foot1', name: 'Arms',     desc: 'Footmen: spear + javelin throw, better sword & shield', cost: [90] },
  { id: 'foot2', name: 'Armor',    desc: 'Footmen: heavier armor, more HP',                        cost: [160] },
  { id: 'arch1', name: 'Training', desc: 'Archers: all-round stat increase',                       cost: [90] },
  { id: 'arch2', name: 'Marksman', desc: 'Archers: +range, +accuracy',                              cost: [160] },
  { id: 'aura',  name: 'Aura',     desc: 'Bigger, stronger aura',                                   cost: [80, 140, 220] },
  { id: 'horse', name: 'Horse',    desc: 'Tougher, faster, back sooner',                             cost: [80, 140, 220] },
  { id: 'fort',  name: 'Fortify',  desc: 'Your castle: a palisade with two gates, then gate towers that shoot', cost: [110, 170] },
];
// Fortify (bought for the castle, shared by everyone in it): a palisade ring of r with two open gates
// (gateW wide), in segs sections; then a tower at each gate shooting every towerEvery s. It can't be
// shut: a gate is held by men (the Hold order). And it can be broken: each section has segHp, and a
// blow does wallDmg of the striker's damage (a captain's more), so a squad hacks a breach in seconds.
export const FORT = { r: 22, h: 3.4, segs: 12, gateW: 3.4, segHp: 360, wallDmg: .7, capWall: 1.4, towerEvery: 1.8, towerRange: 20, towerDmg: 6 };
// The captain's aura: soldiers this close fight harder, block more and move a little faster.
export const AURA = { range: 8, perRange: 3, bonus: .1, perBonus: .05 };
export const CASTLE_R = 9.5, CASTLE_REACH = 11;
export const HORSE_HP = 120, HORSE_CD = 20;
export const DM_TICKETS = 250, CAPS_TO_WIN = 3;
export const WORLD_LIMIT = 88;
