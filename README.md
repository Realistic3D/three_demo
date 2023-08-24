# RealAPI

Basic demo for three.js

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
  - [Set credentials](#set-your-credentials)
  - [Create new job](#1-create-new-job)
  - [Upload job](#2-upload-job)
  - [Submit job](#3-submit-job)
  - [Get result](#4-get-result)
- [Live job status tracking](#Check-live-job-status-with-socket)
  - [Track only three.js jobs](#Track-only-threejs-job-status)
  - [Track all project's jobs](#Track-all-project-jobs)


[//]: # (- [Contributing]&#40;#contributing&#41;)
[//]: # (- [License]&#40;#license&#41;)

## Introduction

* This is very basic demo of how you can use [RealAPI](https://realistic3.com/) for three.js with simple [REST](https://docs.realistic3.com/using-rest-api-calls) requests in order to `render` or `bake` your scene.
* I didn't include any `Websocket` in this project as I want to just demonstrate the basic idea of how it works

## Installation

To install and use this project, follow these steps:

1. Clone the repository: `git clone https://github.com/Realistic3D/three_demo.git`
2. Navigate to the project directory: `cd three_demo`
3. Install dependencies: `npm install`
4. Run server: `npm run serve`

## Usage

The process is done in 4 basic steps.

1. Create `new_job`
2. Upload job
3. `submit` job
4. Get `result`


* ### Set your credentials

You can set the script inside "[src](src)/[scripts](src/scripts)/[rest_tools.js](src/scripts/real_api_tools/rest_tools.js)"

```javascript
const InsID = <replace your instance ID>;
const AppKey = "<replace your App Key>";
const ProdKey = "<replace your Product Key>";
const URL = `https://${REAL.Domain}/rapi/ask_service`;
```

### 1. Create new job
```javascript
export async function newJobRequest(bakeMode) {
    const params = {
        "prodCred": {
            "insID": InsID,
            "appKey": AppKey,
            "prodKey": ProdKey
        },
        "ask": "new_job",
        "renderParams": {
            "expFrom": "3js",
            "bakeMode": bakeMode
        }
    }
    const response = await postResponse(params);
    return response.data;
}
```

### 2. Upload job
```javascript
export async function uploadJob(uri, renderScene) {
    const request = await axios.put(uri, renderScene);
}
```

### 3. Submit job
```javascript
export async function submitJob(jobID) {
    const params = {
        "prodCred": {
            "insID": InsID,
            "appKey": AppKey,
            "prodKey": ProdKey
        },
        "ask": "submit",
        "service": {
            "jobID": jobID
        }
    }
    return await postResponse(params);
}
```

### 4. Get result
```javascript
export async function getJobResult(jobID) {
    const params = {
        "prodCred": {
            "insID": InsID,
            "appKey": AppKey,
            "prodKey": ProdKey
        },
        "ask": "result",
        "service": {
            "jobID": jobID
        }
    }
    return await postResponse(params);
}
```

### Check job status with REST API
```javascript
export async function jobStatus(jobID) {
    const params = {
        "prodCred": {
            "insID": InsID,
            "appKey": AppKey,
            "prodKey": ProdKey
        },
        "ask": "status",
        "service": {
            "jobID": jobID
        }
    }
    return await postResponse(params);
}
```

### Check live job status with socket
* ### Track only three.js job status:

`wss://app.real-api.online/login?app_key=<app_key>&prod_key=<prod_key>&ins_id=<ins_id>&exp_from=3js`

* ### Track all project jobs:
`wss://app.real-api.online/login?app_key=<app_key>&prod_key=<prod_key>&ins_id=<ins_id>`
