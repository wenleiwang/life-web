// 引入VUE
import Vue from 'vue'
// 引入vue-router
import Router from 'vue-router'
// 第三方库需要use一下才能使用
Vue.use(VueRouter)

import VueRouter from 'vue-router'
// 引入模板

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

import admin from '@/components/admin/admin'
import adminIndex from '@/components/admin/adminIndex'
import show from '@/components/show/show.vue'
import classify from '@/components/show/classify.vue'
import pigeonhole from '@/components/show/pigeonhole.vue'
import showMe from '@/components/show/showMe.vue'
import seeArticle from '@/components/show/seeArticle.vue'
import indexList from '@/components/admin/indexList.vue'
import adminRedact from '@/components/admin/adminRedact.vue'



// 定义routes路由的集合，数组类型
const routes=[
  {
    path : '/',
    component:show
  },{
    path : '/classify',
    component:classify,
    name: 'classify'
  },{
    path : '/pigeonhole',
    component:pigeonhole,
    name: 'pigeonhole'
  },{
    path : '/showMe',
    component:showMe,
    name: 'showMe'
  },
  {
    path:'/admin/',
    component:admin,
    name:'admin'
  },
  {
    path:'/admin/index',
    component:adminIndex,
    name:'adminIndex'
  },
  {
    path:'/admin/indexList',
    component:indexList,
    name:'indexList'
  },
  {
    path:'/admin/adminRedact',
    component:adminRedact,
    name : 'adminRedact'
  },
  {
    name : 'seeArticle',
    path:'/show/seeArticle',
    component:seeArticle,
  }
]

const router = new VueRouter({
  //ES6简写，等于routes：routes
  routes,
  mode: 'history'
})

export default router