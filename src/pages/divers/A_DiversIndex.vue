<template>
  <div>
    <top-logo-section/>
    <nav>
      <ul>
        <li>
          <router-link to="/divers">
            Intro aux divers
          </router-link>
        </li>
        <li>
          <router-link to="/divers/importScene">
            Importation d'une scene
          </router-link>
        </li>
        <li>
          <router-link to="/divers/asyncLoading">
            Concept de Wait
          </router-link>
        </li>
        <li>
          <router-link to="/divers/htmlUI">
            UI Par HTML
          </router-link>
        </li>
        <li>
          <router-link to="/divers/melody3D">
            Le Son en 3D
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