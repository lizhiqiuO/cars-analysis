<template>
  <div class="layout">
      <router-view>
        <FormulaOne/>
      </router-view>
  </div>
</template>

<script>
import FormulaOne from './FormulaOne/index.vue'
export default {
  name: 'layout',
  data () {
    return {
      navShow: true
    }
  },
  methods: {
  },
  components: {
    FormulaOne
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
