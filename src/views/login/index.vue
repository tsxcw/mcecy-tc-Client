<!--
 * @Description: ...登陆页面
 * @Date: 2020-12-15 00:37:51
 * @LastEditTime: 2022-03-05 20:43:17
 * @msg: ..
-->
<template>
  <div class="login" @contextmenu.prevent="1">
    <navigation/>
    <div class="login_box">
      <!-- <div class="login_left">
        <img :src="qrurl" @click="qrcode_create" :style="qrurl ? '' : 'opacity:0'" />
        <span mt>APP扫码登录</span>
      </div> -->
      <!-- <div class="login_hr"></div> -->
      <div class="login_right">
        <div>
          <div class="title">
            <span :class="{ selectlogin: type == 0 }" mr @click="type = 0">验证码登录</span>
            <span :class="{ selectlogin: type == 1 }" @click="type = 1">密码登录</span>
          </div>
          <!-- 密码登录 -->
          <div v-if="type == 1" class="input_div">
            <el-input v-model="username" :placeholder="renderPlac()" clearable></el-input>
            <el-input
                v-model="password"
                placeholder="请输入密码"
                show-password
                @keyup.enter="login_submit"
            ></el-input>
          </div>
          <!-- 验证码登录 -->
          <div v-else class="code-login">
            <el-input v-model="username" :placeholder="renderPlac()" clearable></el-input>
            <el-input
                v-model="code"
                maxlength="6"
                placeholder="请输入验证码"
                type="text"
                @keyup.enter="login_submit"
            >
              <template #append>
                <el-button v-if="timeout == 0" type="primary" @click="getcode">获取</el-button>
                <el-button v-else type="primary">{{ timeout }}s</el-button>
              </template>
            </el-input>
            <p class="tips">
              <span style="color: red">*</span>
              未注册号码首次登录会默认注册为新账号
            </p>
          </div>
          <div>
            <el-checkbox v-model="xieyi">
              <div class="xieyi">
                我已阅读并且接受
                <router-link cli hover target="_blank" to="/UserAgreement">《用户协议与隐私条款》</router-link>
              </div>
            </el-checkbox>
          </div>
          <div class="login_button">
            <el-button :disabled="islogin" class="bt" type="primary" @click="login_submit">登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { sms_code } from '../../api/sms'
import { memory } from 'jsb-util'
import { code_login, qrcode_login, user_login } from '../../api/user'
import Debounce, { Debounce_del } from '../../util/Debounce'

export default {
  name: 'login',
  data() {
    return {
      qrurl: '',
      username: '',
      password: '',
      xieyi: false,
      islogin: false,
      type: 0,
      timeout: 0,
      code: ''
    }
  },
  components: {},
  methods: {
    renderPlac(text = '') {
      let a = memory.get('registerType')
      if (a == 1) {
        return '手机号码'
      }
      if (a == 2) {
        return '邮箱地址'
      }
      if (a == 3) {
        return '邮箱号码 / 手机号码'
      }
    },
    async qrcode_create() {
      const { code, info } = await qrcode_login()
      if (code == 200) {
        QRCode.toDataURL('https://mcecy.com/login?uuid=' + info, {
          errorCorrectionLevel: 'L',
          type: 'image/jpeg',
          quality: 1,
          margin: 2
        })
            .then((url) => {
              this.qrurl = url
            })
            .catch((err) => {
              console.error(err)
            })
      }
    },
    /**
     * @description: 跳转到注册的方法
     * @param {*}
     * @return {*}
     */
    register() {
      this.$router.push({
        path: '/register'
      })
    },
    async getcode() {
      try {
        await Debounce('sms', 1000 * 60) //判断是否短期内快速点击
      } catch (error) {
        return
      }
      try {
        const { code, info, msg } = await sms_code({ phone: this.username })
        if (code == 200) {
          this.$message.success('发送成功、请注意查收')
        } else {
          Debounce_del('sms')
          this.$message.error(msg)
          return
        }
      } catch (error) {
      }
      //倒计时
      {
        let i = 60
        let time = setInterval(() => {
          i--
          this.timeout = i
          if (i <= 0) {
            clearInterval(time)
            time = undefined
          }
        }, 1000)
      }
    },
    /**
     * @description: 登陆提交
     * @param {*}
     * @return {*}
     */
    async login_submit() {
      if (this.xieyi === false) {
        this.$message.warning('请阅读并且允许用户协议与隐私条款')
        return
      }
      this.islogin = true //提交时禁用登录按钮状态
      try {
        let info
        if (this.type == 1) {
          info = await user_login({
            user: this.username,
            password: this.password
          })
        } else {
          info = await code_login({
            user: this.username,
            code: this.code
          })
        }

        if (info.code == 200) {
          this.$message.success('登录成功、欧耶')
          this.Momery.set('token', info.data.token)
          this.Momery.set('id', info.data.uid)
          this.$store.commit('updateUserInfo')
          this.$router.replace({ path: '/' })
        } else {
          this.$message.error(info.msg)
        }
      } catch (error) {
      }
      this.islogin = false //收到返回数据时解开登录按钮禁用
    }
  },
  mounted() {
    this.qrcode_create()
  }
}
</script>
<style lang="scss">
.login {
  position: absolute;
  min-width: 904px;
  width: 100%;
  height: 100%;
  background: url(https://img.tshy.xyz/5759) no-repeat center/cover;
  user-select: none;

  > .navigation > .navigation-main {
    background: transparent !important;
    box-shadow: none !important;
  }
}

.xieyi {
  font-size: 13px;
}

.login_box {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  width: 400px;
  height: 370px;
  box-shadow: 0px 1px 10px rgba(235, 235, 235, 0.699);
  border-radius: 10px;
  background: rgb(255, 255, 255);
  display: flex;

  > .login_left {
    width: 350px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    > img {
      width: 150px;
      height: 150px;
      padding: 5px;
      border: 1px solid rgb(204, 204, 204);
      border-radius: 5px;
    }

    > span {
      font-weight: 600;
    }
  }

  > .login_right {
    width: 400px;
    height: 100%;

    > div {
      margin: 60px 40px 0px 40px;

      > .title {
        margin-top: 30px;
        text-align: left;
        font-size: 14px;
        font-weight: 600;

        > span {
          cursor: pointer;
        }
      }

      > .input_div,
      .code-login {
        margin-top: 20px;

        > div:nth-child(1) {
          margin-bottom: 15px;
        }

        > .tips {
          margin-top: 10px;
          font-size: 12px;
        }
      }

      .login_other {
        margin: 20px 0px 15px 0px;
        display: flex;
        justify-content: flex-end;

        > a {
          margin: 0px 10px 0px 10px;
          font-size: 11px;
          color: var(--main);
          text-decoration: none;
        }
      }

      > .login_button {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;

        > .bt {
          width: 100%;
        }
      }
    }
  }
}

.selectlogin {
  color: var(--main);
}
</style>
