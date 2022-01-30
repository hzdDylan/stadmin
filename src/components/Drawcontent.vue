<script setup>
import {h} from 'vue'

import { 
    NDrawerContent,
    NMenu,
    NIcon,
    NTabs,
    NTab
} from "naive-ui";

import {
  BookmarkOutline as BookmarkIcon
} from '@vicons/ionicons5'

</script>

<script>
export default {
    props: {
        questionList: Array,
        activeKey: Number,
        activeTab: String
    },
    data() {
        return {
            questionListMenu: [],
            
        }
    },
    methods: {
        changeTabs(value) {
            this.$emit('changeTabs', value);
        },
        changeQuestion(key, item) {
            this.$emit('changeQuestion', key);
        },
        addPrefixTag(list) {
            this.questionListMenu = [];
            list.forEach((item, index) => {
                this.questionListMenu.push({
                    label: "Q"+index+"  "+item,
                    key: index,
                    icon: () => h(NIcon, null, { default: () => h(BookmarkIcon) })
                })
            })
        }
    },
    beforeMount() {
        this.addPrefixTag(this.questionList);
    }
}
</script>

<template>
  <n-drawer-content header-style="padding-right: 0;">
    <template #header>
        <n-tabs v-model:value="activeTab" :on-update:value="changeTabs">
            <template #prefix>题目列表</template>
            <n-tab name="questions">课内项目</n-tab>
            <n-tab name="outclassQuestions">课外项目</n-tab>
            <n-tab name="cusclassQuestions">自拟项目</n-tab>
        </n-tabs>
    </template>
    <n-menu :value="activeKey" :options="questionListMenu" :on-update:value="changeQuestion"/>
  </n-drawer-content>
</template>

<style scoped lang="scss">
.n-tabs {
    :deep(.n-tabs-nav) {
        .n-tabs-nav__prefix {
            padding-right: 42px;
        }
    }
}
</style>
