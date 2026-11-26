# FEEL4 Your own hit shows at once on a joined phone

Model: O · Written 26 Nov from the fight-feel talk (Arjun agreed: "your own phone shows the hit on the target straight away, and the host only checks it")
Status: built (not shipped), 26 Nov

## What to build
- A joined phone already showed its own blow's spark, sound and hit-stop at the landing moment (~120 ms into the
  swing). Now the target's body takes it then too: flash, rock away from you, the hit clip on a champion, the bash's
  stagger back (and dust); a horse tosses.
- The host still decides the damage. Its word inside `FEEL.own.pred.hold` (700 ms) isn't played a second time
  (soldiers.js hp drop, heroes.js hit clip, champhit.js fxchamp). A blow the host turns away was already shown: accepted.

## Done when
`game/store/r_FEEL4.mjs` (two phones, 250 ms round trip): the target's reaction on the joined phone comes ~120-160 ms
after the press; the host's damage arrives later and doesn't replay it.

## Where it is
`net/netgame.js` (the landing moment emits `predhit`), `render/champhit.js` (plays it), `render/soldiers.js` (stateOf
exported; hp-drop reaction skipped when shown), `render/heroes.js` (hit clip once), `config.js` FEEL.own.pred.

## Out of scope
Specials and mounted blows (their own prediction already: eagle, pounce, ram). The host's own phone (no lag).
