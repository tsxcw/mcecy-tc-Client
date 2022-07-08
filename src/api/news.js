/*
 * @Author: tushan
 * @Date: 2022-03-06 15:53:46
 * @LastEditors: tushan
 * @LastEditTime: 2022-03-06 15:55:11
 * @Description: 站内新闻
 */

import request from "./request";
/**
 * @param {*} data
 * @Description: 新闻列表
 */
export const news_list = (data = {}) => {
  return request({
    url: '/news/list',
    method: "get",
    params: data
  })
}