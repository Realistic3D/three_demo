import {getThreeScene} from "@/scripts/three_tools/three_scene";

export async function startDemo(canvas) {
    const {scene, camera} = getThreeScene(canvas);
    console.log(scene, camera)
}
