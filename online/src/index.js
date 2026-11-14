// Rally online: accounts, friends, presence, parties, matchmaking and a relay, on Cloudflare.
// One Durable Object (the Hub) holds everyone's live connection and coordinates. Battles themselves stay
// phone-to-phone (one phone hosts); the Hub only brings players together and, when two phones can't
// reach each other directly, carries their messages.
//
// Protocol: a WebSocket to /ws; JSON messages {t: type, ...}. See the handlers below.

import { initStats, noteSeen, noteQuit as statQuit, noteMatch, notePerf, prune, adminData, isAdmin } from './stats.js';
import { adminPage } from './admin.js';
import { turnResponse } from './turn.js';

const FMT_CAP = [1, 2, 3]; // captains per side: Solo, Duo, Trio
const LOBBY_WAIT = 60e3, LATE_JOIN = 60e3, QUEUE_JOIN = 110e3, PARTY_MAX = 3; // (searchers drop into a battle in its first 110 s: the game takes late captains for 120) // (a friend can join a running battle in its first minute)
const CODE = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const rid = (n, set = CODE) => { const b = new Uint8Array(n); crypto.getRandomValues(b); return [...b].map(x => set[x % set.length]).join(''); };
const cleanNick = s => String(s || '').replace(/[^\p{L}\p{N} _.-]/gu, '').trim().slice(0, 16) || 'Captain';

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type' };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (url.pathname === '/health') return new Response(JSON.stringify({ ok: true, at: Date.now() }), { headers: { ...cors, 'content-type': 'application/json' } });
    if (url.pathname === '/turn') return turnResponse(req, env, ctx, cors); // (relay credentials for voice and the game link, V1b)
    if (url.pathname === '/ws') { const hub = env.HUB.get(env.HUB.idFromName('hub')); return hub.fetch(req); }
    if (url.pathname === '/admin' || url.pathname === '/admin/data') { // (the admin page and its numbers: only with the key)
      if (!(await isAdmin(url.searchParams.get('key')))) return new Response('Not found', { status: 404 });
      if (url.pathname === '/admin') return new Response(adminPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
      const hub = env.HUB.get(env.HUB.idFromName('hub')); return hub.fetch(req);
    }
    return new Response('Rally online', { headers: cors });
  },
};

export class Hub {
  constructor(state, env) {
    this.state = state; this.env = env;
    this.live = new Map();    // account id -> session {ws, id, nick, look, party, where, room, queued}
    this.parties = new Map(); // party id -> {id, leader, members: [ids]}
    this.rooms = new Map();   // room id -> {id, fmt, sides: [[ids]], created, started, host, code, startedAt}
    this.timer = null;
    this.quits = new Map(); // account -> when they left battles early (the last hour)
    this.topics = new Map(); // relay topic -> sessions listening (the game's fallback link, see m_sub)
    this.sql = state.storage.sql; initStats(this.sql); // (the numbers for the admin page: see stats.js)
  }
  async fetch(req) {
    const u = new URL(req.url);
    if (u.pathname === '/admin/data') { prune(this.sql); return new Response(JSON.stringify(await adminData(this.sql, this)), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } }); } // (the worker checked the key)
    if (req.headers.get('Upgrade') !== 'websocket') return new Response('expected a websocket', { status: 426 });
    const [client, server] = Object.values(new WebSocketPair());
    server.accept();
    const s = { ws: server, id: null };
    server.addEventListener('message', ev => { let m; try { m = JSON.parse(ev.data); } catch (e) { return; } this.onMsg(s, m).catch(err => this.send(s, { t: 'error', msg: String(err && err.message || err) })); });
    server.addEventListener('close', () => this.onClose(s));
    server.addEventListener('error', () => this.onClose(s));
    return new Response(null, { status: 101, webSocket: client });
  }
  send(s, m) { try { s && s.ws && s.ws.send(JSON.stringify(m)); } catch (e) {} }
  to(id, m) { this.send(this.live.get(id), m); }
  async acct(id) { return id ? await this.state.storage.get('a:' + id) : null; }
  async save(id, a) { await this.state.storage.put('a:' + id, a); }

  // ---------- who you are ----------
  async onMsg(s, m) {
    // the relay: a tiny publish/subscribe for phones that can't link up directly (no account needed;
    // the topics are named after a battle's code)
    if (m.t === 'sub') { const t = String(m.topic || '').slice(0, 80); if (!t) return; (s.topics || (s.topics = new Set())).add(t); let set = this.topics.get(t); if (!set) this.topics.set(t, set = new Set()); set.add(s); return; }
    if (m.t === 'pub') { const set = this.topics.get(String(m.topic || '')); if (!set) return; const d = typeof m.d === 'string' ? m.d.slice(0, 64000) : ''; for (const x of set) if (x !== s) this.send(x, { t: 'msg', topic: m.topic, d }); return; }
    if (m.t === 'hello') return this.hello(s, m);
    if (!s.id) return this.send(s, { t: 'error', msg: 'say hello first' });
    const h = this['m_' + m.t]; if (h) return h.call(this, s, m);
  }
  async hello(s, m) {
    let a = await this.acct(m.id), id = m.id; let fresh = false;
    if (!a || a.key !== m.key) { // a new guest: a short code friends can type, and a secret key kept on the phone
      do { id = rid(6); } while (await this.acct(id));
      a = { key: rid(24, 'abcdefghijklmnopqrstuvwxyz0123456789'), nick: cleanNick(m.nick), friends: [], reqIn: [], crowns: [0, 0, 0], created: Date.now() }; fresh = true;
      await this.save(id, a);
    }
    if (m.nick) a.nick = cleanNick(m.nick);
    await this.save(id, a);
    const old = this.live.get(id); if (old && old !== s) { this.send(old, { t: 'kicked', msg: 'Signed in somewhere else' }); try { old.ws.close(); } catch (e) {} }
    Object.assign(s, { id, nick: a.nick, look: String(m.look || '').slice(0, 12), where: 'home', party: null, room: null, queued: null });
    this.live.set(id, s);
    try { noteSeen(this.sql, id, fresh); } catch (e) {}
    this.send(s, { t: 'me', id, key: a.key, nick: a.nick, crowns: a.crowns });
    await this.sendFriends(s); this.notifyFriends(id);
  }
  async m_nick(s, m) { const a = await this.acct(s.id); a.nick = s.nick = cleanNick(m.nick); await this.save(s.id, a); this.notifyFriends(s.id); this.partyUpdate(s.party); }
  async m_voice(s, m) { s.vp = String(m.vp || '').replace(/[^\w-]/g, '').slice(0, 64); this.partyUpdate(s.party); } // (party voice, V2: this phone's voice link id, shared with its party)
  async m_look(s, m) { s.look = String(m.look || '').slice(0, 12); this.partyUpdate(s.party); }
  async m_crowns(s, m) { const a = await this.acct(s.id); if (Array.isArray(m.crowns)) a.crowns = m.crowns.slice(0, 3).map(n => Math.max(0, Math.min(99999, n | 0))); await this.save(s.id, a); }

  // ---------- friends ----------
  status(id) {
    const s = this.live.get(id); if (!s) return { online: false };
    const room = s.room && this.rooms.get(s.room);
    return { online: true, where: s.where, party: s.party ? (this.parties.get(s.party) || { members: [] }).members.length : 0, fmt: room ? room.fmt : s.queued ? s.queued.fmt : null, since: room && room.startedAt ? Date.now() - room.startedAt : 0 };
  }
  async sendFriends(s) {
    const a = await this.acct(s.id); if (!a) return;
    const list = [];
    for (const f of a.friends) { const fa = await this.acct(f); if (fa) list.push({ id: f, nick: fa.nick, ...this.status(f) }); }
    const reqs = []; for (const f of a.reqIn) { const fa = await this.acct(f); if (fa) reqs.push({ id: f, nick: fa.nick }); }
    this.send(s, { t: 'friends', list, reqs });
  }
  async notifyFriends(id) { const a = await this.acct(id); if (!a) return; for (const f of a.friends) { const fs = this.live.get(f); if (fs) await this.sendFriends(fs); } }
  async m_friendAdd(s, m) {
    const code = String(m.code || '').toUpperCase().replace(/[^A-Z0-9]/g, ''), them = await this.acct(code);
    if (!them || code === s.id) return this.send(s, { t: 'note', msg: code === s.id ? "That's your own code" : 'No captain with that code' });
    const me = await this.acct(s.id);
    if (me.friends.includes(code)) return this.send(s, { t: 'note', msg: 'Already friends' });
    if (me.reqIn.includes(code)) return this.m_friendAccept(s, { id: code }); // (they asked you first: that's a yes)
    if (!them.reqIn.includes(s.id)) { them.reqIn.push(s.id); them.reqIn = them.reqIn.slice(-30); await this.save(code, them); }
    this.send(s, { t: 'note', msg: `Request sent to ${them.nick}` });
    const ts = this.live.get(code); if (ts) await this.sendFriends(ts);
  }
  async m_friendAccept(s, m) {
    const me = await this.acct(s.id), them = await this.acct(m.id); if (!them) return;
    me.reqIn = me.reqIn.filter(x => x !== m.id); if (!me.friends.includes(m.id)) me.friends.push(m.id); if (!them.friends.includes(s.id)) them.friends.push(s.id);
    them.reqIn = them.reqIn.filter(x => x !== s.id);
    await this.save(s.id, me); await this.save(m.id, them);
    await this.sendFriends(s); const ts = this.live.get(m.id); if (ts) await this.sendFriends(ts);
  }
  async m_friendDecline(s, m) { const me = await this.acct(s.id); me.reqIn = me.reqIn.filter(x => x !== m.id); await this.save(s.id, me); await this.sendFriends(s); }
  async m_friendRemove(s, m) {
    const me = await this.acct(s.id), them = await this.acct(m.id);
    me.friends = me.friends.filter(x => x !== m.id); await this.save(s.id, me);
    if (them) { them.friends = them.friends.filter(x => x !== s.id); await this.save(m.id, them); const ts = this.live.get(m.id); if (ts) await this.sendFriends(ts); }
    await this.sendFriends(s);
  }

  // ---------- parties ----------
  partyOf(s) { return s.party ? this.parties.get(s.party) : null; }
  partyUpdate(pid) {
    const p = pid && this.parties.get(pid); if (!p) return;
    const members = p.members.map(id => { const x = this.live.get(id); return { id, nick: x ? x.nick : '?', look: x ? x.look : '', leader: id === p.leader, vp: (x && x.vp) || '' }; });
    for (const id of p.members) this.to(id, { t: 'party', id: p.id, leader: p.leader, members });
  }
  async m_invite(s, m) {
    const me = await this.acct(s.id); if (!me.friends.includes(m.id)) return this.send(s, { t: 'note', msg: 'You can only invite friends' });
    const ts = this.live.get(m.id); if (!ts) return this.send(s, { t: 'note', msg: 'They are not online' });
    const p = this.partyOf(s); if (p && p.members.length >= PARTY_MAX) return this.send(s, { t: 'note', msg: 'Your party is full' });
    this.send(ts, { t: 'invite', from: s.id, nick: s.nick });
    this.send(s, { t: 'note', msg: `Invite sent to ${ts.nick}` });
  }
  leaveParty(s) {
    const p = this.partyOf(s); if (!p) return;
    p.members = p.members.filter(x => x !== s.id); s.party = null;
    if (!p.members.length) this.parties.delete(p.id);
    else { if (p.leader === s.id) p.leader = p.members[0]; this.partyUpdate(p.id); }
    this.send(s, { t: 'party', id: null, members: [] });
  }
  async m_partyLeave(s) { this.cancelQueue(s); this.leaveParty(s); }
  joinPartyOf(s, host) {
    if (s.party && host.party === s.party) return true;
    let p = this.partyOf(host);
    if (!p) { p = { id: rid(8), leader: host.id, members: [host.id] }; this.parties.set(p.id, p); host.party = p.id; }
    if (p.members.length >= PARTY_MAX) { this.send(s, { t: 'note', msg: 'Their party is full' }); return false; }
    this.cancelQueue(s); this.leaveParty(s);
    p.members.push(s.id); s.party = p.id; this.cancelQueue(host); // (a new member: the party's search starts over)
    this.partyUpdate(p.id); return true;
  }
  // join a friend wherever they are: their party; their lobby (on their side if there's a seat, else
  // against them); their battle in its first minutes (against them); otherwise their next battle
  async m_join(s, m) {
    const me = await this.acct(s.id); if (!me.friends.includes(m.id)) return this.send(s, { t: 'note', msg: 'You can only join friends' });
    const f = this.live.get(m.id); if (!f) return this.send(s, { t: 'note', msg: 'They are not online' });
    const room = f.room && this.rooms.get(f.room);
    if (room && !room.started) { this.cancelQueue(s); this.leaveParty(s); this.seat(room, [s.id], f.id); return this.lobbyUpdate(room); }
    if (room && room.started && Date.now() - room.startedAt < LATE_JOIN && this.seat(room, [s.id], null, true)) {
      this.cancelQueue(s); this.leaveParty(s); s.room = room.id; s.where = 'battle';
      this.send(s, { t: 'start', room: room.id, fmt: room.fmt, host: room.host, code: room.code, seats: room.seats, late: true });
      this.to(room.host, { t: 'lateJoin', id: s.id, nick: s.nick, ti: room.seats[s.id] });
      return;
    }
    if (room && room.started) { this.joinPartyOf(s, f); return this.send(s, { t: 'note', msg: `${f.nick} is mid-battle: you'll be in their party for the next one` }); }
    this.joinPartyOf(s, f);
  }
  async m_accept(s, m) { const host = this.live.get(m.from); if (!host) return this.send(s, { t: 'note', msg: 'That invite has gone' }); return this.m_join(s, { id: m.from }); }

  // ---------- matchmaking ----------
  cancelQueue(s) {
    const room = s.room && this.rooms.get(s.room);
    if (room && !room.started) { for (const side of room.sides) { const i = side.indexOf(s.id); if (i >= 0) side.splice(i, 1); } s.room = null; s.where = s.party ? 'party' : 'home'; this.lobbyUpdate(room); if (!room.sides.some(x => x.length)) this.rooms.delete(room.id); }
    s.queued = null;
  }
  async m_cancel(s) { const p = this.partyOf(s); for (const id of p ? p.members : [s.id]) { const x = this.live.get(id); if (x) { this.cancelQueue(x); this.send(x, { t: 'lobby', room: null }); } } }
  // a party asks for a battle in a format: into an open lobby of that format, or a new one
  async m_queue(s, m) {
    const fmt = Math.max(0, Math.min(2, m.fmt | 0)), p = this.partyOf(s);
    if (p && p.leader !== s.id) return this.send(s, { t: 'note', msg: 'Your party leader starts the search' });
    const ids = p ? p.members.slice() : [s.id];
    if (ids.length > FMT_CAP[fmt]) return this.send(s, { t: 'note', msg: `Your party is too big for ${['Solo', 'Duo', 'Trio'][fmt]}` });
    for (const id of ids) { const w = this.quitWait(id); if (w > 0) return this.send(s, { t: 'note', msg: `${id === s.id ? 'You' : 'Someone in your party'} left battles early: searching again in ${Math.ceil(w / 1000)}s` }); }
    for (const id of ids) { const x = this.live.get(id); if (x) this.cancelQueue(x); }
    // One lobby per format: everyone searching joins the open one (4, 8 or 12 captain seats for Solo, Duo,
    // Trio) and sees who's in it. It starts when every seat is full or after the wait, the computer
    // playing the empty seats. A battle still in its first minutes also takes a late party in.
    const now = Date.now();
    let room = [...this.rooms.values()].find(r => !r.started && r.fmt === fmt && this.fits(r, ids.length));
    if (room) { this.seat(room, ids); this.lobbyUpdate(room); this.arm(); return; }
    const open = [...this.rooms.values()].filter(r => r.started && r.fmt === fmt && now - r.startedAt < QUEUE_JOIN && this.live.has(r.host) && this.fits(r, ids.length))
      .sort((a, b) => b.sides.flat().length - a.sides.flat().length);
    if (open[0] && this.seat(open[0], ids, null, true)) {
      const room2 = open[0], nicks = Object.fromEntries(Object.keys(room2.seats).filter(i => this.live.has(i)).map(i => [i, this.live.get(i).nick]));
      for (const id of ids) { const x = this.live.get(id); if (!x) continue; this.send(x, { t: 'start', room: room2.id, fmt: room2.fmt, host: room2.host, code: room2.code, seats: room2.seats, nicks, late: true }); this.to(room2.host, { t: 'lateJoin', id, nick: x.nick, ti: room2.seats[id] }); this.notifyFriends(id); }
      return;
    }
    room = { id: rid(8), fmt, sides: [[], [], [], []], created: now, started: false }; this.rooms.set(room.id, room);
    this.seat(room, ids); this.lobbyUpdate(room); this.arm();
  }
  fits(room, n) { const cap = FMT_CAP[room.fmt]; return room.sides.some(sd => cap - sd.length >= n); }
  // Seats: a whole party stays on one side. Fill sides that already have players first (teaming with
  // real people), but a full party takes an empty side, so real teams face each other.
  seat(room, ids, nearId = null, late = false) {
    const cap = FMT_CAP[room.fmt], n = ids.length;
    let side = -1;
    if (nearId != null) { const fs = room.sides.findIndex(sd => sd.includes(nearId)); if (fs >= 0 && cap - room.sides[fs].length >= n) side = fs; }
    if (side < 0) {
      const opts = room.sides.map((sd, i) => [i, sd.length]).filter(([, l]) => cap - l >= n);
      if (!opts.length) return false;
      if (n === cap) side = (opts.find(([, l]) => l === 0) || opts[0])[0];
      else side = opts.sort((a, b) => b[1] - a[1])[0][0];
    }
    room.sides[side].push(...ids);
    for (const id of ids) { const x = this.live.get(id); if (x) { x.room = room.id; x.where = late ? 'battle' : 'lobby'; x.queued = { fmt: room.fmt }; } }
    if (room.seats) for (const id of ids) room.seats[id] = side + 4 * room.sides[side].indexOf(id); // (late: the next free army of that colour)
    return true;
  }
  lobbyUpdate(room) {
    const sides = room.sides.map(sd => sd.map(id => { const x = this.live.get(id); return { id, nick: x ? x.nick : '?', look: x ? x.look : '' }; }));
    const endsIn = Math.max(0, room.created + LOBBY_WAIT - Date.now());
    for (const sd of room.sides) for (const id of sd) this.to(id, { t: 'lobby', room: room.id, fmt: room.fmt, sides, endsIn, me: id });
  }
  arm() { if (!this.timer) this.timer = setInterval(() => this.tick(), 1000); }
  tick() {
    const now = Date.now(); let any = false;
    for (const room of this.rooms.values()) {
      if (room.started) { if (now - room.startedAt > 20 * 60e3) this.rooms.delete(room.id); continue; }
      any = true;
      const cap = FMT_CAP[room.fmt], full = room.sides.every(sd => sd.length >= cap), humans = room.sides.flat().length;
      if (!humans) { this.rooms.delete(room.id); continue; }
      if (full || now - room.created >= LOBBY_WAIT) this.start(room);
      else if ((now - room.created) % 10e3 < 1000) this.lobbyUpdate(room);
    }
    if (!any && this.timer) { clearInterval(this.timer); this.timer = null; }
  }
  start(room) {
    room.started = true; room.startedAt = Date.now();
    const all = room.sides.flat().filter(id => this.live.has(id));
    room.host = all[0]; room.code = 'M' + rid(7); // (a battle code for the phones' own link-up)
    room.seats = {}; room.sides.forEach((sd, c) => sd.forEach((id, k) => { room.seats[id] = c + 4 * k; }));
    for (const id of all) { const x = this.live.get(id); x.where = 'battle'; this.send(x, { t: 'start', room: room.id, fmt: room.fmt, host: room.host, code: room.code, seats: room.seats, nicks: Object.fromEntries(all.map(i => [i, this.live.get(i).nick])) }); }
    for (const id of all) this.notifyFriends(id);
  }
  // leaving a battle before it ends: once is life; again within the hour means a short wait (a minute
  // for the second, two for the third...) before the next search
  quitWait(id) {
    const now = Date.now(), q = (this.quits.get(id) || []).filter(t => now - t < 3600e3); this.quits.set(id, q);
    return q.length < 2 ? 0 : q[q.length - 1] + (q.length - 1) * 60e3 - now;
  }
  noteQuit(s) { const room = s.room && this.rooms.get(s.room); if (!room || !room.started) return; const q = this.quits.get(s.id) || []; q.push(Date.now()); this.quits.set(s.id, q); try { statQuit(this.sql, s.id); } catch (e) {} }
  async m_quit(s) { this.noteQuit(s); return this.m_battleOver(s); }
  // the numbers: a battle's summary from the phone that ran it, and every phone's health
  async m_report(s, m) { try { noteMatch(this.sql, s.id, m); prune(this.sql); } catch (e) {} }
  async m_perf(s, m) { try { notePerf(this.sql, s.id, m); } catch (e) {} }
  async m_battleOver(s) { s.room = null; s.queued = null; s.where = s.party ? 'party' : 'home'; this.notifyFriends(s.id); this.partyUpdate(s.party); }
  // host handover: the host leaves mid-battle, the next player takes over (their phone rebuilds the battle from its last snapshot)
  handover(room, goneId) {
    const rest = Object.keys(room.seats).filter(id => id !== goneId && this.live.has(id) && this.live.get(id).room === room.id);
    if (!rest.length) { this.rooms.delete(room.id); return; }
    room.host = rest[0]; room.code = 'M' + rid(7);
    for (const id of rest) this.to(id, { t: 'newHost', room: room.id, host: room.host, code: room.code, gone: goneId });
  }

  // ---------- the relay: game messages between two players of the same battle ----------
  m_relay(s, m) {
    const room = s.room && this.rooms.get(s.room), x = this.live.get(m.to);
    if (!room || !x || x.room !== room.id) return;
    this.send(x, { t: 'relay', from: s.id, d: m.d });
  }

  onClose(s) {
    if (s.topics) for (const t of s.topics) { const set = this.topics.get(t); if (set) { set.delete(s); if (!set.size) this.topics.delete(t); } }
    if (!s.id || this.live.get(s.id) !== s) return;
    const room = s.room && this.rooms.get(s.room);
    if (room && room.started && room.host === s.id) this.handover(room, s.id);
    if (s.where === 'battle') this.noteQuit(s);
    this.cancelQueue(s); this.leaveParty(s);
    this.live.delete(s.id); this.notifyFriends(s.id);
  }
}
