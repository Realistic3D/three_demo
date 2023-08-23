<template>

  <div v-if="showUI" class="renderer-container" ref="rendererContainer">
    <div class="render-btn-container">
      <div class="buttons">
        <button @click="renderClicked('render')">Render</button>
        <button @click="renderClicked('bake')">Bake</button>
      </div>
    </div>

<!--    <div class="footer-btn-container">-->
    <div class="header-btn-container">

      <div class="status">
        <button @click="statusClicked">Refresh Status</button>
        <label class="status-label">{{status}}</label>
      </div>

    </div>
    <div class="header-btn-container">

      <div class="download">
        <button @click="downloadClicked">Download Result</button>
      </div>
    </div>

  </div>

</template>

<script>

import {checkStatus, createScene, downloadJob, renderScene} from "@/scripts/demo";

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      status: "",
      mode: null,
      scene: null,
      jobID: null,
      camera: null,
      showUI: true,
      waiting: false,
    }
  },
  mounted() {
    this.start();
  },
  methods: {
    async start(){
      const canvas = this.getCanvas();
      const {scene, camera} = await createScene(canvas);
      this.scene = scene;
      this.camera = camera;
      await this.loadCache();
    },
    async loadCache() {
      const jobID = localStorage.getItem('jobID');
      if(!jobID) return;
      this.mode = localStorage.getItem('mode');
      this.jobID = jobID;
      await this.statusClicked();
    },
    setJobId(jobID, mode) {
      this.mode = mode;
      this.jobID = jobID;
      localStorage.setItem("mode", mode);
      localStorage.setItem("jobID", jobID);
    },
    async renderClicked(mode) {
      this.showUI = false;
      await renderScene(this, mode)
      this.showUI = true;
    },
    async statusClicked() {
      if(!this.jobID) return;
      await checkStatus(this)
    },
    async downloadClicked() {
      this.showUI = false;
      await downloadJob(this);
      this.showUI = true;
    },
    setStatus(status) {
      this.status = status.toString();
    },
    getCanvas(){
      const canvases = document.querySelectorAll('canvas');
      for (const canvas of canvases) {
        if(canvas.id === "THREE") return canvas;
      }
    }
  }
}
</script>

<style>
</style>
