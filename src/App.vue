<template>
  <div id="app">
    <div class="SwitchRouter">
      <SwitchRouter/>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>
<script>

import SwitchRouter from './components/SwitchRouter'
import Layout from './components/Layout.vue'
export default {
  name: 'App',
  components: {
    SwitchRouter,
    Layout
  }
}
</script>
<style>
#app {
  display: flex;
  min-height: 1016px;
  .SwitchRouter {
    flex: 0.5;
  }
  .content {
    display: flex;
    flex: 2;
    justify-content: center;
  }
}


</style>
