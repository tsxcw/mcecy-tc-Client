import request from "./request";

/**
 * @description 图片列表
 * @param data
 * @returns {*}
 */
export const image_list = (data) => {
    return request({
        url: "image/list",
        method: "post",
        data
    })
}
/**
 * @description 删除图片
 * @param data
 * @returns {*}
 */
export const image_del = (data) => {
    return request({
        url: "image/del",
        method: "post",
        data
    })
}
/**
 * @description 重置图片Token
 * @param data
 * @returns {*}
 */
export const image_reset_token = (data) => {
    return request({
        url: "image/reset_token",
        method: "post",
        data
    })
}
/**
 * @description 图片统计数据
 * @param data
 * @returns {*}
 */
export const image_datebase = (data) => {
    return request({
        url: "image/database",
        method: "post",
        data
    })
}
