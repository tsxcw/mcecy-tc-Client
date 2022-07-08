/*
 * @Author: your name
 * @Date: 2021-11-30 09:20:13
 * @LastEditTime: 2022-03-05 22:39:51
 * @LastEditors: tushan
 * @Description: js插件组建全局挂载文件
 * @FilePath: /mcecyClient/src/util/plugins.js
 */
import Momery from "./Momery"; //本地储存管理插件
import Sort from "./Sort"; //二维数组排序组件
import vuex from "./Vuex"; //状态管理组件
import router from "./Router"; //路由表组件
import element, {ElNotification} from "element-plus"; //element
import "element-plus/dist/index.css"; //element Css样式
import zhCn from "element-plus/lib/locale/lang/zh-cn"; //element中文语言包
import "@/assets/css/global.scss"; //全局css
import globalComponent from "@com/plugins.js"; //全局Vue组件
import 'animate.css';
import {Sleep} from "./Debounce";

/**
 * @description: 没有登录提示
 * @param {*}
 * @return {*}
 */
export const not_login = () => {
    ElNotification({
        title: "您还没有登录呢 ✧(≖ ◡ ≖✿)",
        message: "需要登录才可以进行该操作",
        duration: 3000,
    });
}

/**
 * @description: cdn图片尺寸参数生成
 * @param {*} size 图片宽度尺寸；高度等比例
 * @return {*} String
 */
const imageSize = (size = 350, quality = 100) => {
    return `?imageMogr2/thumbnail/${size}x/quality/${quality}`
}
const sizeFormat = (size) => {
    if (size == undefined) {
        return 0;
    }
    if (size < 1000) {
        return (size * 1).toFixed(2) + 'KB';
    }
    if (size < 1000 * 1000) {
        return (size / 1000).toFixed(2) + 'MB'
    }
    if (size < 1000 * 1000 * 1000) {
        return (size / 1000 / 1000).toFixed(2) + 'GB'
    }
    if (size < 1000 * 1000 * 1000 * 1000) {
        return (size / 1000 / 1000 / 1000).toFixed(2) + 'TB'
    }
    if (size < 1000 * 1000 * 1000 * 1000 * 1000) {
        return (size / 1000 / 1000 / 1000 / 1000).toFixed(2) + 'PB'
    }
}
/**
 * @description: 将数字格式化为带单位的展示内容
 * @param {*} num 数字
 * @return {*} 字符串
 */
const numberFormat = (num) => {
    if (!num) {
        return 0;
    }
    if (Number(num) >= 100000000) {
        return (num / 100000000).toFixed(2) + '亿';
    }
    if (Number(num) >= 10000) {
        return (num / 10000).toFixed(2) + '万';
    }

    return num;
}
/**
 * @description: 锁定页面滚动
 * @param {*} {status:true|false} true锁定｜false取消锁定
 * @return {*}
 */
const bodylock = (status) => {
    if (status) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
}
/**
 * @description: 动画执行函数 animate.css库
 * @param {*} event dom节点
 * @param {*} AnimateClassName animate的动画类名 无需animate__前缀
 * @param {*} time 动画时间 默认2秒
 * @return {*}
 */
const animate = async (event, AnimateClassName, time = 2) => {
    const dom = event.target.classList;
    AnimateClassName = 'animate__' + AnimateClassName;
    dom.add("animate__animated", AnimateClassName);
    await Sleep(time * 1000);
    dom.remove(AnimateClassName);
}


export const copy = (text) => {
    navigator.clipboard.writeText(text).then(e => {
    }).catch(e => {
        let input = document.createElement("textarea");
        document.body.appendChild(input)
        input.value = text
        input.select()
        document.execCommand("COPY");
        input.remove();
    })
}


export default {
    v: undefined,
    install(Vue) {
        this.v = Vue;
        Vue.directive("animate", {
            mounted(event, info) {
                animate({target: event}, info.value)
            },
        })
        this.Use(vuex);
        this.Use(element, {locale: zhCn});
        this.Use(router);
        this.Use(globalComponent);
        this.Set("not_login", not_login);
        this.Set("copy", copy);
        this.Set("animate", animate);
        this.Set('bodylock', bodylock);
        this.Set("numberFormat", numberFormat);
        this.Set("Momery", Momery);
        this.Set("Sort", Sort);
        this.Set("imageSize", imageSize)
        this.Set("sizeFormat", sizeFormat)
    },
    /**
     * @description:Vue挂载组件方法
     * @param {*} obj 组件对象
     * @param {*} other 额外参数
     */
    Use(obj, other = {}) {
        this.v.use(obj, other);
    },
    /**
     * @description:Vue全局方法挂载
     * @param {*} key 方法名
     * @param {*} value 方法函数
     */
    Set(key, value) {
        this.v.config.globalProperties[key] = value;

    },
};
