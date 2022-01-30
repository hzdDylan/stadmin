<script setup>
import { defineComponent, h,computed, ref, watch } from 'vue'
import {
    NIcon,
    NMenu
} from 'naive-ui'
import {
  FishOutline as FishIcon,
  PawOutline as PawIcon,
  BagOutline as BagOutlineIcon
} from '@vicons/ionicons5'

// 引入vuex状态管理
import {useStore} from "vuex"
const $store = useStore();

// 引入路由管理
import { useRouter } from 'vue-router'
const $router = useRouter();

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
    {
        label: '学生信息管理',
        key: '学生信息管理',
        path: '/table',
        icon: renderIcon(FishIcon),
    },
    {
        label: '课程内容学习',
        key: '课程内容学习',
        path: '/curriculum',
        icon: renderIcon(PawIcon),
    },
    {
        label: '资源使用情况',
        key: '资源使用情况',
        icon: renderIcon(BagOutlineIcon),
        path: '/resource'
    },
    {
        label: '作业情况',
        key: '作业情况',
        path: '/assignment',
        icon: renderIcon(FishIcon),
    },
    {
        label: '项目情况',
        key: '项目情况',
        icon: renderIcon(PawIcon),
        path: '/project',
    },
    {
        label: '个性化数据信息',
        key: '个性化数据信息',
        icon: renderIcon(BagOutlineIcon),
        children: [
            {
            label: '个性化查询',
            key: '个性化查询',
            path: '/individual',
            },
            {
            label: '代码正确率',
            key: '代码正确率',
            path: '/codeAccuracy', 
            disabled: true,
            },
            {
            label: '作业正确率',
            key: '作业正确率',
            path: '/assignmentAccuracy',
            disabled: true,
            },
            {
            label: '学习进度',
            key: '学习进度',
            path: '/progress',
            disabled: true,
            }
        ]
    }
];

const activeMenuItem = computed(() => $store.state.adminRoute)

function sidemenuChange(key) {
    $store.commit('changeAdminRoute', key)
}

// 监视路由跳转情况
watch(activeMenuItem, (newKey) => {
    console.log("监听到路由跳转，目标为"+newKey)
    let targetPath;
    menuOptions.forEach((item, index) => {
        if(menuOptions[index].key === newKey)
            targetPath = menuOptions[index].path;
    })
    $router.push({
        name: newKey,
        path: `/admin${targetPath}`
    })
})

</script>

<template>
    <n-menu
        :options="menuOptions"
        default-value="学生信息管理"
        :value="activeMenuItem"
        @update:value="sidemenuChange"
        accordion
    />
</template>