<script setup>
import { ref, computed, watch, shallowRef } from "vue";

// 导入bar数据
import { getRatioBar as getBar, getScoreLine as getLine } from "./echartsdata";

import { NSelect, NSpace, NButton } from "naive-ui";
</script>

<script>
export default {
  data() {
    return {
      show: false,
      selectValue: "1",
      cidx: 1,
      // 成绩分布折线图
      optionLine1: {
        title: {
          text: "成绩分布折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads"],
        },
        grid: {
          left: "1%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: { interval: 0, rotate: -45 },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Email",
            type: "line",
            data: [20, 32, 10, 12, 90, 30, 12],
          },
          {
            name: "Union Ads",
            type: "line",
            data: [22, 100, 91, 34, 90, 33, 31],
          },
          {
            name: "Video Ads",
            type: "line",
            data: [100, 32, 12, 54, 90, 33, 41],
          },
        ],
      },
      optionLine2: {
        title: {
          text: "成绩分布折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads"],
        },
        grid: {
          left: "1%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: { interval: 0, rotate: -45 },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Email",
            type: "line",
            data: [20, 32, 10, 12, 90, 30, 12],
          },
          {
            name: "Union Ads",
            type: "line",
            data: [22, 100, 91, 34, 90, 33, 31],
          },
          {
            name: "Video Ads",
            type: "line",
            data: [100, 32, 12, 54, 90, 33, 41],
          },
        ],
      },
      optionLine3: {
        title: {
          text: "成绩分布折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads"],
        },
        grid: {
          left: "1%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: { interval: 0, rotate: -45 },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Email",
            type: "line",
            data: [20, 32, 10, 12, 90, 30, 12],
          },
          {
            name: "Union Ads",
            type: "line",
            data: [22, 100, 91, 34, 90, 33, 31],
          },
          {
            name: "Video Ads",
            type: "line",
            data: [100, 32, 12, 54, 90, 33, 41],
          },
        ],
      },
      selectoptions: [
        {
          label: "电信20-1班",
          value: "1",
        },
        {
          label: "电信20-2班",
          value: "2",
        },
        {
          label: "电信20-3班",
          value: "3",
        },
      ],
      // 百分比柱状图
      ratiobar: {
        title: {
          text: "班级的作业完成比例",
        },
        tooltip: {},
        legend: {},
        dataset: {
          source: [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1],
          ],
        },
        xAxis: {
          type: "category",
          axisLabel: { interval: 0, rotate: 45},
        },
        yAxis: {},
        grid: {
          top: "9%",
          bottom: "22%",
          left: "5%",
          right: "45%",
        },
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      },
    };
  },
  mounted() {
    this.barSet();
    this.lineSet();
  },
  computed: {
    getinfo() {
      return [this.$store.state.curriculumInfo, this.$store.state.classPercent];
    },
    getscoreinfo() {
      return [
        this.$store.state.curriculumInfo,
        this.$store.state.classCollectiveInfo,
      ];
    },
  },
  methods: {
    barSet() {
      if(this.getinfo[0].length !== 0) {
        const [$1, $2] = getBar(...this.getinfo);
        this.ratiobar.dataset.source = $1;
        // this.ratiobar.series = $2;
      }
    },
    lineSet() {
      let [$1, $2, $3] = getLine(this.getscoreinfo, 1);
      this.optionLine1.legend.data = $1;
      this.optionLine1.xAxis.data = $2;
      this.optionLine1.series = $3;
      [$1, $2, $3] = getLine(this.getscoreinfo, 2);
      this.optionLine2.legend.data = $1;
      this.optionLine2.xAxis.data = $2;
      this.optionLine2.series = $3;
      [$1, $2, $3] = getLine(this.getscoreinfo, 3);
      this.optionLine3.legend.data = $1;
      this.optionLine3.xAxis.data = $2;
      this.optionLine3.series = $3;
      // 下面方法会报错？？？
      // [this.optionLine.legend.data, this.optionLine.xAxis.data, this.optionLine.series] = getLine(this.getscoreinfo, this.cidx);
    },
    selectUpdate(value) {
      this.selectValue = value;
      this.cidx = value;
      this.lineSet();
    },
  },
  watch: {
    getinfo: function (val) {
      this.barSet();
    },
  },
};
</script>

<template>
  <section>
    <n-button @click="show = !show">切换</n-button>
    <figure class="figure-content" v-if="show">
      <v-chart :option="ratiobar" autoresize class="chart" />
      <n-button @click="barSet">刷新</n-button>
    </figure>
    <figure class="figure-content" v-else>
      <!-- <n-select
        :value="selectValue"
        :options="selectoptions"
        @update:value="selectUpdate"
      ></n-select> -->
      <n-space vertical>
        <v-chart :option="optionLine1" autoresize class="line" />
        <v-chart :option="optionLine2" autoresize class="line" />
        <v-chart :option="optionLine3" autoresize class="line" />
      </n-space>
    </figure>
  </section>
</template>

<style scoped>
.figure-content {
  margin: 0 20px;
}
.chart {
  height: 500px;
  width: 130vw;
}
.line {
  height: 300px;
  width: 72vw;
}
</style>