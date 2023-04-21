import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { RectAreaLightHelper } from 'RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';

function init() {
  let container = document.querySelector('.lambo');

  //Scene
  const scene = new THREE.Scene();

  //Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.z = 1000;

  //render
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(1408, 792);
  container.appendChild(renderer.domElement);
  renderer.domElement.addEventListener('mousedown', (event) => {
    if (event.button === 2) {
      event.preventDefault();
    }
  });
  // let plain;
  // {
  //     plain = new THREE.Mesh(
  //         new THREE.PlaneGeometry(1000, 1000),
  //         new THREE.MeshBasicMaterial({ color: "#000" })
  //     )
  //     plain.reciveShadow = true;
  //     plain.position.set(0, -1, 0)
  //     plain.rotateX(-Math.PI / 1);
  //     scene.add(plain)
  // }

  // Model
  {
    const loader = new GLTFLoader();
    loader.load(
      './model/scene.gltf',
      (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.rotation.set(Math.PI / 9, 0, 0);
      }
      // function (error) {
      //   console.log('Error: ' + error);
      // }
    );
  }

  {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    light.lookAt(0, -1, 0);
    scene.add(light);

    // Helper
    // const helper = new THREE.DirectionalLightHelper(light, 300)
    // scene.add(helper)
  }

  {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-10, -10, 5);
    light.lookAt(0, 1, 0);
    scene.add(light);

    // Helper
    // const helper = new THREE.DirectionalLightHelper(light, 300)
    // scene.add(helper)
  }

  RectAreaLightUniformsLib.init();
  {
    const rectLight = new THREE.RectAreaLight(0xffffff, 1, 100, 100);
    rectLight.position.set(-10, 0, 0);
    rectLight.rotation.y = Math.PI + Math.PI / 4;
    scene.add(rectLight);
  }

  {
    const rectLight = new THREE.RectAreaLight(0xffffff, 1, 100, 100);
    rectLight.position.set(10, 0, 0);
    rectLight.rotation.y = Math.PI - Math.PI / 4;
    scene.add(rectLight);
  }

  //OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;
  controls.screenSpacePanning = false;
  controls.minDistance = 700;
  controls.maxDistance = 700;
  controls.dampingFactor = 0.1;
  controls.enableDamping = true;
  controls.enablePan = false; // Запретить перемещение
  controls.enableZoom = false; // Запретить масштабирование

  //Resize
  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

init();
