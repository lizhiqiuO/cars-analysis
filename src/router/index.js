import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

import FormulaOne from '@/components/FormulaOne'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    component: Layout,
    redirect: 'formulaOne',
    children: [
      {
        path: 'formulaOne',
        component: FormulaOne
      }]
  }]
})
