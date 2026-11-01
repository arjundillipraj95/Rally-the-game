// The ⚔ tag: a small button that hangs over an enemy captain you could call out to a duel (your
// captain on foot, close enough, neither of you duelled yet this life), or over the one who's just
// called you out. Tapping it challenges, or accepts. Nothing to learn, nothing on screen otherwise.
import { G } from '../core/state.js';
import { duelOffer, duelTarget } from '../core/sim.js';
import { actions } from '../net/netgame.js';
import { proj } from '../render/overlay.js';

const el = document.createElement('button');
el.id = 'duelTag'; el.type = 'button'; el.hidden = true;
document.body.appendChild(el);
el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); actions.duel(); });
let shownFor = null, lastTxt = '';

export const hideDuelTag = () => { el.hidden = true; shownFor = null; };
export function duelTagTick() {
  const p = G.player;
  let v = null, txt = '';
  if (G.state === 'play' && p && !p.dead) {
    const o = duelOffer(p);
    if (o) { v = o.a; txt = '⚔ Accept'; }
    else if (!p.duelId && !(G.duels || []).some(d => d.a === p)) {
      // only offer it in a lull, not mid-swing: you're squaring up to him, not hacking through his men
      const t = duelTarget(p);
      if (t && (t === shownFor || p.swing <= 0)) { v = t; txt = '⚔ Challenge'; }
    }
  }
  if (!v) { if (!el.hidden) el.hidden = true; shownFor = null; return; }
  const [sx, sy, ok] = proj(v.x, v.y + 4.3 + (v.mounted ? 1.2 : 0), v.z);
  if (!ok) { el.hidden = true; return; }
  if (txt !== lastTxt) { el.textContent = txt; lastTxt = txt; el.classList.toggle('accept', txt.includes('Accept')); }
  el.style.transform = `translate(${Math.round(sx)}px, ${Math.round(sy)}px) translate(-50%, -100%)`;
  el.hidden = false; shownFor = v;
}
