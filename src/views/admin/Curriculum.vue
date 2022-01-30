<script setup>
import { ref, computed, watch, h } from "vue";

// 导入bar数据
import { getProgressBar as getBar, getPersonProgress as getTable } from "./echartsdata";

// 导入naive
import { NDataTable, NTag, NProgress, NButton, NSelect } from "naive-ui";
</script>

<script>
export default {
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisLabel: { interval: 0, rotate: 30 },
          },
        ],
        yAxis: [
          {
            type: "value",
            max: 35,
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Email",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Search Engine",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            emphasis: {
              focus: "series",
            },
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
          },
          {
            name: "Baidu",
            type: "bar",
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
        ],
      },
      show: true,
      data: [],
      columns: [
        {
          title: "姓名",
          key: "name",
          align: "center",
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
        },
        {
          title: '完成进度',
          key: 'progress',
          render (row) {
            return h(
              NProgress,
              {
                type: "line",
                percentage: row.progress,
                status: row.status,
                'indicator-placement': 'inside'
              },
            )
          }
        },
        {
          title: "未完成课程",
          key: "tags",
          render(row) {
            const tags = row.tags.map((tagKey) => {
              return h(
                NTag,
                {
                  style: {
                    marginRight: "6px",
                  },
                  type: "info",
                },
                {
                  default: () => tagKey,
                }
              );
            });
            return tags;
          },
        },
      ],
      pagination: {pageSize: 10},
      selectOptions: [
        {label: "电信20-1班", value:1},
        {label: "电信20-2班", value:2},
        {label: "电信20-3班", value:3},
      ],
      classidx: 1,
    };
  },
  mounted() {
    this.optionSet();
  },
  computed: {
    getinfo() {
      return [this.$store.state.curriculumInfo, this.$store.state.classCollectiveInfo];
    }
  },
  methods: {
    optionSet() {
      if (this.getinfo[0].length !== 0) {
        [this.option.xAxis[0].data, this.option.series] = getBar(this.getinfo);
      }
    },
    dataSet() {
      if (this.getinfo[0].length !== 0) {
        this.data = getTable(...this.getinfo, this.classidx);
      }
    },
    switchShow() {
      if(this.show) {
        this.show = false;
        this.dataSet();
      } else {
        this.show = true;
        this.optionSet()
      }
    }
  },
  watch: {
    getinfo: function (val) {
      this.optionSet();
    },
  },
};
</script>

<template>
  <section>
    <n-button @click="switchShow">切换</n-button>
    <div v-if="show">
      <n-button @click="optionSet">刷新</n-button>
      <figure class="figure-content">
        <v-chart :option="option" autoresize class="chart" />
      </figure>
    </div>
    <div v-else>
      <n-button @click="dataSet">刷新</n-button>
      <n-select v-model:value="classidx" :options="selectOptions" :on-update:value="dataSet"/>
      <n-data-table :columns="columns" :data="data" :pagination="pagination" />
    </div>
  </section>
</template>

<style scoped>
.figure-content {
  margin: 0 20px;
}
.chart {
  height: 500px;
  width: 1000px;
}
</style>