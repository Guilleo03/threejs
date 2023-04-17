import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const textureLoader = new THREE.TextureLoader();
// const texture1 = textureLoader.load("/textures/matcap++.png");
const texture1 = textureLoader.load("/textures/matcap.png");
// const texture1 = textureLoader.load("/textures/matcap2.png");
// const texture1 = textureLoader.load("/textures/matcap3.png");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// Text
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", function (font) {
  const textGeometry = new TextGeometry("hellohello", {
    font: font,
    size: 2.5,
    height: 0.5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  const textMaterial = new THREE.MeshMatcapMaterial();
  textMaterial.matcap = texture1;
  const text = new THREE.Mesh(textGeometry, textMaterial);
  text.rotateX(-70.7);
  scene.add(text);
});

// Object
const geometry = new THREE.BoxGeometry(3, 1, 1);

// Material
const material = new THREE.MeshMatcapMaterial();
material.matcap = texture1;

// Object 1
const cube1 = new THREE.Mesh(geometry, material);

// Object 2
const cube2 = new THREE.Mesh(geometry, material);
cube2.rotateY(Math.PI / 2); // rotate 90 deg

// Group 1
const group1 = new THREE.Group();
group1.add(cube1);
group1.add(cube2);
group1.position.x = 2;

scene.add(group1);

// Group 2
const group2 = group1.clone();
group2.position.x = -2;

scene.add(group2);

// group 3
const group3 = new THREE.Group();
group3.position.x = -5;
group3.position.z = -1;
group3.position.y = 0;
group3.add(group1, group2);

scene.add(group3);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 6;
camera.position.y = 16;
camera.position.x = 0;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

// Animate
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  group3.rotation.y = 0.2 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
