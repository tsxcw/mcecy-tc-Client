/*
 * @Author: your name
 * @Date: 2021-11-18 08:57:34
 * @LastEditTime: 2022-03-16 21:24:19
 * @LastEditors: tushan
 * @Description: 路由配置表
 * @FilePath: /mcecyClient/src/util/Router.js
 */
import Momery from "./Momery";
import {createRouter, createWebHistory} from "vue-router";
import {not_login} from "./plugins";

const routes = [
        {
            path: "/404",
            component: () => import("../views/error/404.vue"),
            meta: {title: "404、走丢了嘤嘤嘤～"},
        },
        {
            path: "/401",
            component: () => import("../views/error/401.vue"),
            meta: {title: "401、无权限"},
        },
        {
            path: "/",
            name: "Picture",
            component: () => import("../views/picture/index.vue"),
            meta: {title: "图片上传|图床"}
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../views/login/index.vue"),
            meta: {title: "图床 | 登录"},
        },
        {
            path: "/image",
            component: () => import("../views/image/index.vue"),
            meta: {islogin: true, title: '图片管理'},
            children: [{
                path: "database",
                component: () => import("../views/image/datebase.vue"),
                meta: {title: '数据管理', islogin: true}
            },
                {
                    path: "report",
                    component: () => import("../views/image/report.vue"),
                    meta: {title: '意见反馈', islogin: true}
                }, {
                    path: '',
                    component: () => import("../views/image/photoManage.vue"),
                    meta: {title: "图床数据管理", islogin: true}
                },
                {
                    path: 'news',
                    component: () => import("../views/image/news.vue"),
                    meta: {title: '站内新闻', islogin: true}
                },
                {
                    path: 'Safety',
                    component: () => import("../views/image/Safety.vue"),
                    meta: {title: '安全管理', islogin: true}
                }]
        },
        {
            path: "/UserAgreement",
            component: () => import("../views/login/UserAgreement.vue"),
            meta: {title: '用户协议'}
        }
    ]
;
const router = createRouter({
    history: createWebHistory(),
    routes,
});
/*路由守卫*/
router.beforeEach((to, from, next) => {
    document.title = to.meta?.title || "图床"; //设置页面的标题
    window.scrollTo(0, 0)
    if (to['meta']['islogin']) {
        if (!Momery.get("token")) {
            not_login();//没有登录提示
            next("/login");
            return;
        }
    }
    if (to.matched.length === 0) {
        next("/404");
    } else {
        next();
    }
});
window.router = router;
export default router;
