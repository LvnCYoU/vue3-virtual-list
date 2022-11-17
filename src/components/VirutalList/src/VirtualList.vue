<script lang="ts">
import { onMounted, ref, watch, defineComponent, toRefs, PropType } from 'vue'
interface Props {
  data: any[],
  dataKey: string,
  showLoading?: boolean,
  itemHeight?: number,
  dataBuffer?: number,
  onCompelete?: () => void
}
export default defineComponent({
  name: 'virtualList',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    dataKey: {
      type: String,
      default: 'id'
    },
    showLoading: {
      type: Boolean,
      default: true,
    },
    itemHeight: {
      type: Number,
      default: 40
    },
    dataBuffer: {
      type: Number,
      default: 50
    },
    onCompelete: {
      type: Function as PropType<Pick<Props,"onCompelete">>,
      default: null
    }
  },
  setup(props: Props){
    const {data, dataBuffer, itemHeight, onCompelete} = toRefs(props)
    const vitrualListContainer = ref<HTMLElement | null>(null)
    const canSeeDataCount = ref(0);
    const showDataList = ref<any[]>([]);
    const paddingTop = ref(0);
    const containerHeight = ref(0);
    let dataRange = {
      startIndex: 0,
      endIndex: 0
    }
    let isScroll = false;
    let isCompelete = false

    const requestAnimationFrame = window.requestAnimationFrame;
    const handleScroll = () => {
      if(isScroll) return;
      setIsScrollStatus()
      requestAnimationFrame(() => 
        setDataRange()()()()
      )
    }

    const setDataRange = () => {
      dataRange.startIndex = ~~(vitrualListContainer?.value.scrollTop / itemHeight.value) - (dataBuffer.value / 2)
      dataRange.startIndex = Math.max(dataRange.startIndex, 0);
      dataRange.endIndex = dataRange.startIndex + canSeeDataCount.value + dataBuffer.value;
      dataRange.endIndex = Math.min(data.value.length - 1, dataRange.endIndex);
      return () => getShowDataList()
    }

    const getShowDataList = () => {
      showDataList.value = data.value
        .slice(dataRange.startIndex, dataRange.endIndex)
        .map((item, index) => ({
          ...item,
          __index__: index + dataRange.startIndex
        }))
      return () => setScrollContainerPadding()
    }

    const setIsScrollStatus = () => {
      isScroll = !isScroll;
      return onPageEnd()
    }
    const setScrollContainerPadding = () => {
      paddingTop.value = dataRange.startIndex * itemHeight.value;
      return () => setIsScrollStatus()
    }

    const setScrollContainerHeight = () => {
      return containerHeight.value = data.value.length * itemHeight.value;
    }
    const onPageEnd = () => {
      if(dataRange.startIndex + canSeeDataCount.value + (dataBuffer.value / 2) > data.value.length - 1 && !isCompelete){
        setIsCompelete();
        return onCompelete.value?.()
      }
    }

    const setCanSeeDataCount = () => {
      canSeeDataCount.value = Math.ceil(vitrualListContainer.value.clientHeight / itemHeight.value) + 1;
    }

    const setIsCompelete = () => isCompelete = !isCompelete;

    watch(props, () => {
      setScrollContainerHeight();
      isCompelete = false;
    })

    onMounted(() => {
      setScrollContainerHeight();
      setCanSeeDataCount();
      return setDataRange()()()
    })

    return {
      handleScroll,
      paddingTop,
      containerHeight,
      showDataList,
      vitrualListContainer,
    }
  }
})

</script>

<template>
  <div 
    ref="vitrualListContainer" 
    @scroll.passive="handleScroll"
    class="vitrual-list-container"
  >
    <div 
      class="vitrual-list-scroll-list" 
      v-if="data.length"
      :style="`
        padding-top: ${paddingTop}px;
        height: ${containerHeight}px;
      `"
    >
      <div v-for="(item, index) in showDataList" :key="item[dataKey]" class="vitrual-list-scroll-item" :style="`height: ${itemHeight}px`">
        <slot :item="item" :index="index"></slot>
      </div>
      <div v-if="showLoading">
        <slot name="loading">
          <div class="vitrual-list-loading">
            <span>正在努力加载中～</span>
          </div>
        </slot>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
  .vitrual-list-container{
    width: 100%;
    height: 100%;
    min-width: 100px;
    min-height: 100px;
    overflow-y: scroll;
  }
  .vitrual-list-scroll-list{
    box-sizing: border-box;
  }
  .vitrual-list-scroll-item{
    overflow: hidden;
  }
  .vitrual-list-loading{
    text-align: center;
    color: #ccc;
  }
</style>
