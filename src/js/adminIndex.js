import Vue from 'vue'
import one from '../components/admin/adminIndex.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(one)
})
