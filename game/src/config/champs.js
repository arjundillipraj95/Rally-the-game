// Champions' shared tables (C1). Each champion's own numbers live on its own page in src/champions/; these are
// what every champion shares: the level path, XP, the health and damage baselines, the counter rule, army sizes.
// Re-exported by config.js.

// (C1a) the champion you play when none is chosen; bots play `bot` (?botchamp= for tests).
export const CHAMP = { def: 'titus', bot: 'titus' };

// (MENU2) the launch roster (design doc "Champions", agreed 17 Nov), in grid order: 6 free (two per culture, two per
// class) and 3 to earn or buy. `name` null = still to name. A champion is playable once his page is in
// src/champions/; until then his tile says Coming soon. `price` in Silver (6,000 in his release season); `free` =
// free this week (rotation). Owned: every free champion, plus `ROSTER_OWNED` (dev and tests; the shop fills it later).
export const ROSTER = [
  { id: 'titus', name: 'Titus', culture: 'Roman', cls: 'vanguard', launch: 'free' },
  { id: 'hrolf', name: 'Hrolf', culture: 'Viking', cls: 'vanguard', launch: 'free' },
  { id: 'devi', name: 'Devi', culture: 'Chola', cls: 'striker', launch: 'free' },
  { id: 'romstriker', name: null, culture: 'Roman', cls: 'striker', launch: 'free' },
  { id: 'sigrun', name: 'Sigrun', culture: 'Viking', cls: 'raider', launch: 'free' },
  { id: 'varma', name: 'Varma', culture: 'Chola', cls: 'raider', launch: 'free' },
  { id: 'cholavan', name: null, culture: 'Chola', cls: 'vanguard', launch: 'buy', price: 6000 },
  { id: 'vikstriker', name: null, culture: 'Viking', cls: 'striker', launch: 'buy', price: 6000 },
  { id: 'romraider', name: null, culture: 'Roman', cls: 'raider', launch: 'buy', price: 6000 },
];
export const ROSTER_FREE_WEEK = []; // (ids free to play this week; none yet)

// (SIZE1) how much bigger than the models' first size bodies are drawn, on the same map: champions (and their horses)
// and soldiers apart. Drawing only: reach, speeds, ranges and collision stay in metres. The preview tries others by
// ?bodyc=&bodys= (core/body.js); Arjun locks in the pair.
export const BODY_SIZE = { champ: 1.4, soldier: 1.3 }; // (C3f: Titus for you and the bots unless chosen otherwise; the legionary by ?champ=legionary)

// (C1b) the shared level path, levels 1-10 from XP in the match. next[L-1]: XP from level L to L+1. unlock: the
// level each slot opens at. grow: health and damage each level adds (5%: level 10 is +45%). Kept through death.
export const LEVELS = {
  next: [100, 120, 200, 230, 280, 320, 360, 400, 440], max: 10,
  unlock: { sp1: 3, sp2: 5, ult: 7, armyUlt: 7 },
  grow: { hp: .05, dmg: .05 },
};
// (C1b) XP: a soldier cut down, a champion (above, per level he is above yours), a camp's last man, a buff camp's
// mini captain, a castle taken (shared between the side's champions within `shareR` m, at least the taker), the
// Sceptre (the war chest) to every champion of the side that takes it, and a trickle each second to a champion
// within `nearR` m of a castle under attack or the arena.
export const XPGAIN = { soldier: 6, champ: 60, champAbove: 10, camp: 40, buffCamp: 80, castle: 100, shareR: 30, sceptre: 200, trickle: 2, nearR: 25 };

// (C1d) health as a share of one infantryman (`inf` hp); a hit as a share of an infantryman's health. A blow from
// behind lands `behind` times harder. Champion and horse shares are each champion's own (its page), these the base.
export const UNITS = {
  inf: 100, // (C1g: 100, so the numbers players see are exact)
  hp: { foot: 1, arch: .6, champHorse: 2, champ: 4, cavMan: .8, cavHorse: 1.3, sword: 1, thrower: 3 },
  hit: { foot: .2, arrow: .1, champ: .3 }, // (C1g: the base champion hits 30)
  behind: 1.5,
};
// (C1d) the counter rule: a weapon's edge does `mult` damage. Spears on horses (the horse, not the rider), arrows on
// infantry, cavalry on archers. Bot tests tune it toward 1.1 if counters win equal fights clearly over 60/40.
export const COUNTER = { mult: 1.2 };

// (C1e) army size by class: at the start, and what each middle and outer castle the side holds adds.
export const ARMY = {
  vanguard: { start: 5, mid: 5, outer: 3 },
  striker: { start: 4, mid: 3, outer: 3 }, // (RANGE1, Arjun 18 Nov: 4 to start, +3 a castle; a stone thrower's 5 places after the first castle)
  raider: { start: 3, mid: 3, outer: 3 },
};

// (C1g) the base champion in shown numbers (design "Base champion, budget and guardrails"): health, damage a hit, hits a
// second (over his 3-hit combo; the spin finisher's x1.5 is the combo's reward on top), reach (melee, ranged), m/s on
// foot and riding. A page's stats are these numbers, its own.
export const CHAMP_BASE = { hp: 400, dmg: 30, rate: 1.4, reach: 1.3, rangedReach: 14, spd: 6.2, horse: 11.2 };
// (C1g) hard floors and ceilings; dps = damage x rate. budget: a page's pluses and minuses (health, damage per second,
// foot, horse; ranged reach counts `ranged`) add up to 0 within this. shift: a soldier stat's limit, total within budget.
export const CHAMP_LIMITS = {
  hp: [280, 560], dmg: [20, 45], rate: [1, 2.2], dps: [34, 52], reach: [1.1, 2], rangedReach: [10, 16], spd: [5.6, 7.2], horse: [10, 12.5],
  budget: .05, ranged: .3, shift: .2,
};

// (RANGE1) a ranged champion's basic attack (design doc, Devi card, 18 Nov). Range, damage and rate are the page's own
// (stats.reach, dmg, rate; page.ranged.third: each of the third shot's two arrows). Arrows fly `speed` m/s and home in
// on their mark; the third shot's second arrow follows `thirdGap` s after the first. Shooting while walking: she draws
// on the move and plants her feet to loose, so she moves at `pace` of her speed while she keeps shooting (`hold` s after a
// shot). Riding faster than `gallop` m/s, Attack held doesn't repeat: one ride-by shot a press. A computer ranged
// champion keeps `keep` m from a melee champion and closes to `close` of her range. Targeting: the nearest enemy, or
// champions first (the player's setting, 'rally-aim').
export const RANGED = { speed: 40, thirdGap: .1, pace: .65, hold: .15, gallop: 8, keep: 9, close: .8 };
