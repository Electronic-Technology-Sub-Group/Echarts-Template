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
  const options = {
    // 定义x轴的相关配置
    xAxis: {
      show: false,
      type: 'value',
      max: function (value) {
        return parseInt(value.max * 1.2)
      },
    },
    // 定义y轴的相关配置
    yAxis: {
      type: 'category',
      data: ['北京', '上海', '广州', '深圳', '成都', '西安'],
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#9eb1c8'
      },
    },
    // 定义图表的网格区域配置
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    },
    // 定义图表的数据系列，此处使用空数组占位，具体配置需要根据数据动态填充
    series: [{
      type: 'bar',
      data: [
        {value: 200, name: '北京'},
        {value: 300, name: '上海'},
        {value: 430, name: '广州'},
        {value: 520, name: '深圳'},
        {value: 200, name: '成都'},
        {value: 600, name: '西安'},
      ],
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
        position: 'right',
        textStyle: {
          color: '#fff'
        }
      }
    }]
  }
  // 3.通过实例.setOptions(option)
  mChart.setOption(options)
}
</script>

<template>
  <div>
    <div>【大区数据信息 - 按行业分类】</div>
    <div ref="target" class="w-full h-full"> </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
