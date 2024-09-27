<template>
  <swiper
    :slides-per-view="'auto'"
    @swiper="onSwiper"
    class="HourlyContainer container"
  >
    <swiper-slide
      class="hour-container domino-anim"
      v-for="i in 24" 
      :key="i"
    >
      <h5 :class='`light ${loading && "skeleton-loading-container"}`' v-if="i-1 === 0">Now</h5>
      <h5 :class='`light ${loading && "skeleton-loading-container"}`' v-else>{{ hourlyForecast[i-1]?.time[0] }}<span>{{hourlyForecast[i-1]?.time[1]}}</span></h5>
      <img :class='`illustration ${loading && "skeleton-loading-container"}`' :src="hourlyForecast[i-1] ? require(`@/assets/icons/${dayPhase}/${hourlyForecast[i-1]?.condition?.code}.png`) : ''"/>
      <h3 :class='`temp ${loading && "skeleton-loading-container"}`'>{{ hourlyForecast[i-1] && hourlyForecast[i-1][unitsType]?.temp }}°</h3>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default defineComponent({
  name: "HourlyContainer",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = useStore();
    const hourlyForecast = computed(() => store.getters.getHourlyForecast);
    const unitsType = computed(() => store.getters.getUnitsType);
    const dayPhase = computed(() => store.getters.getDayPhase);
    const now: number = (new Date()).getHours();
    const loading = computed(() => Object.keys(hourlyForecast.value).length === 0);

    const onSwiper = (swiper:any) => {
      console.log(swiper);
    };
    return {
      unitsType,
      hourlyForecast,
      dayPhase,
      now,
      loading,
      onSwiper
    };
  },
});
</script>

<style scoped lang="sass">
.container
  padding: 0 20px
.HourlyContainer
  background-color: $default-bg-light
  height: $height-m
  flex: 1 1 50%
  order: 0
  display: flex
  align-items: center
  .hour-container
    width: 40px !important
    height: $height-m
    user-select: none
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 20px
    padding: 0 18px
    .illustration
      height: 36px
      width: 36px
      padding: 2px 0
    h5
      span
        font-size: 12px !important
        font-weight: 200
      &.skeleton-loading-container
        height: 20px
        width: 33px
    .temp
      font-weight: 500
      &.skeleton-loading-container
        width: 35px
        height: 15px
@media (max-width: 575px)
  .HourlyContainer
    flex: 1 1 100%
@media (max-width: 495px)
  .HourlyContainer
    padding: 0 14px
    .hour-container
      padding: 0 14px
</style>