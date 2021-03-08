/**
 * VUEX最核心的管理对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutaion from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    // mutaion,
    mutations : {
        addmu(state){
            state.name++
        }
    },
    actions,
    getters
})