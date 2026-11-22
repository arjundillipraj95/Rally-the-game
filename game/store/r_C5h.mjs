// C5h Sigrun's art in: her body, axe and round shield, her wolf (its own head and tail), her men's Viking bodies and
// fjord horses are loaded and drawn. And the card's combo guard: her worst 2 s on a champion (at level 7, ults aside:
// the Hunt only finishes a champion under 20%) stays under 50% of the base champion's health.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0; const ok = (v, m) => { console.log((v ? 'ok   ' : 'FAIL ') + m); if (!v) fails++; };
const page = await open(browser, 844, 390, { q: '?crown2=1&champ=sigrun&botchamp=sigrun' });
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 30);
const o = await page.evaluate(async () => {
  const HL = await import('/src/render/heroload.js'), CG = await import('/src/render/rig/champgear.js'), I = await import('/src/champions/index.js'), cfg = await import('/src/config.js');
  for (let k = 0; k < 100 && !HL.heroesOn(); k++) await new Promise(r => setTimeout(r, 100));
  const d = I.CHAMPS.sigrun, S = HL.SRC, wolf = CG.champHorse(d.look), fjord = CG.horseNamed('horse_fjord');
  const r = { body: !!S.models.sigrun, sword: !!S.models.swordsman_viking, top: !!S.models.ulfhednar, axe: !!S.champShields.axe_sigrun, shield: !!S.champShields.roundshield_sigrun,
    wolf: !!wolf && !!wolf.tpl.getObjectByName('pv_head') && !!wolf.tpl.getObjectByName('pv_tail'), fjord: !!fjord };
  // the worst 2 s at level 7 (+10% on her blows and moves): Pounce (0.45 s), the Spin's charge (0.6 s), then her
  // basic hits for what is left at her rate, the boosted third the last; on foot: Pounce, then the spin's blows in what's left
  const g = 1 + cfg.LEVELS.grow.dmg * 6, k = 1 + .05 * 4, k5 = 1 + .05 * 2, hits = n => [1, 1, 1.5].slice(0, n).reduce((a, b) => a + b, 0) * d.stats.dmg * g;
  const left = 2 - (d.sp1.crouch + d.sp1.air) - d.sp2.rideDur, wolfWorst = d.sp1.champ * k + d.sp2.champ * k5 + hits(Math.min(3, Math.floor(left * d.stats.rate) + 1));
  const footLeft = 2 - (d.sp1.crouch + d.sp1.air), footWorst = d.sp1.champ * k + Math.min(d.sp2.ticks, Math.floor(footLeft / (d.sp2.dur / d.sp2.ticks) + .5)) * d.sp2.tick * k5;
  r.worst = Math.round(Math.max(wolfWorst, footWorst)); r.base = cfg.CHAMP_BASE.hp; return r;
});
ok(o.body && o.axe && o.shield, 'her body, axe and round shield loaded');
ok(o.wolf, 'her wolf loaded, its head and tail on pivots');
ok(o.sword && o.top && o.fjord, 'her swordsmen (Viking, Úlfheðnar) and fjord horses loaded');
ok(o.worst < o.base * .5, `her worst 2 s on a champion: ${o.worst} (under half the base's ${o.base}: ${o.base / 2})`);
await browser.close(); console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
