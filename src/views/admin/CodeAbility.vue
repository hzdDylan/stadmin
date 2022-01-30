<script setup>
import { shallowRef, ref, computed } from "vue";

import {
  NSelect,
  NSpace,
  NPagination,
  NCard,
  NGrid,
  NGi,
  NStatistic,
  NH3,
  NScrollbar,
  NButton,
} from "naive-ui";

import { getCodeBar as getBar } from "./echartsdata";

import Question from "../../components/Question.vue";
</script>

<script>
export default {
  data() {
    return {
      show: true,
      pageIdx: 1,
      option: {
        title: {
          text: "课内项目平均时长",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
          formatter: function (a) {
            let list = [];
            let listItem = "";
            for (var i = 0; i < a.length; i++) {
              list.push(
                '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                  a[i].color +
                  ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                  a[i].seriesName +
                  "</span>&nbsp&nbsp：" +
                  a[i].value +
                  "分钟"
              );
            }
            listItem = list.join("<br>");
            return '<div class="showBox">' + listItem + "</div>";
          },
        },
        legend: { right: "20", top: "25" },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        yAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: { show: false },
          axisTick: { show: false },
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              formatter: "{b}",
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 302, 301, 334, 390, 330, 320],
          },
          {
            name: "Mail Ad",
            type: "bar",
            label: {
              show: true,
              formatter: "{b}",
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Affiliate Ad",
            type: "bar",
            label: {
              show: true,
              formatter: "{b}",
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      },
      option2: {
        title: {
          text: "课外项目平均时长",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
          formatter: function (a) {
            let list = [];
            let listItem = "";
            for (var i = 0; i < a.length; i++) {
              list.push(
                '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                  a[i].color +
                  ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                  a[i].seriesName +
                  "</span>&nbsp&nbsp：" +
                  a[i].value +
                  "分钟"
              );
            }
            listItem = list.join("<br>");
            return '<div class="showBox">' + listItem + "</div>";
          },
        },
        legend: { right: "20", top: "25" },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        yAxis: {
          type: "category",
          data: [
            "火车票查询工具开发",
            "停车场管理系统开发",
            "电子投票系统设计",
          ],
          axisLabel: { show: false },
          axisTick: { show: false },
        },
        series: [
          {
            name: "电信20-1班",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              formatter: "{b}",
            },
            emphasis: {
              focus: "series",
            },
            data: ["", 542, 531],
          },
          {
            name: "电信20-2班",
            type: "bar",
            label: {
              show: true,
              formatter: "{b}",
            },
            emphasis: {
              focus: "series",
            },
            data: [560, 572, 541],
          },
          {
            name: "电信20-3班",
            type: "bar",
            label: {
              show: true,
              formatter: "{b}",
            },
            emphasis: {
              focus: "series",
            },
            data: [555, 542, 551],
          },
        ],
      },
      option3: {
        title: {
          text: "自拟项目时长",
        },
        dataset: {
          source: [
            ["score", "time", "product"],
            ["常春瑜, 房丙凡, 侯伟圣", 125, "数字表示单词"],
            ["陈思琪, 陈旭奇, 陈彦良", 152, "构建一个9×9数独游戏"],
            ["陈羽骆, 高兴平, 耿中正", 68, "实现噪点图像生成"],
          ],
        },
        tooltip: {
          formatter: function (params) {
            let list =
              '<span style="width:200px; display:inline-block;">项目：' +
              params.data[2] +
              "<br /> 组员：" +
              params.data[0] +
              "<br />耗时：" +
              params.data[1] +
              "分钟</span>：";

            return '<div class="showBox">' + list + "</div>";
          },
        },
        xAxis: { name: "time" },
        yAxis: { type: "category",axisLabel: { show: false },axisTick: { show: false },},
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "time",
              // Map the "product" column to Y axis
              y: "product",
            },
            label: {
              show: true,
              formatter: "{b}",
            },
          },
        ],
      },
    };
  },
  methods: {
    catc() {
      // 获取班级代码时长的函数
      [this.option.yAxis.data, this.option.series] = getBar(
        ...this.getinfo,
        this.pageIdx
      );
    },
  },
  computed: {
    getinfo() {
      return [
        this.$store.state.curriculumInfo,
        this.$store.state.classCollectiveInfo,
      ];
    },
  },
  mounted() {
    // 路由重加载时刷新
    if (this.getinfo[0].length !== 0) {
      this.catc();
    }
  },
  watch: {
    getinfo: function (val) {
      if (val[0].length !== 0) {
        this.catc();
      }
    },
  },
};
</script>

<template>
  <div>
    <n-space>
      <n-button @click="show = !show">切换</n-button>
      <button @click="catc">刷新</button>
      <n-pagination
        v-model:page="pageIdx"
        :page-count="2"
        @update:page="catc"
      ></n-pagination>
    </n-space>
    <section v-show="show">
      <figure class="figure-content">
        <!-- <n-space> -->
        <v-chart :option="option" autoresize class="chart" />
        <v-chart :option="option2" autoresize class="chart" />
        <v-chart :option="option3" autoresize class="chart" />
        <!-- </n-space> -->
      </figure>
    </section>

    <section v-show="!show">
      <n-scrollbar style="max-height: 500px">
        <n-grid x-gap="12" cols="1 300:2 600:3 900:4 1200:5">
          <n-gi v-for="item in getinfo[0]">
            <n-card
              hoverable
              size="small"
              content-style="padding-bottom: 0;min-width: 220px;"
              header-style="padding-bottom: 0;"
            >
              <template #header>
                <n-h3 prefix="bar" align-text>{{ item }}</n-h3>
              </template>
              <template #default>
                <n-space justify="space-around">
                  <n-statistic label="代码效率" :value="99.0"></n-statistic>
                  <n-space vertical :size="5" class="operation-count">
                    <span>运行调试次数: 10</span>
                    <span>运行报错次数: 9</span>
                  </n-space>
                </n-space>
              </template>
              <template #footer> </template>
            </n-card>
          </n-gi>
        </n-grid>
      </n-scrollbar>
    </section>
  </div>
</template>

<style scoped>
.figure-content {
  margin: 0 20px;
  display: flex;
}
.chart {
  height: 500px;
  width: 400px;
  margin-right: 30px;
}
.operation-count {
  font-weight: 400;
  transition: 0.3s color cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 14px;
  color: rgb(108, 114, 120);
}
</style>

<style>
.n-statistic .n-statistic-value {
  margin-top: 0px;
}
</style>