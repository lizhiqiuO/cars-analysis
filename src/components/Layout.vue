<template>
  <div class="layout">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'layout',
    data () {
      return {
        navShow: true
      }
    },
    methods: {
      navBtn () {
        this.navShow = !this.navShow
      }
    }
  }
</script>
<style scoped>
  .layout {
    width: 100%;
    height: 100%;
    background-color: black;
  }
</style>
