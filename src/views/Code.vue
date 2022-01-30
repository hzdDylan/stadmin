<script setup>
import {
  NGrid,
  NGridItem,
  NTime,
  NSpace,
  NButton,
  NSlider,
  NMenu,
  NLayoutSider,
  NLayout,
  NForm,
  NFormItem,
  NSelect,
  NInput,
  NCarousel
} from "naive-ui";

import Code from "../components/Code.vue";
import Question from "../components/Question.vue";
</script>

<script>
export default {
  data() {
    return {
      timerInstance: null,
      // 计时器创建
      timerCount: 0 + 57600,
      menuOptions: [
        { label: "课内项目", key: "inclass" },
        { label: "课外项目", key: "outclass" },
        { label: "自拟项目", key: "cusclass" },
      ],
      activeKey: "inclass",
      collapsed: true,
      codeareaShow: 1,

      selectOptions: [
        { label: "成员A", value: "成员A" },
        { label: "成员B", value: "成员B" },
        { label: "成员C", value: "成员C" },
      ],
    };
  },
  created() {
    this.timerInstance = setInterval(() => {
      this.timerCount++;
    }, 1000);
  },
  mounted() {

  },
  computed: {
      getInfo() {
          return this.$store.state.studentsInfo;
      },
      getStudentList() {
        if(this.getInfo.length !== 0) {
            // 若有数据则清空原来的并添加新的
            this.selectOptions = [];
            this.selectOptions = this.getInfo.map((info) => {
                return {
                    label: info.name,
                    value: info.name
                }
            })
        }
        
        return this.selectOptions;
      }
  },
  methods: {
      switchCodeArea(idx) {
        console.log(idx)
          if(idx === 2) {
              this.codeareaShow = 2;
          } else if(idx === 3){
              this.codeareaShow = 3;
          } else {
            // 剩下情况都切换回代码界面
            this.codeareaShow = 1;
          }
      }
  },
  beforeDestroy() {
    clearInterval(this.timerInstance);
  },
};
</script>

<template>
  <n-grid :x-gap="8" :cols="5">
    <n-grid-item :span="2">
      <Question @switchCodeArea="switchCodeArea"></Question>
    </n-grid-item>
    <n-grid-item :span="3" v-if="codeareaShow === 1">
      <Code></Code>
      <n-space justify="space-between">
        <div>
          <span>计时:</span>
          <n-time v-model:time="timerCount" format="HH:mm:ss" unix></n-time>
        </div>

        <n-space>
          <n-button size="small" type="primary" ghost>执行代码</n-button>
          <n-button size="small" type="primary">提交代码</n-button>
        </n-space>
      </n-space>
    </n-grid-item>
    <n-grid-item :span="3" v-else-if="codeareaShow === 2">
      <n-form style="text-align: start">
        <!-- 标题输入 -->
        <n-form-item path="title" label="标题">
          <n-input type="text" placeholder="输入标题" />
        </n-form-item>
        <!-- 内容描述输入 -->
        <n-form-item path="content" label="项目实现的内容描述">
          <n-input type="textarea" placeholder="输入内容" />
        </n-form-item>
        <!-- 拟采取的研究方案的描述 -->
        <n-form-item path="describe" label="拟采取的研究方案">
          <n-input type="textarea" placeholder="输入方案" autosize />
        </n-form-item>
        <!-- 项目组成员添加 -->
        <n-form-item member="member" label="项目组成员">
          <n-select multiple :options="getStudentList" filterable />
        </n-form-item>
        <n-space justify="center">
            <n-button size="large" type="primary">提交</n-button>
        </n-space>
      </n-form>
    </n-grid-item>
    <n-grid-item :span="3" v-else-if="codeareaShow === 3">
      <n-carousel show-arrow>
      <img src="../assets/软件工程图片1.jpg" alt="" style="height:584px; width:850px;" />
      <img src="../assets/软件工程图片2.jpg" alt="" style="height:584px; width:850px;" />
      </n-carousel>
    </n-grid-item>
  </n-grid>
</template>

<style scoped>
</style>