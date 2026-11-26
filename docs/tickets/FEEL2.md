# FEEL2 Titus's specials and every mount: how they feel

Model: O · Written by the owner 2026-11-26 from Arjun's fight-feel review (chat 26 Nov, his "go")
Status: built (not shipped), branch t/FEEL2 (on top of t/FEEL1)

## What was built (one commit each)
- a Ram: wind-up .15 -> .3 s (a fair warning at ~400 ms lag); soldiers, braced or not, never slow or stop him (each takes
  his knock and is shoved aside); his own men step aside (`sp1.part`). A raised Shield of Cassius, a testudo and a head-on
  ram still stop it.
- b Shield of Cassius: Attack behind it is a gladius stab over the shield (`sp2.stab`: .6 of a blow, every .55 s at his
  pace, front arc); the shield stays up (block clip, the arm aimed in the world: render/rig/swingflow.js stabArm). A
  champion's melee blow off the shield bounces him back (`sp2.rebound`, 'fxrebound': CLANG!, jolt, buzz on his phone).
- c Eagle's fall: aimed at (or within `ult.lockR` of) a champion it locks on: the landing follows him through the crouch,
  then the circle is set (a joined phone gets it as he leaves the ground). From the saddle Titus gets off first (the horse
  goes as when he dismounts) and lands on foot: the horse is no longer lifted.
- d Testudo march: shove (30% of the march), spear stab (65%: 40 to champions, 25 to soldiers), end shout = a heavy shove
  (1.6x) that knocks them down (.6 s champions, 1 s soldiers; soldiers drawn falling). 'fxtestudobeat'.
- e A blow from any mount (horse, wolf) pushes no more than FEEL.mountPush (champion ~1 m, soldier ~1.5 m; was up to
  ~6 m). A perfect ride-by puts a soldier down.
- f The ride-by ring was already in the game (hold Attack on a horse); now drawn at the target's waist (your own horse hid
  it) and pulsing gold at the moment to let go.
- g Devi on horseback (any ranged champion mounted): tap = a quick shot (.6x); hold = draw, a wedge on the ground narrows
  and turns gold at full draw (.7 s, longer at a gallop) for .25 s; let go on gold = perfect (1.6x, 1.3x reach, slows the
  one hit); past gold = tired (.7x). core/sim/mountdraw.js, ui/drawaim.js, numbers RANGED.draw.

## Done when
`game/store/r_FEEL2.mjs` (parts b-g; PART=b,c.. runs some) plus r_C3b (Ram a), r_C3c, r_C3d, r_C3d-join, r_C3e,
r_C3e-join, r_C3k (collision checks keep the old wind-up), r_C2b, r_C5b-d, r_PULL1, r_RANGE1, crown2sim/online roles
off and on.

## Notes
- r_C3k and r_C4 were flaky before FEEL2 (fail 1-4 checks at random on the old code too).
- Eagle's fall: champions in the circle get a .22 s stun (soldiers go down 1 s). Unchanged; Arjun was told it knocks
  champions down: to decide.
- Mounted specials with hold-to-aim were discussed; only the basic attacks (f, g) were built.
