// 引入VUE
import Vue from 'vue'
// 引入vue-router
import Router from 'vue-router'
// 第三方库需要use一下才能使用
Vue.use(VueRouter)

import VueRouter from 'vue-router'
// 引入模板
import page1 from '@/components/admin/adminRedact.vue'
import page2 from '@/components/admin/adminInfo.vue'
import adminIndex from '@/components/admin/adminIndex'


// 定义routes路由的集合，数组类型
const routes=[
  // 单个路由均为对象类型，path代表的是路径，component代表的是组件
  {path:'/admin/:name',component:adminIndex}
  // // 可以配置重定向
  // {path:'',redirect:"page1"},
]

const router = new VueRouter({
  //ES6简写，等于routes：routes
  routes
})
export default router