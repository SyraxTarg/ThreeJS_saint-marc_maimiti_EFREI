<template>
  <div class="uiElement">
    <img src="/ui/images/SpringSecu.webp">
  </div>
</template>

<script>
  export default {
    name: 'BasicElement',
  }
</script>


<style scoped>

  .uiElement {
    background-color: rgba(255, 241, 28, 0.8);
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-shadow: 0 0px 2px rgba(0,0,0,0.6);
    color: #111111;
  }

  img {
    width: 80px;
  }

</style>