// Battle rules: units, combat, horses, the banner, AI and win conditions.
// Engine-agnostic: talks to the outside world only through G (state) and bus (events).
// The rules live in core/sim/, one file per job (SPLIT); this file passes on the names the rest of the game uses.
export { say } from './sim/util.js';
export { newTeams, mkUnit, startMarch, marchStep, chasmFallY, hl, squadOf, armyPlaces, placeOf, homeAt, c2HomePt, adoptBattle, startMatch } from './sim/match.js';
export { setOrder, routing, gainRally, rallyCry, canRecruit, recruit, horseMax, horseCooldown, auraRange, auraBonus, footTier, archTier, upgradeCost, buyUpgrade, orderOf, canRespawn, bowRange, speedOf, mountMul, dismount, braced, toggleHorseFor } from './sim/army.js';
export { nearestFoe, nearestEnemyCastle, winded, duelFoeOf, sideToward } from './sim/melee.js';
export { duelOffer, canChallenge, duelTarget, duelAct, challenge, duelBounds, execMark, execTarget } from './sim/duel.js';
export { strikeAt, rideLock, rideQuality, rideRelease, blockPress, attackHold, attackRelease } from './sim/guard.js';
export { makeArrow, orderVolley, volleyCharge, arrowsTick } from './sim/missiles.js';
export { die, teamOut, armiesOfColor, colorScore, colorOut, colorHuman, placesOf, teamScore, allianceCaps, allianceCtrl, checkEnd, endMatch, makeCtrlPoints } from './sim/score.js';
export { initForts, fortLvl, applyFort, freshGates, fortifyGates, gatePct, layerHp, plateHp, villageHere, castleHere, applyCastleGates, applyPlazaWall, plazaGateFor } from './sim/forts.js';
export { makeHolds } from './sim/holds.js';
export { c2Points, c2Breakdown, c2Begin, c2Garrison, c2BreakInReach, c2Lake, c2GateA, c2Water } from './sim/crown2.js';
export { c2Spot, c2ManId, c2Man } from './sim/neutral.js';
export { softAim, javMax, airborne, aimRange, captainCharge, chargeTimers, captainJump, stepJump, evadeKind, captainEvade, switchWeapon, javTarget, captainAttack, wallPush, captainBash } from './sim/captain.js';
export { moveToward, integrate, endStep, fallStep } from './sim/move.js';
export { HOLD_W, holdPos } from './sim/soldier.js';
export { driveCaptain, regenJavs, update } from './sim/step.js';
