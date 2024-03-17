<template>
  <div>
    <top-logo-section/>
    <nav>
      <ul>
        <li>
          <router-link to="/objet3D">
            Intro a Object 3D
          </router-link>
        </li>
        <li>
          <router-link to="/objet3D/cameraMovement">
            Camera Movement
          </router-link>
        </li>
        <li>
          <router-link to="/objet3D/rayCasting">
            RayCasting
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