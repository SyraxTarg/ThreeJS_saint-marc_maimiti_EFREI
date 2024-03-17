<template>
  <div class="columnContainer">
    <h1>I can show you the world</h1>
    <div class="optionsContainer">
      <ul class="keyboardControls">
        <li><b>A</b>: Revenir à la position de départ</li>
        <li><b>L</b>: Regarder l'objet de vente (tasse)</li>
        <li><b>Entrée</b>: Enlever / Remettre les controls en first person</li>
      </ul>
      <ul class="keyboardControls">
        <li><b>Flèche du haut</b>: monter</li>
        <li><b>Flèche du bas</b>: descendre</li>
        <li><b>Espace</b>: Lancer / Arrêter la musique de fond</li>
      </ul>
      <p>Bougez la souris ainsi que Q, Z, S, D pour vous déplacer dans la scène</p>
    </div>
    <canvas id="c"></canvas>
  </div>
</template>

<script>
import {initAndBuildThree} from '@/ThreeJS/evaluation/OpenEvaluation';
import {cleanupThreeJS} from "@/ThreeJS/BasicAndMouse";

export default {
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
  .keyboardControls{
    list-style: none;
    text-align: left;
    border: 1px solid green;
    padding: 10px;
    border-radius: 5px;
  }
</style>