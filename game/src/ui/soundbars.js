// AUD1 the three sound bars: Music, Effects, Team voice (Arjun 25 Nov). One piece, put into every [data-sound-bars]
// place (Settings, and the pause menu so they can be set in a battle). Values live in ui/levels.js, per phone.
import './soundbars.css';
import { LV, setBar, onLevels } from './levels.js';
import { sfx } from './audio.js';

const ROWS = [['music', 'Music'], ['fx', 'Effects'], ['voice', 'Team voice']];
const pct = v => Math.round(v * 100);
export function mountSoundBars() {
  document.querySelectorAll('[data-sound-bars]').forEach(box => {
    if (box.dataset.ready) return; box.dataset.ready = '1';
    box.innerHTML = ROWS.map(([k, name]) => `<div class="sbar"><span class="sbName">${name}</span><input type="range" min="0" max="100" step="5" value="${pct(LV[k])}" data-bar="${k}" aria-label="${name} volume"><output>${pct(LV[k])}%</output></div>`).join('');
    box.querySelectorAll('input').forEach(inp => {
      const k = inp.dataset.bar, out = inp.nextElementSibling;
      inp.addEventListener('input', () => { setBar(k, inp.value / 100); });
      inp.addEventListener('change', () => { if (k === 'fx') { try { sfx.uiClick(); } catch (e) { /* no sound yet */ } } }); // (let go: a click at the new level)
      inp.style.setProperty('--v', inp.value + '%'); out.textContent = inp.value + '%';
    });
  });
}
// every bar of every copy shows the same values
onLevels(() => document.querySelectorAll('[data-sound-bars] input').forEach(inp => {
  const v = pct(LV[inp.dataset.bar]); if (+inp.value !== v) inp.value = v; inp.style.setProperty('--v', v + '%'); inp.nextElementSibling.textContent = v + '%'; }));
