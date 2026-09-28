import * as THREE from 'three';
import { quality } from './quality.js';

// Match the flat look of the first version: no color management, legacy-strength lights.
THREE.ColorManagement.enabled = false;

export const canvas = document.getElementById('gl');
export const renderer = new THREE.WebGLRenderer({ canvas, antialias: quality.cfg.antialias, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdcd6c6);
scene.fog = new THREE.Fog(0xdcd6c6, 70, 190);
export const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 400);
scene.add(new THREE.HemisphereLight(0xfff3e0, 0x6e5a44, 0.72 * Math.PI));
const sun = new THREE.DirectionalLight(0xfff0d8, 0.6 * Math.PI); sun.position.set(40, 80, 20); scene.add(sun);

export const view = { W: 0, H: 0, DPR: 1 };
export function applyPixelRatio() { renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality.cfg.pixelRatio)); }
export function resize() {
  view.W = innerWidth; view.H = innerHeight; view.DPR = Math.min(window.devicePixelRatio || 1, 2);
  applyPixelRatio();
  renderer.setSize(view.W, view.H, false);
  camera.aspect = view.W / view.H; camera.fov = view.W < view.H ? 78 : 60; camera.updateProjectionMatrix();
}
export function setSky(map) {
  scene.background.set(map.sky); scene.fog.color.set(map.sky);
  scene.fog.near = map.fog[0] * quality.cfg.fogScale; scene.fog.far = map.fog[1] * quality.cfg.fogScale;
}
