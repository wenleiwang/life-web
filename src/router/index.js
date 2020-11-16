import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Myfirst from '@/components/myfirst'
import adminIndex from '@/components/admin/adminIndex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/myfirst',
      name: 'myfirst',
      component: Myfirst
    },
    {
      path: '/adminIndex',
      name: 'adminIndex',
      component: adminIndex
    }
  ]
})
