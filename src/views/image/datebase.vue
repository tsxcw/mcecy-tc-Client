<!--
 * @Author: your name
 * @Date: 2021-12-22 16:18:23
 * @LastEditTime: 2022-01-23 20:59:58
 * @LastEditors: Please set LastEditors
 * @Description: 创作中心首页数据统计展台
 * @FilePath: /mcecyClient/src/views/image/datebase.vue
-->
<template>
  <div class="database-creation">
    <div class="top">
      <div>
        <div class="data">
          <div class="title">已使用/总容量</div>
          <div
              class="number"
          >{{ sizeFormat(info.use_store) }}/{{ sizeFormat(info.total_store) }}
          </div>
        </div>
      </div>
      <div>
        <div class="data">
          <div class="title">
            文件数量
            <small>（单位：张）</small>
          </div>
          <div class="number">{{ info.files_num }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {image_datebase} from '../../api/image';
import Affix from "../../components/affix.vue";

export default {
  data() {
    return {
      info: {
        total_flow: 0,
        total_store: 0,
        use_store: 0,
        use_flow: 0,
        files_num: 0
      }
    };
  },
  methods: {
    async top() {
      const {info} = await image_datebase();
      this.info = info
    }
  },
  async mounted() {
    this.top();
  },
  components: {Affix}
};
</script>

<style lang="scss">
#database {
  width: calc(100% - 30px);
  height: 400px;
}

.database-creation {
  border-radius: 5px;
  background: rgb(255, 255, 255);
  // margin: 15px;
  > .top {
    margin: 15px;
    width: calc(100% - 30px);
    display: inline-grid;
    grid-template-columns: repeat(3, calc(33.33% - 15px));
    grid-template-rows: repeat(1, 100px);
    justify-content: space-between;
    grid-gap: 15px 15px;

    > div {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      background: rgb(243, 243, 243);
      display: flex;

      > .data {
        margin: 10px;

        > .title {
          color: var(--pink);
        }

        > .number {
          margin-top: 10px;
          font-size: 25px;
          color: var(--font);
          font-weight: 600;
        }
      }

      > .database-icon {
        margin: 10px;
        margin-left: auto;
        align-self: center;
        width: 60px;
        height: 60px;
        color: red;
      }
    }
  }
}

@media screen and (max-width: 1300px) {
  .database-icon {
    display: none;
  }
}
</style>
