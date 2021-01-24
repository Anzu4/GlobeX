import {
  SphereGeometry,
  Color,
  Mesh,
  MeshPhongMaterial,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  TextureLoader,
  DirectionalLight,
  AmbientLight,
  FrontSide,
  BackSide,
} from '../vendor/three/build/three.module.js';

import { OrbitControls } from '../vendor/three/examples/jsm/controls/OrbitControls.js';


// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create the renderer
const renderer = new WebGLRenderer();

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// create a Scene
const scene = new Scene();

// Set the background color
scene.background = new Color('#14213d');

// Create a camera
const fov = 11; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 600; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);

//controls
const controls = new OrbitControls(camera, renderer.domElement);

// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set(0, -0.2, 8);
controls.update()

var light = new AmbientLight(0xffffff, 0.4);
light.position.set(-0.5, 0, 0).normalize();
scene.add(light);

var light = new DirectionalLight(0xffffff, 1.5);
light.position.set(1, 0, 1);
scene.add(light);

// create a geometry
const geometry = new SphereGeometry(0.5, 32, 32);
const cloudGeo = new SphereGeometry(0.52, 32, 32);
const moonOrbitGeo = new SphereGeometry(60, 40, 40);
const moonGeo = new SphereGeometry(0.1, 20, 20);
const spaceGeo = new SphereGeometry(400, 200, 200);

// image files as textures
const loader = new TextureLoader();
const texture = loader.load('/earthmap1k.jpg');
const nightEarth = loader.load('/earthnight.png');
const bump = loader.load('/earthbump1k.jpg');
const spec = loader.load('/earthspec1k.jpg');
const clouds = loader.load('/earthcloudmap.jpg');
const cloudsMerged = loader.load('/cloudsmapmerged.jpg');
const cloudsBump = loader.load('/earthcloudmaptrans.jpg');
const moonMap = loader.load('/moonmap1k.jpg');
const moonBump = loader.load('/moonbump1k.jpg');

// create a material
const material = new MeshPhongMaterial({
  map: texture,
  bumpMap: bump,
  bumpScale: 3,
  specularMap: spec,
  opacity: 1,
});

const nightMat = new MeshPhongMaterial({
  map: nightEarth,
  bumpMap: bump,
  bumpScale: 3,
  specularMap: spec,
  opacity: -2,
});

const cloudMat = new MeshPhongMaterial({
  map: clouds,
  specularMap: cloudsBump,
  bumpMap: cloudsBump,
  bumpScale: 0.01,
  side: FrontSide,
  transparent: true,
  opacity: 0.3,
  depthWrite: false,
});

const orbitMat = new MeshBasicMaterial({
  transparent: true,
});

const moonMat = new MeshPhongMaterial({
  map: moonMap,
  bumpMap: moonBump,
  bumpScale: 0.2,
});

const spaceMat = new MeshBasicMaterial({
  //map: spaceMap,
  color: 'black',
  side: BackSide,
});

// create a Mesh containing the geometry and material
const earthMesh = new Mesh(geometry, material);
const nightEarthMesh = new Mesh(geometry, nightMat);
const cloudMesh = new Mesh(cloudGeo, cloudMat);
const orbitMesh = new Mesh(moonOrbitGeo, orbitMat);
const moonMesh = new Mesh(moonGeo, moonMat);
const spaceMesh = new Mesh(spaceGeo, spaceMat);

// add the mesh to the scene
earthMesh.add(cloudMesh);
orbitMesh.add(moonMesh);
scene.add(earthMesh, orbitMesh, spaceMesh);
//scene.add(nightEarthMesh)
moonMesh.position.x = 0.75;

//TweenMax.to(nightMat, 1, { opacity: 1 });





// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  earthMesh.rotation.y += 0.002;
  nightEarthMesh.rotation.y += 0.002;
  cloudMesh.rotation.y += 0.0025;
  orbitMesh.rotation.y += 0.0054;
  moonMesh.rotation.y += 0.004;
  renderer.render(scene, camera);
}
animate();
