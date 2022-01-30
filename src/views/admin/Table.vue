<script setup>
import { defineComponent, ref, computed } from "vue";
import { NDataTable } from "naive-ui";
</script>

<script>
export default {
  data() {
    return {
      show: false,
      data: [],
      pagination: { pageSize: 30 },
      columns: [
        {
          title: "姓名",
          key: "name",
          // width: 80,
          fixed: "left",
          align: "center",
          className: "name-col"
        },
        {
          title: "班级",
          key: "grade",
          // width: 100,
          align: "center",
          className: "grade-col"
        },
        {
          title: "学号",
          key: "id",
          // width: 120,
          align: "center",
          className: "id-col"
        },
        {
          title: "专业",
          key: "major",
          // width: 180,
          align: "center",
          className: "major-col"
        },
        {
          title: "学院",
          key: "department",
          // width: 100,
          align: "center",
          className: "department-col"
        },
      ],
    };
  },
  mounted() {
    if (this.getinfo.length !== 0 && this.getinfo[1].length !== 0) {
      this.refreshTable();
    }
  },
  computed: {
    getinfo() {
      return [this.$store.state.studentsInfo, this.$store.state.curriculumInfo];
    }
  },
  methods: {
    // 刷新表格
    refreshTable() {
      // 首先是表头导入科目进行重构
      const columnsCourseList = this.getinfo[1];

      // 因为不需要学科信息了故此部分注释掉
      // this.columns.push(
      //   ...columnsCourseList.map((curr, idx) => {
      //     return {
      //       title: curr,
      //       key: curr,
      //       align: "center",
      //       children: [
      //         { title: "分数", key: `score${idx}`, align: "center" },
      //         { title: "时间", key: `time${idx}`, align: "center" },
      //       ],
      //     };
      //   })
      // );

      // 学生数据导入
      this.data = this.getinfo[0].map((info) => {
        // info里包含了course数组，该数组无法被解析，需提取出来
        // 创建备份，避免直接修改到了原数组
        const infoTemp = this.deepClone(info);
        // 接下来就是修改备份了
        infoTemp.course = infoTemp.course.map((arr, idx) => {
          // 返回重构后的对象
          const tempObj = {};
          tempObj[`score${idx}`] = arr[1];
          tempObj[`time${idx}`] = arr[2];
          return tempObj;
        });

        // 将course对象里的数组提取出并 合并到外层对象中
        Object.assign(infoTemp, ...infoTemp.course);
        // 删掉infoTemp.course数组，减少空间浪费
        delete infoTemp.course;

        return infoTemp;
      });
      this.show = true;
    },

    // 深拷贝/深克隆函数
    deepClone(target) {
      let result;
      // 如果拷贝目标为对象
      if (typeof target === "object") {
        // 进一步如果是数组
        if (Array.isArray(target)) {
          result = [];
          // 执行遍历
          for (let arr of target) {
            // 递归克隆
            result.push(this.deepClone(arr));
          }
        } else if (target === null) {
          //如果为null则直接赋值
          result = null;
        } else if (target.constructor === RegExp) {
          // 如果是一个RegExp则直接赋值
          result = target;
        } else {
          // 都不是则为普通对象，在进行一次递归
          result = {};
          for (let i in target) {
            result[i] = this.deepClone(target[i]);
          }
        }
      } else {
        // 基本数据类型情况
        result = target;
      }
      return result;
    },

    rowClassFn(row, idx) {
      if(idx % 2 == 1) {
        return 'odd'
      }
      return 'even'
    }
  },
  watch: {
    getinfo: function (val) {
      if (val[1].length !== 0) {
        this.refreshTable();
      }
    },
  },
};
</script>

<template>
  <n-data-table
    v-if="show"
    :columns="columns"
    :data="data"
    :max-height="450"
    :pagination="pagination"
    :single-line="false"
    :row-class-name="rowClassFn"
  />
</template>

<style scoped lang="scss">
:deep(.name-col) {
  background-color: rgba(179, 214, 110, 0.3);
}
:deep(.grade-col) {
  background-color: rgba(255, 232, 130, 0.3);
}
:deep(.id-col) {
  background-color: rgba(255, 252, 153, 0.3);
}
:deep(.major-col) {
  background-color: rgba(248, 147, 29, 0.3);
}
:deep(.department-col) {
  background-color: rgba(95, 92, 51, 0.3);
}
:deep(.odd) {
  background-color: rgba(250,250,252,0.5);
  &:hover {
    background-color: rgba(0,0,0,0.1) !important;
  }
}
:deep(.even) {
  background-color: rgba(255, 255, 255,0.5);
  &:hover {
    background-color: rgba(0,0,0,0.1) !important;
  }
}
</style>