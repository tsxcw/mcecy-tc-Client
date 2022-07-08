<template>
    <div class="report_page">
        <div class="top" flex>
            <Cbutton mlauto type="info" @click="show = true">提交反馈</Cbutton>
            <Subreport v-if="show" @close="show = false" />
        </div>
        <div class="history_list">
            <el-table :data="list" border>
                <el-table-column label="工单ID" prop="id" align="center" width="100px"></el-table-column>
                <el-table-column label="内容" prop="context" align="center"></el-table-column>
                <el-table-column label="客服处理状态" align="center" width="150px">
                    <template #default="scope">
                        <el-tag type="info" v-if="scope.row.is_reply == '1'">待处理</el-tag>
                        <el-tag type="success" v-else>已处理</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="提交时间" prop="addtime" width="170px" align="center"></el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template #default="scope">
                        <el-button type="danger" size="small" @click="openDetail(scope)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-empty v-if="list.length == 0 && read" />
        </div>
        <div class="footer-box">
            <Page :info="pageinfo" @topage="render" />
        </div>
        <el-drawer v-model="detail" title="意见反馈详情" direction="rtl" size="400px">
            <div class="detail_info">
                <div class="title">意见建议:</div>
                <div mt class="content">{{ detailInfo.context }}</div>
                <div mt class="title">附件图片:</div>
                <div mt class="img_list">
                    <transition v-for="(item, index) in detailInfo.annex_img " :key="index">
                        <div>
                            <img :src="item + imageSize(240)" />
                        </div>
                    </transition>
                </div>
                <div mt class="title">客服回复内容:</div>
                <div mt class="content" v-html="remove_xss(detailInfo.reply_text || '暂未回复')"></div>
                <div mt class="time">回复时间：{{ detailInfo.reply_time || '暂未回复' }}</div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import Subreport from "./component/subreport.vue";
import { report_history } from "@api/index.js"
import Page from "../../components/page.vue";
import { remove_xss } from "../../util/xss";
export default {
    components: { Subreport, Page },
    data() {
        return {
            read: false,
            visible: false,
            detail: false,
            show: false,
            list: [],
            pageinfo: false,
            detailInfo: {},
            pagenum:1
        }
    },
    methods: {
        remove_xss,
        async fetchData() {
            try {
                const info = await report_history({ page: this.pagenum })
                if (info.code == 200) {
                    this.pageinfo = info.list
                    this.list = info.list.data
                }
            } catch (error) {

            }
            this.read = true;
        },
        render(e){
            this.pagenum = e;
            this.fetchData()
        },
        openDetail(scope) {
            this.detailInfo = scope.row;
            this.detail = true;
        }
    },
    mounted() {
        this.fetchData()
    },
}
</script>

<style lang="scss">
.report_page {
    position: relative;
    padding: 15px;
    .detail_info {
        position: absolute;
        width: calc(100% - 40px);
        left: 20px;
        height: calc(100% - 100px);
        top: 80px;
        overflow-y: scroll;
        overflow-x:hidden;
        padding-bottom: 15px;
        &::-webkit-scrollbar{
            display: none;
        }
        > .title {
            color: var(--bg2);
        }
        > .img_list {
            display: grid;
            grid-template-columns: 172px 172px;
            grid-column-gap: 15px;
            grid-row-gap: 15px;
            > div {
                height: 172px;
                > img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    margin-right: 15px;
                    background: rgb(240, 240, 240);
                    border-radius: 10px;
                }
            }
        }
        > .content {
            font-size: 13px;
            border-radius: 5px;
            padding: 15px;
            background: rgb(240, 240, 240);
            > img,
            > p > img,
            > *img {
                display: block;
                border-radius: 5px;
                width: 100% !important;
            }
        }
        > .time {
            font-size: 12px;
            color: var(--bg2);
        }
    }
    > .footer-box {
        background: #fff;
        margin-top: 15px;
    }
    > .top {
        padding: 15px;
        background: #fff;
    }
    > .history_list {
        margin-top: 15px;
        padding: 15px;
        background: #fff;
    }
}
</style>
