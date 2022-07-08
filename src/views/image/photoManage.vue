<template>
  <div class="photoManage">
    <Datebase/>
    <div class="settings-box" mt>
      <div v-show="selects.length" mr>
        <el-button size="small" type="primary" @click="copy_select">批量复制</el-button>
        <el-button size="small" type="warning">批量删除</el-button>
      </div>
      <!-- <div mr>
          <el-button size="small" @click="getList">链接导出</el-button>
      </div>-->
      <div mlauto>
        <el-button size="small" @click="look_token">图床TOKEN</el-button>
      </div>
    </div>
    <el-table
        v-loading="loading"
        :data="list"
        :row-class-name="tableRowClassName"
        border
        current-row-key="id"
        mt
        @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" fixed type="selection" width="55"/>
      <el-table-column align="center" fixed label="ID" prop="id" width="150"/>
      <el-table-column align="center" label="图片" width="130">
        <template #default="scope">
          <el-image
              :preview-src-list="[sumUrl(scope.row)]"
              :src="sumUrl(scope.row)"
              class="database-img"
              fit="contain"
              hide-on-click-modal
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="地址">
        <template #default="scope">
          <el-link type="primary">{{ scope.row.url }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="宽度（px）" prop="width" width="100"/>
      <el-table-column align="center" label="高度（px）" prop="height" width="100"/>
      <el-table-column align="center" label="大小" prop="size" width="100">
        <template #default="scope">{{ sizeFormat(scope.row.size) }}</template>
      </el-table-column>
      <el-table-column align="center" label="类型" prop="type" width="100"/>
      <el-table-column align="center" label="上传时间" prop="addtime" width="180"/>
      <el-table-column align="center" label="操作" width="200">
        <template #default="scope">
          <el-button size="mini" type="warning" @click="del(scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="copy(scope.row.url)">复制</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginate">
      <Page :info="page" @topage="paginate"/>
    </div>
    <el-dialog v-model="dialogTableVisible" :width="500" title="小白图床工具配置">
      <div>
        <div>
          <b style="font-size:20px">
            Token:
            <span>{{ token }}</span>
          </b>
        </div>
        <div mt>
          <a
              href="https://www.yuque.com/luwenjie/gmahbo/ub9ko6#jb3eI"
              target="_blank"
          >配置教程</a>
        </div>
      </div>
      <template #footer>
        <el-button size="mini" type="danger" @click="resetToken">重置</el-button>
        <el-button size="mini" type="success" @click="copytoken">复制</el-button>
      </template>
    </el-dialog>
    <up-top/>
  </div>
</template>

<script>
import {image_del, image_list, image_reset_token} from "../../api/image"
import Page from "../../components/page.vue"
import request from "../../api/request";
import Affix from "../../components/affix.vue";
import Datebase from "./datebase.vue";
import {memory} from "jsb-util";

export default {
  data() {
    return {
      list: [],
      page: false,
      token: memory.get('info').image_token,
      pag: 1,
      dialogTableVisible: false,
      selects: [],
      loading: true
    }
  },
  mounted() {
    this.pagerender();
  },
  methods: {
    handleSelectionChange(row, index) {
      this.selects = row
    },
    copy_select() {
      let str = "";
      this.selects.forEach(el => {
        str += el.url + "\r\n";
      })
      this.copy(str);
      this.$message.success("复制成功")
    },
    tableRowClassName: (row) => {
      let pron = row.row.pron;
      if (pron >= 60 && pron < 80) {
        return "shzsh";//人工审核
      }
      if (pron >= 80 && pron <= 100) {
        return "shzs";//强制删除
      }
      return ''
    },
    fetchData() {
      this.loading = true;
      image_list({page: this.pag}).then(({list}) => {
        this.page = list;
        this.list = list.data
      }).finally(_ => {
        this.loading = false;
      })
    },

    async del(item) {
      try {
        await this.$confirm("是否删除？", '二次确认')
      } catch (error) {
        return;
      }
      const index = this.list.findIndex(el => el.id === item.id)
      this.list.splice(index, 1);
      image_del({id: item.id}).then(({code, msg}) => {
        if (code === 200) {
          this.$message.success("删除成功")
        } else {
          this.$message.error(msg)
        }
      })
    },
    paginate(e) {
      this.$router.replace("/image?page=" + e);
    },
    copytoken() {
      const {image_token} = memory.get("info");
      this.copy(image_token);
      this.$message.success("复制成功");
      this.dialogTableVisible = false;
    },
    look_token() {
      this.dialogTableVisible = true;
    },
    sumUrl(info) {
      return info.murl;
    },
    resetToken() {
      image_reset_token().then(e => {
        if (e.code === 200) {
          this.$store.commit("updateUserInfo");
          this.token = e.token
        }
      })
    },
    pagerender() {
      const {page = 1} = this.$route.query;
      this.pag = page;
      this.fetchData();
    },
    getList() {
      request({
        url: "image/all_text",

      }).then(e => {
        console.log(e)
      })
    }
  },
  watch: {
    $route(e) {
      this.pagerender()
    }
  },
  components: {
    Page,
    Affix,
    Datebase
  },
}
</script>
<style>
.el-table .shzs {
  background-color: var(--pink) !important;
  color: #fff;
}

.el-table .shzsh {
  background-color: orange !important;
  color: #fff;
}

.el-table tr:hover {
  color: #000 !important;
}
</style>
<style lang="scss" scoped>
.database-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  background: #000;
}

.photoManage {
  padding: 15px;

  > .settings-box {
    height: 50px;
    padding: 0 15px;
    background: #fff;
    display: flex;
    align-items: center;
  }

  .paginate {
    background: #fff;
    margin-top: 15px;
  }
}

.warning-row {
  background: #000;
}
</style>
