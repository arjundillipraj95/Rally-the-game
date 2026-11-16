// Battle rules: shared announcements and effects (presentation listens through bus).
import { bus } from '../state.js';

// ---------- announcements & effects (presentation listens) ----------
export const say = (k, ...a) => bus.emit('msg', { k, a });
export const fx = (type, d) => bus.emit(type, d);
export const spark = (x, y, z, c, n) => fx('spark', { x, y, z, c, n });
export const sound = (name, x, z) => fx('sfx', { name, x, z });
