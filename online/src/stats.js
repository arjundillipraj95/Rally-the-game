// Rally's numbers: a few useful facts per battle and per phone, kept in the Hub's own SQLite store.
// Only what helps us improve the game is stored: no emails, no chat, nicknames and guest codes only.
// Detail rows (battles, phones, who came on which day) are deleted after 90 days; before that, each day
// is folded into one small line of daily totals, kept for good (the archive).

export const KEEP_DAYS = 90;
const ADMIN_HASH = '381dc602d5093fac1e2a607205f7353c5b89d0a6d4cf01e66ebefdbdfeeb68c0'; // (sha-256 of the admin key; the key itself is not in the code)
const day = t => new Date(t).toISOString().slice(0, 10);
const num = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.round(+v || 0)));
const str = (v, n) => String(v == null ? '' : v).replace(/[^\w .:·-]/g, '').slice(0, n); // (·: the "·" in a phone type, "Android 14 · Chrome")

export async function isAdmin(key) {
  if (!key) return false;
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('') === ADMIN_HASH;
}

export function initStats(sql) {
  sql.exec(`CREATE TABLE IF NOT EXISTS matches (t INTEGER, day TEXT, rep TEXT, fmt INTEGER, mode TEXT, map TEXT, humans INTEGER, bots INTEGER, len INTEGER, endk TEXT, win TEXT, data TEXT)`);
  sql.exec(`CREATE INDEX IF NOT EXISTS matches_t ON matches (t)`);
  sql.exec(`CREATE TABLE IF NOT EXISTS perf (t INTEGER, day TEXT, id TEXT, client INTEGER, mobile INTEGER, relay INTEGER, fps INTEGER, slow INTEGER, ping INTEGER, errs INTEGER, dev TEXT)`);
  sql.exec(`CREATE INDEX IF NOT EXISTS perf_t ON perf (t)`);
  sql.exec(`CREATE TABLE IF NOT EXISTS seen (day TEXT, id TEXT, isnew INTEGER, PRIMARY KEY (day, id))`);
  sql.exec(`CREATE TABLE IF NOT EXISTS quits (t INTEGER, day TEXT, id TEXT)`);
  sql.exec(`CREATE TABLE IF NOT EXISTS daily (day TEXT PRIMARY KEY, players INTEGER, newp INTEGER, matches INTEGER, hmatches INTEGER, mins INTEGER, quits INTEGER, extra TEXT)`);
}

// someone came online today (a new guest counts as a new player)
export function noteSeen(sql, id, isNew) {
  sql.exec(`INSERT INTO seen (day, id, isnew) VALUES (?, ?, ?) ON CONFLICT (day, id) DO UPDATE SET isnew = MAX(isnew, excluded.isnew)`, day(Date.now()), id, isNew ? 1 : 0);
}
export function noteQuit(sql, id) { sql.exec(`INSERT INTO quits (t, day, id) VALUES (?, ?, ?)`, Date.now(), day(Date.now()), id); }

// a battle's summary, from the phone that ran it (solo or host); one a minute per player at most
const lastRep = new Map();
export function noteMatch(sql, id, m) {
  const now = Date.now(); if (now - (lastRep.get(id) || 0) < 60e3) return; lastRep.set(id, now);
  const sides = (Array.isArray(m.sides) ? m.sides : []).slice(0, 4).map(x => ({ c: str(x.c, 4), pts: num(x.pts, 0, 999), cas: num(x.cas, 0, 30), vil: num(x.vil, 0, 30), chest: num(x.chest, 0, 99), crown: num(x.crown, 0, 99), caps: num(x.caps, 0, 99) }));
  const cnt = o => Object.fromEntries(Object.entries(o && typeof o === 'object' ? o : {}).slice(0, 12).map(([k, v]) => [str(k, 12), num(v, 0, 9999)]));
  const players = (Array.isArray(m.players) ? m.players : []).slice(0, 12).map(p => [str(p[0], 8), num(p[1], 0, 3), p[2] ? 1 : 0]); // (guest code, colour, a person not a bot)
  const data = JSON.stringify({ sides, players, chestT: num(m.chestT, 0, 999), chestBy: str(m.chestBy, 4), crownT: num(m.crownT, 0, 999), crownBy: str(m.crownBy, 4),
    capDeaths: cnt(m.capDeaths), menDeaths: cnt(m.menDeaths), clearT: num(m.clearT, 0, 999), diff: num(m.diff, 0, 3) });
  sql.exec(`INSERT INTO matches (t, day, rep, fmt, mode, map, humans, bots, len, endk, win, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    now, day(now), id, num(m.fmt, 0, 2), str(m.mode, 10), str(m.map, 12), num(m.humans, 0, 12), num(m.bots, 0, 12), num(m.len, 0, 3600), str(m.endk, 10), str(m.win, 4), data);
}
// a phone's health over a battle: frame rate, how often it ran slow, its link (direct or relay), errors
export function notePerf(sql, id, m) {
  sql.exec(`INSERT INTO perf (t, day, id, client, mobile, relay, fps, slow, ping, errs, dev) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    Date.now(), day(Date.now()), id, m.client ? 1 : 0, m.mobile ? 1 : 0, m.relay ? 1 : 0, num(m.fps, 0, 240), num(m.slow, 0, 100), num(m.ping, 0, 5000), num(m.errs, 0, 999), str(m.dev, 24));
}

// fold every day older than KEEP_DAYS into the archive, then delete its detail rows (at most once an hour)
let pruned = 0;
export function prune(sql) {
  if (Date.now() - pruned < 3600e3) return; pruned = Date.now();
  const cut = day(Date.now() - KEEP_DAYS * 864e5);
  const days = [...sql.exec(`SELECT DISTINCT day FROM seen WHERE day < ? UNION SELECT DISTINCT day FROM matches WHERE day < ?`, cut, cut)].map(r => r.day);
  for (const d of days) {
    const s = sql.exec(`SELECT COUNT(*) AS n, SUM(isnew) AS nw FROM seen WHERE day = ?`, d).one();
    const mt = sql.exec(`SELECT COUNT(*) AS n, SUM(humans > 1) AS h, SUM(len) AS l FROM matches WHERE day = ?`, d).one();
    const q = sql.exec(`SELECT COUNT(*) AS n FROM quits WHERE day = ?`, d).one();
    const ex = JSON.stringify({ crown: sql.exec(`SELECT COUNT(*) AS n FROM matches WHERE day = ? AND endk = 'crown2'`, d).one().n });
    sql.exec(`INSERT OR REPLACE INTO daily (day, players, newp, matches, hmatches, mins, quits, extra) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, d, s.n | 0, s.nw | 0, mt.n | 0, mt.h | 0, Math.round((mt.l || 0) / 60), q.n | 0, ex);
  }
  for (const tb of ['seen', 'matches', 'perf', 'quits']) sql.exec(`DELETE FROM ${tb} WHERE day < ?`, cut);
}

// everything the admin page shows
export async function adminData(sql, hub) {
  const now = Date.now(), d30 = day(now - 29 * 864e5), d7 = day(now - 6 * 864e5);
  const live = [...hub.live.values()];
  const out = { at: now, keepDays: KEEP_DAYS,
    now: { online: live.length, battle: live.filter(s => s.where === 'battle').length, searching: live.filter(s => s.where === 'lobby').length, parties: hub.parties.size, rooms: hub.rooms.size } };
  // the last 30 days, a line each (older ones from the archive)
  const byDay = new Map();
  for (let k = 29; k >= 0; k--) byDay.set(day(now - k * 864e5), { day: day(now - k * 864e5), players: 0, newp: 0, matches: 0, hmatches: 0, mins: 0, quits: 0 });
  for (const r of sql.exec(`SELECT day, COUNT(*) AS n, SUM(isnew) AS nw FROM seen WHERE day >= ? GROUP BY day`, d30)) Object.assign(byDay.get(r.day) || {}, { players: r.n, newp: r.nw || 0 });
  for (const r of sql.exec(`SELECT day, COUNT(*) AS n, SUM(humans > 1) AS h, SUM(len) AS l FROM matches WHERE day >= ? GROUP BY day`, d30)) Object.assign(byDay.get(r.day) || {}, { matches: r.n, hmatches: r.h || 0, mins: Math.round((r.l || 0) / 60) });
  for (const r of sql.exec(`SELECT day, COUNT(*) AS n FROM quits WHERE day >= ? GROUP BY day`, d30)) Object.assign(byDay.get(r.day) || {}, { quits: r.n });
  out.days = [...byDay.values()];
  out.archive = [...sql.exec(`SELECT * FROM daily ORDER BY day DESC LIMIT 400`)];
  // coming back: of the new players in the last 30 days, how many came again the next day, and within a week
  const cohort = [...sql.exec(`SELECT id, day FROM seen WHERE isnew = 1 AND day >= ?`, day(now - 37 * 864e5))];
  let d1n = 0, d1y = 0, d7n = 0, d7y = 0;
  for (const c of cohort) {
    const t0 = Date.parse(c.day);
    if (t0 + 864e5 < now - 864e5) { d1n++; if (sql.exec(`SELECT 1 FROM seen WHERE id = ? AND day = ?`, c.id, day(t0 + 864e5)).toArray().length) d1y++; }
    if (t0 + 7 * 864e5 < now - 864e5) { d7n++; if (sql.exec(`SELECT 1 FROM seen WHERE id = ? AND day > ? AND day <= ?`, c.id, c.day, day(t0 + 7 * 864e5)).toArray().length) d7y++; }
  }
  out.retention = { newPlayers: cohort.length, d1: d1n ? Math.round(d1y / d1n * 100) : null, d1n, d7: d7n ? Math.round(d7y / d7n * 100) : null, d7n };
  // battles, the last 30 days
  const ms = [...sql.exec(`SELECT * FROM matches WHERE day >= ? ORDER BY t DESC`, d30)].map(r => ({ ...r, data: JSON.parse(r.data || '{}') }));
  const avg = a => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null;
  out.matches = { n: ms.length, withFriends: ms.filter(m => m.humans > 1).length, byFmt: [0, 1, 2].map(f => ms.filter(m => m.fmt === f).length),
    avgLen: avg(ms.map(m => m.len)), botShare: ms.length ? Math.round(ms.reduce((x, m) => x + m.bots / Math.max(1, m.bots + m.humans), 0) / ms.length * 100) : null,
    ends: ms.reduce((o, m) => (o[m.endk] = (o[m.endk] || 0) + 1, o), {}) };
  // the mountain's balance
  const mt = ms.filter(m => m.map === 'mount' && m.data.sides && m.data.sides.length);
  const wins = [0, 0, 0, 0]; for (const m of mt) for (const ch of String(m.win || '')) if (wins[+ch] != null) wins[+ch]++;
  const winSide = m => m.data.sides.find(x => x.c === m.win), loseSides = m => m.data.sides.filter(x => x.c !== m.win);
  const src = list => ({ places: avg(list.map(x => x.cas * 3 + x.vil * 2)), chest: avg(list.map(x => x.chest)), crown: avg(list.map(x => x.crown)), caps: avg(list.map(x => x.caps)), total: avg(list.map(x => x.pts)) });
  const deaths = (k) => mt.reduce((o, m) => { for (const [c, n] of Object.entries(m.data[k] || {})) o[c] = (o[c] || 0) + n; return o; }, {});
  out.balance = { n: mt.length, winsByColour: wins, crownDecided: mt.length ? Math.round(mt.filter(m => m.endk === 'crown2').length / mt.length * 100) : null,
    crownTaken: mt.filter(m => m.data.crownBy).length, avgCrownT: avg(mt.filter(m => m.data.crownT).map(m => m.data.crownT)), avgChestT: avg(mt.filter(m => m.data.chestT).map(m => m.data.chestT)),
    avgClearT: avg(mt.filter(m => m.data.clearT).map(m => m.data.clearT)),
    winner: src(mt.map(winSide).filter(Boolean)), others: src(mt.flatMap(loseSides)), margin: avg(mt.map(m => { const w = winSide(m), l = loseSides(m); return w && l.length ? w.pts - Math.max(...l.map(x => x.pts)) : 0; })),
    capDeaths: deaths('capDeaths'), menDeaths: deaths('menDeaths') };
  // players: the most active of the last 30 days
  const per = new Map();
  for (const m of ms) for (const [id, c, human] of m.data.players || []) { if (!human || !id) continue; const p = per.get(id) || { id, matches: 0, wins: 0, last: 0 }; p.matches++; if (String(m.win).includes(String(c))) p.wins++; p.last = Math.max(p.last, m.t); per.set(id, p); }
  const seenLast = new Map([...sql.exec(`SELECT id, MAX(day) AS d, COUNT(*) AS n FROM seen WHERE day >= ? GROUP BY id`, d30)].map(r => [r.id, r]));
  for (const [id, r] of seenLast) if (!per.has(id)) per.set(id, { id, matches: 0, wins: 0, last: 0 });
  const top = [...per.values()].sort((a, b) => b.matches - a.matches || (seenLast.get(b.id)?.n || 0) - (seenLast.get(a.id)?.n || 0)).slice(0, 30);
  for (const p of top) { const a = await hub.acct(p.id); p.nick = a ? a.nick : '?'; p.days = seenLast.get(p.id)?.n || 0; p.lastDay = seenLast.get(p.id)?.d || ''; p.online = hub.live.has(p.id); p.crowns = a && a.crowns; }
  out.players = { active30: seenLast.size, top };
  // phones, the last 7 days
  const pf = [...sql.exec(`SELECT * FROM perf WHERE day >= ?`, d7)];
  const med = a => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
  const pct = f => pf.length ? Math.round(pf.filter(f).length / pf.length * 100) : null;
  // ping and the relay are about joined phones only (the host measures no ping and never relays)
  const joined = pf.filter(r => r.client), pings = joined.filter(r => r.ping).map(r => r.ping);
  const q = (a, f) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * f))]; };
  const pctOf = (a, f) => a.length ? Math.round(a.filter(f).length / a.length * 100) : null;
  out.health = { n: pf.length, fps: med(pf.map(r => r.fps)), slowPhones: pct(r => r.fps < 30), mobile: pct(r => r.mobile),
    joinedFps: med(joined.map(r => r.fps)), ping: q(pings, .5), pingP90: q(pings, .9), pingN: pings.length, relay: pctOf(joined, r => r.relay), errs: pf.reduce((x, r) => x + r.errs, 0),
    devices: Object.entries(pf.reduce((o, r) => (o[r.dev || '?'] = (o[r.dev || '?'] || 0) + 1, o), {})).sort((a, b) => b[1] - a[1]).slice(0, 8) };
  out.recent = ms.slice(0, 20).map(m => ({ t: m.t, fmt: m.fmt, mode: m.mode, map: m.map, humans: m.humans, bots: m.bots, len: m.len, endk: m.endk, win: m.win, sides: m.data.sides, chestBy: m.data.chestBy, crownBy: m.data.crownBy }));
  return out;
}
