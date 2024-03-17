<template>
  <div class="columnContainer">
    <h1>Rendering Simple</h1>
    <SceneController/>
    <div class="optionsContainer">
      <button @click="resetCubePosition">Reset Cube Position</button>

      <div class="checkboxContainer">
        <label for="isMovingCheckboxOnX">Rotate on X</label>
        <input type="checkbox" id="isMovingCheckboxOnX" @change="setMovingOnX($event.target.checked)">
      </div>

      <div class="checkboxContainer">
        <label for="isMovingCheckboxOnX">Rotate on Y</label>
        <input type="checkbox" id="isMovingCheckboxOnY" @change="setMovingOnY($event.target.checked)">
      </div>

      <div class="checkboxContainer">
        <label for="isMovingCheckboxOnX">Rotate on Z</label>
        <input type="checkbox" id="isMovingCheckboxOnZ" @change="setMovingOnZ($event.target.checked)">
      </div>


    </div>

    <canvas id="c"></canvas>
  </div>
</template>

<script>
import SceneController from "@/components/SceneController.vue";
import {initAndBuildThree, setMovingOnX, setMovingOnY, setMovingOnZ} from "@/ThreeJS/rendering/D_UnCudeQuiTourne";
import {cleanupThreeJS} from "@/ThreeJS/BasicAndMouse";
export default {
  components: {SceneController},
  mounted() {
    const canvas = this.$el.querySelector('#c');
    const container = canvas.parentElement;
    initAndBuildThree(container);
  },
  methods: {setMovingOnZ, setMovingOnY, setMovingOnX},
  beforeUnmount() {
    cleanupThreeJS() ;
  }
}
</script>

<style scoped>

</style>