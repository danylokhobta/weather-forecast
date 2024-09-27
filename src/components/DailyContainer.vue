<template>
  <div class="DailyContainer container">
    <div class="content">
      <div class="day-container domino-anim" 
        v-for="i in 3" 
        :key="i"
      >
        <p :class='`date-short bold ${loading && "skeleton-loading-container"}`' v-if="i > 1">{{ dailyForecast[i - 1]?.date?.short }}</p>
        <p :class='`date-short bold ${loading && "skeleton-loading-container"}`' v-else>Today({{ dailyForecast[0]?.date?.short }})</p>
        <p :class='`date-full ${loading && "skeleton-loading-container"}`'>{{ dailyForecast[i - 1]?.date?.full }}</p>
        <img :class='`illustration ${loading && "skeleton-loading-container"}`' :src="dailyForecast[i - 1] ? require(`@/assets/icons/${dayPhase}/${dailyForecast[i - 1].condition?.code}.png`) : ''" />
        <p :class='`condition bold ${loading && "skeleton-loading-container"}`'>{{ dailyForecast[i - 1]?.condition?.text }}</p>
        <p :class='`temp ${loading && "skeleton-loading-container"}`'>{{ dailyForecast[i - 1]?.[unitsType]?.mintemp }}-{{ dailyForecast[i - 1]?.[unitsType]?.maxtemp }}{{ dailyForecast[i - 1]?.[unitsType]?.units }}</p>
        <p :class='`uv ${loading && "skeleton-loading-container"}`'>UV {{ dailyForecast[i - 1]?.uv }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Map state from Vuex store
const dailyForecast = computed(() => store.getters.getDailyForecast);
const unitsType = computed(() => store.getters.getUnitsType);
const dayPhase = computed(() => store.getters.getDayPhase);
const loading = computed(() => Object.keys(dailyForecast.value).length === 0);
</script>

<style scoped lang="sass">
.DailyContainer
  position: relative
  order: 4
  background-color: $default-bg-light
  height: $height-l
  display: flex
  align-items: center
  padding: 16px 20px
  .content
    display: grid
    grid-template-columns: repeat(3, 70px)
    gap: 24px
    .day-container
      display: flex
      flex-direction: column
      gap: 5px
      align-items: center
      text-align: center
      .skeleton-loading-container
        height: 14.4px
      .date-short
        &.skeleton-loading-container
          width: 65%
      .date-full
        &.skeleton-loading-container
          width: 85%
      .illustration
        height: 48px
        width: 48px
        margin: 0 auto
        padding: 2px 0
      .condition
        &.skeleton-loading-container
          width: 80%
      .temp
        &.skeleton-loading-container
          width: 90%
      .uv
        &.skeleton-loading-container
          width: 60%
@media (max-width: 545px)
  .DailyContainer
    padding: 16px
    .content
      gap: 16px
@media (max-width: 495px)
  .DailyContainer
    padding: 16px 20px
    .content
      gap:24px
</style>
