<!--
 * @Description: ...
 * @Date: 2020-12-15 01:00:51
 * @LastEditTime: 2022-01-23 12:18:49
 * @msg: ..
-->
<template>
  <div class="navigation">
    <div class="navigation-main">
      <div :title="app_name" class="logo" @click="$router.push('/')">
        <img :src="logo"/>
        <span>{{ app_name }}</span>
      </div>
      <div class="nav_title">
        <div class="nav-list">
          <router-link to="/">首页</router-link>
          <router-link to="/image">数据管理</router-link>
          <router-link v-if="!islogin" to="/login">登录</router-link>
          <span v-if="islogin" @click="login_out">退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@img/logo.png'
import { memory } from 'jsb-util'

export default {
  props: ['searchcom'],
  data() {
    return {
      state: '',
      img: logo,
      app_name: memory.get('app_name'),
      logo: memory.get('app_logo'),
      activeIndex: '0',
      userinfo: this.$store.state.userinfo,
      islogin: this.$store.state.islogin
    }
  },
  methods: {
    /**
     * @description: 退出登录
     * @param {*}
     * @return {*}
     */
    async login_out() {
      try {
        await this.$confirm('确认要退出嘛？', '确认退出?')
      } catch (error) {
        return
      }
      this.$store.commit('login_out')
      this.$message({
        message: '您已退出成功',
        type: 'warning'
      })
    },
    to(path) {
      this.$router.push(path)
    },
    photo() {
      this.$router.push('/image')
    }
  },
  mounted() {
  },
  computed: {
    login_status() {
      return this.$store.state.islogin
    },
    user_info() {
      return this.$store.state.userinfo
    }
  },
  watch: {
    user_info(e) {
      this.userinfo = e
    },
    login_status(e) {
      this.islogin = e
    }
  }
}
</script>

<style lang="scss">
.userinfo-nav {
  height: 20px;
}

.navigation {
  position: relative;
  width: 100%;
  height: 50px;

  > .navigation-main {
    top: 0px;
    position: fixed;
    width: 100%;
    height: 50px;
    min-width: 904px;
    z-index: 100;
    display: flex;
    user-select: none;
    background: rgba(255, 255, 255, 0.959);
    box-shadow: 0px 1px 3px rgba($color: #569ff89d, $alpha: 0.15);

    .userhead {
      margin: 0px 10px 0px 10px;
      transition: all 0.3s;
      position: relative;
    }

    > .logo {
      display: flex;
      align-items: center;
      z-index: 1;
      flex-shrink: 0;
      justify-content: flex-start;

      > img {
        margin-left: 15px;
        width: 35px;
        height: 35px;
        border-radius: 10px;
      }

      > span {
        margin-top: 5px;
        margin-left: 5px;
        font-size: 24px;
        font-weight: 600;
        color: var(--font);
        transition: color 400ms;

        &:hover {
          color: var(--pink);
        }
      }
    }

    > .nav-search {
      margin-left: calc(3% + 50px);
      width: 400px;
      min-width: 300px;
      height: 100%;

      > div {
        margin-top: 5px;
        width: 100%;
        height: 40px;
        border-radius: 50px;
        background: #f4f4f4;
        overflow: hidden;

        > div {
          width: 100%;

          > * > .el-input-group__append {
            border: none;
            background: transparent;

            > .search-button {
              font-size: 22px;
              cursor: pointer;
            }
          }
        }

        > * input {
          outline: none;
          background: transparent;
          border: none;
          padding: 0px 15px;
        }
      }
    }

    > .nav_title {
      margin-left: auto;
      right: 0px;
      width: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      > .nav-list {
        position: relative;
        height: 50px;
        display: flex;
        justify-content: flex-end;

        .router-link-exact-active {
          color: var(--font);

          &::before {
            position: absolute;
            content: " ";
            height: 2px;
            left: 2.5px;
            width: calc(100% - 5px);
            background: var(--pink);
            border-radius: 5px;
            top: 30px;
          }
        }

        > span, a {
          position: relative;
          margin: 15px 15px 0px 15px;
          width: auto;
          flex-shrink: 0;
          font-size: 16px;
          color: var(--font);
          text-decoration: none;
          cursor: pointer;
        }
      }
    }
  }
}

.settings {
  //右上角的头像点击后一些相关新设置
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 60px);
  grid-row-gap: 10px;
  grid-column-gap: 15px;
  justify-content: space-between;
  user-select: none;

  > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    transition: color 200ms;

    &:hover {
      color: var(--main);
    }

    > img {
      margin-top: 10px;
      width: 25px;
      height: 25px;
    }

    > span {
      font-size: 13px;
    }
  }
}
</style>
