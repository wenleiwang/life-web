// 引入VUE
import Vue from 'vue'
// 引入vue-router
import Router from 'vue-router'
// 第三方库需要use一下才能使用
Vue.use(VueRouter)

import VueRouter from 'vue-router'
// 引入模板


import adminIndex from '@/components/admin/adminIndex'
import show from '@/components/show/show.vue'
import indexList from '@/components/admin/indexList.vue'
import adminRedact from '@/components/admin/adminRedact.vue'


// 定义routes路由的集合，数组类型
const routes=[
  {
    path : '/',
    component:show
  },
  {
    path:'/admin/index',
    component:adminIndex
  },
  {
    path:'/admin/indexList',
    component:indexList
  },
  {
    path:'/admin/adminRedact',
    component:adminRedact
  }
]

const router = new VueRouter({
  //ES6简写，等于routes：routes
  routes,
  mode: 'history'
})

export default router