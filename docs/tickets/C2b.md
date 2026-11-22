# C2b Swordsman and cavalry (new units)

Model: O · Written by the Sigrun chat 21 Nov from design "Soldiers and their upgrades", "Horses and cavalry",
"Armies" and Arjun's answers in the Sigrun design chat; code on `launch26` (44ced8b)
Status: ready (waits for Arjun's go). Needed before C5 (Sigrun); shared by every Raider (Varma, the Roman Raider) and any
champion who recruits them.

## What to build
Two soldier kinds on the shared soldier body and sword-and-shield clips (no new Mixamo clips).
- **Swordsman `sword`** (`UNITS.hp.sword` 1 = 100 health; 1 place). Sword (or the champion's look: axe) and small round
  shield, fast. Basic 20 a hit (`UNITS.hit.foot`). Tier 1 skill **Pursuit**: first hit on a running enemy slows him 2 s;
  hits from behind x1.5. Tier 2 **Mail**: +30% health, +15% damage, better block. Tier 3 is the champion's page (C5:
  Úlfheðnar, a short charge-in burst).
- **Cavalry `cav`** (2 places; mounting a swordsman costs 50 gold at a held place). Two health bars: horse first
  (`cavHorse` 1.3 = 130), then the man (`cavMan` 0.8 = 80). The horse goes to the swordsman with the most health; when it
  dies he fights on as a swordsman (back to 1 place) and can be remounted for 50. The charge bowls men over (soldiers
  stumble, nobody flies). Spearmen on Hold facing it stop the charge (counter rule x1.2 on the horse). Tiers: **Lances**
  (+40% charge damage, lance back 10 s after a charge, +10 horse health), **Barding** (horse health +50%, a galloping horse
  hit 10 points less often).
- **Orders** (design Orders table): swordsman Follow = loose round the captain, Hold = guards the spot, Charge = hunts
  archers and throwers from the flank. Cavalry Follow = at the captain's flank, Hold = stays mounted, no charging, Charge =
  charges, breaks off, wheels, charges again; avoids braced lines.
- Both follow their champion's stats (`champions/army.js` `unitRow` gets `sword` and `cav`). Recruit button lists them for
  pages with `recruits` containing them; bots field them.
- Joined phone: both units, the mounted/unmounted switch, the charge.

## Done when
`store/r_C2b.mjs`: a swordsman's first hit slows a runner 2 s; behind x1.5; a cavalry charge knocks 3 soldiers aside;
a braced, facing spear line stops it; horse dies → swordsman, 1 place; remount for 50; Mail and Lances/Barding numbers;
`r_C2b-join`. crown2sim, crown2online (roles off and on), r_PERF1c, lag no worse.

## Design rules it relies on
Units table "Swordsman", "Cavalry"; Health baselines (cavMan 80%, cavHorse 130%); "Recruit slots" (sword 1, mounted 2);
counter rule x1.2 (spear on horse, horse on archers); horses-and-cavalry two health bars; "only a perfect hit knocks a rider off".

## Where to start in the code
`config.js` STATS / tiers / RECRUITS; `core/sim/soldier.js` (footman branch as the model); `core/sim/move.js` and the
captain horse code for riding; `core/sim/army.js` places; `champions/army.js` `unitRow`; `render/soldiers.js`,
`render/rig/weapons.js` (axe and round shield variant); `net/netgame.js` unit encoding.

## Build cost
Claude (Blender, after Arjun's go): round shield, Viking axe, the fjord horse with tack (reuse the champion horse rig).
Sounds: hooves at gallop for a group, a charge impact.

## Out of scope
Sigrun herself (C5), the wedge army ult (C5f), bot tuning.

## Open questions
none
