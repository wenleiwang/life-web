// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/scss/common.css'

Vue.config.productionTip = false
// Vue.use(VueAxios, axios)
axios.get();


Vue.prototype.$axios = axios;
axios.defaults.headers.common["token"] = ""
axios.defaults.withCredentials = true
// axios.defaults.headers.post["Content-type"] = "application/json"
axios.defaults.baseURL = '/api' //设置统一路径前缀


import  mavonEditor  from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

