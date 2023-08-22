<template>
  <div>
  </div>
</template>

<script>

import {startDemo} from "@/scripts/demo";

export default {
  name: 'App',
  components: {
  },
  mounted() {
    this.start();
  },
  methods: {
    async start(){
      const canvas = this.getCanvas();
      await startDemo(canvas);
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
