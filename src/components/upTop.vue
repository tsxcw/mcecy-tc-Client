<template>
  <transition name="fade-top">
    <div class="upTop" v-show="show" :style="style" @click.stop="upTop">
      <img src="@img/top.svg" />
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      style: {
        right: "35px",
        bottom: "30px",
      },
    };
  },
  methods: {
    /**回到顶部动画 */
    upTop() {
      let scrollTop = document.scrollingElement.scrollTop;
      if (scrollTop > 0) {
        window.requestAnimationFrame(this.upTop);
        window.scrollTo({
          top: scrollTop - scrollTop / 8,
          left: 0,
          behavior: "auto",
        });
      }
    },
  },
  computed: {
    scroll() {
      return this.$store.state.scrollTop;
    },
  },
  watch: {
    scroll(e) {
      //如果窗口滚动高度大于页面可使高度1/2则显示按钮
      if (e > Math.floor(window.innerHeight / 2)) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.upTop {
  position: fixed;
  width: 50px;
  right: 15px;
  bottom: 0px;
  height: 50px;
  border-radius: 5px;
  z-index: 1000;
  background: rgb(253, 253, 253);
  box-shadow: 0px 5px 10px rgb(192, 192, 192);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 0px 5px var(--main);
  }
  >img{
    margin: auto;
    width: 80%;
    height: 80%;
  }
}
.fade-top-enter-active,
.fade-top-leave-action {
  transition: opacity 0.5s;
}
.fade-top-enter,
.fade-top-leave-to {
  opacity: 0;
}
</style>
