/*
 * @Author: your name
 * @Date: 2021-12-15 10:14:09
 * @LastEditTime: 2021-12-15 10:18:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \picture-website\src\views\index\contenrWidth.js
 */
export default {
    data() {
        return {
            public_width: {
                width: "calc(100% - 100px)",
            },
        }
    },
    methods: {
        /**计算当前页面下的所有模块的宽度 */
        render_box() {
            let P = Math.floor((innerWidth - 50 + 15) / 230);
            //最多一行8个
            if (P >= 8) {
                P = 8;
            }
            //最少一行4个
            if (P <= 4) {
                P = 4;
            }
            let w = 230 * P;
            this.public_width.width = w - 15 + "px";
        },
    },
    created() {
        this.render_box();
    },
    computed: {
        width() {
            return this.$store.state.window.innerWidth;
        },
    },
    watch: {
        width(e) {
            //监听宽度变化修改盒子尺寸
            this.render_box();
        },
    },
}