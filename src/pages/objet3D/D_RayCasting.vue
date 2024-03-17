<template>
  <div class="columnContainer">
    <h1>Deplacement Camera</h1>
    <SceneController/>
    <canvas id="c"></canvas>
  </div>
</template>

<script>
import {initAndBuildThree} from '@/ThreeJS/objet3D/D_RayCasting.js';
import SceneController from "@/components/SceneController.vue";
import {cleanupThreeJS} from "@/ThreeJS/BasicAndMouse";

export default {
  components: {SceneController},
  mounted() {
    const canvas = this.$el.querySelector('#c');
    const container = canvas.parentElement;
    initAndBuildThree(container);
  },
  methods: {},
  beforeUnmount() {
    cleanupThreeJS() ;
  }
}
</script>

<style scoped>

</style>