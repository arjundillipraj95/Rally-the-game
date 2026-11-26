# BAL1 Champions grow in their trait; specials 2x, ults 5x; armies grow too; faction colours

Model: O · Written 26 Nov from Arjun's design (agreed 26 Nov, "start all")
Status: built (not shipped), 26 Nov

## What to build
- Each champion's page `levels` (level 1 to 10): Titus health +8% a level, blow +4%, attack 0.9 -> 1.2; Devi health
  +4%, blow +4%, attack 1.1 -> 1.8; Sigrun health +5%, blow +5%, attack 1.4 -> 1.65, run 6.4 -> 7.3. `stats` stays the
  page's reference (cards, limits, the army's shares).
- A move's damage is his blow's (his level's) x `LEVELS.mult`: a special 2x, an ult 5x, in all (several hits share it);
  soldiers take half. Pierce 1.5x to 2.5x by the draw. The Hunt and the army ults keep their own rules.
- His army grows with his level at `armyGrow`: Titus's men health +4% a level; Devi's archers attack speed +5%;
  Sigrun's men run +1.5% and damage +2.5%. Tier upgrades raise the base. A level-up reaches the men in the field.
- Every champion's move and ult in his army's faction colour (rings, paths, sparks, champion arrows), not gold.
- The Upgrade popup names the tiers by his line (Princeps, Triarius; Villalar's; Huskarl, Úlfheðnar...).

## Done when
`game/store/r_BAL1.mjs` (growth, moves, army growth, level-up reach, popup names, colour).

## Where it is
`champions/stats.js` (champRate, champSpd, armyGrow, moveHit), the three pages, `champions/army.js` (unitRow),
`core/sim/army.js` refreshArmy + `levels.js`, ram/eagle/deviShots/sigrun damage, `config/champs.js` LEVELS.mult,
`render/fxkit.js` (FC, fcOf; white ring and path textures, tinted) and the moves' fx files, `render/arrowfx.js`,
`ui/battlehud.js` tierNames, `app/champpage.js`.
