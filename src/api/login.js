/*
 * @Author: your name
 * @Date: 2021-11-19 09:25:46
 * @LastEditTime: 2021-11-19 10:00:41
 * @LastEditors: Please set LastEditors
 * @Description: 登录
 * @FilePath: \xuexi\src\api\login.js
 */
import request from "./request";

export function DD(data){
  return request({
    url: "photo/list",
    method: "post",
    data,
  });
}
