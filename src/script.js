import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

const textureLoader = new THREE.TextureLoader();

const texture1 = textureLoader.load("/textures/matcap.png");
const texture2 = textureLoader.load("/textures/matcap2.png");
const texture3 = textureLoader.load("/textures/matcap3.jpeg");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes
const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// Object
const geometry = new THREE.BoxGeometry(3, 1, 1);

// Material
// const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = texture3;

const material = new THREE.MeshLambertMaterial();

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

// Lights ambient
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Lights - red
const pointRedLight = new THREE.PointLight(0xf00a3b, 0.9);
pointRedLight.position.x = 6;
pointRedLight.position.y = 0;
pointRedLight.position.z = 0;

const pointRedLight2 = new THREE.PointLight(0xf00a3b, 0.9);
pointRedLight.position.x = 0;
pointRedLight.position.y = 0;
pointRedLight.position.z = -6;

scene.add(pointRedLight, pointRedLight2);

// Lights - blue
const pointBlueLight = new THREE.PointLight(0x00ffd0, 0.9);
pointBlueLight.position.x = 0;
pointBlueLight.position.y = 0;
pointBlueLight.position.z = 6;

const pointBlueLight2 = new THREE.PointLight(0x00ffd0, 0.9);
pointBlueLight2.position.x = -6;
pointBlueLight2.position.y = 0;
pointBlueLight2.position.z = 0;

scene.add(pointBlueLight, pointBlueLight2);

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
camera.position.z = 4;
camera.position.y = 6;
camera.position.x = 2;
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
  group1.rotation.y = 0.2 * elapsedTime;
  group2.rotation.y = 0.2 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// Toggle background color
let darkBg = true;

document.querySelector(".toggle-bg").addEventListener("click", () => {
  if (darkBg) {
    darkBg = false;
    renderer.setClearColor(0xffffff);
    material.color.setHex(0x000000);
  } else {
    darkBg = true;
    renderer.setClearColor(0x000000);
    material.color.setHex(0xffffff);
  }
});
