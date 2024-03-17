<template>
  <div class="container-center">
    <div>
      <nav>
        <ul>
          <li>
            <router-link to="/canvas">
              Les Canvas
            </router-link>
          </li>
          <li>
            <router-link to="/intro">
              Introduction
            </router-link>
          </li>
          <li>
            <router-link to="/rendering">
              Explication Rendering
            </router-link>
          </li>
          <li>
            <router-link to="/shader">
              Explication shaders
            </router-link>
          </li>
          <li>
            <router-link to="/objet3D">
              Explication Objet 3D
            </router-link>
          </li>
          <li>
            <router-link to="/divers">
              Divers
            </router-link>
          </li>
          <li>
            <router-link to="/evaluation">
              Evaluation
            </router-link>
          </li>
          <li class="centered">
            <theme-button></theme-button>
          </li>
        </ul>
      </nav>
      <div>
        <a href="https://docs.google.com/presentation/d/1J747H-2OO-J03pwmZuPd0OZCIMkyTRwVoTa4gtLj1U0/edit?usp=sharing" target="_blank">
          Lien vers les slides
         </a>
      </div>
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="melt">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>

  </div>
</template>

<script>
import ThemeButton from '@/components/ThemeButton.vue';

export default {
  components: {
    ThemeButton
  }
}
</script>

<style scoped>

.img-centre {
  width: 33vw;
  max-width: 300px;
  animation: shadow-pulse 5s infinite;
}

@keyframes shadow-pulse2 {
  0% {
    filter: drop-shadow(0px 0px 0.75rem #fafafa);
  }
  25% {
    filter: drop-shadow(0px 0px 1rem #1a73e8);
  }
  50% {
    filter: drop-shadow(0px 0px 0.75rem #fafafa);
  }
  75% {
    filter: drop-shadow(0px 0px 1rem crimson);
  }
  100% {
    filter: drop-shadow(0px 0px 0.75rem #fafafa);
  }
}

.contour-img {
  width: 25vw;
  max-width: 200px;
  filter: drop-shadow(0 0 0.75rem crimson) invert(20%);
}

.contour-container:hover .contour-img {
  filter: drop-shadow(0 0 0.75rem #1a73e8);
}

.contour-container:hover a {
  color: var(--link-color-hover);
  text-decoration: underline;
}

.container-center {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}



.centered {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


</style>