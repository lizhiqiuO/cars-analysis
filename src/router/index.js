import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

import FormulaOne from '@/components/FormulaOne'
Vue.use(Router)

const router = new Router({

  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout
    },
    {
      path: '/FormulaOne',
      component: FormulaOne
    }
  ]
})
// const router = new Router({
//   routes: [{
//     path: '/',
//     component: Layout,
//     children: [
//       {
//         path: '/',
//         component: Layout
//       },
//       {
//         path: '/formulaOne',
//         component: FormulaOne
//       },
//       {
//         path: '/formulaOne/Circuit',
//         component: FormulaOne
//       }
//     ]
//   }]
// })

export default router
