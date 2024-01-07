import * as THREE from "three";
import * as REAL from "real_api";

export function loadAreaLights(scene) {
    const zPos = -3.5;
    const intensity = 50;
    const areaLight1 = new REAL.AreaLight(14, 10, new THREE.Color(0xffffe6), intensity);
    const areaLight2 = new REAL.AreaLight(3, 3, new THREE.Color(0xffffff), intensity);
    const areaLight3 = new REAL.AreaLight(3, 3, new THREE.Color(0xffffff), intensity);

    areaLight1.rotation.x = Math.PI/2;

    areaLight1.position.set(0,2.5,zPos);
    areaLight2.position.set(0,1, -8);
    areaLight3.position.set(-5,1, -8);

    scene.add(areaLight1);
    scene.add(areaLight2);
    scene.add(areaLight3);
}
export function loadAreaLightsOld(scene) {
    const zPos = -6;
    const intensity = 50;

    const areaLight1 = new REAL.AreaLight(1, 2, new THREE.Color(0x3EBAF4), intensity);
    const areaLight2 = new REAL.AreaLight(3, 2, 0x27AE60, intensity);
    const areaLight3 = new REAL.AreaLight(1, 2, 0xCD5C5C, intensity);
    const areaLight4 = new REAL.AreaLight(3, 2, 0x0088ff, intensity);

    areaLight4.rotation.x = Math.PI/2;

    areaLight1.position.set(-2.5,0,zPos);
    areaLight2.position.set(0,0,zPos);
    areaLight3.position.set(2.5,0,zPos);
    areaLight4.position.set(0,1,zPos + 1);

    scene.add(areaLight1);
    scene.add(areaLight2);
    scene.add(areaLight3);
    scene.add(areaLight4);
}

export function loadSunLight(scene) {
    const intensity = 0.13;
    const sunlight = new REAL.SunLight({intensity: intensity});
    sunlight.position.set(5,5,-5);
    scene.add(sunlight);
}
