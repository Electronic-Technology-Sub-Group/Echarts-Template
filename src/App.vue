<script setup>
// 将组件通通导入
import HorizontalBar from "./components/HorizontalBar.vue";
import MapChart from "./components/MapChart.vue";
import RadarBar from "./components/RadarBar.vue";
import Relation from "./components/Relation.vue";
import RingBar from "./components/RingBar.vue";
import TotalData from "./components/TotalData.vue";
import VerticalBar from "./components/VerticalBar.vue";
import WordCloud from "./components/WordCloud.vue";
import {ref} from "vue";
import {getVisualization} from "./api/visualization.js";

// 获取大屏可视化的数据
const data = ref();
const getData = async () => {
  data.value = await getVisualization()
  console.log(data.value)
}
getData()

setInterval(() => {
  getData()
}, 5000)

</script>

<template>
  <div class="bg-[url('src/assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden ">
    <!--  左-->
    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!--横向柱状图-->
      <HorizontalBar class="h-1/3 box-border pb-4" :data="data.regionData"/>
      <!--雷达图-->
      <RadarBar class="h-1/3 box-border pb-4" :data="data.riskData"/>
      <!--关系图-->
      <Relation class="h-1/3" :data="data.relationData"/>
    </div>
    <!--  中-->
    <div class="w-1/2 mr-5 flex flex-col">
      <!--数据总览柱状图-->
      <TotalData class="bg-opacity-50 bg-slate-800 p-3" :data="data.totalData"/>
      <!--地图可视化-->
      <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-4 flex-1" :data="data.mapData"/>
    </div>
    <!--  右-->
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!--竖向柱状图-->
      <VerticalBar class="h-1/3 box-border pb-4" :data="data.serverData"/>
      <!--环形图-->
      <RingBar class="h-1/3 box-border pb-4" :data="data.abnormalData"/>
      <!--数据云图-->
      <WordCloud class="h-1/3" :data="data.wordCloudData"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
