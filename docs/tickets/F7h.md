# F7h Battle start and end

Model: S · Written 2026-11-12 from F7 moment 8 (Arjun agreed 12 Nov; he has no complaints about what exists)
Status: superseded by F7 (13 Nov, Arjun's picks); its test folded into `store/r_F7.mjs`

## What to build
Checked first. Start: already eases from the flyover into the player's captain (smoothstep, `main.js` startIntro) and
the clock waits for the count; measured no jump at the hand-over to the follow camera (0.00 m). Left as is.
End: the results used to appear as a hard cut after 1.6 s. Now the last moment holds 1.5 s (FEEL.end.hold) and the
results fade in over 0.6 s (FEEL.end.fade).

## Done when
`game/store/r_F7h.mjs`: no camera jump at the hand-over; results at about 1.5 s, starting at opacity 0 and reaching 1.

## Where to start in the code
`main.js` the end handler (`endFade`), `style.css` `#ovEnd.endFade`, `config.js` FEEL.end; `__fb.camera` is exposed for tests.

## Out of scope
Redoing the flyover or the count.

## Open questions
None.
