<template>

  <div v-if="showUI" class="renderer-container" ref="rendererContainer">
    <div class="render-btn-container">
      <div class="buttons">
        <button @click="renderClicked('render')">Render</button>
        <button @click="renderClicked('bake')">Bake</button>
      </div>
    </div>

    <div class="footer-btn-container">
      <div class="status">
        <button @click="statusClicked">Check Status</button>
        <label>{{status}}</label>
      </div>
      <button @click="downloadClicked">Download Result</button>
    </div>
  </div>

</template>

<script>

import {createScene, renderScene} from "@/scripts/demo";

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      status: "",
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
    },
    async renderClicked(mode) {
      await renderScene(this, mode)
    },
    async statusClicked() {
      // this.showUI = false;
      console.log("status")
    },
    async downloadClicked() {
      // this.showUI = false;
      console.log("download")
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
