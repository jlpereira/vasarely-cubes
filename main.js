import * as THREE from 'three';
import { createGroupCube } from './src/cube';
import './style.css'

let camera, scene, renderer, cube, cube2;

const cubeSize = 25
const cubeGroup = 3

init();

function init() {

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
	camera.position.y = 500;
	camera.position.z = 500;
	camera.position.x = 500;
  camera.updateProjectionMatrix()

  for (let i = 0; i < cubeGroup; i++) {
    const size = cubeGroup
    const gruopSize = cubeSize * (cubeGroup + 1)

    const cubePosition = {
      x: cubeSize * i,
      y: gruopSize * i,
      z: cubeSize * i,
    }

    const cubes = createGroupCube({
      ...cubePosition,
      size,
      cubeSize
    })

    cubes.forEach(cube => {
      scene.add(cube)
    })
  }
  
  camera.lookAt(scene.position)
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);
}
