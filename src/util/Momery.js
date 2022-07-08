/*
 * @Author: your name
 * @Date: 2021-11-30 09:17:15
 * @LastEditTime: 2021-11-30 15:17:30
 * @LastEditors: Please set LastEditors
 * @Description: 本地储存管理组件
 * @FilePath: \picture-website\src\assets\js\store.js
 */
class Momery {
  Local = null;
  constructor() {
    this.Local = localStorage || window.localStorage;
  }
  /**
   * @description: 设置本地储存
   * @param {*} key 键
   * @param {*} value 值
   * @return {*} this 可实现链式连续调用 obj.set().set();
   */
  set(key, value) {
    if (typeof value == "object") {
      value = JSON.stringify(value);
    }
    this.Local.setItem(key, value);
    return this;
  }
  /**
   * @description: 获取键
   * @param {*} key
   * @return {*} value 返回值
   */
  get(key) {
    let info = this.Local.getItem(key);
    if (info == "" || !info) {
      return "";
    }
    return this.isObj(info);
  }
  /**
   * @description: 判断字符串是不是json对象
   * @param {*} str
   * @return {*}
   */
  isObj(str) {
    if (typeof str == "string") {
      try {
        let obj = JSON.parse(str);
        if (typeof obj == "object" && obj) {
          return obj;
        } else {
          return str;
        }
      } catch (e) {
        return str;
      }
    }
  }
  /**
   * @description: 删除本地储存键
   * @param {*} key
   * @return {*}boolean
   */
  del(key) {
    this.Local.removeItem(key);
    return this; //返回自身，可以实现链式调用new CacheInfo().del(key).del(key).set(key,value);
  }
  /**
   * @description: 清除全部本地储存
   * @param {*}
   * @return {*}boolean
   */
  clear() {
    this.Local.clear();
    return this;
  }
}
export default new Momery();
