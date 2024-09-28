<template>
  <div class="AstroContainer container">
    <div v-if="astro.length > 0" class="skeleton-loading"></div>
    <div v-else class="content">
      <div class="moon-phase domino-anim">
        <h5 :class='`light ${loading && "skeleton-loading-container"}`'>{{ astro.moon_phase }}</h5>
        <p :class='loading && "skeleton-loading-container"'>{{ astro.moon_illumination }}%</p>
      </div>
      <div :class='`illustration ${!isImageLoaded && "skeleton-loading-container"} domino-anim`'>
        <img
          src="https://moonphase.guide/module/MY0FDZG9seFNWTXp2bGhqREZLNWlUS29mclRoMmYyR25CZit5RXpSMzBzK2pxSm5laldCQVpEZ05NTEl0MklqMVhYZ2t0aWxqWFNJTkhYdlJRbGVVV3c9PQ.png"
          @load="onImageLoad"
        />
      </div>
      <div class="time domino-anim">
        <div :class='`moonset ${loading && "skeleton-loading-container"}`'> 
          <img id="Moonset Icon" :src="require(`/public/icons/moonset.png`)" />
          <p class="bold">{{ astro.moonset?.slice(0, -3) }}</p>
        </div>
        <div :class='`moonrise ${loading && "skeleton-loading-container"}`'>
          <p class="bold">{{ astro.moonrise?.slice(0, -3) }}</p>
          <img id="Moonrise Icon" :src="require(`/public/icons/moonrise.png`)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AstroContainer',
  data() {
    return {
      isImageLoaded: false, // Track whether the image is loaded
    };
  },
  methods: {
    onImageLoad() {
      this.isImageLoaded = true; // Set to true when the image is fully loaded
    }
  },
  setup() {
    const store = useStore();
    const astro = computed(() => store.getters.getAstro);
    const loading = computed(() => Object.keys(astro.value).length === 0);

    return {
      astro,
      loading
    };
  }
});
</script>


<style scoped lang="sass">
.AstroContainer
  position: relative
  order: 6
  background-color: $default-bg-light
  height: $height-l
  width: 200px
  padding: 20px
  transition: 0.2s
  .content
    height: 100%
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    justify-content: space-between
    align-items: center
    .moon-phase
      width: 100%
      display: flex
      justify-content: space-between
      h5, p
        font-size: 14px
      h5
        &.skeleton-loading-container
          width: 85px
      p
        &.skeleton-loading-container
          width: 26px
    .illustration
      position: relative
      height: 96px
      width: 96px
      img
        position: absolute
        left: 50%
        transform: translateX(-50%)
        height: 100%
        transition: 0.2s
        filter: sepia(1) saturate(200%) hue-rotate(200deg) brightness(0.7)
    .time
      opacity: 68%
      width: 100%
      display: flex
      justify-content: space-between
      p
        display: inline
        font-size: 14px
      img
        display: inline
        width: 16px
      .moonset, .moonrise
        display: flex
        align-items: center
        gap: 3px
        &.skeleton-loading-container
          width: 54px
@media (max-width: 545px)
  .AstroContainer
    max: width 200px
    width: auto
    .content
      .moon-phase
        align-items: center
        h5
          max-width: 100px
      .illustration
        height: 85px
        width: 85px
</style>