<template>
  <footer>
    <div class="index-footer">
      <div class="mcecy-info">
        <div class="logo-info" mt>
          <img :src="logo"/>
          <span>{{ app_name }}</span>
        </div>
        <div v-if="bah" class="email-info" mt>
          <span>
            备案：
            <a href="https://beian.miit.gov.cn/" style="color: #303133;text-decoration: none;">{{ bah }}</a>
          </span>
        </div>
      </div>
      <div v-if="list.lengthm" class="friend-link">
        <span>友情链接</span>
        <ul>
          <transition v-for="(item,index) in list" :key="index">
            <li><a :href="item.href" target="_blank">{{ item.name }}</a></li>
          </transition>
        </ul>
      </div>
      <div class="important-info">
        <div class="content-info">
          <ul>
            <li>
              <router-link target="_blank" to="/UserAgreement">用户协议</router-link>
            </li>
            <li>
              <router-link target="_blank" to="/UserAgreement?to=ys">隐私条款</router-link>
            </li>
          </ul>
        </div>
        <div class="more-info">
          <ul>
            <li>
              <router-link to="/image/report">意见反馈</router-link>
            </li>
            <li>
              <router-link to="/image/news">站内新闻</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-tips" flex>
      声明：请勿上传损害他人利益以及违法内容信息。 <span mlauto
                                   style="font-size: 12px">Copyright © 2020 - 2022 {{ app_name }}. All Rights Reserved.</span>
    </div>
  </footer>
</template>

<script>
import {friend} from "../../api";
import {memory} from "jsb-util";

export default {
  props: ["width"],
  data() {
    return {
      app_name: memory.get("app_name"),
      logo: memory.get('app_logo'),
      list: [],
      bah: memory.get('bah')
    };
  },
  async mounted() {
    const {info} = await friend()
    this.list = info
  }
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .friend-link {
    display: none !important;
  }
}

footer {
  margin: auto;
  padding: 0px 20px 20px 20px;
  background: rgba(243, 243, 243, 0.699);

  > .footer-tips {
    margin: 0px 0px;
    font-size: 12px;
    padding-right: 70px;
  }

  .friend-link {
    padding-top: 50px;

    > span {
      font-size: 16px;
    }

    > ul {
      margin-top: 15px;
      display: flex;
      flex-wrap: wrap;

      > li {
        margin-right: 15px;

        > a {
          color: #303133;
          font-size: 14px;
          list-style: none;
          text-decoration: none;

          &:hover {
            color: var(--pink);
          }
        }
      }
    }
  }
}

.index-footer {
  margin: 15px auto auto;
  opacity: 0;
  animation: footer_showing 1s forwards;
  display: flex;

  > .mcecy-info {
    height: 100%;
    margin-right: 50px;

    > .logo-info {
      width: 300px;
      height: 70px;
      display: flex;
      align-items: flex-end;

      > img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
      }

      > span {
        margin-left: 10px;
        width: 161px;
        height: 25px;
        font-size: 22px;
        font-weight: 600;
        color: var(--font);
        margin-bottom: 10px;
      }
    }

    > .email-info {
      margin-right: 60px;
      display: flex;
      flex-direction: column;
      font-size: 13px;

      > span {
        margin-bottom: 10px;
      }
    }
  }

  > .important-info {
    //重要信息
    width: 300px;
    margin-left: auto;
    display: flex;
    margin-right: 80px;

    > .content-info,
    .more-info {
      margin-top: 10px;
      width: 120px;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      // align-items: center;
      > ul {
        margin-top: 19px;
        display: flex;
        flex-direction: column;

        > li {
          height: 44px;
          font-size: 14px;
          transition: color 0.3s;

          > a {
            text-decoration: none;
            color: inherit;
          }

          cursor: pointer;

          &:hover {
            color: var(--main);
          }
        }
      }
    }

    > .wechat,
    .app-download {
      width: 135px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > img {
        width: 120px;
        height: 120px;
      }

      > span {
        margin-top: 10px;
      }
    }
  }
}

@keyframes footer_showing {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
