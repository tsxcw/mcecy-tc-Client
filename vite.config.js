/*
 * @Author: your name
 * @Date: 2021-11-17 08:53:10
 * @LastEditTime: 2022-02-14 19:33:36
 * @LastEditors: Please set LastEditors
 * @Description: vite配置表
 * @FilePath: /mcecyClient/vite.config.js
 */
import * as path from 'path';
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
    plugins: [vue()],
    publicPath: "./",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"), //运行目录地址
            "@img": path.resolve(__dirname, "./src/assets/img"), //图片资源地址
            "@util": path.resolve(__dirname, "./src/util"), //js资源地址
            "@com": path.resolve(__dirname, "./src/components"), //组件快捷地址
            "@api": path.resolve(__dirname, "./src/api"), //api文件及
        },
    },
    optimizeDeps: {
        include: ["axios"],
    },
    build: {
        chunkSizeWarningLimit: 2000,
        minify: "terser",
        outDir: "dist",
        assetsDir: "static",
    },
    server: {
        host: "localhost", // ← 新增内容 ←
        port: 9000
    },
    css: {
        preprocessorOptions: {
            scss: {
                charset: false,
            },
        },
    },
});
