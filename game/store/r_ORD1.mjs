// ORD1: the attack order dragged onto a structure: the aim picks an enemy gate or a nexus (never my own); ordered at it,
// my foot soldiers walk up to it and strike it.
import { chromium } from 'playwright';
import { open, frames } from './stage.mjs';
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await open(browser, 844, 390, { q: '?crown2=1' }), errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.click('#segMode button[data-v="crown"]'); await page.click('#goBtn'); await frames(page, 20);
const r = await page.evaluate(async () => {
  const F = window.__fb, { G } = F, st8 = await import('/src/core/state.js'), f = await import('/src/core/sim/forts.js');
  const ha = await import('/src/ui/holdaim.js'), army = await import('/src/core/sim/army.js');
  const me = G.player, c = st8.colorOf(me.ti), myA = G.ALLY[c], o = {};
  const foeC = [0, 1, 2, 3].find(k => G.ALLY[k] !== myA), foeA = G.ALLY[foeC];
  const h = G.holds.find(x => x.kind === 'castle' && x.side === foeC && !x.mid), cw = G.layout.cwalls.find(q => q.hid === h.id);
  h.owner = foeA; G.cgates[h.id] = f.freshGates(1); f.applyCastleGates(); h.shieldT = 0;
  const g = cw.gates[0], gx = cw.x + Math.cos(g) * cw.r, gz = cw.z + Math.sin(g) * cw.r;
  const pick = ha.structureAt(gx + 1.5, gz + 1); o.pickGate = !!pick && Math.hypot(pick.x - gx, pick.z - gz) < 1.5 && pick.id === 0;
  const myNx = G.layout.nexus.find(n => n.c === c), foeNx = G.layout.nexus.find(n => n.c === foeC);
  o.pickMyNexus = ha.structureAt(myNx.x + 1, myNx.z); o.pickFoeNexus = !!ha.structureAt(foeNx.x + 1, foeNx.z);
  // ordered at the gate: my men walk up and hack it (nobody else about)
  G.units.forEach(u => { if (!u.dead && Math.hypot(u.x - cw.x, u.z - cw.z) < 45 && u.ti !== me.ti) { u.x += 300; u.z += 300; } });
  const men = G.units.filter(u => !u.dead && u.ti === me.ti && u.kind === 'foot');
  men.forEach((u, k) => { u.x = gx + Math.cos(g) * 12 + (k % 3) * 1.5; u.z = gz + Math.sin(g) * 12 + (k / 3 | 0) * 1.5; });
  me.x = gx + Math.cos(g) * 16; me.z = gz + Math.sin(g) * 16;
  const hp0 = G.cgates[h.id].hp[0]; army.setOrder(me.ti, 'focus', pick);
  for (let k = 0; k < 360; k++) { F.step(1); me.x = gx + Math.cos(g) * 16; me.z = gz + Math.sin(g) * 16; G.units.forEach(u => { if (!u.dead && u.ti !== me.ti && Math.hypot(u.x - cw.x, u.z - cw.z) < 45 && !u.neutral) { u.x += 300; u.z += 300; } }); }
  o.men = men.length; o.near = men.filter(u => Math.hypot(u.x - gx, u.z - gz) < 6).length; o.gate = { hp0, hp: G.cgates[h.id].hp[0] };
  return o;
});
ok(r.pickGate, 'the aim on an enemy castle\'s gate: an attack on that gate');
ok(!r.pickMyNexus && r.pickFoeNexus, 'the aim on a nexus: theirs yes, my own no');
ok(r.near >= 1 && r.gate.hp < r.gate.hp0, `ordered at the gate: ${r.near}/${r.men} footmen got to it (the archers shoot them), gate ${Math.round(r.gate.hp0)} -> ${Math.round(r.gate.hp)}`);
ok(!errs.length, `no errors${errs.length ? ' (' + errs[0] + ')' : ''}`);
await browser.close();
console.log(fails ? `${fails} FAILED` : 'ALL PASS'); process.exit(fails ? 1 : 0);
