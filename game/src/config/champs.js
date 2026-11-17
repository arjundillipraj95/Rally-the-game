// Champions' shared tables (C1). Each champion's own numbers live on its own page in src/champions/; these are
// what every champion shares: the level path, XP, the health and damage baselines, the counter rule, army sizes.
// Re-exported by config.js.

// (C1a) the champion you play when none is chosen; bots play `bot` (?botchamp= for tests).
export const CHAMP = { def: 'legionary', bot: 'legionary' };

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
  inf: 95,
  hp: { foot: 1, arch: .6, champHorse: 2, champ: 4, cavMan: .8, cavHorse: 1.3, sword: 1, thrower: 3 },
  hit: { foot: .2, arrow: .1, champ: .34 },
  behind: 1.5,
};
// (C1d) the counter rule: a weapon's edge does `mult` damage. Spears on horses (the horse, not the rider), arrows on
// infantry, cavalry on archers. Bot tests tune it toward 1.1 if counters win equal fights clearly over 60/40.
export const COUNTER = { mult: 1.2 };

// (C1e) army size by class: at the start, and what each middle and outer castle the side holds adds.
export const ARMY = {
  vanguard: { start: 5, mid: 5, outer: 3 },
  striker: { start: 3, mid: 3, outer: 3 },
  raider: { start: 3, mid: 3, outer: 3 },
};
