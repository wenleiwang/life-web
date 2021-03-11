/**
 * 通过mutation间接更新state的对个方法的对象
 */

import {
    RECEIVE_ARITCLE,
    RECEIVE_REQ_ARITCLE,
    RECEIVE_CLASSIFY,
    RECEIVE_USER
} from './mutation-type'

import {
    listArticle,
    listClassify,
    login
} from '../api'

export default {
    async test ({commit,state}){
        // 发送异步ajax请求
        
        const result = await test()
        if(result.Result === 0){
            const listAritcle = result.Data
            // 根据结果提交一个mutation
        }
        
    },
    // 异步获取文章列表
    async listAritcle ({commit,state},data){
        // 发送异步ajax请求
        
        const result = await listArticle(data)
        if(result.Result === 1){
            const listAritcle = result.Data
            // 根据结果提交一个mutation
            commit(RECEIVE_ARITCLE,listAritcle)
        }
        
    },

    login({commit,state},user){
        commit(RECEIVE_USER,user);
    }
    // 异步获取分类列表
}