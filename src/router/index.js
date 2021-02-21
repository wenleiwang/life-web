// 引入VUE
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 第三方库需要use一下才能使用
Vue.use(VueRouter)
// 引入模板

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

import admin from '@/components/admin/admin'
import adminIndex from '@/components/admin/adminIndex'
import login from '@/components/admin/login'

import show from '@/components/show/show.vue'
import classify from '@/components/show/classify.vue'
import pigeonhole from '@/components/show/pigeonhole.vue'
import showMe from '@/components/show/showMe.vue'
import seeArticle from '@/components/show/seeArticle.vue'
import adminIndexNew from '@/components/admin/indexList.vue'
import adminRedact from '@/components/admin/adminRedact.vue'

// admin下的子路由
import redact from '@/pages/AdminRedact/redact.vue'
import me from '@/pages/Me/me.vue'
import updatePassword from '@/pages/updatePassword/updatePassword.vue'
import indexList from '@/pages/IndexList/indexList.vue'

// 定义routes路由的集合，数组类型
const routes=[
  {
    path : '/',
    component:show,
    meta: {
      requireAuth: true
    }
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
    name:'admin',
    children:[
      {
        path : '/admin/redact',
        component:redact,
        name: 'redact'
      },
      {
        path : '/admin/me',
        component:me,
        name: 'me'
      },
      {
        path : '/admin/updatePassword',
        component:updatePassword,
        name: 'updatePassword'
      },
      {
        path : '/admin/indexList',
        component:indexList,
        name: 'indexList'
      }
    ]
  },
  {
    path:'/login',
    component:login,
    name:'login'
  },
  {
    path:'/admin/index',
    component:adminIndex,
    name:'adminIndex'
  },
  {
    path:'/admin/indexList',
    component:adminIndexNew,
    name:'adminIndexNew'
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