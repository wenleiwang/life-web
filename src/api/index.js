/**
 * 包含N个接口请求函数的模块
 */
import ajax from './ajax'
// 获取文章列表
export const listArticle = (data) => ajax('/listArticle',data,'GET');

// 新增或修改文章
export const updateArticle = (data) => ajax('/admin/updateArticle',data,'POST')

// 删除一条文章
export const deleteArticle = (data) => ajax('/admin/deleteArticle',data,'GET')

// 获取一条文章详情
export const getArticle = (data) => ajax('/admin/getArticle',data,'GET')


/*************************************************************************** classify */
// 用户分类删除
export const deleteClassify = (data) => ajax('/admin/deleteClassify',data,'GET')
// 获取该用户全部分类
export const listClassify = (data) => ajax('/admin/listClassify',data,'GET')
// 用户新增/更新分类
export const updateClassify = (data) => ajax('/admin/updateClassify',data,'GET')

/*************************************************************************** index */
// 获取该用户全部标签
export const listTag = (data) => ajax('/admin/listTag',data,'POST')
// 通过分类ID查用户文章
export const listTagNameByTagId = (data) => ajax('/admin/listTagNameByTagId',data,'POST')

/*************************************************************************** login */
export const login = (data) => ajax('/login',data,'POST')

/*************************************************************************** 上传文件 */
// 上传图片
export const upload = (data) => ajax('/file/upload',data,'POST')

export const test = (data) => ajax('/test',data,GET);