<template>
  <div class="ForecastContainer">
    <HourlyContainer />
    <CurrentContainer/>
    <DailyContainer />
    <AstroContainer />
    <SettingsContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import CurrentContainer from '@/components/CurrentContainer.vue';
import AstroContainer from '@/components/AstroContainer.vue';
import DailyContainer from '@/components/DailyContainer.vue';
import HourlyContainer from '@/components/HourlyContainer.vue';
import SettingsContainer from '@/components/SettingsContainer.vue';

export default defineComponent({
  name: 'ForecastContainer',
  components: {
    CurrentContainer,
    AstroContainer,
    DailyContainer,
    HourlyContainer,
    SettingsContainer
  },
  setup() {
    const store = useStore();
    onMounted(async () => {
      await store.dispatch('fetchWeatherForecast');
    });
  },
});
</script>

<style lang="sass">
.ForecastContainer
  max-width: 800px
  margin: 0 auto
  min-height: calc(100vh - 80px)
  padding: 40px 15px
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-content: center
  gap: 50px

@media (max-width: 840px) 
  .ForecastContainer
    max-width: 550px
@media (max-width: 580px)
  .ForecastContainer
    max-width: 525px
    padding: 40px 10px
    gap: 25px
@media (max-width: 545px)
  .ForecastContainer
    max-width: 475px
@media (max-width: 495px)
  .ForecastContainer
    max-width: 300px
</style>