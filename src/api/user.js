/*
 * @Author: your name
 * @Date: 2021-11-30 15:57:57
 * @LastEditTime: 2021-12-19 20:28:21
 * @LastEditors: Please set LastEditors
 * @Description:用户操作相关，登录注册信息查看等
 * @FilePath: /图片网站/src/api/user.js
 */
import request from "./request";

/**
 * @description: 获取用户信息
 * @param {*} 不用传递任何信息
 * @return {*} userinfo（object）
 */
export const user_info = (data) => {
  return request({
    url: "user/info",
    method: "PUT",
    params: data,
  });
};

/**
 * @description: 登录
 * @param {*} {user:账号｜手机号，code:验证码}
 * @return {*}
 */
export const user_login = (data) => {
  return request({
    url: "user/login",
    method: "POST",
    data,
  });
};
/**
 * @description:短信登录
 * @param {*} data
 * @returns
 */
export const code_login = (data) => {
  return request({
    url: "user/code_login",
    method: "POST",
    data
  })
}

/**
 * @description:二维码登录
 */
export const qrcode_login = (data) => {
  return request({
    url: "/user/qrcode_login",
    method: "POST",
    data
  })
}

/**修改个人信息 */
export const upinfo = (data) => {
  return request({
    url: "user/upinfo",
    method: "post",
    data
  })
}

/**修改个人密码 */
export const resetPass = (data) => {
  return request({
    url: "user/resetPass",
    method: "post",
    data
  })
}
