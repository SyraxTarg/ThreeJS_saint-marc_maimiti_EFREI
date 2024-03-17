<template>
  <div class="columnContainer">
    <h1>Cube avec Texture</h1>
    <SceneController/>
    <div class="optionsContainer">
      <button @click="applyColor">Apply Color</button>
      <button @click="applySimpleWood">Apply Simple Texture</button>
      <button @click="applyNormalWood">Apply Normal Texture</button>
      <button @click="applyComplexWood">Apply Proper Texture</button>

      <div class="checkboxContainer">
        <label for="ambientCheckbox">Ambient Light</label>
        <input type="checkbox" id="ambientCheckbox" @change="setAmbientLight($event.target.checked)">
      </div>

      <div class="checkboxContainer">
        <label for="directionalCheckbox">Directional Light</label>
        <input type="checkbox" id="directionalCheckbox" @change="setDirectionalLight($event.target.checked)">
      </div>
    </div>

    <canvas id="c"></canvas>
  </div>
</template>

<script>
import {
  initAndBuildThree,
  applyColor,
  applySimpleWood,
  applyComplexWood,
  setAmbientLight,
  setDirectionalLight, applyNormalWood
} from '@/ThreeJS/introduction/D_UnCudeAvecTexture.js';
import SceneController from "@/components/SceneController.vue";
import {cleanupThreeJS} from "@/ThreeJS/BasicAndMouse";

export default {
  components: {SceneController},
  mounted() {
    const canvas = this.$el.querySelector('#c');
    const container = canvas.parentElement;
    initAndBuildThree(container);
  },
  methods: {applyNormalWood, setDirectionalLight, applyColor, applySimpleWood, applyComplexWood, setAmbientLight},
  beforeUnmount() {
    cleanupThreeJS() ;
  }
}
</script>

<style scoped>


</style>