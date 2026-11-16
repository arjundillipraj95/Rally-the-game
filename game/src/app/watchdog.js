// The frame-rate watchdog (F14), the quality note, resizing.
import { resize, applyPixelRatio, applyShadowQuality, applyFar } from '../render/scene.js';
import { quality, keepRung, adaptStep, adaptState, setRung, setScale, fight, LEVELS } from '../render/quality.js';
import { resizeOverlay } from '../render/overlay.js';
import { QUALITY } from '../config.js';
import { $ } from './state.js';

export function updateQualityNote() {
  const lvl = LEVELS[quality.rung >= 0 ? QUALITY.rungs[quality.rung].lv : quality.level].name;
  $('qualityNote').textContent = quality.stepped ? `Auto lowered the graphics to keep the game smooth (now near ${lvl}).` : quality.setting === 'auto' ? `Auto picked ${lvl} for this device.` : '';
  $('segQuality').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === quality.setting)));
}

// ---------- frame-rate watchdog (F14): on Auto, keeps the graphics on the right rung all battle ----------
// Rule and numbers: adaptStep in render/quality.js, QUALITY in config.js. Mid-fight only the resolution moves.
export const watchdog = {
  t: 0, frames: 0, capN: 0, total: 0, clock: 0, since: 99, st: null,
  reset() { this.t = this.frames = this.capN = this.total = this.clock = 0; this.since = 99; fight.seen = false; this.st = quality.rung >= 0 ? adaptState(quality.rung) : null; },
  tick(rawDt) {
    if (!this.st) return;
    if (fight.seen) { fight.seen = false; this.since = 0; } else if (rawDt > 0 && rawDt < 1) this.since += rawDt;
    if (!(rawDt > 0) || rawDt > QUALITY.gap || document.hidden) { this.t = this.frames = this.capN = 0; return; } // (a hidden tab or a stall: start the window again)
    this.total += rawDt; this.clock += rawDt; this.st.t = this.clock;
    if (this.total < QUALITY.settle) return;
    this.t += rawDt; this.frames++;
    const ms = rawDt * 1000; if (ms >= QUALITY.capMs[0] && ms <= QUALITY.capMs[1]) this.capN++;
    if (this.t < (this.st.probed ? QUALITY.win : QUALITY.probe)) return;
    const w = { fps: this.frames / this.t, dur: this.t, capped: this.capN / this.frames >= QUALITY.cap, calm: this.since >= QUALITY.calmS };
    this.t = this.frames = this.capN = 0;
    const was = { ...quality.cfg }, ch = adaptStep(this.st, w, QUALITY);
    if (!ch) return;
    setRung(this.st.rung); setScale(this.st.scale); keepRung();
    if (ch === 'down' || ch === 'scale') quality.stepped = true;
    const c = quality.cfg;
    if (c.shadows !== was.shadows || c.softShadows !== was.softShadows) applyShadowQuality(); // (a hitch: only ever when calm)
    if (c.far !== was.far) applyFar();
    applyPixelRatio(); onResize(); updateQualityNote();
    if (ch !== 'scale') this.total = 0; // (settle again after a change)
  },
};

export function onResize() { resize(); resizeOverlay(); }
