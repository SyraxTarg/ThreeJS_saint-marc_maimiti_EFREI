<template>
  <div>
    <top-logo-section/>
    <nav>
      <ul>
        <li>
          <router-link to="/intro">
            Intro a l'Introduction
          </router-link>
        </li>
        <li>
          <router-link to="/intro/simpleCube">
            Simple Cube
          </router-link>
        </li>
        <li>
          <router-link to="/intro/cubeAvecTexture">
            Les Textures
          </router-link>
        </li>
        <li>
          <router-link to="/intro/TODO">
            TODO
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