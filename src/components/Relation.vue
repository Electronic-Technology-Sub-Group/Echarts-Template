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
const data = [
  {
    id: 1,
    name: '上级平台1',
    source : '上级平台1',
    target : '数据中心',
    speed: 112,
    value: [0,300]
  },
  {
    id: 2,
    name: '上级平台2',
    source : '上级平台2',
    target : '数据中心',
    speed: 172,
    value: [0,0]
  },
  {
    id: 3,
    name: '子级平台1',
    source : '数据中心',
    target : '子级平台1',
    speed: 163,
    value: [300,300]
  },
  {
    id: 4,
    name: '子级平台2',
    source : '数据中心',
    target : '子级平台2',
    speed: 132,
    value: [300,0]
  },
  {
    id: 0,
    name: '数据中心',
    speed: 117,
    value: [150,150]
  },
]
const renderChart = () => {
  const options ={
    xAxis:{
      show:false,
      type:'value'
    },
    yAxis:{
      show:false,
      type:'value'
    },
    series:[
      {
        type: 'graph',
        layout: 'none',
        coordinateSystem: 'cartesian2d',
        symbolSize: 26,
        z: 3,
        edgeLabel: {
          normal: {
            show: true,
            color: '#fff',
            textStyle: {
              fontSize: 14,
            },
            formatter: (params) => {
              return params.data.speed
            }
          },
        },
        label: {
          normal: {
            show: true,
            position: 'bottom',
            color: '#5E5E5E'
          }
        },
        edgeSymbol: ['none', 'arrow'],
        egeSymbolSize: 8,
        data: data.map(item => {
          if(item.id !== 0){
            return{
              name:item.name,
              category: 0,
              active: true,
              speed: `${item.speed}kb/s`,
              value: item.value,
            }
          }else{
            return {
              name: item.name,
              value: item.value,
              symbolSize: 100,
              itemStyle: {
                normal: {
                  color: {
                    colorStops: [{
                      offset: 0,
                      color: '#157eff' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#35c2ff' // 100% 处的颜色
                    }]
                  }
                }
              }
            }
        }}),
        links: data.map((item) => ({
          source: item.source,
          target: item.target,
          speed: `${item.speed}kb/s`,
          lineStyle:{
            normal:{
              color: '#12b5d0',
              curveness: 0.2

            }
          },
          label:{
            show:true,
            position: 'middle',
            offset: [10, 0],
          }
        }))
      },
      {
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
          show: true,
          smooth: false,
          trailLength: 0,
          symbol: 'arrow',
          color: 'rgba(55,155,255,0.6)',
          symbolSize: 12,
        },
        lineStyle: {
          normal: {
            curveness: 0.2,
          }
        },
        data: [
          [{coord: [0, 300]}, {coord: [150, 150]}],
          [{coord: [0,0]}, {coord: [150, 150]}],
          [ {coord: [150, 150]}, {coord: [300, 0]}],
          [ {coord: [150, 150]}, {coord: [300, 300]}],
        ]
      }
    ]
  }

  mChart.setOption(options)
}
</script>

<template>
  <div>
    <div>【关系数据传递图】</div>
    <div ref="target"  class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>
