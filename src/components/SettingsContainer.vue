<template>
  <div class="SettingsContainer container">
    <h3>Settings</h3>
    <div class="toggle-block">
      <Switch v-model="isUnitSwitchOn" />
      <div class="indicators">
        <span :class="!isUnitSwitchOn && 'bold'">°F</span>
        <span :class="isUnitSwitchOn && 'bold'">°C</span>
      </div>
    </div>
    <div class="toggle-block">
      <Switch v-model="isThemeSwitchOn" />
      <div class="indicators">
        <span :class="!isThemeSwitchOn && 'bold'">Day</span>
        <span :class="isThemeSwitchOn && 'bold'">Night</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import Switch from './Switch.vue';

export default defineComponent({
  name: "SettingsContainer",
  components: {
    Switch
  },
  setup() {
    const store = useStore();
    
    // Reactive variable for switch state
    const isUnitSwitchOn = ref(false);
    const isThemeSwitchOn = ref(false);

    // Get the value of unitsType from the store
    const unitsType = computed(() => store.getters.getUnitsType);
    const dayPhase = computed(() => store.getters.getDayPhase);

    // Watch for changes in isUnitSwitchOn and toggle unitsType accordingly
    watch(isUnitSwitchOn, (newValue) => {
      console.log('Units switch toggled:', newValue);
      newValue ? store.commit('setUnitsType', 'metric') : store.commit('setUnitsType', 'imperial');
    });

    // Watch for changes in isThemeSwitchOn and toggle unitsType accordingly
    watch(isThemeSwitchOn, (newValue) => {
      console.log('Theme switch toggled:', newValue);
      newValue ? store.commit('setDayPhase', 'night') : store.commit('setDayPhase', 'day');
    });

    // Run only once when the component is mounted
    onMounted(() => {
      if (unitsType.value === 'metric') {
        isUnitSwitchOn.value = true;  // Force the switch to 'On' if metric
      } else if (unitsType.value === 'imperial') {
        isUnitSwitchOn.value = false; // Force the switch to 'Off' if imperial
      }

      if (dayPhase.value === 'night') {
        isThemeSwitchOn.value = true;  // Force the switch to 'On' if night
      } else if (dayPhase.value === 'day') {
        isThemeSwitchOn.value = false; // Force the switch to 'Off' if day
      }
    });

    return {
      isUnitSwitchOn,
      isThemeSwitchOn,
      unitsType,
    };
  },
});
</script>

<style scoped lang="sass">
.SettingsContainer
  order: 8
  background-color: $default-bg-dark
  height: $height-l
  width: 200px
  padding: 20px
  display: flex
  flex-direction: column
  gap: 7px
  .toggle-block
    display: flex
    align-items: center
    gap: 10px
    .indicators
      display: flex
      gap: 5px
      span
        font-size: 16px
        opacity: 0.5
        transition: 0.2s
        &.bold
          font-weight: 500
          opacity: 1
@media (max-width: 840px)
  .SettingsContainer
    order: 3
    height: $height-m
@media (max-width: 495px)
  .SettingsContainer
    height: $height-l
    padding: 15px
    width: 107px
    order: 8
    .toggle-block
      align-items: start

      flex-direction: column
      .switch
        order: 1
      .indicator
        order: 0
</style>
