// Who we are online. NET is null in a solo game; otherwise {role:'host'|'client', room, name, seats, ...}.
export const session = { NET: null, myNick: '' };
try { session.myNick = localStorage.getItem('fb-nick') || ''; } catch (e) {}
export const isClient = () => !!(session.NET && session.NET.role === 'client');
export const isHost = () => !!(session.NET && session.NET.role === 'host');

import { lookFrom, lookOfFaction, lookCode } from '../core/look.js';
// The player's own army: the captain's wardrobe (look) and color (team), remembered on this device.
const read = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch (e) { return d; } };
export const prefs = {
  look: lookFrom(read('rally-look', '')) || lookOfFaction(read('rally-faction', 'roman')), // (an old faction pick becomes a matching outfit)
  color: +read('rally-color', '0') || 0,
  time: [5, 10, 15].includes(+read('rally-time', '10')) ? +read('rally-time', '10') : 10,
  tgt: (() => { try { return JSON.parse(read('rally-targets', '{}')) || {}; } catch (e) { return {}; } })(), // (each mode's last target)
  save() { try { localStorage.setItem('rally-look', lookCode(this.look)); localStorage.setItem('rally-color', String(this.color)); localStorage.setItem('rally-time', String(this.time)); localStorage.setItem('rally-targets', JSON.stringify(this.tgt)); } catch (e) {} },
};
