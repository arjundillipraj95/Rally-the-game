// (C5) Sigrun's sounds, until recorded ones come: the wolf's claws, bite, yelp, snarl and howl, her axe's whoosh and
// chop, the spin, the Hunt's sting. Added to sfx (ui/audio.js), so bus 'sfx' events and sound() reach them.
import { sfx, gateS, playS as play, toneS as tone, noiseS as noise, atS as at } from './audio.js';

Object.assign(sfx, {
  wolfClaw(x, z) { if (!gateS('wc', 70)) return; const pl = at(x, z); noise(.12, 3200, 1.4, .28, 'bandpass', 1400, pl); play('swing', x, z, { vol: .4, rate: 1.5, jit: .1 }); },
  wolfBite(x, z) { if (!gateS('wb', 90)) return; const pl = at(x, z); tone(140, .12, .25, 'sawtooth', 70, 0, pl, .2); play('hit', x, z, { vol: .7, rate: .8 }); noise(.06, 900, 2, .3, 'bandpass', 0, pl, .05); },
  wolfYelp(x, z) { if (!gateS('wy', 220)) return; const pl = at(x, z); if (pl.v < .1) return; tone(880, .08, .14, 'triangle', 1500, 0, pl, .2); tone(1400, .14, .1, 'triangle', 700, .07, pl, .2); },
  wolfSnarl(x, z) { if (!gateS('ws', 300)) return; const pl = at(x, z); tone(95, .45, .2, 'sawtooth', 120, 0, pl, .25); noise(.45, 420, 3, .22, 'bandpass', 600, pl); },
  howl(x, z) { if (!gateS('hw', 1500)) return; const pl = at(x, z); tone(330, .45, .16, 'sine', 560, 0, pl, .6); tone(560, 1.1, .16, 'sine', 420, .45, pl, .6); tone(662, 1.1, .05, 'sine', 500, .5, pl, .6); },
  axeWhoosh(x, z) { if (gateS('aw', 60)) play('swing', x, z, { vol: .6, rate: .8, jit: .1, send: .15 }); },
  axeChop(x, z) { if (!gateS('ac', 80)) return; play('heavy', x, z, { vol: .9, rate: .95, send: .2 }); play('thud', x, z, { vol: .5, rate: .85, delay: .02 }); },
  spinLoop(x, z) { for (let i = 0; i < 4; i++) play('swing', x, z, { vol: .5, rate: .75 + i * .05, jit: .05, delay: i * .14 }); },
  huntSting(x, z) { const pl = at(x, z); tone(110, 1.2, .22, 'sawtooth', 55, 0, pl, .5); tone(440, .5, .12, 'triangle', 880, .05, pl, .5); tone(660, .6, .1, 'triangle', 990, .15, pl, .5); },
});
