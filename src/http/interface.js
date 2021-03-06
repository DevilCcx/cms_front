/**
 * 将所有接口统一起来便于维护
 */
import axios from './api';

//用户登陆
export const login = (params) => {
    return axios({
        url: 'auth/login',
        method: 'post',
        params
    });
};

//获取文章列表
export const getArticleList = (params) => {
    return axios({
        url: 'article/list',
        method: 'get',
        params
    });
};

//获取文章内容
export const getArticle = (params) => {
    return axios({
        url: 'article',
        method: 'get',
        params
    });
};

//新建
export const writeArticle = (data) => {
    return axios({
        url: 'article/new',
        method: 'post',
        data
    })
};

//删除
export const deleteArticle = params => {
    return axios({
        url: 'article/delete',
        method: 'post',
        params
    })
};

//发布
export const deploy = params => {
    return axios({
        url: 'article/deploy',
        method: 'get',
        params
    })
};

//图片存储
export const saveImage = data => {
    return axios({
        url: 'image/save',
        method: 'post',
        data
    })
};

export default {
    getArticleList,
    login,
    getArticle,
    writeArticle,
    deleteArticle,
    deploy,
    saveImage
}
