<template>
  <div class="uiElement">
    <p>Le super chocolat-chaud du cheval</p>
    <a href="https://www.efrei.fr/"  target="_blank" rel="noopener noreferrer">Passez commande dès maintenant !</a>
    <img src="/ui/images/cheval.jfif">
  </div>
</template>

<script>
export default {
  name: 'SimpleElement',
}
</script>


<style scoped>

.uiElement {
  background-color: rgba(242, 56, 105, 0.8);
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  color: #111111;
}

img {
  width: 10vw;
}

</style>