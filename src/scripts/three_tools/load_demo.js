import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export function loadDemoModel(scene, controls) {
    loadGltf(scene, controls);
    loadRoomItems(scene);
}

function loadGltf(scene, controls) {
    // const modelPath = "./demo/simple.gltf";
    const modelPath = "./demo/simple.glb";
    const loader = new GLTFLoader();
    loader.load(
        modelPath,
        (gltf)=> {LoadModel(gltf, scene, controls)},
        null,
        (e) => {console.error(e)})
}

function LoadModel(gltf, scene, controls) {
    const mesh = gltf.scene;
    const camPos = new THREE.Vector3(0,-1,-5);
    mesh.rotation.y = Math.PI/2;
    mesh.position.copy(camPos);
    controls.target.set(camPos.x, camPos.y, camPos.z);
    scene.add(mesh);
}

function loadRoomItems(scene) {
    const floor = createBox(10,1,10, "FLOOR");
    floor.position.set(0,-2,-5);
    scene.add(floor);
}

function createBox(w, h, d, name="MESH") {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshPhongMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    return mesh;
}
