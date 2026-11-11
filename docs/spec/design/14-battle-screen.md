<!-- Mirror of https://claude.ai/artifact/SUEvN88JzLE4qJwtmYHdRP (rev 40, synced 2026-11-11). Read only: the Claude Doc decides. -->

## Battle screen

Agreed 8 November 2026: layout D, "Unite style" (mock-up). It replaces every earlier battle-screen mock-up. Sizes are for an 844 × 390 landscape phone and scale with screen height; every tap target is at least 44 px and stays inside the safe areas.

| Element | Where | Size | What it shows or does |
|---|---|---|---|
| Map | Top-left | 104 px square | Places held, war chest, glacier, teammates. Tap: full-screen map; tap again to close |
| Teammate chips | Under the map, stacked | 36 px each | Health ring (green above 50%, red at or below); a gold dot when their army ult is ready; grey with seconds while dead. Tap: a card for 3 s with their army count and gold. No role icon |
| Score and clock | Top-centre | Panel | Each side's points in team colours, the clock, the phase tag (Land grab, War chest, Crown), the objective's health bar (war chest, then the glacier pool) and the next phase's time |
| Kill feed | Under the score, centred | 2 lines at most | Each line fades after 4 s |
| Quick phrases, Pause | Top-right | 44 px | As today |
| Ping | Top-right, beside Pause | Small figure | As built in P0.3 |
| Gold | Top-right, under Pause | Chip | Current gold |
| Your health | Over your captain, in the world | 64 px wide | Name, horse bar (only when mounted), health bar. No health panel in the HUD |
| Joystick | Bottom-left | 116 px | Fixed, not floating |
| Bottom row | Bottom, between the joystick and the right pad | 48 px tall, 6 px gaps | Army box, Recruit, Upgrade, Order, Ride, weapon swap (below) |
| Attack | Bottom-right | 76 px | A gold ring pulses on the beat for the boosted third hit |
| Ability 1 | Left of Attack | 54 px | Tap auto-aims; drag aims; drag back onto the button cancels |
| Ability 2 | Up-left of Attack | 54 px | The same |
| Captain ult | Above Attack | 58 px | The same; a ring fills as it charges, seconds over it |
| Army ult | Above-right of Attack | 50 px | Its gold ring is the morale bar (below) |
| Context button | Above the right pad, left of the ult | 44 px tall pill | Challenge or Execute (below) |

Bottom row, left to right:

- **Army box:** places used out of places available (e.g. 5/7) and the mix (e.g. SP3 AR2). Not a button.
- **Recruit** and **Upgrade:** two buttons, as today, each opening its tray. Recruit comes first because it is used most.
- **Order:** as today. Its label is the current order. Tap: the next order (Follow, Hold, Charge, then Follow). Double tap within 330 ms: Follow. Press and drag onto the ground: Hold there, the line facing the drag; onto enemy men: Charge focused on that group. The press-and-hold rally horn is removed.
- **Ride:** ride or walk; while a new horse is on its way it is greyed with the seconds left.
- **Weapon swap:** shown only after a second weapon is bought; its label is the weapon in hand.

Army ult button:

- The ring fills with morale from 0 to 100; a red tick marks 20, the rout line. At 30 or less the ring pulses red.
- At 100 it glows and shows DRAG. Drag onto the ground: a preview of the result (the testudo path, the 10 m arrow-storm circle or the wedge path); release fires it; drag back onto the button cancels. A tap at 100 shows "Drag onto the ground".
- Below 100 it is dim and does nothing.

Locked and special states:

- Abilities 1 and 2 show a padlock and "Upgrade 1" until captain upgrade 1; the captain ult shows "Upgrade 2" until upgrade 2.
- Context button: Challenge when an enemy captain is within 10 m and no duel is on; Execute when an enemy captain within reach is below 15% health. Execute wins when both apply. Hidden otherwise.
- In a duel: Ability 1 becomes Block; Ability 2, both ults, Ride and weapon swap are greyed; the duel ring and timer as today.
- While dead: a respawn countdown in the centre; Recruit, Upgrade and the map stay live, the rest is greyed; drag anywhere to move the camera.

In the battlefield, not the HUD: other captains' health bars and role icons, the joust lock-on, ult wind-up markers, aura rings, healing pulses and damage numbers.

Removed from today's screen: Block (outside duels), Jump and the evades, Volley, the streak whirlwind and the Order button's rally-horn hold.

Open question: is the health bar over your captain enough in a busy fight, or should a red screen-edge flash below 25% health back it up? Decide in the first playtest.
