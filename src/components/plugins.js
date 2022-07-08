/*
 * @Author: your name
 * @Date: 2021-11-26 09:45:03
 * @LastEditTime: 2021-12-15 10:49:45
 * @LastEditors: Please set LastEditors
 * @Description:全局组件挂载文件
 * @FilePath: /图片网站/src/components/plugins.js
 */
import avatar from "./avatar.vue"; //小头像组建
import navigation from "./navigation.vue"; //顶部导航栏
import * as elIcon from "@element-plus/icons"; //element全局icon
import upTop from "./upTop.vue";
import page from "./page.vue";
import Cbutton from "./Cbutton.vue";
export default {
  install(Vue) {
    Object.keys(elIcon).forEach((e) => {
      Vue.component(`elicon${e}`, elIcon[e]);
    });
    Vue.component("Cbutton", Cbutton);
    Vue.component("page", page);
    Vue.component('upTop', upTop);
    Vue.component("navigation", navigation);
    Vue.component("avatar", avatar);
  },
};
