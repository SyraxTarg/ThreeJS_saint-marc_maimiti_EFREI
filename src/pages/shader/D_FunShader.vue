<template>
  <div class="columnContainer">
    <h1>Rendering Simple</h1>
    <SceneController/>
    <div class="optionsContainer">
      <div class="radioContainer">
        <label>
          <input type="radio" name="option" value="0" @change="toggleFog(0)" checked >
          No Fog
        </label>
        <label>
          <input type="radio" name="option" value="1" @change="toggleFog(1)">
          Simple Fog
        </label>
        <label>
          <input type="radio" name="option" value="2" @change="toggleFog(2)">
          Complex Fog
        </label>
      </div>
    </div>

    <canvas id="c"></canvas>
  </div>
</template>

<script>
import {initAndBuildThree, toggleFog} from '@/ThreeJS/shader/D_FunShader';
import SceneController from "@/components/SceneController.vue";
import {cleanupThreeJS} from "@/ThreeJS/BasicAndMouse";

export default {
  components: {SceneController},
  mounted() {
    const canvas = this.$el.querySelector('#c');
    const container = canvas.parentElement;
    initAndBuildThree(container);

  },
  data() {
    return {
    };
  },
  methods: {toggleFog},
  beforeUnmount() {
    cleanupThreeJS() ;
  }
}
</script>

<style scoped>

</style>