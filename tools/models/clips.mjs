// Which Mixamo files become which game clips (F8). `file` is the pack's file name without
// "sword and shield " and ".fbx". root: what to do with the hips' travel over the ground:
//   loop   take out the steady travel (the game moves the man; the clip only moves his body)
//   anchor keep him on his spot at the moment of the blow, within `reach` either side (attacks that step)
//   unyaw  take out the turn and the travel (the game turns him; the clip only steps)
//   keep   leave it (a death falls where it falls)
// trim: seconds kept either side of the blow (the fastest moment of the sword hand).
export const BONES = ['Hips', 'Spine', 'Spine1', 'Spine2', 'Neck', 'Head',
  'LeftShoulder', 'LeftArm', 'LeftForeArm', 'LeftHand', 'RightShoulder', 'RightArm', 'RightForeArm', 'RightHand',
  'LeftUpLeg', 'LeftLeg', 'LeftFoot', 'LeftToeBase', 'RightUpLeg', 'RightLeg', 'RightFoot', 'RightToeBase'];
// the bone each one points along (for lining the soldier's arms-down body up with the captain's T-pose)
export const AIM = { Spine: 'Spine1', Spine1: 'Spine2', Spine2: 'Neck', Neck: 'Head', Head: 'HeadTop_End',
  LeftShoulder: 'LeftArm', LeftArm: 'LeftForeArm', LeftForeArm: 'LeftHand', RightShoulder: 'RightArm', RightArm: 'RightForeArm', RightForeArm: 'RightHand',
  LeftUpLeg: 'LeftLeg', LeftLeg: 'LeftFoot', LeftFoot: 'LeftToeBase', LeftToeBase: 'LeftToe_End', RightUpLeg: 'RightLeg', RightLeg: 'RightFoot', RightFoot: 'RightToeBase', RightToeBase: 'RightToe_End' };
export const FPS = 30, REACH = .3;
export const CLIPS = [
  { name: 'idle', file: 'idle (4)', root: 'loop' },
  { name: 'walk', file: 'walk', root: 'loop' },
  { name: 'walkBack', file: 'walk (2)', root: 'loop' },
  { name: 'run', file: 'run', root: 'loop' },
  { name: 'runBack', file: 'run (2)', root: 'loop' },
  { name: 'strafeR', file: 'strafe', root: 'loop' },
  { name: 'strafeL', file: 'strafe (2)', root: 'loop' },
  { name: 'strafeRunL', file: 'strafe (3)', root: 'loop' },
  { name: 'strafeRunR', file: 'strafe (4)', root: 'loop' },
  { name: 'turn180', file: '180 turn', root: 'unyaw' },
  { name: 'slash1', file: 'slash', root: 'anchor', trim: [.45, .7] },
  { name: 'slash2', file: 'slash (3)', root: 'anchor', trim: [.45, .7] },
  { name: 'slash3', file: 'attack (4)', root: 'anchor', trim: [.4, .55] },
  { name: 'attack', file: 'attack (2)', root: 'anchor', trim: [.45, .7] },
  { name: 'attackBoost', file: 'attack (3)', root: 'anchor', trim: [.5, .8] },
  { name: 'block', file: 'block', root: 'loop' },
  { name: 'blockIdle', file: 'block idle', root: 'loop' },
  { name: 'blockImpact', file: 'impact', root: 'loop' },
  { name: 'impact', file: 'impact (2)', root: 'loop' },
  { name: 'impact2', file: 'impact (3)', root: 'loop' },
  { name: 'death', file: 'death', root: 'keep' },
  { name: 'death2', file: 'death (2)', root: 'keep' },
  { name: 'kick', file: 'kick', root: 'loop' },
  { name: 'crouch', file: 'crouch', root: 'loop' },
  { name: 'crouchIdle', file: 'crouch idle', root: 'loop' },
  { name: 'crouchUp', file: 'crouching', root: 'loop' },
  { name: 'sheath1', file: 'sheath sword 1', root: 'loop' },
  { name: 'sheath2', file: 'sheath sword 2', root: 'loop' },
  { name: 'powerUp', file: 'power up', root: 'loop' },
  { name: 'casting', file: 'casting', root: 'loop' },
];
