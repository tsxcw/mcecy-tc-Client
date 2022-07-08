<template>
  <div class="affix" id="mai">
    <div class="affix-main" :style="Css">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["offset"],
  data() {
    return {
      Css: {},
    };
  },
  computed: {
    scroll() {
      return this.$store.state.scrollTop;
    },
    resize() {
      return this.$store.state.window.innerWidth;
    },
  },
  methods: {
    //递归获取元素的绝对位置左边距LEFT
    getOffsetLeft(el) {
      return el.offsetParent
        ? el.offsetLeft + this.getOffsetLeft(el.offsetParent)
        : el.offsetLeft;
    },
    render() {
      let top = mai.offsetTop - this.$store.state.scrollTop;
      if (top < this.offset) {
        this.Css = {
          position: "fixed",
          width: mai.clientWidth + "px",
          top: this.offset + "px",
          left: this.getOffsetLeft(mai) + "px",
        };
      } else {
        this.Css = {};
      }
    },
  },
  mounted() {
    this.render();
  },
  watch: {
    resize() {
      this.render();
    },
    scroll(e) {
      this.render();
    },
  },
};
</script>
<style lang="scss" scoped>
.affix {
  position: relative;
  width: 100%;
  height: 100%;
  > .affix-main {
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 30;
  }
}
</style>
