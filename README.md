<!--
 * @Author: tushan
 * @Date: 2022-04-15 20:12:55
 * @LastEditors: tushan
 * @LastEditTime: 2022-07-08 17:14:54
 * @Description: 
-->
# 创次元图床

**本程序为图床程序，用于存储图片实现图片外链功能而开发。**

### 后台管理系统地址 https://github.com/tsxcw/mcecy-tc-admin

项目所采用相关三方库

* 本程序基于由 Vue3 JavaScript框架开发
* 本程序部分UI组件采用element-ui实现
* 本程序采用Vite作为构建工具

官网地址 [点击此处查看](https://mcecy.com)

**推荐采用前后端域名分离部署图床程序**

1，编辑 logo。请替换 logo项目根目录/public/logo.png，

2，程序 title 等信息，请直接修改 根目录 index.html 信息。

3，修改程序接口，轻修改.env.production 文件中的 VITE_APP_BASE_API 为您部署的后端的域名**https://api.xx.cn/api**。

4，新建网站，创建一个目录作为前端程序目录

5，打包，运行    `npm run build ` 打包完成后请上传至您的网站即可。

6，将网站运行目录改为 dist。

前端和后台管理 nginx 配置
```
   location /
    {
        try_files $uri $uri/ /index.html?$args;
    }
```
**假设前端的网站域名为 https://xx.xn**
** 默认前端 logo，名称都是默认的，需要您替换并且重新打包。上传到您的网站。**
