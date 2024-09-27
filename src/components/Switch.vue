<template>
  <div class="switch" :class="{ 'switch--on': modelValue }" @click="toggleSwitch">
    <div class="switch__handle"></div>
  </div>
</template>

<script>
export default {
  name: "CustomSwitch",
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ["update:modelValue"],
  methods: {
    toggleSwitch() {
      this.$emit("update:modelValue", !this.modelValue);
    }
  }
};
</script>

<style scoped lang="sass">
.switch
  display: block
  width: 50px !important
  height: 28px
  border-radius: 14px
  background-color: $bg-sunny
  position: relative
  cursor: pointer
  transition: background-color 0.3s ease

  &--on
    background-color: $bg-sunny

  &__handle
    height: calc( 100% - 4px )
    aspect-ratio: 1
    background-color: #fff
    border-radius: 50%
    position: absolute
    top: 2px
    left: 2px
    transition: 0.3s ease

    .switch--on &
      left: calc( 100% - 26px )

</style>
