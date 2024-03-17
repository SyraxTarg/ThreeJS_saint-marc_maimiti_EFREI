<template>
  <div>
    <top-logo-section/>
    <nav>
      <ul>

        <li>
          <router-link to="/rendering">
            Intro Rendering
          </router-link>
        </li>
        <li>
          <router-link to="/rendering/override">
            Override
          </router-link>
        </li>
        <li>
          <router-link to="/rendering/rotation">
            Rotation
          </router-link>
        </li>
        <li>
          <router-link to="/rendering/mouse">
            Mouse Movement
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