// Water that moves: rolling swells and fine ripples bend the surface (so the sun glints and the sky shows in it), the colour
// swims between deep and shallow in broad slow patches, the sun glints off the bent surface, the sky shows in it at a glancing look
// (fresnel), and, on a round lake, a foam fringe breathes along the shore.
// One shader on the existing water meshes: no extra draws, no extra lights. Low quality keeps only the swells.
// The clock is shared (scene.followSun sets it each frame), so every phone shows the same water.
import * as THREE from 'three';
import { quality } from './quality.js';

export const WATER = { time: { value: 0 } };

// opts: foam (0 none, 1 foam fringe at the rim of a round disc, using its uv), opacity, rush (a uniform object the caller can raise: faster, whiter)
export function waterMaterial({ opacity = .86, foam = 0, side } = {}) {
  const m = new THREE.MeshPhongMaterial({ color: 0x2b6e98, specular: 0xe2f0f8, shininess: 260, transparent: true, opacity, side }); // (F17b: deeper, with tight sun glints off the moving surface)
  const rush = { value: 0 }, detail = { value: quality.cfg.clouds ? 1 : 0 }; // (clouds on = a phone that can afford the fine ripples)
  m.userData.rush = rush;
  m.onBeforeCompile = s => {
    s.uniforms.uT = WATER.time; s.uniforms.uRush = rush; s.uniforms.uDetail = detail;
    s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vW; varying vec2 vU2;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvW = (modelMatrix * vec4(transformed, 1.)).xyz; vU2 = uv;'.replace('vU2 = uv;', foam ? 'vU2 = uv;' : 'vU2 = vec2(.5);'));
    s.fragmentShader = s.fragmentShader.replace('#include <common>', `#include <common>
      uniform float uT, uRush, uDetail; varying vec3 vW; varying vec2 vU2;
      vec2 swell(vec2 p, float t){ vec2 a = vec2(.83,.56), b = vec2(-.42,.91), c = vec2(.97,-.24); float pa = dot(p,a)*.73 + t*1.05, pb = dot(p,b)*1.17 - t*.83, pc = dot(p,c)*1.61 + t*1.31;
        return a*cos(pa) + b*.75*cos(pb) + c*.5*cos(pc); }
      vec2 ripple(vec2 p, float t){ return vec2(sin(p.x*3.3 - t*2.2 + p.y*1.9), cos(p.y*3.1 + t*1.9 - p.x*1.5)) + .6*vec2(sin(p.x*6.7 + t*3.1), cos(p.y*7.3 - t*2.7)); }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
      float sp = 1. + uRush * 1.8; vec2 wp = vW.xz;
      float tt = uT * sp;
      float body = .5 + .5 * sin(wp.x*.21 + wp.y*.13 + tt*.35) * sin(wp.y*.17 - wp.x*.07 - tt*.27);
      diffuseColor.rgb = mix(diffuseColor.rgb * vec3(.62,.74,.88), diffuseColor.rgb * vec3(1.12,1.12,1.04), body);
      ${foam ? `float rd = length(vU2 - .5) * 2.; float fr = smoothstep(.86, 1., rd + (sin(atan(vU2.y-.5, vU2.x-.5)*23. + tt*1.4) * .02 + sin(atan(vU2.y-.5, vU2.x-.5)*9. - tt*.9) * .03) * (1. + uRush));
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.93,.97,1.), clamp(fr * (.55 + .35 * sin(tt*1.7)) + uRush * smoothstep(.7, 1., rd) * .5, 0., 1.)); diffuseColor.a = min(1., diffuseColor.a + fr * .12);` : ''}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      { vec2 g = swell(wp, uT * sp) * (.11 + uRush * .05); g += ripple(wp, uT * sp) * (uDetail > .5 ? .055 + uRush * .03 : .025);
        normal = normalize(normal + (viewMatrix * vec4(g.x, 0., g.y, 0.)).xyz); }`)
      .replace('#include <opaque_fragment>', `{ float fr = pow(1. - clamp(dot(normalize(vViewPosition), normal), 0., 1.), 3.);
        outgoingLight = mix(outgoingLight * .9, vec3(.5,.68,.84), fr * .35); diffuseColor.a = mix(diffuseColor.a, 1., fr * .6); }
      #include <opaque_fragment>`);
  };
  return m;
}
