<template>
  <div :class="{ 'Menu': true, 'open': isOpen }">
    <button class="menu-button" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="menu-content">
      <ul>
        <li v-for="link in links" :key="link.id">
          <a :href="link.url" target='_blank' rel='noopener noreferrer'>{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      links: [
        {
          label: "Coder's portfolio",
          url: "http://portfolio.tlprc.com/"
        },
        {
          label: "Weather API",
          url: "https://www.weatherapi.com/"
        },
        {
          label: "Design reference",
          url: "https://dribbble.com/shots/22025282-MGC-Weather-Icons-Pack"
        },
        {
          label: "Swiper Vue.js",
          url: "https://swiperjs.com/vue"
        },
        {
          label: "Moon state image",
          url: "https://moonphase.guide/"
        }
      ]
    };
  },
  methods: {
    toggleMenu() { this.isOpen = !this.isOpen }
  },
  mounted() {
    const liElements = this.$el.querySelectorAll('.Menu .menu-content ul li');
    liElements.forEach((li, index) => {
      li.style.transitionDelay = `${index * 0.1}s`;
    });
  }
};
</script>

<style scoped lang="sass">
$breakpoint-xl: 768px
$breakpoint-s: 425px

.Menu
  .menu-button
    position: relative
    position: fixed
    top: 20px
    right: 20px
    background: none
    width: 18px
    height: 20px
    border: none
    outline: none
    transform: scale(1.3)
    cursor: pointer
    z-index: 10
    span
      position: absolute
      right: 50%
      transform: translate(50%, 0)
      width: 18px
      height: 2px
      background-color: white
      transition: 0.3s ease
      &:nth-child(1)
        top: 2px
      &:nth-child(2)
        top: 50%
        transform: translate(50%, -50%)
      &:nth-child(3)
        bottom: 2px
  .menu-content
    position: fixed
    top: 0
    right: 0
    background: black
    width: 100%
    height: 100vh
    padding: 20px
    box-sizing: border-box
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    opacity: 0
    visibility: hidden
    transition: 0.32s
    transition-timing-function: cubic-bezier(0.4, 0, 0.6, 1)
    z-index: 9
    ul
      list-style: none
      padding: 0
      margin: 0
      direction: rtl
      li
        margin: 15px 0
        transform: translateX(100px)
        opacity: 0
        transition-duration: 0.24s
        transition-timing-function: cubic-bezier(0.4, 0, 0.6, 1)
        a
          display: inline-block
          color: #cccccc
          font-size: 64px
          font-family: 'Inter', sans-serif
          font-weight: 400
          text-decoration: none
          transition: 0.2s
          &:hover
            color: white

  &.open
    .menu-button
      span
        top: 50%
        background-color: #cccccc !important
        &:nth-child(1)
          transform: translate(50%, -50%) rotate(-45deg) 
        &:nth-child(2)
          width: 0
        &:nth-child(3)
          transform: translate(50%, -50%) rotate(45deg)
      &:hover
        span
          background-color: white !important
    .menu-content
      opacity: 1
      visibility: visible
      ul
        li
          opacity: 1
          transform: translateX(0)
  @media (max-width: $breakpoint-xl)
    .menu-content
      ul
        li
          a
            font-size: 36px
  @media (max-width: 655px)
    .menu-button
      top: 10px
      right: 10px
  @media (max-width: $breakpoint-s)
    .menu-content
      ul
        li
          a
            font-size: 24px
</style>
