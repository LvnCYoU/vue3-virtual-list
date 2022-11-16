<template>
  <div>
    <div class="container">
      <VirtualList :data="data" :onCompelete="onCompelete">
        <template v-slot="{ item }">
          <div class="item" :style="{background: item.background}">
            <div>{{ item.__index__ + 1 }}</div>
          </div>
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VirtualList from "./index.vue";
const mock = (length = 99999) => {
  return Array.from(Array(length).keys())
  .map(i => ({
    id: i,
    text: i + '项',
    background: `rgb(${~~(Math.random() * 255)},${~~(Math.random() * 255)},${~~(Math.random() * 255)})`
  }))
}

export default defineComponent({
  name: "App",
  data() {
    return {
      data: mock()
    };
  },
  components: {
    VirtualList
  },
  methods: {
    onCompelete(){
      this.data.push(...mock(100))
    }
  }
});
</script>

<style scoped>
.container {
  width: 700px;
  height: 500px;
  margin: 0 auto;
}
.item {
  height: 40px;
  text-align: center;
  line-height: 40px;
}
</style>