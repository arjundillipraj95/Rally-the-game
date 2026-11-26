// AUD1 the three sound bars (Settings and the pause menu) and the lowering while a teammate talks (Arjun 25 Nov: too loud;
// on Android the music and effects got louder with the mic on, because teammates' voices stack on top).
// def: where a bar starts; max: the gain a full bar means (music: the bed and the drone; fx: everything else in the game).
// The old Medium was 0.5 on everything: music 0.5 x 0.5 = .25, effects .5. Now music .2 x .6 = .12, effects .35.
export const BARS = { music: { def: .2, max: .6 }, fx: { def: .35, max: 1 }, voice: { def: .8 } };
// while a teammate speaks: music and effects go to this share of their bar (music: a lot, effects: a little).
// attack/release: seconds the dip takes to arrive and to lift; hold: how long after the last word it stays down;
// poll: ms between checks of who is speaking; level: the loudness (0..1, from the call's own stats) that counts as speech.
export const DUCK = { music: .3, fx: .75, attack: .12, release: .6, hold: .5, poll: 250, level: .03 };
