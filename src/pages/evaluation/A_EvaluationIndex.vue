<template>
  <div>
    <top-logo-section/>
    <nav>
      <ul>
        <li>
          <router-link to="/evaluation">
            Intro a l'evaluation
          </router-link>
        </li>
        <li>
          <router-link to="/evaluation/exempleEvaluation">
            Exemple Evaluation
          </router-link>
        </li>
        <li>
          <router-link to="/evaluation/openEvaluation">
            Zone Evaluation
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