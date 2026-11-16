// Battle rules: CAMP1 the jungle's buffs. Cutting down a buff camp's mini captain gives his killer's side (the champion
// and his whole army) the camp's buff for CROWN26.buffs.t s: the war drum (more damage) or swift (faster on the move
// and quicker abilities). Read by melee.js and missiles.js (damage), army.js (speed) and captain.js (cooldowns).
import { CROWN26 } from '../../config.js';
import { G } from '../state.js';

export const buffOn = (ti, kind) => { const t = G.teams && G.teams[ti]; return !!(t && t.buff && t.buff.kind === kind && t.buff.until > G.T); };
export const drumDmg = ti => buffOn(ti, 'drum') ? CROWN26.buffs.drum.dmg : 1;
export const swiftSpd = ti => buffOn(ti, 'swift') ? CROWN26.buffs.swift.spd : 1;
export const swiftCd = ti => buffOn(ti, 'swift') ? CROWN26.buffs.swift.cd : 1;
export function giveBuff(ti, kind) { const t = G.teams && G.teams[ti]; if (t) t.buff = { kind, until: G.T + CROWN26.buffs.t }; }
