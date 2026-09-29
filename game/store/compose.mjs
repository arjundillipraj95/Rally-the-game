import { chromium } from 'playwright';
import fs from 'fs';
const D = '/tmp/claude-0/-home-claude-rally-the-game/4e17cb5f-998f-589c-8d52-44170dd3d094/scratchpad/store/';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [src, w, h, out] of [['crop_land', 1920, 1080, 'cover_1920x1080'], ['crop_port', 800, 1200, 'cover_800x1200'], ['crop_sq', 800, 800, 'cover_800x800']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto('http://127.0.0.1:8766/'); await page.evaluate(() => document.fonts.ready);
  const b64 = fs.readFileSync(D + src + '.png').toString('base64');
  await page.evaluate(({ b64, w, h }) => {
    document.body.innerHTML = ''; document.body.style.cssText = 'margin:0;overflow:hidden;background:#000';
    const img = document.createElement('div');
    img.style.cssText = `position:fixed;inset:0;background:url(data:image/png;base64,${b64}) center/cover;filter:saturate(1.25) contrast(1.08) brightness(1.04)`;
    const v = document.createElement('div'); v.style.cssText = 'position:fixed;inset:0;background:radial-gradient(ellipse at 50% 58%, rgba(0,0,0,0) 45%, rgba(20,12,4,.55) 100%)';
    const port = h > w, sq = w === h, size = port ? w * .3 : sq ? w * .24 : h * .22;
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;left:0;right:0;top:${port ? 5 : sq ? 4 : 5}%;text-align:center;font-family:Bangers;font-size:${size}px;line-height:.9;color:#fff;letter-spacing:.02em;transform:rotate(-4deg);-webkit-text-stroke:${size * .045}px #1b1512;paint-order:stroke fill;text-shadow:0 ${size * .06}px 0 #1b1512,0 ${size * .1}px ${size * .12}px rgba(0,0,0,.45)`;
    t.textContent = 'RALLY!';
    const f = document.createElement('div'); f.style.cssText = `display:flex;justify-content:center;gap:${size * .08}px;margin-top:${size * .08}px;transform:rotate(4deg)`;
    for (const c of ['#3a5cf0', '#e0352b', '#2fbf46', '#f0c419']) { const i = document.createElement('i'); i.style.cssText = `display:block;width:${size * .16}px;height:${size * .22}px;background:${c};clip-path:polygon(0 0,100% 0,100% 100%,50% 78%,0 100%)`; f.append(i); }
    t.append(f); document.body.append(img, v, t);
  }, { b64, w, h });
  await page.waitForTimeout(400); await page.screenshot({ path: D + out + '.png' }); await page.close();
}
await browser.close();
