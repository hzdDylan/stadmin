<script  setup>
import {
  NGrid,
  NGi,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NCard,
  NTable,
  NDivider,
  NSpace,
  NSelect
} from "naive-ui";

// 引入Message
import { useMessage } from 'naive-ui'
// window上挂载message
window.$message = useMessage()

import TableContent from "../../components/TableContent.vue"

// 导入学生信息获取函数
import { getPersonScore as getBar } from "./echartsdata"
</script>

<script>
export default {
  data() {
    return {
      formValue: {
        name: "孟令宇",
        class: "电信20-3班",
        id: "2003020317",
        week: null,
      },
      coursewareTimePlan: [
        [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]
      ],
      platformTimePlan: [
        [1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 4, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 5, 1, 1, 1, 1]
      ],
      classOptions: [
        { label: "电信20-1班", value: '电信20-1班' },
        { label: "电信20-2班", value: '电信20-2班' },
        { label: "电信20-3班", value: '电信20-3班' },
      ],

      option1: {
        title: { text: "代码调试情况" },
        legend: {},
        dataset: {
          source: [
            ["pass", "count", "project", "pointless"],
            [1, 2, "栈的基本操作", 1],
            [1, 9, "队列的基本操作", 1],
            [0, 12, "树形结构基本操作", 1],
            [1, 12, "图形结构基本操作", 1],
            [0, 18, "数据库的创建与修改", 1],
            [1, 19, "软件工程项目开发实践", 1],
          ],
        },
        xAxis: [
          { name: "调试次数", nameLocation: "center", gridIndex: 0 },
          {
            gridIndex: 1,
            axisLabel: { show: false },
            splitLine: { show: false },
          },
        ],
        yAxis: [
          { type: "category", name: "项目名称", gridIndex: 0 },
          {
            type: "category",
            name: "是否通过",
            gridIndex: 1,
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
          },
        ],
        grid: [{ right: "25%", left: "12%" }, { left: "85%" }],
        visualMap: {
          type: "piecewise",
          orient: "horizontal",
          categories: [0, 1],
          selectedMode: "multiple",
          align: "auto",
          // left: 'right',
          text: ["已通过", "未通过"],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#FD665F", "#65B581"],
          },
        },
        series: [
          // These series are in the first grid.
          {
            type: "bar",
            encode: {
              x: "count",
              y: "project",
            },
            label: {
              show: true,
              formatter: "调试次数：{@[1]}",
            },
          },
          // These series are in the second grid.
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            encode: {
              x: "pointless",
              y: "project",
            },
            label: {
              show: true,
              formatter: function (params) {
                if (params.data[0]) {
                  return "已通过";
                }
                return "未通过";
              },
            },
          },
        ],
      },

      option2: {
        title: { text: "作业正确率" },
        legend: {},
        dataset: {
          source: [
            ["pass", "count", "project", "pointless"],
            [1, 2, "栈的基本操作", 1],
            [1, 9, "队列的基本操作", 1],
            [0, 12, "树形结构基本操作", 1],
            [1, 12, "图形结构基本操作", 1],
            [0, 18, "数据库的创建与修改", 1],
            [1, 19, "软件工程项目开发实践", 1],
          ],
        },
        xAxis: [
          { name: "正确率", nameLocation: "center", gridIndex: 0 },
          {
            gridIndex: 1,
            axisLabel: { show: false },
            splitLine: { show: false },
          },
        ],
        yAxis: [
          { type: "category", name: "作业名称", gridIndex: 0 },
          {
            type: "category",
            name: "是否完成",
            gridIndex: 1,
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
          },
        ],
        grid: [{ right: "25%", left: "20%" }, { left: "85%" }],
        visualMap: {
          type: "piecewise",
          orient: "horizontal",
          categories: [0, 1],
          selectedMode: "multiple",
          align: "auto",
          // left: 'right',
          text: ["已完成", "未完成"],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#FD665F", "#65B581"],
          },
        },
        series: [
          // These series are in the first grid.
          {
            type: "bar",
            encode: {
              x: "count",
              y: "project",
            },
            label: {
              show: true,
              formatter: "正确率：{@[1]}%",
            },
          },
          // These series are in the second grid.
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            encode: {
              x: "pointless",
              y: "project",
            },
            label: {
              show: true,
              formatter: function (params) {
                if (params.data[0]) {
                  return "已完成";
                }
                return "未完成";
              },
            },
          },
        ],
      },

      option3: {
        title: { text: "学习进度" },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            // 数据来源：复变的学习通情况，作业：课件=1:3
            ['product', '作业', '课件', '项目'],
            ['第一章', 6, 12, 1],
            ['第二章', 3, 6, 1],
            ['第三章', 6, 12, 1],
            ['第四章', 4, 8, 1],
            ['第五章', 3, 6, 1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar', label: { show: true, formatter: "{a}" } },
        { type: 'bar', label: { show: true, formatter: "{a}" } },
        { type: 'bar', label: { show: true, formatter: "{a}" } }]
      },

      option4: {
        title: {
          text: '讨论参与度'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['话题10', '话题9', '话题8', '话题7', '话题6', '话题5', '话题4', '话题3', '话题2', '话题1']
        },
        series: {
          type: 'bar',
          data: [
            0,
            2,
            Math.floor(Math.random() * 15),
            Math.floor(Math.random() * 15),
            Math.floor(Math.random() * 15),
            Math.floor(Math.random() * 15),
            Math.floor(Math.random() * 15),
            Math.floor(Math.random() * 15),
            5,
            10],
          label: { show: true, position: 'right', formatter: "{c}%" }
        }
      }
    };
  },
  computed: {
    getInfo() {
      return [
        this.$store.state.curriculumInfo,
        this.$store.state.classCollectiveInfo,
        this.formValue.name,
        this.formValue.class,
        this.formValue.id
      ]
    }
  },
  methods: {
    barSet() {
      this.option2.dataset.source = getBar(...this.getInfo);
    },
    handleQuery() {
      const queryFallback = getBar(...this.getInfo);
      if (queryFallback === "-1") {
        window.$message.error("查询学生信息错误");
      }
      else {
        this.option2.dataset.source = queryFallback;
      }
    }
  }
};
</script>

<template>
  <n-grid :x-gap="12" :y-gap="8" :cols="2">
    <n-gi :span="2">
      <n-card>
        <n-form
          inline
          label-width="auto"
          :model="formValue"
          label-align="left"
          label-placement="left"
        >
          <n-form-item label="姓名" path="name">
            <n-input v-model:value="formValue.name" placeholder="请输入姓名" />
          </n-form-item>
          <n-form-item label="班级" path="class">
            <n-select v-model:value="formValue.class" placeholder="请输入班级" :options="classOptions" />
          </n-form-item>
          <n-form-item label="学号" path="id">
            <n-input v-model:value="formValue.id" placeholder="请输入学号" />
          </n-form-item>
          <n-form-item path="week" style="max-width: 5em; margin-left: 1em;">
            第
            <n-input v-model:value="formValue.week" placeholder />周
          </n-form-item>
          <n-form-item>
            <n-button @click="handleQuery" attr-type="button">获取</n-button>
          </n-form-item>
        </n-form>
      </n-card>
    </n-gi>

    <n-gi>
      <n-card>
        <h3>课件使用时间分布</h3>
        <n-table :single-line="false">
          <TableContent :timeDistribution="coursewareTimePlan" />
        </n-table>
      </n-card>
    </n-gi>

    <n-gi>
      <n-card>
        <h3>编程平台使用时间分布</h3>
        <n-table :single-line="false">
          <TableContent :timeDistribution="platformTimePlan" />
        </n-table>
      </n-card>
    </n-gi>

    <n-gi>
      <n-card>
        <figure class="figure-content">
          <v-chart :option="option1" autoresize class="chart" />
        </figure>
      </n-card>
    </n-gi>

    <n-gi>
      <n-card>
        <figure class="figure-content">
          <v-chart :option="option2" autoresize class="chart" />
        </figure>
      </n-card>
    </n-gi>

    <n-gi>
      <n-card>
        <figure class="figure-content">
          <v-chart :option="option3" autoresize class="chart" />
        </figure>
      </n-card>
    </n-gi>

    <n-gi>
      <n-card>
        <figure class="figure-content">
          <v-chart :option="option4" autoresize class="chart" />
        </figure>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<style lang="scss" scoped>
.figure-content {
  height: 500px;
}

.n-select {
  min-width: 8em;
}
</style>