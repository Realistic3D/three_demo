import * as THREE from "three";
import * as REAL from "real_api";

export function loadAreaLights(scene) {
    const zPos = -6;
    const intensity = 50;

    const areaLight1 = new REAL.AreaLight(1, 2, new THREE.Color(0x3EBAF4), intensity);
    const areaLight2 = new REAL.AreaLight(3, 2, 0x27AE60, intensity);
    const areaLight3 = new REAL.AreaLight(1, 2, 0xCD5C5C, intensity);

    areaLight1.position.set(-2.5,0,zPos);
    areaLight2.position.set(0,0,zPos);
    areaLight3.position.set(2.5,0,zPos);

    scene.add(areaLight1);
    scene.add(areaLight2);
    scene.add(areaLight3);
}

export function loadSunLight(scene) {
    const intensity = 0.13;
    const sunlight = new REAL.SunLight({intensity: intensity});
    sunlight.position.set(5,5,-5);
    scene.add(sunlight);
}
