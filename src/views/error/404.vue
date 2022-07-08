<!--
 * @Description: ...404页面不存在
 * @Date: 2021-01-11 01:06:54
 * @LastEditTime: 2021-12-22 15:28:43
 * @msg: ..
-->
<template>
  <div class="ErrorBox">
    <Navigation />
    <div class="errorimg">
      <img src="@img/404.svg" alt />
    </div>
    <div class="gohome">
      <el-button
        type="primary"
        @click="$router.replace('/')"
        round
        icon="elicon-home-filled"
        >去首页看看</el-button
      >
      <el-button
        type="primary"
        @click="$router.back()"
        round
        icon="elicon-back"
        >回到上一页</el-button
      >
    </div>
  </div>
</template>

<script>
import Navigation from "../../components/navigation.vue";
export default {
  name: "ErrorBox",
  components: { Navigation },
};
</script>

<style lang="scss" scoped>
.ErrorBox {
  opacity: 0;
  animation: emptyshow 1s forwards;
  > .errorimg {
    margin-top: 10vh;
    display: flex;
    > img {
      margin: auto;
      width: 600px;
    }
  }
  > .gohome {
    margin: 50px 0px;
    display: flex;
    justify-content: center;
  }
}
@keyframes emptyshow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
