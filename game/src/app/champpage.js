// LORE1 the champions' page (design doc "Where players see it", Arjun 17 Nov): from the main screen's Champions button,
// one card each: name and title, the class, a Melee or Ranged tag, the lore, and Health, Attack (damage a second),
// Attack rate, Reach, Speed, Army and Difficulty (stars), each a number with a bar worked out from the real numbers.
// "Play as" makes him the one you lead.
import { CHAMPS, CHAMP_IDS, myChamp, setMyChamp } from '../champions/index.js';

const CLS = { vanguard: ['Vanguard', '🛡'], striker: ['Striker', '⚔'], raider: ['Raider', '🐎'] };
const ARMY = { vanguard: 5, striker: 3, raider: 3 }; // (C1e: men at the start by class)
const BAR = { hp: [250, 650], dps: [15, 60], rate: [.6, 2], reach: [1, 3], spd: [4.5, 7.5], army: [2, 8] };
const pct = (k, v) => Math.round(100 * Math.max(.05, Math.min(1, (v - BAR[k][0]) / (BAR[k][1] - BAR[k][0]))));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const css = `#champPage{position:fixed;inset:0;z-index:60;background:rgba(12,10,6,.86);display:flex;flex-direction:column;padding:12px max(14px,env(safe-area-inset-left,0px));gap:10px;color:#fff;font-family:Inter,system-ui,sans-serif;overflow:auto}
#champPage .cpHead{display:flex;align-items:center;justify-content:space-between}#champPage h2{margin:0;font:900 22px var(--display,serif);font-style:italic;color:#ffe7a3}
#champPage .cpList{display:flex;gap:12px;flex-wrap:wrap}.cpCard{flex:1 1 300px;max-width:420px;border:2px solid #b68a2e;border-radius:14px;background:rgba(16,14,8,.6);padding:10px 12px;display:flex;flex-direction:column;gap:6px}
.cpCard.mine{border-color:#ffd36e;box-shadow:0 0 14px rgba(255,211,110,.4)}.cpTop{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}.cpTop b{font:900 18px var(--display,serif);font-style:italic}.cpTop i{color:#ffe7a3;font-size:12px}
.cpTags{display:flex;gap:6px}.cpTags span{font:800 10px Inter,sans-serif;letter-spacing:.06em;text-transform:uppercase;border:1px solid rgba(255,231,163,.6);border-radius:999px;padding:2px 8px}
.cpLore{font-size:12px;line-height:1.45;color:#e8dcc0}.cpStats{display:grid;grid-template-columns:auto 1fr auto;gap:3px 8px;align-items:center;font-size:11px}
.cpStats u{display:block;height:6px;border-radius:3px;background:rgba(255,255,255,.12);text-decoration:none}.cpStats u i{display:block;height:100%;border-radius:3px;background:linear-gradient(90deg,#c9932e,#ffe7a3)}.cpStats em{font-style:normal;font-weight:800;text-align:right}
.cpCard button{align-self:flex-start}`;
let el = null;
function card(id) {
  const d = CHAMPS[id], s = d.stats, [cls, icon] = CLS[d.cls] || [d.cls, ''], army = ARMY[d.cls] || 3, dps = s.dmg * s.rate, mine = myChamp() === id;
  const row = (name, k, v, shown) => `<span>${name}</span><u><i style="width:${pct(k, v)}%"></i></u><em>${shown}</em>`;
  return `<div class="cpCard${mine ? ' mine' : ''}" data-id="${id}"><div class="cpTop"><b>${esc(d.name)}</b><i>${esc(d.title || '')}</i></div>
    <div class="cpTags"><span>${icon} ${cls}</span><span>${d.ranged ? 'Ranged' : 'Melee'}</span><span>${esc(d.origin || '')}</span></div>
    <div class="cpLore">${esc(d.lore || '')}</div>
    <div class="cpStats">${row('Health', 'hp', s.hp, s.hp)}${row('Attack', 'dps', dps, Math.round(dps) + '/s')}${row('Attack rate', 'rate', s.rate, s.rate + '/s')}${row('Reach', 'reach', s.reach, s.reach + ' m')}${row('Speed', 'spd', s.spd, s.spd + ' m/s')}${row('Army', 'army', army, army + ' men')}<span>Difficulty</span><span style="color:#ffd36e">${'★'.repeat(d.difficulty || 1)}${'☆'.repeat(3 - (d.difficulty || 1))}</span><em></em></div>
    <button type="button" class="go${mine ? ' ghost' : ''}" data-pick="${id}">${mine ? 'Leading' : 'Play as'}</button></div>`;
}
export function showChampions(only) {
  if (!el) { const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st); el = document.createElement('div'); el.id = 'champPage'; document.body.appendChild(el);
    el.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.pick) { setMyChamp(b.dataset.pick); showChampions(el.dataset.only || null); } else if (b.id === 'cpDone') el.hidden = true; }); }
  el.dataset.only = only || ''; el.hidden = false;
  el.innerHTML = `<div class="cpHead"><h2>Champions</h2><button type="button" class="go" id="cpDone">Done</button></div><div class="cpList">${(only ? [only] : CHAMP_IDS.slice().reverse()).map(card).join('')}</div>`;
}
document.getElementById('champsBtn')?.addEventListener('click', () => showChampions());
