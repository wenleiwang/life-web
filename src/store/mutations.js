/**
 * 直接更新state多个方法的对象
 */
import {
    RECEIVE_ARITCLE,
    RECEIVE_CLASSIFY,
    RECEIVE_REQ_ARITCLE
} from './mutation-type'

export default {
    [RECEIVE_REQ_ARITCLE] (state, {reqArticle}){
        state.reqArticle = reqArticle
    },
    [RECEIVE_ARITCLE] (state, listAritcle){
        debugger
        state.listAritcle = listAritcle
    },

    [RECEIVE_CLASSIFY](state, {listClassify}){
        state.listClassify = listClassify
    },
    addmu(state){
        state.name++
    }
}