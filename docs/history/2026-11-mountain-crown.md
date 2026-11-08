# The Crown on the mountain (finished, 6-7 Nov 2026)

Read only. Reconstructed from `main`'s commits. New findings go in `docs/STATE.md` or the current
build plan, never here.

## What it was
The Crown mode moved from the old valley map to a new mountain map: castles and villages on the
slopes, a jungle, a chasm with bridges, an arena and a glacier on the summit holding the Crown.
Built behind `?crown2=1`, then made the default for everyone on 7 Nov (old valley Crown retired;
`?crown2=1` links still work).

## What shipped
- **Map:** ramps and bridges up the mountain (trio captains reach the glacier); home cottages behind
  the town; a wide back gate on every keep facing the summit; the chasm kills on the spot, its
  bridges railed end to end; village palisades.
- **Match flow:** dusk and moonlit night with torches and drums; at night the arena opens and its
  walls stop all arrows; opening camera over the map in real battles (not the warm-up).
- **Objectives:** the glacier is solid and hacked at its face (health bar under the clock for all);
  the war chest takes 250 blows (about 30 s under a full crowd), with its own bar.
- **Neutrals:** castle guards and jungle camps are a squad each (3 footmen, 2 archers firing real
  arrows); watchtowers loose 3 plunging arrows every 4.6 s (a shield wall stops them).
- **Points:** places held, war chest, Crown, and enemy captains (2 to the captain who cuts one down,
  1 if his men do, once each). Captain points shown by name and with a banner.
- **Presentation:** fog only in the jungle; homes, river and arena on the minimap; three-tier
  announcements (herald, your side's feed, the rest quiet); health over your captain's head.
- **Results:** a Points tab in three levels (game, team, captain) with timeline and ledgers that add
  up; recruit room shared from every place your side holds.
- **Online:** the host shares arena phase, chest, guards, camps, glacier, kills and points; matchmade
  Crown uses the mountain.
- **Admin:** every battle's summary and every phone's health go to the online service (90 days of
  detail, daily totals kept); private `/admin` page by key.

## Tests left behind
`game/store/crown2sim.mjs` (full headless match) and `game/store/crown2online.mjs` (two phones),
plus look and debug scripts `crown2*.mjs`. Both main tests are the regression gate for every ticket.

## Left open at the end
- The misplaced village (deferred).
- Fixes found by the first admin numbers: units shut out of the arena now leave over a bridge; the
  chasm's outer wall stands on its lip.
