// AUD1: three sound bars (Music, Effects, Team voice), old settings carry over, music/effects dip while a teammate talks.
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await open(browser, 844, 390, { q: '' });
page.on('pageerror', e => console.log('ERR', e.message));
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const o = await page.evaluate(async () => {
  const L = await import('/src/ui/levels.js'), S = await import('/src/config/sound.js'), A = await import('/src/ui/audio.js');
  const r = {}; A.initAudio();
  r.bars = document.querySelectorAll('[data-sound-bars]').length; r.sliders = document.querySelectorAll('[data-sound-bars] input[type=range]').length;
  r.old = !!document.querySelector('#segVol, #segMusic');
  const inp = document.querySelector('[data-sound-bars] input[data-bar="music"]'); inp.value = 50; inp.dispatchEvent(new Event('input', { bubbles: true }));
  r.music = L.LV.music; r.mirror = [...document.querySelectorAll('[data-sound-bars] input[data-bar="music"]')].map(i => i.value).join();
  r.stored = localStorage.getItem('rally-bar-music');
  await new Promise(z => setTimeout(z, 400)); const s0 = A.audioStats(); r.gain0 = s0.music.lv.m; r.sfx0 = s0.music.lv.f; r.st = s0.music.ctx;
  const keep = setInterval(() => L.setTalking(true), 60); L.setTalking(true); await new Promise(z => setTimeout(z, 900)); const s1 = A.audioStats(); clearInterval(keep);
  r.gain1 = s1.music.lv.m; r.sfx1 = s1.music.lv.f;
  L.setTalking(false); await new Promise(z => setTimeout(z, 2500)); const s2 = A.audioStats(); r.gain2 = s2.music.lv.m; r.sfx2 = s2.music.lv.f;
  L.setBar('music', 0); await new Promise(z => setTimeout(z, 400)); r.zero = A.audioStats().music.lv.m; r.live = A.audioStats().music.on;
  r.duck = S.DUCK; r.max = S.BARS.music.max;
  return r; });
ok(o.bars >= 2 && o.sliders === o.bars * 3, `${o.bars} bar groups, ${o.sliders} sliders`);
ok(!o.old, 'Low/Medium/High and Music On/Off are gone');
ok(o.music === .5 && o.mirror.split(',').every(v => v === '50') && o.stored === '0.5', `moving a slider sets, mirrors and keeps it (${o.music}, ${o.mirror})`);
ok(Math.abs(o.gain0 - .5 * o.max) < .02, `music gain follows the bar (${o.gain0})`);
ok(o.gain1 < o.gain0 * (o.duck.music + .1) && o.sfx1 < o.sfx0 * (o.duck.fx + .1), `a teammate talking lowers music ${o.gain0}→${o.gain1} and effects ${o.sfx0}→${o.sfx1}`);
ok(Math.abs(o.gain2 - o.gain0) < .02 && Math.abs(o.sfx2 - o.sfx0) < .02, `and they come back (${o.gain2}, ${o.sfx2})`);
ok(o.zero < .01 && o.live === false, `Music at 0 is silent (${o.zero})`);
// old settings carry over
const m = await browser.newContext(); const p2 = await m.newPage(); const base = page.url();
await p2.addInitScript(() => { localStorage.setItem('rally-vol', 'low'); localStorage.setItem('rally-music', 'off'); });
await p2.goto(base);
const mig = await p2.evaluate(async () => { const L = await import('/src/ui/levels.js'); return [L.LV.fx, L.LV.music]; });
ok(mig[0] === .2 && mig[1] === 0, `old Low + Music Off carry over (${mig})`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
