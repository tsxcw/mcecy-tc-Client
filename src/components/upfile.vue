<template>
  <div :style="{ height: height }" class="upfileCom" flex>
    <div v-show="isup" mauto>
      <el-progress :percentage="num" type="dashboard">
        <template #default="{ percentage }">
          <span class="percentage-label">上传中</span>
          <span class="percentage-value">{{ percentage }}%</span>
        </template>
      </el-progress>
    </div>
    <div v-show="!isup" class="upbutton" mauto>
      <img src="@img/upfile.svg"/>
      <span hover>点击上传</span>
      <input cli multiple="multiple" type="file" @change="uplist"/>
    </div>
  </div>
</template>

<script>
import {upfile} from "../api/upfile"

export default {
  props: ['upinfo', 'height', 'limit'],
  data() {
    return {
      fileList: [],
      isup: false,
      num: 0
    }
  },
  methods: {
    async uplist(e) {
      const files = e.target.files;
      const limit = this.limit ? this.limit : 1000
      if (files.length > limit) {
        this.$message.error(`当前最多只能上传${limit}张文件`)
        return false;
      }
      if (files.length > 0) {
        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          await this.up(element)
        }
      }
    },
    async jindu(num) {
      num = Number(num)
      this.num = num;
      this.isup = true;
    },
    async up(e) {
      let file = new FormData();
      file.append("file", e);
      try {
        const {url, code, msg} = await upfile(file, this.jindu);
        if (code === 200) {
          this.isup = false;
          this.$emit("upinfo", url);
          return Promise.resolve(true);
        } else {
          this.$message.error(msg)
          this.isup = false
        }
      } catch (error) {

      }
    }
  },
  mounted() {
    document.addEventListener("paste", (e) => {
      var target = e.target;
      var cbData;
      if (e.clipboardData) {
        cbData = e.clipboardData;
      } else if (window.clipboardData) {
        cbData = window.clipboardData;
      }
      console.log(cbData)
      if (cbData && cbData.items) {
        for (var i = 0; i < cbData.items.length; i++) {
          if (cbData.items[i].type.indexOf('image') !== -1) {
            target.parentNode.className = target.parentNode.className + " processing";
            var file = cbData.items[i].getAsFile();
            this.up(file)
            break;
          }
        }
      }

    });
  }
}
</script>

<style lang="scss" scoped>
.upfileCom {
  position: relative;
  border-radius: 10px;
  background: var(--bg);
  height: 100%;
  width: 100%;

  &:hover {
    img {
      transform: scale(0.8);
    }
  }

  .upbutton {
    position: relative;
    display: flex;
    flex-direction: column;

    > img {
      width: 90px;
      height: 90px;
      transition: all 500ms;
    }

    > span {
      text-align: center;
      font-size: 13px;
    }

    > input {
      position: absolute;
      width: 100%;
      height: 100%;
      background: transparent;
      outline: none;
      top: 0px;
      left: 0px;
      opacity: 0;
    }
  }
}
</style>
