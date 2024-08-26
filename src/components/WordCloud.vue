<script setup>
import {onMounted, ref} from "vue";
import * as echarts from 'echarts'
import 'echarts-wordcloud'
// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
// 2.构建option配置对象
const data = [
  {name: '数据', value: 35},
  {name: '分析', value: 76},
  {name: '产品', value: 62},
  {name: '设计', value: 74},
  {name: '团队', value: 13},
  {name: '管理', value: 23},
  {name: '研发', value: 45},
  {name: '市场', value: 32},
  {name: '运营', value: 28},
  {name: '前端', value: 56},
  {name: '后端', value: 34},
  {name: '测试', value: 26},
  {name: '安全', value: 18},
  {name: '算法', value: 15},
  {name: '机器学习', value: 32},
  {name: '深度学习', value: 55},
  {name: '数据库', value: 86},
  {name: '云计算', value: 63},
  {name: '大数据', value: 47},
  {name: '物联网', value: 38},
  {name: '区块链', value: 22},
  {name: '人工智能', value: 64}]
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
        data: data // 词云图的数据
      }]
  }

  // 3.通过实例.setOptions(option)
  mChart.setOption(options)
}
</script>

<template>
  <div>
    <div>【数据云图】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>
