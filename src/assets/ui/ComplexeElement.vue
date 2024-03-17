<template>
  <div class="uiElement">
    <img src="/ui/images/SynPuppyFace.png" alt="Syn" class="highlightedImage">
  </div>
</template>

<script>
export default {
  name: 'ComplexeElement',
}
</script>
<style scoped>
.uiElement {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  text-align: center;
  transition: transform 0.3s ease;
}

.highlightedImage {
  width: 120px;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0,0,0,0.6);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.uiElement:hover .highlightedImage {
  transform: scale(1.4) translateY(-2px);
  box-shadow: 0 0 20px rgba(0,0,0,0.8);
}

/*
.uiElement:hover {
  transform: rotate(-5deg);
}
*/

</style>