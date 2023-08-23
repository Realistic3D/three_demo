import * as REAL from "real_api";
import {getThreeScene} from "@/scripts/three_tools/three_scene";
import {loadDemoModel} from "@/scripts/three_tools/load_demo";
import {loadAreaLights, loadSunLight} from "@/scripts/real_api_tools/real_lights";
import {ConsoleError, ConsoleWarning} from "@/scripts/common_tools/console_tools";
import {
    downloadImage,
    getJobResult,
    jobStatus,
    newJobRequest,
    submitJob,
    uploadJob
} from "@/scripts/real_api_tools/real_requests";
import {loadBaked} from "@/scripts/three_tools/load_baked";


export async function createScene(canvas) {
    const {scene, camera} = getThreeScene(canvas);
    loadDemoModel(scene);
    loadSunLight(scene);
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
    const response = await submitJob(jobID);
    if(response.msg === "SUCCESS") app.setStatus(response.data.status);
    else app.setStatus("FAILED");

    app.setJobId(jobID, renderMode);
}

export async function checkStatus(app) {
    const jobID = app.jobID;
    const response = await jobStatus(jobID);
    app.setStatus(response.data.status);
}

export async function downloadJob(app) {
    const mode = app.mode;
    const jobID = app.jobID;
    if(!jobID) return ConsoleWarning("No job");
    const response = await getJobResult(jobID);
    if(!response || !response.data) return ConsoleError(response.msg);
    const data = response.data;
    const status = data.status;
    if(status !== "COMPLETED") return ConsoleWarning("Job is not completed yet!");
    if(mode === "bake") await replaceBakedScene(app, data.url);
    else await saveImage(jobID, data.url);
}

async function replaceBakedScene(app, url) {
    await loadBaked(app, url);
}

async function saveImage(jobID, url) {
    await downloadImage(jobID, url);
}
