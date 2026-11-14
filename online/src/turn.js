// TURN relay credentials for the phones (V1b). The Metered.ca secret key stays here, in the worker's secrets;
// a phone asks GET /turn and gets short-lived (4 h) relay credentials, the same list shape Metered's own
// credentials URL gives. Without the secrets it answers [] and the game uses its public relays instead.
// METERED_BASE exists for the tests only (a stand-in for Metered).
const LIFE = 4 * 3600, KEEP = 3600; // credential life, and how long the phones/this data centre reuse one answer

export async function turnList(env) {
  if (!env.METERED_APP || !env.METERED_SECRET_KEY) return [];
  const base = env.METERED_BASE || `https://${env.METERED_APP}.metered.live`;
  const r = await fetch(`${base}/api/v1/turn/credential?secretKey=${encodeURIComponent(env.METERED_SECRET_KEY)}`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ expiryInSeconds: LIFE, label: 'rally' }) });
  if (!r.ok) return [];
  const c = await r.json(); if (!c || !c.username || !c.password) return [];
  const turn = urls => ({ urls, username: c.username, credential: c.password });
  return [{ urls: 'stun:stun.relay.metered.ca:80' }, turn('turn:global.relay.metered.ca:80'), turn('turn:global.relay.metered.ca:80?transport=tcp'),
    turn('turn:global.relay.metered.ca:443'), turn('turns:global.relay.metered.ca:443?transport=tcp')];
}

// one credential per hour per data centre (the Cache API), not one per phone
export async function turnResponse(req, env, ctx, cors) {
  const key = new Request(new URL(req.url).origin + '/turn'), cache = typeof caches !== 'undefined' ? caches.default : null;
  const hit = cache && await cache.match(key); if (hit) return new Response(hit.body, { headers: { ...Object.fromEntries(hit.headers), ...cors } });
  let list = []; try { list = await turnList(env); } catch (e) {}
  const res = new Response(JSON.stringify(list), { headers: { 'content-type': 'application/json', 'cache-control': list.length ? `public, max-age=${KEEP}` : 'no-store' } });
  if (cache && list.length) ctx.waitUntil(cache.put(key, res.clone()));
  return new Response(res.body, { headers: { ...Object.fromEntries(res.headers), ...cors } });
}
