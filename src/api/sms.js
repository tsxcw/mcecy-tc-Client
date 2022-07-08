/*
 * @Author: your name
 * @Date: 2021-11-30 10:24:29
 * @LastEditTime: 2021-12-06 09:21:26
 * @LastEditors: Please set LastEditors
 * @Description:短信邮箱相关API
 * @FilePath: \picture-website\src\api\sms.js
 */

import request from "./request";

/**
 * @description:发送短信
 * @param {*} data {phone:手机}
 * @returns
 */
export const sms_code = (data) => {
  return request({
    url: "sms/send",
    method: "post",
    data,
  });
};
