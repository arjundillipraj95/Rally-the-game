# SIZE1 Bigger bodies on the same map

Model: O · Written 18 Nov from Arjun's go in chat (screenshots: today, 35%, 45%)
Status: built (not shipped)

## What to build
Champions, soldiers and horses look small against the map. Arjun (18 Nov): bigger is better; 35% looked better than
today, 45% asked about. Agreed: champions and soldiers grow separately, horses with their champion. Starting point
(the owner's recommendation): champion +40%, soldier +30% (a champion then about 1.35x a soldier). A test setting on
the preview so Arjun can try champion +35/+40/+45 and soldiers +25/+30/+35 in a real fight on his phone, then lock in
the pair: `?bodyc=1.45&bodys=1.3` (kept on the phone until changed; `?bodyc=` alone clears it).
Rendering only, plus the spacing of the men's own close formations (testudo, shelter behind the shield) by the
soldier size. The rules stay in metres: reach, speeds, ranges, collision, the map.

## Done when
`store/r_SIZE1.mjs`: the defaults and the URL override change the drawn heights (champion, soldier, horse) by their
factors; the overhead bars rise with them; the testudo's spacing follows the soldier size; crown2sim and crown2online
pass roles off and on; r_PERF1c passes.

## Design rules it relies on
Champions about 1.25x a soldier, "not giants" (17 Nov); now about 1.35x by Arjun's go on separate sizes.

## Where to start in the code
`render/heroes.js` (SCALE, SOLDIER_SCALE, HORSE_SCALE), `render/overlay.js` (bar heights), `core/sim/testudo.js`,
`core/sim/soldier.js` shelter.

## Out of scope
Collision radii, reach, the map, the camera.

## Open questions
Which pair to lock in: Arjun tries the test links.
