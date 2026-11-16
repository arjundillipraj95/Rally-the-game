// Terrain heights and map layouts. A layout is plain data (what stands where),
// generated from a seed so every phone in an online match builds the same map.
// Obstacles are circles {x,z,r} or boxes {box,x,z,hw,hd,rot}; `blockers` stop arrows below height h.
// The code lives in core/world/, one file per job; this file passes their names on.
export { mulberry, clamp, rnd, angDiff, turn, inPoly, distToLine } from './world/util.js';
export { W, sizeWorld, SIDES, placeCastles, gatePos } from './world/size.js';
export { FIELDS, fieldAt, PONDS, onPond, onIce, ROAD_SPEED, onRoad, groundSlow, TEMPLES, TEMPLE, DESERT, OASES, VALLEY_HILLS, ARENA, arenaGatesOpen } from './world/features.js';
export { hill, onBridge, inRiver, inFord, riverCode, deepWater, ridgeH, groundY, terrainMeshY } from './world/ground.js';
export { mountHomeA, mountY, mountK } from './world/mount.js';
export { ROUTES } from './world/terrain.js';
export { makeLayout } from './world/layout.js';
