/*  App.vue * /
<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="melt">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>


html,
body {
  padding: 0;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--background-color-primary);
  color: var(--text-color-primary);
}

nav ul {
  list-style-type: none;
  padding: 0;
}


</style>
