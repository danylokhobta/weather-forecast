<template>
  <ForecastContainer />
  <MenuComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ForecastContainer from './components/ForecastContainer.vue';
import MenuComponent from './components/MenuComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    ForecastContainer,
    MenuComponent
  }
});
</script>
