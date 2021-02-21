// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import hljs from 'highlight.js';


import './assets/scss/common.css'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

// Vue.use(hljs.vuePlugin);


// Vue.prototype.$axios = axios; 改用VueAxios绑定
axios.defaults.headers.common["token"] = ""
axios.defaults.withCredentials = true
// axios.defaults.headers.post["Content-type"] = "application/json"
axios.defaults.baseURL = '/api' //设置统一路径前缀

// 导入markdown
import  mavonEditor  from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 导入Element中的分页
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // if (state.user.username) {
    //   next()
    // } else {
    //   next({
    //     path: 'login',
    //     query: {redirect: to.fullPath}
    //   })
    // }
    next()
  } else {
    next()
  }
}
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

