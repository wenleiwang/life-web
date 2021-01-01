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
import seeArticle from '@/components/show/seeArticle.vue'
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
  },
  {
    name : 'seeArticle',
    path:'/show/seeArticle',
    component:seeArticle,
    beforeRouteUpdate  : (to,from,next) => {
      debugger
      document.cookie="user_info=1;path = /"
      this.$axios({
        url :'/admin/getArticle',
        method : 'get',
        data: this.push
    }).then((url) => {
        if(url.data.Result == 1){
          this.article = url.data.Data.articleBody
          debugger
        }else{
            alert(url.data.Message)
        }
    })
    }
  }
]

const router = new VueRouter({
  //ES6简写，等于routes：routes
  routes,
  mode: 'history'
})

export default router