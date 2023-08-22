import {getThreeScene} from "@/scripts/three_tools/three_scene";
import {loadDemoModel} from "@/scripts/three_tools/load_demo";
import {loadAreaLights} from "@/scripts/real_api_tools/real_lights";

export async function createScene(canvas) {
    const {scene, camera} = getThreeScene(canvas);
    loadDemoModel(scene);
    loadAreaLights(scene);
    return {scene, camera};
}

export async function renderClicked(renderMode) {
    switch (renderMode) {
        case "bake":
            break;
        default:
            break;
    }
}
