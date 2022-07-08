/*
 * @Description: ...VUEX状态管理
 * @Date: 2020-12-15 00:37:51
 * @LastEditTime: 2021-12-12 22:33:58
 * @msg: ..
 */
import {createStore} from "vuex";
import {user_info} from "../api/user";
import Momery from "./Momery";
import {useRouter} from "vue-router";

const islogin = Momery.get("token") ? true : false;
const store = createStore({
    state() {
        return {
            scrollTop: 0,
            window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
            },
            islogin: islogin,
            index: 0,
            setting:{},
            userinfo: Momery.get("info") || {}, //如果本地有个人信息就用本地的，否则就留空
        };
    },
    mutations: {
        /**
         * @description: 更新用户信息的
         * @param {*} state Vuex的state对象，不需要调用者传递过来
         * @return {*}
         */
        async updateUserInfo(state) {
            let info = await user_info(); //获取用户信息
            if (info.code == 999) {
                //token失效后删除本地储存的token和信息
                Momery.del("token").del("info");
                state.islogin = false;
            } else if (info.code == 200) {
                //更新信息
                state.islogin = true;
                state.userinfo = info.data; //储存到用户信息仓库
                Momery.set("info", info.data); //保存到本地;//储存信息到本地
            }
        },
        /**退出登录方法 */
        async login_out(state) {
            Momery.del("token").del("info");
            state.userinfo = {};
            state.islogin = false;
            await useRouter().replace("/login")
        },
        /**设置窗口的宽高数据 */
        async resetWindow(state) {
            state.window.innerWidth = window.innerWidth;
            state.window.innerHeight = window.innerHeight;
        },
        /**设置窗口滚动的高度记录 */
        async scrollTop(state) {
            state.scrollTop =
                document.scrollingElement.scrollTop || document.body.scrollTop;
        },
    },
    getters: {
        /**获取是否登录 */
        islogin(state) {
            if (Momery.get("token")) {
                return true;
            } else {
                return false;
            }
        },
    },
});
export default store;
