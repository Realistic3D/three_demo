import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


export function getThreeScene(canvas) {
    const params = {
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
        alpha: true,
        antialias: true
    }
    const near = 0.01;
    const far = 10000;
    if(canvas) params.canvas = canvas;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, near, far);
    const renderer = new THREE.WebGLRenderer(params);
    // const ambientLight = new THREE.AmbientLight(0xffffff);
    const ambientLight = undefined;
    const controls = new OrbitControls(camera, renderer.domElement);

    setScene(scene, renderer, ambientLight);
    onWindowResize(scene, renderer, camera);

    window.addEventListener('resize', () => {onWindowResize(scene, renderer, camera)}, false);

    renderLoop(scene, renderer, camera, controls);

    return {scene, camera};
}

function renderLoop(scene, renderer, camera, controls){
    requestAnimationFrame(()=> {renderLoop(scene, renderer, camera, controls)});
    renderer.render(scene, camera);
    controls.update();
}

function onWindowResize(scene, renderer, camera) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function setScene(scene, renderer, ambientLight = undefined) {
    renderer.domElement.id = 'THREE';
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.needsUpdate = true;
    if (ambientLight) scene.add(ambientLight);
    scene.background = new THREE.Color(0x202020);
    document.body.appendChild( renderer.domElement );
}
