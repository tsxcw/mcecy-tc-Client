<!--
 * @Author: your name
 * @Date: 2021-11-03 10:05:32
 * @LastEditTime: 2021-12-23 18:31:14
 * @LastEditors: Please set LastEditors
 * @Description:分页
 * @FilePath: /mcecyClient/src/components/page.vue
-->
<template>
  <div class="paginate" v-show="pageInfo.total">
    <el-pagination
      :currentPage="pageInfo.current_page"
      :page-sizes="pageInfo.sizes"
      :page-size="pageInfo.per_page"
      layout="total, prev, pager, next, jumper"
      :total="pageInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      pageInfo: {
        current_page: 1,
        per_page: 50,
        sizes: [10, 50, 100, 200, 500],
        total: 0,
      },
    };
  },
  methods: {
    /**修改当前每页多少条 */
    handleSizeChange(val) {
      this.info.per_page = val;
      this.$emit("topage", val);
    },
    /**页面切换 */
    handleCurrentChange(val) {
      this.info.current_page = val;
      this.$emit("topage", val);
    },
    render() {
      if (!this.info) return false;
      let info = this.info;
      this.pageInfo.current_page = info.current_page;
      this.pageInfo.per_page = info.per_page;
      this.pageInfo.total = info.total;
    },
  },
  mounted() {
    this.render();
  },
  watch: {
    info(e) {
      this.render();
    },
  },
};
</script>
<style lang="scss" scoped>
.paginate {
  padding: 30px 0px;
  display: flex;
  justify-content: center;
}
</style>
