<template>
  <div>
    <top-logo-section/>
    <nav>
      <ul>
        <li>
          <router-link to="/shader">
            Intro Shaders
          </router-link>
        </li>
        <li>
          <router-link to="/shader/shadows">
            Shadows
          </router-link>
        </li>
        <li>
          <router-link to="/shader/funshaders">
            Fun Shaders
          </router-link>
        </li>
        <li>
          <router-link to="/shader/textureShader">
            Texture avec Shader
          </router-link>
        </li>
        <li>
          <router-link to="/shader/theCloud">
            Texture avec Shader Complexe
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