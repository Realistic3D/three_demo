import axios from "axios";
import * as REAL from "real_api";
import {ConsoleError} from "@/scripts/common_tools/console_tools";


const InsID = 0;
const AppKey = "<YOUR APP KEY>";
const ProdKey = "<YOUR PRODUCT KEY>";
const URL = `https://${REAL.Domain}/rapi/render`;



export async function newJobRequest(bakeMode) {
    const params = {
        "cred": {
            "insID": InsID,
            "appKey": AppKey,
            "prodKey": ProdKey
        },
        "type": "new",
        "render": {
            "expFrom": "3js",
            "bake": bakeMode
        }
    }
    const response = await postResponse(params);
    if(response.data && response.data.jobID) return response.data;
    ConsoleError(response.msg);
}

export async function uploadJob(uri, renderScene) {
    return await putResponse(uri, renderScene);
}

export async function submitJob(jobID) {
    const params = {
        "cred": {
            "insID": InsID,
            "appKey": AppKey,
            "prodKey": ProdKey
        },
        "jobID": jobID,
        "type": "render"
    }
    return await postResponse(params);
}

export async function jobResult(jobID) {
    const params = {
        "cred": {
            "insID": InsID,
            "appKey": AppKey,
            "prodKey": ProdKey
        },
        "jobID": jobID,
        "type": "result"
    }
    return await postResponse(params);
}

async function postResponse(params) {
    const response = await axios.post(URL, params);
    if(response.status === 200) return response.data;
    ConsoleError(JSON.stringify(response));
}

async function putResponse(uri, scene){
    try {
        const request = await axios.put(uri, scene);
        return request.status === 200;
    }
    catch (e) {
        ConsoleError(e);
        return false;
    }
}


export async function downloadImage(jobID, imageUrl) {
    try {
        console.log(imageUrl)
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${jobID}.jpg`; // Set desired file name
            link.click();
        };
        reader.readAsDataURL(blob);
    }
    catch (error) {
        ConsoleError(`Error downloading image: ${error}`);
    }
}
