<!--
 * @Author: 涂山
 * @Date: 2021-12-22 14:44:15
 * @LastEditTime: 2022-03-06 16:18:57
 * @LastEditors: tushan
 * @Description:创作中心的左侧控制台；
 * @FilePath: /mcecyClient/src/views/image/index.vue
-->
<template>
  <div class="creation">
    <navigation/>
    <div class="creation-page">
      <div class="left-nav">
        <Affix :offset="50">
          <ul class="create-left-box">
            <transition v-for="(item, index) in list" :key="index">
              <li v-if="!Boolean(item.hide)" @click="$router.push(item.path)">
                <img :src="item.icon"/>
                <span :class="{ selectedRouter: path == item.path }" cli hover>{{ item.name }}</span>
              </li>
            </transition>
          </ul>
        </Affix>
      </div>
      <div class="right-route">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "../../components/navigation.vue";
import Affix from "../../components/affix.vue";
import image from "@img/image.svg";
import report from "@img/report.svg";
import tongzhi from "@img/tongzhi.svg";
import safe from "@img/safe.svg";
export default {
  components: {navigation, Affix},
  data() {
    return {
      path: this.$route.path,
      list: [
        {
          name: "图片管理",
          icon: image,
          path: "/image",
        },
        {
          name: "意见反馈",
          icon: report,
          path: "/image/report",
        },
        {
          name: "站内新闻",
          icon: tongzhi,
          path: "/image/news",
        },
        {
          name: "账号安全",
          icon: safe,
          path: "/image/Safety",
        }
      ],
    };
  },
  mounted() {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  watch: {
    $route(e) {
      this.path = e.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.creation {
  min-width: 905px;
}

.creation-page {
  display: flex;
}

.selectedRouter {
  color: var(--pink);
}

.left-nav {
  flex-shrink: 0;
  width: 150px;
  min-height: 400px;
  height: calc(100vh - 50px);
  box-shadow: 1px 0px 3px rgb(86 159 248 / 15%);

  .create-left-box {
    margin-top: 10px;
    width: 100%;

    > li {
      height: 55px;
      background: #fff;
      display: flex;
      align-items: center;

      > img {
        margin-left: 20px;
        width: 20px;
        // height: 20px;
      }

      > span {
        margin-left: 12px;
        font-size: 15px;
      }
    }
  }
}

.right-route {
  flex: 1;
  min-height: calc(100vh - 50px);
  background: rgb(245, 245, 245);
}
</style>
