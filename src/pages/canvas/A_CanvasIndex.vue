<template>
  <div>
    <top-logo-section/>
    <nav>
      <ul>
        <li>
          <router-link to="/canvas">
            Intro aux Canvas
          </router-link>
        </li>
        <li>
          <router-link to="/canvas/canvas1">
            Canvas 1
          </router-link>
        </li>
        <li>
          <router-link to="/canvas/canvas2">
            Canvas 2
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="melt">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TopLogoSection from "@/components/TopLogoSection.vue";

export default {
  components: {
    TopLogoSection
  }
}

</script>

<style scoped>


</style>