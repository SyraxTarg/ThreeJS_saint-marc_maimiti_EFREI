<template>
  <div class="columnContainer">
    <h1>Canvas 1</h1>
    <SceneController/>
    <div class="optionsContainer">
      <button @click="resetCubePosition">Reset Cube Position</button>

      <div class="checkboxContainer">
        <label for="isMovingCheckboxAll">Move ALL</label>
        <input type="checkbox" id="isMovingCheckboxAll" @change="setAllMoving($event.target.checked)">
      </div>

      <div class="checkboxContainer">
        <label for="isMovingCheckbox1">Move 1</label>
        <input type="checkbox" id="isMovingCheckbox1" @change="setMoving1($event.target.checked)">
      </div>

      <div class="checkboxContainer">
        <label for="isMovingCheckbox2">Move 2</label>
        <input type="checkbox" id="isMovingCheckbox2" @change="setMoving2($event.target.checked)">
      </div>

      <div class="checkboxContainer">
        <label for="isMovingCheckbox3">Move 3</label>
        <input type="checkbox" id="isMovingCheckbox3" @change="setMoving3($event.target.checked)">
      </div>

    </div>
    <canvas id="c"></canvas>
  </div>

</template>

<script>
import {
  purgeUIElements,
  initAndBuildThree,
  resetCubesPosition,
  setMoving1,
  setMoving2, setMoving3, setAllMoving
} from '@/ThreeJS/divers/E_SimpleUI';
import SceneController from "@/components/SceneController.vue";
import {cleanupThreeJS} from "@/ThreeJS/BasicAndMouse";

export default {
  components: {SceneController},
  mounted() {
    const canvas = this.$el.querySelector('#c');
    const container = canvas.parentElement;
    initAndBuildThree(container);
  },
  methods: {addUIElement: purgeUIElements, resetCubePosition: resetCubesPosition, setAllMoving : setAllMoving, setMoving1: setMoving1, setMoving2: setMoving2, setMoving3: setMoving3},
  beforeUnmount() {
    cleanupThreeJS() ;
  }
}
</script>

<style scoped>

#ui {

    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 10;


}


</style>