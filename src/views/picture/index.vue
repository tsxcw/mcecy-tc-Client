<template>
  <div class="picture-page">
    <navigation/>
    <div class="upbox">
      <Upfile @upinfo="info"/>
    </div>
    <div class="showBox">
      <el-table
          :data="list"
          :row-class-name="tableRowClassName"
          border
          current-row-key="id"
          mt
          @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="ID" prop="id" width="100"/>
        <el-table-column align="center" label="图片" width="120">
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
        <el-table-column align="center" label="操作" width="220">
          <template #default="scope">
            <el-button
                size="mini"
                type="primary"
                @click="copyinfo(scope.row.url)"
            >复制URL
            </el-button>
            <el-button
                size="mini"
                type="warning"
                @click="copyinfo(`![img](${scope.row.url})`)"
            >复制MD
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Footer from "../index/footer.vue";
import Upfile from "./upfile_tu.vue";

export default {
  name: "Picture",
  data() {
    return {
      list: [],
      listText: ""
    }
  },
  async mounted() {

  },
  methods: {
    copyinfo(text) {
      this.copy(text);
      this.$message.success("复制成功");
    },
    handleSelectionChange(row, index) {
      console.log(row, index);
      this.selects = row
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
    info(data) {
      this.list.push(data);
    },
    openlist() {
      this.copy(this.listText);
      this.$message.success("复制成功");
    },
    sumUrl(info) {
      return info.murl;
    },
  },
  components: {Upfile, Footer}
};
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

.picture-page {
  min-height: calc(100vh - 183px);
  background: var(--bg);
}

.upbox {
  margin: 15px 15px;
  height: 200px;
  background: #fff;
  display: flex;

  > .urlList {
    width: 300px;
    height: 100%;
    flex-shrink: 0;
    background: rgb(255, 255, 255);
    border-left: 1px solid rgb(235, 235, 235);
    display: flex;
    padding: 0px 15px;
    flex-direction: column;

    > textarea {
      // width: 100%;
      padding: 10px;
      height: calc(100% - 80px);
      border: none;
      resize: none;
      outline-color: var(--pink);
    }

    > .el-button {
      margin-top: 10px;
    }
  }
}

.showBox {
  margin: 15px 15px;
}

.control {
  margin: 15px;
  padding: 15px;
  background: #fff;
}

@media screen and(min-width: 0px) and (max-width: 1400px) {
  .showBoxList {
    grid-template-columns: repeat(1, 1fr) !important;
  }
}

.shzs {
  color: rgb(255, 0, 0);
}
</style>
