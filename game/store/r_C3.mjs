// C3: the closet has no Weapon tab; an outfit still has all 7 slots and keeps its weapon choice (looks only).
import { chromium } from 'playwright';
import { open } from './stage.mjs';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { home: true });
const r = await page.evaluate(async () => {
  document.getElementById('wardBtn').click();
  await new Promise(r => setTimeout(r, 300));
  const tabs = [...document.querySelectorAll('#ward .wcats [data-c]')].map(b => b.dataset.c);
  const L = await import('/src/core/look.js');
  const v = L.lookFrom('0002200'); // a saved outfit with the Axe
  return { tabs, slots: L.SLOTS.length, axeKept: v && v[L.SLOT_IX.weapon] === 2, wardOpen: !document.getElementById('ward').hidden };
});
const fails = [];
if (!r.wardOpen) fails.push('closet did not open');
if (r.tabs.includes('weapon')) fails.push('Weapon tab still shown');
if (!r.tabs.includes('helm') || !r.tabs.includes('cape')) fails.push('other tabs missing: ' + r.tabs);
if (r.slots !== 7) fails.push('slot count changed: ' + r.slots);
if (!r.axeKept) fails.push('saved weapon choice lost');
console.log(fails.length ? 'C3 FAIL: ' + fails.join('; ') : 'C3 PASS tabs: ' + r.tabs.join(','));
await browser.close();
process.exit(fails.length ? 1 : 0);
