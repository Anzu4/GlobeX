import {
  SphereGeometry,
  Color,
  Mesh,
  MeshPhongMaterial,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  ImageUtils,
  TextureLoader,
  DirectionalLight,
  AmbientLight,
  Texture,
} from '../vendor/three/build/three.module.js';

import { OrbitControls } from '../vendor/three/examples/jsm/controls/OrbitControls.js';

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create a Scene
const scene = new Scene();

// Set the background color
scene.background = new Color('#14213d');

// Create a camera
const fov = 10; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 50; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);

// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set(0, -0.2, 8);

var light = new AmbientLight(0xffffff, 1.2);
light.position.set(-0.5, 0, 0).normalize();
scene.add(light);

var light = new DirectionalLight(0xffffff, 1);
light.position.set(1, 0, 1)
scene.add(light);

// create a geometry
const geometry = new SphereGeometry(0.5, 32, 32);
const cloudGeo = new SphereGeometry(0.51, 32, 32);

const loader = new TextureLoader();
const texture = loader.load('/earthmap1k.jpg');
const bump = loader.load('/earthbump1k.jpg');
const spec = loader.load('/earthspec1k.jpg');
const clouds = new Texture();
// const cloudmap = clouds.load('/earthcloudmap.jpg')

// create a material
const material = new MeshPhongMaterial({
  //alphaMap: 1,
  map: texture,
  bumpMap: bump,
  bumpScale: 1,
  specularMap: spec,
});

// const cloudMat = new MeshPhongMaterial({
//   //map:
// })
// create a Mesh containing the geometry and material
const earthMesh = new Mesh(geometry, material);

// add the mesh to the scene
scene.add(earthMesh);

// create the renderer
const renderer = new WebGLRenderer();

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
