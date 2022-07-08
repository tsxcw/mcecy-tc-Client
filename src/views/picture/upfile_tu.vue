<template>
  <div id="upbt" :style="{ height: height }" class="upfileCom" flex>
    <div v-show="isup" mauto>
      <el-progress :percentage="num" type="dashboard">
        <template #default="scope">
          <span class="percentage-label">上传中</span>
          <span class="percentage-value">{{ scope.percentage}}%</span>
        </template>
      </el-progress>
    </div>
    <div v-show="!isup" class="upbutton" data="in" mauto>
      <img data="in" src="@img/upfile.svg"/>
      <span class="upbuttontext" data="in" hover>
                点击或粘贴上传
                <br/>png,jpeg,gif
            </span>
      <span class="upbuttontext2" data="in">
                请不要上传 黑产/色情相关内容,
                <br/>系统检测到会强制删除
            </span>
      <input cli multiple="multiple" type="file" @change="uplist"/>
    </div>
  </div>
</template>

<script>
import {image_tu} from '../../api/upfile';
import Debounce from '../../util/Debounce';
import Momery from '../../util/Momery';
import {not_login} from '../../util/plugins';

export default {
  props: ['height'],
  data() {
    return {
      fileList: [],
      isup: false,
      num: 0
    }
  },
  methods: {
    async uplist(e) {
      if (Momery.get("token") && Momery.get("info")) {
        //登录后上传
        let files = null;
        if (e.length) {
          files = e
        } else {
          files = e.target.files
        }
        if (files.length > 0) {
          for (let index = 0; index < files.length; index++) {
            const element = files[index];
            await this.up(element)
          }
        }
      } else {
        await Debounce("islogin", 5000).then(_ => {
          not_login();
        }).catch(_ => {
        })

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
        const info = await image_tu(file, this.jindu);
        if (info.code == 200) {
          this.isup = false;
          this.$emit("upinfo", info);
          return Promise.resolve(true);
        } else {
          this.$message.warning(info.msg);
          this.isup = false;
        }
      } catch (error) {
        this.$message.warning('网络超时');
        this.isup = false;
      }
    },
    async getFile(e) {
      var target = e.target;
      var cbData;
      if (e.clipboardData) {
        cbData = e.clipboardData;
      } else if (window.clipboardData) {
        cbData = window.clipboardData;
      }
      try {
        if (target.attributes['data'] && target.attributes.data.value === 'in') {
        } else {
          return;
        }
      } catch (error) {
        return
      }
      let tmp = [];
      if (cbData && cbData.items) {
        for (var i = 0; i < cbData.items.length; i++) {
          if (cbData.items[i].type.indexOf('image') !== -1) {
            var file = cbData.items[i].getAsFile()
            tmp.push(file);
          }
        }
      }
      if (tmp.length > 0) {
        this.uplist(tmp)
      }

    }
  },
  mounted() {
    this.upbt = document.querySelector("#upbt")
    this.upbt.addEventListener("paste", this.getFile);
  },
  unmounted() {
    this.upbt.removeEventListener("paste", this.getFile);
  }
}
</script>

<style lang="scss" scoped>
.upfileCom {
  position: relative;
  border-radius: 10px;
  background: #fff;
  height: 100%;
  width: 100%;

  &:hover {
    img {
      transform: scale(0.8);
    }

    .upbuttontext {
      display: none !important;
    }

    .upbuttontext2 {
      display: block !important;
    }
  }

  .upbutton {
    position: relative;
    display: flex;
    flex-direction: column;

    > img {
      margin: auto;
      width: 120px;
      height: 120px;
      transition: all 500ms;
    }

    > .upbuttontext {
      text-align: center;
      color: var(--bg2);
      font-size: 13px;
    }

    .upbuttontext2 {
      text-align: center;
      color: var(--bg2);
      font-size: 13px;
      display: none;
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
      z-index: 1;
    }
  }
}
</style>
