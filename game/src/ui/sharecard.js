// The share card: a square picture of how your battle went (the result, your rating out of 10, your
// place, an award if you earned one and the honest line about your worst moment), for WhatsApp and
// the like. Drawn on a canvas; shared as an image where the phone allows it, else the text goes alone.
import { TEAMS } from '../config.js';
import { G, colorOf } from '../core/state.js';
import { myLine } from './report.js';

const SZ = 1080;
function wrap(ctx, text, x, y, maxW, lh, maxLines = 3) {
  const words = String(text).split(/\s+/); let line = '', n = 0;
  for (const w of words) {
    const t = line ? line + ' ' + w : w;
    if (ctx.measureText(t).width > maxW && line) { ctx.fillText(line, x, y); y += lh; line = w; if (++n >= maxLines - 1) { line = words.slice(words.indexOf(w)).join(' '); break; } }
    else line = t;
  }
  while (ctx.measureText(line).width > maxW && line.length > 4) line = line.slice(0, -2).trimEnd() + '…';
  ctx.fillText(line, x, y); return y + lh;
}
export async function shareCard(rep, title) {
  const m = myLine(rep); if (!m) return null;
  try { await document.fonts.ready; } catch (e) {}
  const cv = document.createElement('canvas'); cv.width = cv.height = SZ;
  const ctx = cv.getContext('2d'), team = TEAMS[colorOf(G.myTi)], gold = '#ffcf3a';
  const css = getComputedStyle(document.documentElement), disp = (css.getPropertyValue('--display') || 'serif').trim(), body = (css.getPropertyValue('--body') || 'sans-serif').trim();
  // ground: dusk, a band of your colour
  const g = ctx.createLinearGradient(0, 0, 0, SZ); g.addColorStop(0, '#2a2622'); g.addColorStop(1, '#141312');
  ctx.fillStyle = g; ctx.fillRect(0, 0, SZ, SZ);
  ctx.fillStyle = team.css; ctx.globalAlpha = .9; ctx.fillRect(0, 0, 26, SZ); ctx.globalAlpha = 1;
  // a big crown on the right, in your colour (gold for the winners)
  ctx.save(); ctx.translate(800, 470); ctx.rotate(.12); ctx.globalAlpha = .9;
  ctx.fillStyle = title === 'Victory' ? gold : team.css;
  ctx.beginPath(); ctx.moveTo(-170, 120); ctx.lineTo(-200, -110); ctx.lineTo(-90, 0); ctx.lineTo(0, -150); ctx.lineTo(90, 0); ctx.lineTo(200, -110); ctx.lineTo(170, 120); ctx.closePath(); ctx.fill();
  ctx.fillRect(-170, 140, 340, 46);
  ctx.fillStyle = 'rgba(0,0,0,.25)'; for (const x of [-100, 0, 100]) { ctx.beginPath(); ctx.arc(x, 60, 22, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
  ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.font = `800 28px ${body}`; ctx.textAlign = 'right'; ctx.fillText('Play free in your browser · ' + location.host, SZ - 60, SZ - 50); ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#fff'; ctx.font = `italic 400 64px ${disp}`; ctx.fillText('Rally!', 80, 120);
  ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.font = `800 30px ${body}`; ctx.fillText(G.mode === 'crown' ? (G.lms ? 'LAST MAN STANDING' : 'THE CROWN') : String(G.mode).toUpperCase(), 80, 170);
  ctx.fillStyle = title === 'Victory' ? gold : title === 'Defeat' ? '#e0352b' : '#fff'; ctx.font = `italic 400 150px ${disp}`; ctx.fillText(title.toUpperCase(), 76, 340);
  // the rating
  ctx.fillStyle = gold; ctx.font = `italic 400 260px ${disp}`; const r = m.me.rating.toFixed(1); ctx.fillText(r, 76, 610);
  const rw = ctx.measureText(r).width;
  ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = `800 44px ${body}`; ctx.fillText('/ 10', 96 + rw, 610);
  ctx.fillStyle = '#fff'; ctx.font = `800 40px ${body}`; ctx.fillText(m.text + (m.me.mvp ? ' · MVP' : ''), 80, 670);
  let y = 760;
  const aw = (m.me.awards || [])[0];
  if (aw) { ctx.fillStyle = gold; ctx.font = `italic 400 56px ${disp}`; ctx.fillText('🏆 ' + aw.name, 80, y); y += 52; ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.font = `700 32px ${body}`; y = wrap(ctx, aw.text, 80, y, SZ - 160, 40, 2) + 14; }
  if (m.me.bad) { ctx.fillStyle = '#fff'; ctx.font = `italic 700 36px ${body}`; wrap(ctx, '“' + m.me.bad + '”', 80, Math.max(y, 880), SZ - 160, 46, 3); }
  return new Promise(res => cv.toBlob(b => res(b), 'image/png'));
}
