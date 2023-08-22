<template>
  <div>
  </div>
</template>

<script>

import {createScene} from "@/scripts/demo";

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      scene: null,
      camera: null,
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
