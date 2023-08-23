import * as REAL from "real_api";
import {getThreeScene} from "@/scripts/three_tools/three_scene";
import {loadDemoModel} from "@/scripts/three_tools/load_demo";
import {loadAreaLights} from "@/scripts/real_api_tools/real_lights";
import {ConsoleWarning} from "@/scripts/common_tools/console_tools";
import {newJobRequest, uploadJob} from "@/scripts/real_api_tools/real_requests";


export async function createScene(canvas) {
    const {scene, camera} = getThreeScene(canvas);
    loadDemoModel(scene);
    loadAreaLights(scene);
    return {scene, camera};
}

export async function renderScene(app, renderMode) {
    if (app.waiting) return ConsoleWarning("Please wait for job to finish");
    const scene = app.scene;
    const camera = app.camera;
    const isBakeMode = renderMode === "bake";

    //Step 1: Get scene
    const newJob = await newJobRequest(isBakeMode);
    if(!newJob) return app.setStatus("FAILED");

    const jobID = newJob.jobID;
    const uri = newJob.url;

    //Step 2: Upload scene
    const renderScene = await REAL.Scene(scene, camera);
    const uploaded = await uploadJob(uri, renderScene);
    if(!uploaded) return app.setStatus("Uploading FAILED");

    //Step 3: Submit job
    const response = await this.submitJob(jobID);
    if(response.msg === "SUCCESS") app.setStatus(response.status);
    else app.setStatus("FAILED");
}
