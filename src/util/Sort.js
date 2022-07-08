/*
 * @Author: your name
 * @Date: 2021-11-30 09:38:27
 * @LastEditTime: 2021-11-30 19:20:36
 * @LastEditors: Please set LastEditors
 * @Description: 排序组件
 * @FilePath: /图片网站/src/util/Sort.js
 */

class sort {
  /**
   * @description:升序 排序根据哪那个字段,适用于二维数组排序
   * @param {*}arr 要排序的数组
   * @param {*}key 需要排序的键名
   * @return {*}
   */
  up(arr = [], key) {
    let tmp = JSON.parse(JSON.stringify(arr)); //深拷贝一份
    tmp.sort(function (a, b) {
      a = !isNaN(Number(a[key])) ? a[key] : a[key].charCodeAt(0); //判断是不是数字,数字则不处理,不是数字则转为对应ascii码
      b = !isNaN(Number(b[key])) ? b[key] : b[key].charCodeAt(0);
      return a - b;
    });
    return tmp;
  }

  /**
   * @description: 降序 排序根据哪那个字段,适用于二维数组排序
   * @param {*}arr 要排序的数组
   * @param {*}key 需要排序的键名
   * @return {*}
   */
  down(arr = [], key) {
    let tmp = JSON.parse(JSON.stringify(arr)); //深拷贝一份
    tmp.sort(function (a, b) {
      a = !isNaN(Number(a[key])) ? a[key] : a[key].charCodeAt(0);
      b = !isNaN(Number(b[key])) ? b[key] : b[key].charCodeAt(0);
      return b - a;
    });
    return tmp;
  }
}

export default new sort();
