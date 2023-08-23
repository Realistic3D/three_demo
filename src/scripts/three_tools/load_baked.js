import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {ConsoleError} from "@/scripts/common_tools/console_tools";


export async function loadBaked(app, url) {
    const scene = app.scene;
    let ambientLight = undefined;
    const removeList = [...scene.children];
    for (const child of removeList) {
        if(child.type === "AmbientLight") ambientLight = child;
        else child.parent.remove(child);
    }
    if(!ambientLight) {
        ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);
    }
    loadGltf(scene, url);
}

function loadGltf(scene, url) {
    const loader = new GLTFLoader();
    loader.load(
        url,
        (gltf)=> {LoadModel(gltf, scene)},
        null,
        (e) => {ConsoleError(e)})
}

function LoadModel(gltf, scene) {
    const mesh = gltf.scene;
    // mesh.rotation.y = Math.PI/2;
    // mesh.position.set(0,-1,-5);
    scene.add(mesh);
}
