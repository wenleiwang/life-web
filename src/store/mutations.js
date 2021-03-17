/**
 * 直接更新state多个方法的对象
 */
import {
    RECEIVE_TOTAL_COUNT,
    RECEIVE_ARITCLE,
    RECEIVE_CLASSIFY,
    RECEIVE_REQ_ARITCLE,
    RECEIVE_USER
} from './mutation-type'

export default {
    [RECEIVE_REQ_ARITCLE] (state, {reqArticle}){
        state.reqArticle = reqArticle
    },
    [RECEIVE_ARITCLE] (state, listAritcle){
        state.listAritcle = listAritcle
    },
    [RECEIVE_TOTAL_COUNT] (state, articleTotal){
        state.articleTotal = articleTotal
    },

    [RECEIVE_CLASSIFY](state, {listClassify}){
        state.listClassify = listClassify
    },

    [RECEIVE_USER](state, user){
        state.user = user
        state.Authorization = user.authorization;
    },
    addmu(state){
        state.name++
    }
}