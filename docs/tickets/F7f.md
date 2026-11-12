# F7f Execution: slide in, push in

Model: S · Written 2026-11-12 from F7 moment 5 (Arjun agreed 12 Nov)
Status: built (not shipped)

## What to build
When an execution starts, the executioner slides to his spot beside the victim over 0.25 s (EXEC.slide) instead of
snapping there; the blow still lands at 0.75 s. The camera, which already swings in close and low, pushes in a little
extra as it begins (EXEC.push).

## Done when
`game/store/r_F7f.mjs`: from 2.7 m away he covers the 0.75 m with no frame over a third of it, and the blow lands at 0.75 s.

## Where to start in the code
`core/sim.js` execTick(); `render/camera.js` direct() (the `exU` block); `config.js` EXEC.

## Out of scope
The kneel, the blow, the camera's side-on swing.

## Open questions
None. Arjun judges the push-in on his phone.
