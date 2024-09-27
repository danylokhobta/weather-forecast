<template>
  <div class="CurrentContainer container">
    <div class="content">
      <div class="info">
        <h5 :class='`current domino-anim ${loading && "skeleton-loading-container"}`'>Current</h5>
        <p :class='`date domino-anim ${loading && "skeleton-loading-container"}`'>{{ currentForecast.time }}</p>
        <h1 :class='`temp domino-anim ${loading && "skeleton-loading-container"}`'>{{ currentForecast[unitsType]?.temp }}°</h1>
      </div>
      <div :class='`illustration domino-anim ${loading && "skeleton-loading-container"}`'>
        <img :src="require(`@/assets/icons/${dayPhase}/${currentForecast.condition?.code}.png`)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Map Vuex getters
const currentForecast = computed(() => store.getters.getCurrentForecast);
const unitsType = computed(() => store.getters.getUnitsType);
const dayPhase = computed(() => store.getters.getDayPhase);
const loading = computed(() => Object.keys(currentForecast.value).length === 0);
</script>

<style scoped lang="sass">
.CurrentContainer
  position: relative
  order: 2
  min-width: 250px
  height: $height-m
  background-color: $default-bg-dark
  padding: 26px 24px
  .content
    height: 100%
    display: flex
    flex-wrap: nowrap
    justify-content: space-between
    align-items: center
    gap: 44px
    .info
      white-space: nowrap
      .current
        &.skeleton-loading-container
          width: 60px
          height: 20px
      .date
        margin-top: 8px
        margin-bottom: 12px
        &.skeleton-loading-container
          width: 95px
          height: 16px
      .temp
        &.skeleton-loading-container
          width: 68px
          height: 48px

    .illustration
      height: 100%
      &.skeleton-loading-container
        width: 96px
        height: 96px
      img
        height: 90%
@media (max-width: 840px)
  .CurrentContainer
    width: 299.6px
    .content
      margin: 0 auto
      width: 220px

@media (max-width: 580px)
  .CurrentContainer
    flex-shrink: 1
@media (max-width: 545px)
  .CurrentContainer
    width: 250px
    .content
      margin: auto auto
      width: auto
@media (max-width: 495px)
  .CurrentContainer
    width: 299.6px
    .content
      margin: 0 auto
      width: 220px
</style>