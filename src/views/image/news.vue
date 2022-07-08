<template>
  <div class="newsBox">
    <div class="list-boxs">
      <ul>
        <el-empty v-if="list.length===0 &&!load"></el-empty>
        <transition v-for="item in list" :key="item.id">
          <li :class="{active_sel:item.id===htmlContext.id}" class="newList" cli hover @click="look(item)">
            <div>
              <h4>{{ item.title }}</h4>
              <small>{{ item.addtime }}</small>
            </div>
          </li>
        </transition>
      </ul>
    </div>
    <div class="preview-box">
      <div v-html="htmlContext.context"></div>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
import {news_list} from "/src/api/news"

const htmlContext = ref({
  title: '',
  context: '',
  addtime: ''
});
const list = ref([]);
const load = ref(true)

const look = (item) => {
  htmlContext.value = item;
}
news_list().then((e) => {
  list.value = e?.list.data;
  if (list.value.length > 0) {
    htmlContext.value = list.value[0]
  }
  load.value = false;
});
</script>
<style lang="scss" scoped>
.newsBox {
  margin: 15px;
  display: flex;
}

.active_sel {
  background: var(--bg1) !important;
  color: var(--pink);
}

.list-boxs {
  position: relative;
  height: calc(100vh - 115px);
  overflow: auto;
  flex: 2;
  padding-right: 15px;
  min-width: 400px;

  .newList {
    border-radius: 5px;
    background: var(--bg);
    margin-bottom: 15px;
    overflow: hidden;
    opacity: 0;
    animation: loadind 500ms forwards;

    > div {
      padding: 10px;
    }
  }
}

.preview-box {
  position: relative;
  height: calc(100vh - 115px);
  overflow: auto;
  flex: 3;
  min-width: 500px;
  padding: 15px;
  display: flex;
  background: var(--bg);
  border-radius: 5px;
  >div{
    line-height: 28px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}

@keyframes loadind {
  0% {
    opacity: 0;
  }
  70% {
    opacity: 5;
  }
  100% {
    opacity: 1;
  }

}
</style>
