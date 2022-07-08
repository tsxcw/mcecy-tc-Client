/*
 * @Author: tushan
 * @Date: 2021-12-01 20:26:33
 * @LastEditTime: 2022-01-15 21:58:59
 * @Description: 文件上传相关接口
 * @FilePath: /mcecyClient/src/api/upfile.js
 */
import Momery from "../util/Momery";
import request from "./request";
/**
 * @description:文件上传
 * @param {*} file 文件fromData对象
 * @param {*} call 接收上传进度的回调函数 可选
 * @returns result
 */
export const upfile = (file, call) => {
  return request({
    url: "file/upload",
    method: "post",
    data: file,
    timeout: 60000,
    onUploadProgress: function (e) {
      //获取进度并且回调
      const total = e.total;
      const now = e.loaded;
      const loading = parseFloat((now / total) * 100).toFixed(2);
      call && call(loading);
    },
  });

};
/**图床 */
export const image_tu = (file, call) => {
  return request({
    url: "file/image_tu",
    method: "post",
    data: file,
    params: {
      token: Momery.get("info").image_token
    },
    timeout: 60000,
    onUploadProgress: function (e) {
      //获取进度并且回调
      const total = e.total;
      const now = e.loaded;
      const loading = parseFloat((now / total) * 100).toFixed(2);
      call && call(loading);
    },
  });
}
