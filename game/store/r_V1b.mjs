// V1b check: the online service hands out short-lived relay credentials (a stand-in for Metered.ca answers), the
// phones use them first (public relays kept after them), and without the secrets it says nothing and the game keeps its public relays.
// Starts its own stand-in (:9100) and a second online service (:8788) with the secrets; needs the game server (:8766).
import http from 'node:http';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import { rmSync } from 'node:fs'; rmSync('/tmp/rally-w2', { recursive: true, force: true }); // (no answer left over from an earlier run)
const sleep = ms => new Promise(r => setTimeout(r, ms)); let made = 0, seenKey = '';
const stub = http.createServer((q, r) => { if (q.method === 'POST' && q.url.startsWith('/api/v1/turn/credential')) { made++; seenKey = new URL(q.url, 'http://x').searchParams.get('secretKey'); r.setHeader('content-type', 'application/json'); r.end(JSON.stringify({ username: 'u' + made, password: 'p' + made, expiryInSeconds: 14400, apiKey: 'k' })); } else { r.statusCode = 404; r.end(); } }).listen(9100);
const w = spawn('npx', ['wrangler', 'dev', '--local', '--port', '8788', '--persist-to', '/tmp/rally-w2', '--var', 'METERED_APP:rallytest', '--var', 'METERED_SECRET_KEY:s3cret', '--var', 'METERED_BASE:http://127.0.0.1:9100'], { cwd: new URL('../../online', import.meta.url).pathname, stdio: 'ignore', detached: true }); // (own process group, so it all stops at the end)
const res = {}; const done = ok => { try { process.kill(-w.pid, 'SIGKILL'); } catch (e) {} stub.close(); console.log(JSON.stringify(res)); console.log(ok ? 'PASS' : 'FAIL'); process.exit(ok ? 0 : 1); };
let up = false; for (let i = 0; i < 60 && !up; i++) { await sleep(1000); try { up = (await fetch('http://127.0.0.1:8788/health')).ok; } catch (e) {} }
if (!up) { console.log('worker did not start'); done(false); }
const get = async () => (await fetch('http://127.0.0.1:8788/turn')).json();
const a = await get(), b = await get();
res.listShape = Array.isArray(a) && a.some(s => /^turns?:/.test([].concat(s.urls).join(' ')) && s.username === 'u1' && s.credential === 'p1') && a.some(s => /^turns:/.test([].concat(s.urls).join(' ')));
res.keyStaysServerSide = seenKey === 's3cret' && !JSON.stringify(a).includes('s3cret');
res.sharedAnswer = made === 1 && JSON.stringify(a) === JSON.stringify(b); // (one credential for both asks)
// the game uses it, in place of the public relays
const br = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--disable-features=WebRtcHideLocalIpsWithMdns'] });
const pg = await br.newPage(); await pg.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8788'); await pg.waitForFunction(() => document.readyState === 'complete'); await sleep(1500);
const ice = await pg.evaluate(async () => { const m = await import('/src/net/p2p.js'); return m.iceServers(); });
const flat = JSON.stringify(ice);
res.gameUsesIt = flat.includes('"username":"u1"') && flat.indexOf('global.relay.metered.ca') < flat.indexOf('freeturn') && flat.includes('openrelay'); // (private relay first; the public ones stay after it: a new credential can take ~2 min to work)
// the other online service (no secrets): the game falls back to the public relays
const pg2 = await br.newPage(); await pg2.goto('http://127.0.0.1:8766/?online=http://127.0.0.1:8787'); await sleep(2500);
const ice2 = JSON.stringify(await pg2.evaluate(async () => { const m = await import('/src/net/p2p.js'); return m.iceServers(); }));
res.noSecretsFallsBack = (await (await fetch('http://127.0.0.1:8787/turn')).json()).length === 0 && /openrelay|freeturn/.test(ice2) && !ice2.includes('global.relay.metered.ca');
await br.close(); done(Object.values(res).every(Boolean));
