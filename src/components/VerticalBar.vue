<script setup>
import {onMounted, ref} from "vue";
import * as echarts from 'echarts'

// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  mChart =  echarts.init(target.value)
  renderChart()
} )
// 2.构建option配置对象
const renderChart = () => {
 // 配置图表选项的对象
const options = {
    // x轴配置
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    // y轴配置
    yAxis: {
      type: 'value',
      show: false,
      max: function(value){
        return parseInt(value.max * 1.2);
      }
    },
    // 网格配置
    grid: {
      top: 26,
      right: 0,
      bottom: 15,
      left: -26,
      containLabel: true
    },
    // 系列配置
    series: [
      {
        type: 'bar',
        data: [12, 13, 11, 17, 14, 19],
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180,180,180,0.2)'

        },
        itemStyle: {
          color: '#5D98CE',
          barBorderRadius: 5,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 5
        },
        barWidth: 12,
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff'
          },
          formatter: '{c}%'

        }
      }
    ]

  }
  // 3.通过实例.setOptions(option)
  mChart.setOption(options)
}
</script>

<template>
  <div>
    <div>资源服务占比</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>
