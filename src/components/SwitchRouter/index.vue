<template>
  <div class="router">
    <a-menu
      theme="dark"
      mode="inline"
      style="width: 100%; height: 100%"
    >
      <a-sub-menu>
        <span slot="title">
          <a-icon type="user" />
          <span>Driver's standings</span>
        </span>
        <a-menu-item @click="jumpToRouter(router.WinsDriver)">
          wins by a driver
        </a-menu-item>
        <a-menu-item @click="jumpToRouter(router.Driver)">
          by year
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu>
        <span slot="title">
          <a-icon type="car" />
          <span>Constructors's standings</span>
        </span>
        <a-menu-item @click="jumpToRouter(router.WinsConstructor)">
          all Constructors
        </a-menu-item>
        <a-menu-item @click="jumpToRouter(router.Constructor)">
          by year
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item @click="jumpToRouter(router.FormulaOne)">
          <a-icon type="flag" />
          <span>Circuits Map</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      router: {
        FormulaOne: 'FormulaOne',
        Constructor: 'Constructor',
        WinsConstructor: 'WinsConstructor',
        Driver: 'Driver',
        WinsDriver: 'WinsDriver'
      }
    }
  },
  methods: {
    jumpToRouter (router) {
      console.log('router', router)
      this.$router.push({
        path: router
      })
    }
  },
  components: {
  }
}
</script>
<style scoped="less">
.router {
  height: 100%;
}
</style>
