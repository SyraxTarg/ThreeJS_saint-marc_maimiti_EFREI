<template>
  <div class="columnContainer">
    <h1 id="c">Exemple</h1>
  </div>
</template>

<script>
import {initAndBuildThree} from '@/ThreeJS/evaluation/ExempleEvaluation';

export default {
  components: {},
  mounted() {
    const canvas = this.$el.querySelector('#c');
    const container = canvas.parentElement;
    initAndBuildThree(container);
  },
  methods: {},
  beforeUnmount() {
  }
}
</script>

<style scoped>

</style>