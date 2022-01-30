<script setup>
import { ref } from "vue";

// 导入间距
import {NGrid, NGi} from 'naive-ui'

// 导入line数据
import {getUsagerateLine as getLine} from './echartsdata'

// 配置课件使用率数据
const option1 =ref({
  title: {
    text: "外网资源使用率",
    left: 'center'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [0.2, 0.3, 0.8, 0.9, 0.95, 0.4, 0.3, 0.1],
      type: 'line',
      areaStyle: {
        color: "rgb(79, 129, 189)"
      },
      itemStyle: {
        color: "rgb(79, 129, 189)"
      }
    }
  ]
});

// 配置外网资源使用率
const option2 =ref({
  title: {
    text: "课件使用率",
    left: 'center'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [0, 0.1, 0.6, 0.5, 0.8, 0.52, 0.4, 0],
      type: 'line',
      areaStyle: {
        color: "rgb(155, 187, 89)"
      },
      itemStyle: {
        color: "rgb(155, 187, 89)"
      }
    }
  ]
});

// 配置交互平台使用率
const option3 =ref({
  title: {
    text: "交互平台使用率",
    left: 'center'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [0, 0.2, 0.49, 0.88, 0.94, 0.75, 0.8, 0.9],
      type: 'line',
      areaStyle: {
        color: "rgb(228, 108, 10)"
      },
      itemStyle: {
        color: "rgb(228, 108, 10)"
      }
    }
  ]
});

const optionBar = ref({
  title: {
    text: "交互平台各月使用时长",
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [0, 24, 58.8, 105.6, 112.8, 90, 96, 108],
      type: 'bar'
    }
  ]
})
</script>

<template>
  <n-grid :cols="2" x-gap="12">
    <n-gi>
      <v-chart class="line" :option="option1"/>
      <v-chart class="line" :option="option2"/>
      <v-chart class="line" :option="option3"/>
    </n-gi>
    <n-gi>
      <v-chart class="bar" :option="optionBar"/>
    </n-gi>
  </n-grid>
</template>

<style scoped>
.line {
  height: 220px;
  width: 600px;
}
</style>