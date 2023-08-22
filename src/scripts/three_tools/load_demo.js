import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export function loadDemoModel(scene) {
    loadGltf(scene);
    loadRoomItems(scene);
}

function loadGltf(scene) {
    const modelPath = "./demo/simple.gltf";
    const loader = new GLTFLoader();
    loader.load(
        modelPath,
        (gltf)=> {LoadModel(gltf, scene)},
        null,
        (e) => {console.error(e)})
}

function LoadModel(gltf, scene) {
    const mesh = gltf.scene;
    mesh.rotation.y = Math.PI/2;
    mesh.position.set(0,-1,-5);
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
