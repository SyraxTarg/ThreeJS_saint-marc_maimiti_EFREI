<template>
  <div class="columnContainer">
    <h1>Rendering Simple</h1>
    <SceneController/>
    <div class="optionsContainer">
      <div class="sliderContainer">
        <label for="lightPositionX">Light Position X</label>
        <input type="range" id="lightPositionX" v-model="moveLightOnX" min="0" max="20">
      </div>
      <div class="sliderContainer">
        <label for="lightPositionY">Light Position Y</label>
        <input type="range" id="lightPositionY" v-model="moveLightOnY" min="0" max="20">
      </div>
      <div class="sliderContainer">
        <label for="lightPositionX">Light Position Z</label>
        <input type="range" id="lightPositionZ" v-model="moveLightOnZ" min="0" max="20">
      </div>

    </div>

    <canvas id="c"></canvas>
  </div>
</template>

<script>
import {initAndBuildThree} from '@/ThreeJS/shader/C_ShadowRealm';
import SceneController from "@/components/SceneController.vue";
import {cleanupThreeJS, initLightPrecise, setLightPosition} from "@/ThreeJS/BasicAndMouse";
export default {
  components: {SceneController},
  mounted() {
    const canvas = this.$el.querySelector('#c');
    const container = canvas.parentElement;
    initLightPrecise(0,0,0) ;
    initAndBuildThree(container);
  },
  data() {
    return {
      moveLightOnX: 0,
      moveLightOnY: 0,
      moveLightOnZ: 0,
    };
  },
  watch: {
    moveLightOnX(newVal) {
      setLightPosition(newVal,null,null) ;
    },
    moveLightOnY(newVal) {
      setLightPosition(null, newVal,null) ;
    },
    moveLightOnZ(newVal) {
      setLightPosition(null,null, newVal) ;
    },
  },
  methods: {},
  beforeUnmount() {
    cleanupThreeJS() ;
  }
}
</script>

<style scoped>

</style>