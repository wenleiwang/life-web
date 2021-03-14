// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import hljs from 'highlight.js';
import store from './store'


import './assets/scss/common.css'


Vue.config.productionTip = false

Vue.use(VueAxios, axios)
axios.defaults.headers.common["token"] = ""
axios.defaults.withCredentials = true
// axios.defaults.headers.post["Content-type"] = "application/json"
axios.defaults.baseURL = '/api' //设置统一路径前缀

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
  });

// 导入markdown
import  mavonEditor  from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 导入Element中的分页
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 路由器判断是否登录
router.beforeEach((to, from, next) => {
  if (to.path.search('/admin/*') >= 0) {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '' || token == null || token === 'undefined') {
      next('/login');
    } else {
      next();
    }
  } else {
    next()
  }
}
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

