// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/css/common.css'
import * as echarts from 'echarts'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(Antd)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
