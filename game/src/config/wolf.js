// (C5) Sigrun's great grey wolf: how it moves and takes a hit (render/wolf.js). Drawing only: its speed, health and
// reach are on her page (champions/sigrun.js mount), the horse rules otherwise.

// its gaits, as the horse's (render/herohorse.js GAITS): a loping walk, a trot, and the bounding gallop (hind pair
// together, then the front pair, a long flight between), longer strides and more spine than a horse's
export const WOLF_GAITS = [
  { v: 0, stride: 1.8, amp: .32, stance: .62, bob: .02, bobN: 2, rock: .02, at: { backL: 0, frontL: .25, backR: .5, frontR: .75 } },
  { v: 4, stride: 3.2, amp: .5, stance: .48, bob: .06, bobN: 2, rock: .03, at: { frontL: 0, backR: 0, frontR: .5, backL: .5 } },
  { v: 9, stride: 6.4, amp: .85, stance: .3, bob: .16, bobN: 1, rock: .12, at: { backL: 0, backR: .05, frontL: .48, frontR: .53 } },
];
// a hit on the wolf (feel.js impact, as FEEL.horse): it flinches low and away (`toss` rad/s a unit of power, nose down
// +), skips aside (`side` m/s); at `snarlAt` power it rears back onto its haunches (`rear`, at most `rearMax`) and snarls;
// at `yelpAt` it yelps. Springs: [stiffness, damping]. The head jerks away (`headJerk` rad) and comes back.
export const FEEL_WOLF = { toss: -1.1, side: 3.2, twist: 2, rearAt: 1.2, rear: 2.8, rearMax: .38, lift: .6, rearK: [26, 6], sideK: [70, 11],
  yelpAt: .5, snarlAt: 1.2, headJerk: .5, headK: [90, 12] };
// its head and tail as it goes: the head low and long at a gallop (`gallopDip` rad), nodding with the stride (`nod`),
// the tail streaming out behind with speed (`tailLift` at a gallop) and swinging (`tailSway`)
export const WOLF_POSE = { gallopDip: .28, nod: .1, tailLift: .55, tailSway: .22, idleSway: .1 };
// its strikes, drawn by code through its legs, head and tail (s: how long; the moment the blow lands is `at` of it):
// claw: a forepaw raised and raked down; bite: the head drawn back and snapped forward; pounce: crouched, then the
// spring, forelegs reaching, hind legs trailing; shake: jaws clamped, the head flung side to side; howl: head thrown back
export const WOLF_MOVES = {
  clawR: { t: .42, at: .45 }, clawL: { t: .42, at: .45 }, bite: { t: .5, at: .5 },
  pounce: { t: .45, at: 1 }, shake: { t: .5, at: .6 }, howl: { t: 1.4, at: .2 },
};
