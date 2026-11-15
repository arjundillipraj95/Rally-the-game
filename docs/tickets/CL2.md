# CL2 Focus the map

Model: O · Written by the builder 15 Nov from the code (Arjun's go: F9, F25, CL2)
Status: built (not shipped), on `t/CL2` (from `t/F25`). r_CL2 8/8; crown2sim + crown2online ok, roles off and on

## What to build
Mountain/Crown is the live map. The other maps (forum, colosseum, desert, wooden, valley, dunes, river, forest, frost)
are hidden from every menu behind the dev flag `?maps=all`; their code stays. No dead ends.

## Done when
`game/store/r_CL2.mjs`: home sheet and lobby show only the Crown and no map picker; Battle, Quick and a stale hidden
pick all start the Crown on the Mountain; `?maps=all` brings every mode and map back and Conquest on the Forum plays.

## Gaps found in the code
- Map pickers: home `#segMap`, lobby `#lobbyMap` (index.html). The other modes (Conquest, Deathmatch, Capture the
  Fort, Control) only play on those maps, so their buttons hide too (else a mode with no map: a dead end).
- Defaults pointing at hidden maps: `G.mode` 'conquest' + `MAPS.forum` (state.js), Quick's random mode and map
  (main.js), the lobby's `mode` (lobby.js `hostStart`).

## Plan
`ui/maps.js` (`ALL_MAPS`, `liveMode`, `focusMenus`); main.js and lobby.js fall back to the Crown.

## Out of scope
The search warm-up still plays in the Colosseum (not a menu choice). The home backdrop is the valley scenery.
Older tests that click other modes need `&maps=all`.

## Open questions
none
