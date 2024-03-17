<template>
  <div class="columnContainer">
    <h1>Rendering Simple</h1>
    <SceneController/>
    <div class="optionsContainer">
      <button @click="resetCubePosition">Reset Cube Position</button>

      <div class="checkboxContainer">
        <label for="isMovingCheckbox">Make move</label>
        <input type="checkbox" id="isMovingCheckbox" @change="setMoving($event.target.checked)">
      </div>

    </div>

    <canvas id="c"></canvas>
  </div>
</template>

<script>
import {initAndBuildThree, resetCubePosition, setMoving} from '@/ThreeJS/rendering/C_FlyingCube.js';
import SceneController from "@/components/SceneController.vue";
import {cleanupThreeJS} from "@/ThreeJS/BasicAndMouse";
export default {
  components: {SceneController},
  mounted() {
    const canvas = this.$el.querySelector('#c');
    const container = canvas.parentElement;
    initAndBuildThree(container);
  },
  methods: {setMoving, resetCubePosition},
  beforeUnmount() {
    cleanupThreeJS() ;
  }
}
</script>

<style scoped>

</style>