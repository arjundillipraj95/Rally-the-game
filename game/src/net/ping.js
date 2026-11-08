// Ping readout (P0.3). Every PING.every ms a joiner sends the host a tiny ping stamped with its own clock;
// the host answers at once with the same stamp; the joiner's clock now, minus the stamp, is one reading.
// No clocks are compared between phones. The shown ping is the median of the last PING.keep readings.
import { PING } from '../config.js';

const st = NET => NET.ping || (NET.ping = { reads: [], at: 0 });

// the joiner's side, every frame: send a ping when one is due
export function pingTick(NET, now) {
  const s = st(NET); if (now - s.at < PING.every) return;
  s.at = now; NET.room.ping(now);
}

// the joiner's side: the host's answer to a ping (n is the stamp we sent)
export function pingPong(NET, n) {
  if (typeof n !== 'number') return;
  const s = st(NET); s.reads.push(performance.now() - n);
  if (s.reads.length > PING.keep) s.reads.shift();
}

// the median of the readings, in whole ms (null until the first reading)
export function pingMedian(NET) {
  const r = NET && NET.ping ? NET.ping.reads : [];
  if (!r.length) return null;
  const a = [...r].sort((x, y) => x - y), m = a.length >> 1;
  return Math.round(a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2);
}
