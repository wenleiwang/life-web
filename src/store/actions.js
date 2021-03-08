/**
 * 通过mutation间接更新state的对个方法的对象
 */

import {
    RECEIVE_ARITCLE,
    RECEIVE_REQ_ARITCLE,
    RECEIVE_CLASSIFY
} from './mutation-type'

import {
    listArticle,
    listClassify
} from '../api'

export default {
    async test ({commit,state}){
        // 发送异步ajax请求
        
        const result = await test()
        if(result.Result === 0){
            const listAritcle = result.Data
            // 根据结果提交一个mutation
            commit(RECEIVE_ARITCLE,listAritcle)
        }
        
    },
    // 异步获取文章列表
    async listAritcle ({commit,state}){
        // 发送异步ajax请求
        
        const result = await reqAritcle(state.reqAritcle)
        if(result.Result === 0){
            const listAritcle = result.Data
            // 根据结果提交一个mutation
            commit(RECEIVE_ARITCLE,listAritcle)
        }
        
    }
    // 异步获取分类列表
}