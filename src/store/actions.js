/**
 * 通过mutation间接更新state的对个方法的对象
 */

import {
    RECEIVE_TOTAL_COUNT,
    RECEIVE_ARITCLE,
    RECEIVE_REQ_ARITCLE,
    RECEIVE_CLASSIFY,
    RECEIVE_USER,
    RECEIVE_ARITCLE_IN_CLASSIFY,
    RECEIVE_HEADER_INDEX
} from './mutation-type'

import {
    listArticle,
    listArticleInClassify,
    listClassify,
    login
} from '../api'

export default {
    async test ({commit,state}){
        // 发送异步ajax请求
        
        const result = await test()
        if(result.Result === 1){
            const listAritcle = result.Data
            // 根据结果提交一个mutation
        }else{
            this.$massage.error("请求分类列表失败！");
        }
        
    },
    // 异步获取文章列表
    async listAritcle ({commit,state},data){
        // 发送异步ajax请求
        const result = await listArticle(data)
        if(result.Result === 1){
            const listAritcle = result.Data
            const articleTotal = result.TotalCount
            // 根据结果提交一个mutation
            commit(RECEIVE_ARITCLE,listAritcle)
            commit(RECEIVE_TOTAL_COUNT,articleTotal)
        }
        
    },
    async listArticleInClassify({commit,state}){
        const result = await listArticleInClassify();
        if(result.Result === 1){
            commit(RECEIVE_ARITCLE_IN_CLASSIFY,result.Data)
        }
    },
    // 修改Header中的激活标志
    headerIndex({commit,state},index){
        commit(RECEIVE_HEADER_INDEX,index);
    },
    // 登录用户
    login({commit,state},user){
        // 修改token，并将token存入localStorage
        localStorage.setItem('Authorization', user.authorization);
        commit(RECEIVE_USER,user);
    },
    // 登出用户
    exitUser({commit,state}){
        // 修改token，删除localStorage中的校验信息
        localStorage.removeItem('Authorization');
        commit(RECEIVE_USER,{});
    }
    // 异步获取分类列表
}