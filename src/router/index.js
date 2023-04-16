import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import FormulaOne from '@/components/FormulaOne'
import Constructor from '@/components/Constructor'
import Driver from '@/components/Driver'
import WinsDriver from '@/components/Driver/winsDriver'
import WinsConstructor from '@/components/Constructor/WinsConstructor'
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
    },
    {
      path: '/Constructor',
      component: Constructor
    },
    {
      path: '/Driver',
      component: Driver
    },
    {
      path: '/WinsDriver',
      component: WinsDriver
    },
    {
      path: '/WinsConstructor',
      component: WinsConstructor
    }
  ]
})

export default router
