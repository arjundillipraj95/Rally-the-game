// The admin page: one self-contained HTML page (served only with the key), reading /admin/data.
export const adminPage = () => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Rally Admin</title><meta name="robots" content="noindex">
<style>
:root{--bg:#141312;--panel:#1f1d1a;--line:#34302a;--fg:#f3ede2;--dim:#a99f8e;--gold:#ffcf3a;--ok:#7fd27a;--bad:#ff7a6e;--blue:#3a5cf0;--red:#e0352b;--green:#2fbf46;--yellow:#f0c419}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
header{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;padding:18px 16px 6px;max-width:1200px;margin:auto}
h1{margin:0;font-size:24px;color:var(--gold);font-style:italic;letter-spacing:.02em}header span{color:var(--dim);font-size:12px}
header button{margin-left:auto;background:var(--panel);color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:6px 12px;font:inherit;cursor:pointer}
main{max-width:1200px;margin:auto;padding:8px 16px 40px;display:grid;gap:14px}
section{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px}
h2{margin:0 0 10px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--dim)}
.tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}
.tile{background:#26231f;border-radius:10px;padding:10px 12px}.tile b{display:block;font-size:26px;color:var(--gold);line-height:1.1}.tile small{color:var(--dim)}
.two{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px}
table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}th{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--dim);text-align:left;padding:4px 6px;font-weight:600}
td{padding:5px 6px;border-top:1px solid var(--line)}td.n,th.n{text-align:right}.wrap{overflow-x:auto}
.dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:3px;vertical-align:0}
.on{color:var(--ok)}.dim{color:var(--dim)}.bad{color:var(--bad)}.note{color:var(--dim);font-size:12px;margin-top:8px}
svg{display:block;width:100%;height:auto;max-width:760px}main>*,.two>*{min-width:0}table{min-width:520px}.bars text{font-size:10px;fill:var(--dim)}
.leg{display:flex;gap:14px;font-size:12px;color:var(--dim);margin-bottom:4px}.leg i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:4px;vertical-align:-1px}
.hbar{display:grid;grid-template-columns:110px 1fr 46px;gap:8px;align-items:center;margin:4px 0;font-size:13px}.hbar div{height:10px;border-radius:5px;background:#2c2924;overflow:hidden}.hbar div i{display:block;height:100%;border-radius:5px}
#err{color:var(--bad);padding:20px 16px;max-width:1200px;margin:auto}
</style></head><body>
<header><h1>Rally Admin</h1><span id="at">loading…</span><button id="re" type="button">Refresh</button></header>
<div id="err" hidden></div><main id="m"></main>
<script>
const key = new URLSearchParams(location.search).get('key') || '';
const C = ['#3a5cf0', '#e0352b', '#2fbf46', '#f0c419'], CN = ['Blue', 'Red', 'Green', 'Yellow'], FMT = ['Solo', 'Duo', 'Trio'];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const mmss = s => s == null ? '–' : Math.floor(s / 60) + ':' + String(Math.round(s % 60)).padStart(2, '0');
const pc = v => v == null ? '–' : v + '%', nz = v => v == null ? '–' : v;
const ago = t => { const m = Math.round((Date.now() - t) / 6e4); return m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' h ago' : Math.round(m / 1440) + ' d ago'; };
const dots = s => String(s || '').split('').map(c => '<i class="dot" style="background:' + C[+c] + '"></i>').join('');
const tile = (v, l) => '<div class="tile"><b>' + v + '</b><small>' + l + '</small></div>';
function bars(days, keys, cols, h = 150) { // stacked bars, one a day
  const W = 600, pad = 22, bw = (W - pad) / days.length, max = Math.max(1, ...days.map(d => keys.reduce((s, k) => s + (d[k] || 0), 0)));
  let g = '';
  days.forEach((d, i) => { let y = h - 16; keys.forEach((k, j) => { const v = d[k] || 0, bh = v / max * (h - 30); if (v) g += '<rect x="' + (pad + i * bw + 1) + '" y="' + (y - bh) + '" width="' + Math.max(1, bw - 2) + '" height="' + bh + '" rx="1.5" fill="' + cols[j] + '"><title>' + d.day + ' ' + k + ': ' + v + '</title></rect>'; y -= bh; });
    if (i % 5 === 0 || i === days.length - 1) g += '<text x="' + (pad + i * bw + bw / 2) + '" y="' + (h - 3) + '" text-anchor="middle">' + d.day.slice(5) + '</text>'; });
  g += '<text x="0" y="12">' + max + '</text><line x1="' + pad + '" x2="' + W + '" y1="' + (h - 16) + '" y2="' + (h - 16) + '" stroke="#34302a"/>';
  return '<svg class="bars" viewBox="0 0 ' + W + ' ' + h + '">' + g + '</svg>';
}
const hbar = (label, v, max, col, txt) => '<div class="hbar"><span>' + label + '</span><div><i style="width:' + (max ? v / max * 100 : 0) + '%;background:' + col + '"></i></div><span class="dim" style="text-align:right">' + (txt ?? v) + '</span></div>';
async function load() {
  document.getElementById('at').textContent = 'loading…';
  let d; try { const r = await fetch('/admin/data?key=' + encodeURIComponent(key), { cache: 'no-store' }); if (!r.ok) throw new Error(r.status === 404 ? 'Wrong or missing key' : 'HTTP ' + r.status); d = await r.json(); }
  catch (e) { const el = document.getElementById('err'); el.hidden = false; el.textContent = 'Could not load: ' + e.message; return; }
  document.getElementById('err').hidden = true;
  document.getElementById('at').textContent = 'Updated ' + new Date(d.at).toLocaleTimeString() + ' · details kept ' + d.keepDays + ' days, daily totals kept for good';
  const N = d.now, M = d.matches, B = d.balance, H = d.health, R = d.retention, P = d.players;
  const today = d.days[d.days.length - 1] || {};
  let h = '';
  h += '<section><h2>Right now</h2><div class="tiles">' + tile(N.online, 'online') + tile(N.battle, 'in a battle') + tile(N.searching, 'searching') + tile(N.parties, 'parties') + tile(today.players || 0, 'players today') + tile(today.matches || 0, 'battles today') + '</div></section>';
  h += '<section><h2>Players, last 30 days</h2><div class="tiles">' + tile(P.active30, 'played') + tile(R.newPlayers, 'new') + tile(pc(R.d1), 'came back next day<br><span class="dim">of ' + R.d1n + '</span>') + tile(pc(R.d7), 'came back within a week<br><span class="dim">of ' + R.d7n + '</span>') + '</div>';
  h += '<div class="leg" style="margin-top:12px"><span><i style="background:#ffcf3a"></i>returning</span><span><i style="background:#7fd27a"></i>new</span></div>' + bars(d.days.map(x => ({ day: x.day, returning: x.players - x.newp, new: x.newp })), ['returning', 'new'], ['#ffcf3a', '#7fd27a']) + '</section>';
  h += '<section><h2>Battles, last 30 days</h2><div class="tiles">' + tile(M.n, 'battles') + tile(M.withFriends, 'with other people') + tile(mmss(M.avgLen), 'average length') + tile(pc(M.botShare), 'captains that were bots') + M.byFmt.map((n, i) => tile(n, FMT[i])).join('') + tile(d.days.reduce((s, x) => s + (x.quits || 0), 0), 'left early') + '</div>';
  h += '<div class="leg" style="margin-top:12px"><span><i style="background:#3a5cf0"></i>with other people</span><span><i style="background:#6b6355"></i>against bots</span></div>' + bars(d.days.map(x => ({ day: x.day, people: x.hmatches, bots: x.matches - x.hmatches })), ['people', 'bots'], ['#3a5cf0', '#6b6355']);
  h += '<p class="note">How they ended: ' + (Object.entries(M.ends).map(([k, v]) => esc(k) + ' ' + v).join(' · ') || 'none yet') + '</p></section>';
  const wmax = Math.max(1, ...B.winsByColour);
  const src = (o) => '<tr><td>' + o[0] + '</td><td class="n">' + nz(o[1].places) + '</td><td class="n">' + nz(o[1].chest) + '</td><td class="n">' + nz(o[1].crown) + '</td><td class="n">' + nz(o[1].caps) + '</td><td class="n"><b>' + nz(o[1].total) + '</b></td></tr>';
  const dmax = (o) => Math.max(1, ...Object.values(o));
  h += '<div class="two"><section><h2>The Crown on the mountain · ' + B.n + ' battles</h2><div class="tiles">' + tile(pc(B.crownDecided), 'ended by the glacier') + tile(mmss(B.avgChestT), 'chest broken at') + tile(mmss(B.avgCrownT), 'glacier broken at') + tile(nz(B.margin), 'winning margin (points)') + tile(mmss(B.avgClearT), 'all garrisons cleared at') + '</div>';
  h += '<h2 style="margin-top:14px">Wins by colour</h2>' + B.winsByColour.map((n, i) => hbar('<i class="dot" style="background:' + C[i] + '"></i>' + CN[i], n, wmax, C[i], B.n ? Math.round(n / B.n * 100) + '%' : '–')).join('');
  h += '<h2 style="margin-top:14px">Where the points came from (average per side)</h2><div class="wrap"><table><tr><th></th><th class="n">Places</th><th class="n">Chest</th><th class="n">Crown</th><th class="n">Captains</th><th class="n">Total</th></tr>' + src(['Winner', B.winner]) + src(['Others', B.others]) + '</table></div></section>';
  h += '<section><h2>How captains died</h2>' + (Object.entries(B.capDeaths).sort((a, b) => b[1] - a[1]).map(([k, v]) => hbar(esc(k), v, dmax(B.capDeaths), '#ffcf3a')).join('') || '<p class="dim">No data yet</p>');
  h += '<h2 style="margin-top:14px">How soldiers died</h2>' + (Object.entries(B.menDeaths).sort((a, b) => b[1] - a[1]).map(([k, v]) => hbar(esc(k), v, dmax(B.menDeaths), '#a99f8e')).join('') || '<p class="dim">No data yet</p>') + '</section></div>';
  h += '<section><h2>Phones, last 7 days · ' + H.n + ' reports</h2><div class="tiles">' + tile(nz(H.fps), 'median frame rate') + tile(pc(H.slowPhones), 'phones under 30 fps') + tile(nz(H.joinedFps), 'joined phones fps') + tile(H.ping ? H.ping + ' ms' : '–', 'median ping (joined)') + tile(pc(H.relay), 'through a relay') + tile(pc(H.mobile), 'on phones') + tile(H.errs, 'game errors') + '</div>';
  h += '<p class="note">Devices: ' + (H.devices.map(([k, v]) => esc(k) + ' ' + v).join(' · ') || 'none yet') + '</p></section>';
  h += '<section><h2>Players, most active · last 30 days</h2><div class="wrap"><table><tr><th>Captain</th><th>Code</th><th class="n">Battles</th><th class="n">Wins</th><th class="n">Days played</th><th>Last seen</th><th class="n">Crowns S/D/T</th></tr>' + P.top.map(p => '<tr><td>' + (p.online ? '<span class="on">●</span> ' : '') + esc(p.nick) + '</td><td class="dim">' + esc(p.id) + '</td><td class="n">' + p.matches + '</td><td class="n">' + p.wins + '</td><td class="n">' + p.days + '</td><td class="dim">' + esc(p.lastDay) + '</td><td class="n dim">' + (p.crowns ? p.crowns.join(' / ') : '') + '</td></tr>').join('') + '</table></div></section>';
  h += '<section><h2>Latest battles</h2><div class="wrap"><table><tr><th>When</th><th>Format</th><th class="n">People</th><th class="n">Bots</th><th class="n">Length</th><th>Ended</th><th>Winner</th><th>Scores</th></tr>' + d.recent.map(m => '<tr><td class="dim">' + ago(m.t) + '</td><td>' + FMT[m.fmt] + ' · ' + esc(m.map) + '</td><td class="n">' + m.humans + '</td><td class="n">' + m.bots + '</td><td class="n">' + mmss(m.len) + '</td><td>' + esc(m.endk) + '</td><td>' + dots(m.win) + '</td><td class="dim">' + (m.sides || []).map(s => dots(s.c) + s.pts).join('&nbsp; ') + '</td></tr>').join('') + '</table></div></section>';
  if (d.archive.length) h += '<section><h2>Archive · daily totals older than ' + d.keepDays + ' days</h2><div class="wrap"><table><tr><th>Day</th><th class="n">Players</th><th class="n">New</th><th class="n">Battles</th><th class="n">With people</th><th class="n">Minutes</th><th class="n">Left early</th></tr>' + d.archive.map(a => '<tr><td>' + a.day + '</td><td class="n">' + a.players + '</td><td class="n">' + a.newp + '</td><td class="n">' + a.matches + '</td><td class="n">' + a.hmatches + '</td><td class="n">' + a.mins + '</td><td class="n">' + a.quits + '</td></tr>').join('') + '</table></div></section>';
  document.getElementById('m').innerHTML = h;
}
document.getElementById('re').onclick = load; load(); setInterval(load, 60000);
</script></body></html>`;
