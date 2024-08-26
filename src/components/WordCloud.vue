<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts'
import 'echarts-wordcloud'
const props = defineProps({
  data:{
    type: Object,
    required: true
  }
})
// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
// 2.构建option配置对象
const randomRGB = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}
const renderChart = () => {
  const options = {
    // 定义一个词云图配置对象
series: [
      {
        type:'wordCloud', // 图表类型为词云图
        sizeRange: [12, 60], // 词云图中词语的大小范围
        rotationRange:[0,0], // 词云图中词语的旋转角度范围
        gridSize: 0, // 词云图中词语之间的网格大小
        layoutAnimation: true, // 是否开启布局动画
        textStyle: {
          color: randomRGB // 词语的样式，颜色为随机RGB颜色
        },
        emphasis: {
          textStyle: {
            fontWeight: 'bold', // 强调时的字体样式，加粗
            color: '#000' // 强调时的颜色，黑色
          }
        },
        data: props.data.datas
      }]
  }

  // 3.通过实例.setOptions(option)
  mChart.setOption(options)
}

watch(
    () => props.data,
    () => {
      renderChart()
    }
)
</script>

<template>
  <div>
    <div>【关键词条】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>
