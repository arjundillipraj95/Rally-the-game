# CAMP1 Jungle camps and buffs

Model: O · Written by the builder 2026-11-16 from Arjun's notes (16 Nov 07:22, 07:32)
Status: built

## What
Each side's 6 camps (3 per jungle half): 2 gold camps of 3 men (2 footmen, an archer) and a buff camp of 5 men
(3 footmen, 2 archers) plus a mini captain in its middle (520 HP, 20 damage). Cutting the mini captain down gives his
killer's side (the champion and the whole army) the camp's buff for 90 s: war drum (left halves, +15% damage from
blows, arrows and javelins) or swift (right halves, +15% speed; evade, charge, javelin and leap 15% quicker).
Numbers: `CROWN26.campMen`, `.boss`, `.buffs`. Rules: `core/sim/buffs.js`; men: `core/sim/neutral.js`.
Joined phones get the side's buff and its seconds left in the team snapshot.

## Proof
`store/r_CAMP1.mjs`: camp sizes, the mini captain, buff kinds by half, drum and swift effects, other sides
untouched, the buff wears off, a cleared camp comes back with its mini captain. crown2sim/online pass roles off and on.
Start view draw calls Low 176 -> 179, High 189 -> 192; triangles 796k -> 751k, 891k -> 848k (fewer men).
r_SPLIT baseline re-saved (the battle changed on purpose).

## Later
No buff icon on the HUD yet, and the mini captain looks like a footman (battle screen step). Computer captains
take camps on purpose with AI2.
