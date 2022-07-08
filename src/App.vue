<template>
  <div id="app">
    <el-config-provider :locale="zhCn">
      <router-view v-slot="{ Component }">
        <keep-alive :include="['Index']">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </el-config-provider>
  </div>
</template>
<script>
import {defineAsyncComponent} from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import Bus from "./util/Bus";
import {settings} from "./api";
import {memory} from "jsb-util";

const {ElConfigProvider} = defineAsyncComponent(import('element-plus'))

export default {
  data() {
    return {
      zhCn: zhCn,
      isload: false
    }
  },
  name: "app",
  components: {ElConfigProvider},
  methods: {
    reset() {
      this.$store.commit("resetWindow");
      Bus.$emit("resize", this.$store.state.window);
    },
  },
  mounted() {
    this.$router.beforeEach((to, form, next) => {
      if (this.isload) {
        next()
        return
      }
      settings().then(({code, msg}) => {
        if (code === 200) {
          msg.map(ell => {
            memory.set(ell.key, ell.value)
          })
        }
        this.isload = true;
        next()
      })
    })
    window.addEventListener("resize", this.reset);
    window.addEventListener("scroll", (_) => {
      this.$store.commit("scrollTop");
    });
    this.reset();
    this.$store.commit("updateUserInfo");
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* 可以设置不同的进入和离开动画 */
</style>
