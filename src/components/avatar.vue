<!--
 * @Description: ...icon组件
 * @Date: 2021-01-17 21:32:21
 * @LastEditTime: 2021-12-04 21:07:13
 * @msg: ..
-->
<template>
  <i class="avatar-components" @click.self.stop="sub">
    <img :src="src" :style="sum(size)" v-show="src" class="icCOM" />
    <span v-if="msg" :style="fontSize(font)">{{ msg }}</span>
    <slot></slot>
  </i>
</template>

<script>
export default {
  name: "Ic",
  props: ["src", "size", "arc", "msg", "font"],
  methods: {
    sub() {
      this.$emit("click", {
        src: this.src,
        msg: this.msg,
      });
    },
    /**
     * @description: 计算尺寸,宽高相等
     * @param {*}
     * @return {*}
     */
    sum(size) {
      if (!size) {
        size = "20px";
      }
      const arc = this.arc !== undefined ? "border-radius:100px" : ""; //有圆角属性则有圆角样式
      return `width:${size};height:${size};${arc}`;
    },
    fontSize(size) {
      if (!size) {
        size = "20px";
      }
      const fz = this.font !== undefined ? `font-size:${size}` : ""; //有圆角属性则有圆角样式
      return fz;
    },
  },
};
</script>

<style lang="scss">
.avatar-components {
  display: flex;
  align-items: center;
  font-style: normal;
  .icCOM {
    display: inline-block;
    object-fit: cover;
    object-position: top;
  }
}
</style>
