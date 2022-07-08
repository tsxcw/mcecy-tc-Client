/*
 * @Author: your name
 * @Date: 2021-11-30 10:19:26
 * @LastEditTime: 2022-01-07 11:38:03
 * @LastEditors: Please set LastEditors
 * @Description: 一些不需要认证的接口
 * @FilePath: /图片网站/src/api/index.js
 */
import request from "./request";

/**
 * @description:首页列表展示数据
 * @returns object
 */
export const friend = (data) => {
    return request({
        url: "index/friend",
        method: "PUT",
        params: data,
    });
};

/**首页轮播图 */
export const banner = (data) => {
    return request({
        url: 'index/banner',
        method: 'GET',
        params: data
    })
}


/**意见建议提交 */
export const report = (data) => {
    return request({
        url: 'index/report_add',
        method: 'post',
        data
    })
}


/**意见建议提交 */
export const report_history = (data) => {
    return request({
        url: 'index/report_history',
        method: 'get',
        params: data
    })
}

export const settings = (data) => {
    return request({
        url: 'index/settings',
        method: 'get',
        params: data
    })
}
