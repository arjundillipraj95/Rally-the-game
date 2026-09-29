"""Renders the soldiers' death screams ("Aaah!", "Aarrgh!", "Waaah!") with a small voice model, since
no free recording of a man being launched into the air was to hand.

Source-filter synthesis: a glottal pulse train (with the pitch wobble, jitter, shimmer and rough
period-doubling that make a yell sound strained rather than sung) plus breath noise, shaped by
four vocal-tract resonances (formants) for an open "ah", gliding to an "r" for the arghs.
Writes 16-bit WAVs; the build step encodes them to MP3 into public/sfx/scream<n>.mp3.

    python3 scripts/screams.py <outdir>
"""
import sys, wave
import numpy as np
from scipy.signal import lfilter

SR = 44100
rng = np.random.default_rng(7)


def resonator(x, f, bw):
    """A 2-pole resonance (one formant); f and bw may vary per sample (arrays)."""
    f = np.broadcast_to(f, x.shape); bw = np.broadcast_to(bw, x.shape)
    y = np.zeros_like(x); y1 = y2 = 0.0
    r = np.exp(-np.pi * bw / SR); c = 2 * r * np.cos(2 * np.pi * f / SR); c2 = -r * r; g = 1 - r
    for i in range(len(x)):
        v = g[i] * x[i] + c[i] * y1 + c2[i] * y2
        y2, y1 = y1, v; y[i] = v
    return y


def glottal(f0, rough):
    """Pulse train following f0 (Hz per sample), with jitter, shimmer and period-doubling roughness."""
    n = len(f0); out = np.zeros(n); phase = 0.0; k = 0; amp = 1.0
    for i in range(n):
        phase += f0[i] / SR
        if phase >= 1.0:
            phase -= 1.0; k += 1
            amp = (1 + rng.normal(0, .12)) * (1 - rough * (k % 2))  # shimmer + alternate-cycle dip
        # Rosenberg-ish pulse: rise, fall, closed phase
        p = phase
        v = (0.5 * (1 - np.cos(np.pi * p / .45))) if p < .45 else (np.cos(np.pi * (p - .45) / (2 * .2)) if p < .65 else 0.0)
        out[i] = v * amp
    return np.diff(out, prepend=0)  # radiation: derivative flow sounds like a voice, not a buzz


def scream(dur, f_start, f_end, vowel='ah', rough=.25, growl=0.0, breath=.18, rise=.08):
    n = int(dur * SR); t = np.arange(n) / SR; u = t / dur
    # pitch: a quick upward yelp, then a long fall, with vibrato and slow random wander
    contour = np.where(t < rise, f_start * (0.85 + 0.15 * t / rise), f_start + (f_end - f_start) * np.clip((t - rise) / (dur - rise), 0, 1) ** 1.3)
    wander = np.cumsum(rng.normal(0, 1, n)); wander = (wander - np.linspace(wander[0], wander[-1], n)) / (np.abs(wander).max() + 1e-9)
    smooth = lfilter([.002], [1, -.998], rng.normal(0, 1, n)); smooth /= (np.abs(smooth).max() + 1e-9)  # slow random drift
    f0 = contour * (1 + .012 * np.sin(2 * np.pi * 6.5 * t + 3 * smooth) + .05 * smooth + .02 * wander + rng.normal(0, .014, n))
    src = glottal(f0, rough)
    if growl: src *= 1 + growl * np.sign(np.sin(2 * np.pi * 34 * t))  # throat rattle for the "arrgh"
    noise = rng.normal(0, 1, n); noise = lfilter([1, -.95], [1], noise) * .09
    env_breath = (breath + .12) * (0.8 + 1.4 * np.clip(u - .55, 0, 1)) * (1 + 2.5 * np.exp(-t / .03))  # hoarse, a burst of air at the start, breathier as it dies
    x = src + noise * env_breath
    # formants for an open "ah"; the argh slides into an "r" (F3 dives) near the end
    if vowel == 'ah':
        F = [(980, 130), (1380, 140), (2800, 200), (3700, 280)]; Fend = F
    elif vowel == 'argh':
        F = [(820, 110), (1220, 120), (2600, 170), (3500, 250)]; Fend = [(600, 110), (1100, 130), (1650, 160), (3300, 250)]
    else:  # 'wah' opens from a "w" into "ah"
        F = [(420, 90), (800, 110), (2400, 170), (3400, 250)]; Fend = [(920, 110), (1330, 120), (2750, 180), (3600, 260)]
    y = np.zeros(n)
    for (f1, b1), (f2, b2), gain in zip(F, Fend, [1.0, .95, .8, .55]):
        k = np.clip((u - (.55 if vowel == 'argh' else 0)) / (.45 if vowel == 'argh' else .18), 0, 1)
        y += gain * resonator(x, f1 + (f2 - f1) * k, b1 + (b2 - b1) * k)
    # loudness: fast attack, hold, then die away
    env = np.minimum(1, t / .025) * np.where(u < .45, 1, np.exp(-(u - .45) * 5.5))
    y *= env
    y = np.tanh(y / (np.abs(y).max() + 1e-9) * 1.6)  # a little throat saturation
    return y / np.abs(y).max() * .89


VARIANTS = [
    dict(dur=.95, f_start=420, f_end=250, vowel='ah', rough=.22),
    dict(dur=.85, f_start=360, f_end=220, vowel='argh', rough=.3, growl=.35),
    dict(dur=1.05, f_start=480, f_end=280, vowel='wah', rough=.18),
    dict(dur=.75, f_start=300, f_end=190, vowel='argh', rough=.35, growl=.45, breath=.25),
    dict(dur=.9, f_start=520, f_end=300, vowel='ah', rough=.15, breath=.12),
    dict(dur=.8, f_start=340, f_end=210, vowel='ah', rough=.4, growl=.2),
]

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '.'
    for i, v in enumerate(VARIANTS, 1):
        y = scream(**v)
        with wave.open(f'{out}/scream{i}.wav', 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
            w.writeframes((y * 32767).astype(np.int16).tobytes())
        print('wrote', f'scream{i}.wav', f'{len(y) / SR:.2f}s')
