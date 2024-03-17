<template>
  <div class="columnContainer">
    <h1>Canvas 1</h1>
    <SceneController/>
    <canvas id="c"></canvas>
  </div>
</template>

<script>
import {initAndBuildThree} from '@/ThreeJS/divers/D_AsyncLoading';
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