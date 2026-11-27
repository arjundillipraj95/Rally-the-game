# FEEL3 Block, parry, clash, computers' guard and the finisher only in duels

Model: O · Written 26 Nov from the fight-feel talk (Arjun agreed 25-26 Nov: "block and evade are only for duel; bots don't do it outside the duel"; finisher only as a duel's end)
Status: shipped 26 Nov

## What to build
- Outside a duel: no player block or parry window, no blade clash, no computer captain's guard (nor his parry), no
  champion turning arrows, no finisher mark. Inside a duel all of these work as before.
- Unchanged: soldiers' shield blocks, the Shield of Cassius, the testudo, Devi's Evade, Sigrun's Hunt.

## Done when
`game/store/r_FEEL3.mjs`: the same blows and presses outside and inside a duel (guard, Block press, parry, finisher
mark), plus 15 s of computer captains next to you outside a duel with no frame on guard.

## Where it is
- `core/sim/melee.js` hit(): parry, computer guard and a player's block need `duelId`; clash() needs both in one duel.
- `core/sim/step.js` Block held only in a duel; `core/sim/guard.js` blockPress only in a duel; `net/netgame.js` a
  joined phone's Block the same.
- `core/sim/ai.js` aiGuard only in a duel. `core/sim/missiles.js` a champion turns arrows only in a duel.
- `core/sim/duel.js` execMark only for a captain in a duel.
- Fixed on the way: AI1's hunt set `guardT = G.T + 20` (a guard lasting minutes); now its own `huntT`.

## Out of scope
The Block button already shows only in a duel (BS1). Soldiers' blocks: unchanged until Arjun says otherwise.
