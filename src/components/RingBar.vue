<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts'
const props = defineProps({
  data: {
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

const getSeriesData = () => {
  const series = []

  props.data.abnormals.forEach((item, index) => {
    // 上层
    series.push({
      name: item.name,
      type: 'pie',
      clockwise: false,
      hoverAnimation: false,
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      center: ['55%', '55%'],
      data: [
        { value: item.value, name: item.name },
        {
          value: 800,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0
          },
          tooltip: {
            show: false
          },
          hoverAnimation: false
        }
      ]

    })
    // 下层
    series.push({
      name: item.name,
      type: 'pie',
      silent: true,
      z: 1,
      clockwise: false,
      hoverAnimation: false,
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],

      center: ['55%', '55%'],
      label: {
        show: false
      },
      data: [
        {
          value: 7.5,
          itemStyle: {
            color: 'rgb(3,31,62)',
            borderWidth: 0
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false
        },
        {
          value: 2.5,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false
        }
      ]
    })
  })


  return series
}

// 2.构建option配置对象
const renderChart = () => {
  const options = {
    // 图例配置
    legend: {
      show: true,
      icon: 'circle',
      top: '8%',
      left: '60%',
      data: props.data.abnormals.map(item => item.name),
      width: '-5',
      itemWidth: 10,
      itemHeight: 10,
      itemGao: 6,
      textStyle: {
        fontSize: 12,
        lineHeight: 5,
        color: 'rgba(255,255,255,0.8)'
      },
    },
    // 提示层
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    // y轴
    yAxis: [{
      type: 'category',
      inverse: true,
      axisLine: {
        show: false,
      }
    }],
    // x轴
    xAxis: [{
      show: false
    }],
    // 核心配置
    series: getSeriesData()
  }

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
    <div>【大区异常处理】</div>
    <div ref="target"  class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>
