<template>
  <div class="columnContainer">
    <h1>Rendering Simple</h1>
    <SceneController/>
    <div class="optionsContainer">
      <button @click="resetCubePosition">Reset Cube Position</button>

      <button @click="setCameraFrontFacing">Camera Front Facing</button>

      <button @click="setCameraSideFacing">Camera Side Facing</button>

      <h3>Press Space bar to move</h3>
    </div>

    <canvas id="c"></canvas>
  </div>
</template>

<script>
import {
  initAndBuildThree,
  resetCubePosition,
  setCameraFrontFacing, setCameraSideFacing
} from '@/ThreeJS/rendering/E_MouseFollowing.js';
import SceneController from "@/components/SceneController.vue";
import {cleanupThreeJS} from "@/ThreeJS/BasicAndMouse";
export default {
  components: {SceneController},
  mounted() {
    const canvas = this.$el.querySelector('#c');
    const container = canvas.parentElement;
    initAndBuildThree(container);
  },
  methods: {setCameraSideFacing, setCameraFrontFacing, resetCubePosition},
  beforeUnmount() {
    cleanupThreeJS() ;
  }
}
</script>

<style scoped>

</style>