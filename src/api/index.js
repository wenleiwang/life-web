/**
 * 包含N个接口请求函数的模块
 */
import ajax from './ajax'
// 获取文章列表
export const listArticle = (data) => ajax('/listArticle',data,'GET');
export const test = (data) => ajax('/test',data,GET);