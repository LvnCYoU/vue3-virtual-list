# vue3-virtual-list

A virtual list component based on vue3 + ts

## Install

```sh
npm i vue3-virtual-list-ts --save

or

yarn add vue3-virtual-list-ts
```
## How to use

```sh
import { VirtualList } from "vue3-virtual-list-ts"
```

## For Example

```vue
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
```

## Parameter
|  parameter  |                      description                      |   type   | required | default |
| :---------: | :---------------------------------------------------: | :------: | :------: | :-----: |
|    data     |                   array of all data                   |  Array   |    √     |         |
|   dataKey   |             The key used by the loop node             |  string  |    √     |   id    |
| itemHeight  |                the height of each row                 |  number  |    ×     |   40    |
| dataBuffer  | The amount of data retained outside the viewable area |  number  |    ×     |   50    |
| showLoading |                  show bottom loading                  | boolean  |    ×     |  true   |
| onCompelete |      Trigger callback when sliding to the bottom      | Function |    ×     |         |

