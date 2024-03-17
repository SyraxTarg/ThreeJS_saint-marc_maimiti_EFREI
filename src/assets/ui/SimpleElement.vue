<template>
  <div class="uiElement">
    <p>This is some text</p>
    <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">This is a link</a>
    <img src="/ui/images/Waves.webp">
  </div>
</template>

<script>
  export default {
    name: 'SimpleElement',
  }
</script>


<style scoped>

  .uiElement {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    color: #111111;
  }

  img {
    width: 80px;
  }

</style>