<template>
    <div class="subreport-page" loading>
        <div class="sub-box">
            <div class="close" @click="closeThis">
                <el-icon size="22px">
                    <elicon-CloseBold />
                </el-icon>
            </div>
            <div mt class="title">文本内容</div>
            <el-input
                mt
                v-model="report.context"
                type="textarea"
                maxlength="1000"
                show-word-limit
                rows="5"
                :autosize="{ maxRows: 6, minRows: 5 }"
                placeholder="请输入您的意见或问题，如果可以描述详细一点有助于对问题或者建议的处理"
            ></el-input>
            <div mt class="title">附件图片</div>
            <div class="annex">
                <ul>
                    <transition v-for="(item, index) in report.annex_img" :key="index">
                        <li>
                            <div class="delimg" @click="delImg(item)">
                                <el-icon size="22px">
                                    <elicon-CloseBold />
                                </el-icon>
                            </div>
                            <img :src="item" />
                        </li>
                    </transition>
                    <li v-show="report.annex_img.length < 4">
                        <Upfile :limit="4" @upinfo="upinfo" />
                    </li>
                </ul>
            </div>
            <div mt class="title">其他联系方式</div>
            <el-input mt v-model="report.link" type="text" placeholder="邮箱 / QQ / 微信"></el-input>
            <div class="submit" flex>
                <el-button @click="submit" w100 type="primary">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Upfile from "../../../components/upfile.vue";
import { report } from "@api/index.js"
export default {
    data() {
        return {
            report: {
                context: "",
                annex_img: [],
                link: ""
            }
        };
    },
    methods: {
        //关闭自身
        closeThis() {
            this.$emit("close", false)
        },
        delImg(url) {
            const index = this.report.annex_img.findIndex(el => el == url);
            this.report.annex_img.splice(index, 1);
        },
        upinfo(info) {
            if (info) {
                if (this.report.annex_img.length < 4) {
                    this.report.annex_img.push(info)
                } else {
                    this.$message.error("最大上传附件数量4张")
                }
            }
        },
        submit() {
            report(this.report).then(e => {
                if (e.code == 200) {
                    this.$message.success('提交成功')
                    this.closeThis()
                } else {
                    this.$message.warning(e.msg)
                }
            })
        }
    },
    components: { Upfile }
}
</script>

<style lang="scss" scoped>
.subreport-page {
    position: fixed;
    z-index: 90;
    background: rgba(0, 0, 0, 0.288);
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    display: flex;

    > .sub-box {
        position: relative;
        margin: auto;
        padding: 15px 50px 30px;
        width: 565px;
        // height: 534px;
        background: #ffffff;
        box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.3019607961177826);
        border-radius: 10px 10px 10px 10px;
        opacity: 1;
        > .close {
            position: absolute;
            width: 22px;
            height: 22px;
            right: 15px;
        }
        > .title {
            font-size: 15px;
            font-weight: 800;
        }
        > .annex {
            margin-top: 15px;
            > ul {
                display: flex;
                > li {
                    position: relative;
                    border-radius: 8px;
                    background: rgb(236, 236, 236);
                    display: block;
                    width: 130px;
                    height: 130px;
                    margin-right: 15px;
                    flex-shrink: 0;
                    > .delimg {
                        position: absolute;
                        right: -10px;
                        top: -10px;
                        height: 22px;
                        width: 22px;
                        background: rgb(255, 255, 255);
                        box-shadow: 0px 0px 5px #000;
                        border-radius: 20px;
                    }
                    > img {
                        width: 130px;
                        height: 130px;
                        object-fit: contain;
                    }
                }
            }
        }
        > .submit {
            margin-top: 30px;
            height: 45px;
        }
    }
}
</style>