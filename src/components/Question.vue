<script setup>
import { NGrid,
        NGridItem,
        NScrollbar,
        NSpace,
        NButton,
        NDrawer,
        NDrawerContent
    } from 'naive-ui'

import Code from '../components/Code.vue'
import Drawcontent from '../components/Drawcontent.vue'

// axios 引入
import axios from "axios";

import {defineComponent, ref} from 'vue'

</script>

<script>
export default defineComponent({
  data() {
      return {
          drawshow: false,
          questionID: 0,
          questionList: [],
          questionContent: {
              title: "问题题目",
              content: "问题描述",
              examples: [
                  "输入示例",
                  "输出示例",
                  "解释示例"
              ]
          },
          activeTab: 'questions',
      }
  },
  mounted() {
      this.getQuestions('questions');
      this.questionLineInit('questions');
  },
  computed: {
      
  },
  methods: {
      activeDraw() {
          this.drawshow = !this.drawshow;
      },
      questionLineInit(dbList) {
      axios
        .get("/questions.json")
        .then((res) => {
            let data = [...res.data[dbList]];
            this.questionList = [];
            data.forEach((item) => {
                this.questionList.push(item.title);
            })
        })
        .catch();
        },
      getQuestions(dbList) {
      axios
        .get("/questions.json")
        .then((res) => {
            const questionContent = res.data[dbList][this.questionID];
            this.questionContent.title = questionContent.title;
            this.questionContent.content = questionContent.content;
            this.questionContent.examples = questionContent.examples;

            // 对右侧区域发出切换请求。
            this.$emit('switchCodeArea', questionContent.specialCodeArea || 1);
            console.log(questionContent.specialCodeArea || 1)
        })
        .catch();
      },
      changeQuestion(id, tab) {
          this.questionID = id;
          this.drawshow = false;
          this.getQuestions(this.activeTab);
      },
      changeTabs(tab) {
          this.questionID = 0;
          this.drawshow = false;
          this.getQuestions(tab);
          this.questionLineInit(tab);
          this.activeTab = tab;

          // 如果切换到了自拟项目的时候，emit一条flag消息，申请将代码区域换成表单输入区域
        //   if(tab === "cusclassQuestions") {
        //       this.$emit('isCustab', true);
        //   }
        //   else {
        //       this.$emit('isCustab', false);
        //   }
      },
      questionIDIncrease() {
          if(this.questionID > 0)
            this.changeQuestion(this.questionID - 1)
      },
      questionIDDecrease() {
          if(this.questionID < this.questionList.length)
            this.changeQuestion(this.questionID + 1)
      }
  }
})
</script>


<template>
    <div>
        <div class="question-fast-picker-wrapper">
            <n-space justify="space-between">
                <n-button @click="activeDraw">题目列表</n-button>

                <n-space>
                    <n-button @click="questionIDIncrease">上一题</n-button>
                    <span style="line-height: 32px;">{{questionID+1}}/{{questionList.length}}</span>
                    <n-button @click="questionIDDecrease">下一题</n-button>
                </n-space>
            </n-space>
        </div>
        <n-scrollbar style="max-height: 76vh;min-height: 76vh;" id="question-content">
            <div class="wrap">
                <div class="title">
                    <h2>题目: {{questionContent.title}}</h2>
                </div>
                <div class="content">
                    <h3 style="margin: 0">描述</h3>
                    <p v-for="(item,name) in questionContent.content" :key="name">
                        {{item}}
                    </p>
                </div>
                <div class="examples">
                    <h3 style="margin: 0">示例</h3>
                    <pre v-for="(item,name) in questionContent.examples" :key="name">
<strong>输入:</strong>{{item.input}}
<strong>输出:</strong>{{item.output}}
<strong>解释:</strong>{{item.description}}</pre>
                </div>
            </div>
        </n-scrollbar>

        <!--抽屉内容-->
        <n-drawer 
            :show="drawshow" 
            :width="400"
            placement="left"
            to="#question-content"
            >
            <Drawcontent
                :questionList="questionList" 
                :activeKey="questionID"
                :activeTab="activeTab"
                @changeQuestion="changeQuestion"
                @changeTabs="changeTabs"
                ></Drawcontent>
        </n-drawer>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-size: 13px;
    margin-top: 0;
    margin-bottom: 1em;
    text-align: left;

    .content {
        
        p {
            margin: 0.5em 0;
        }
    }

    .examples {
        pre {
            background: rgba(0, 10, 32, 0.05);
            padding: 10px 15px;
            line-height: 1.6;
            white-space: pre-wrap;
            overflow: auto;
            margin: 1em 0px;
            border-radius: 3px;
        }
        
    }
}
</style>