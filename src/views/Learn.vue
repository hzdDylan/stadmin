<script setup>
import { defineComponent } from 'vue'
import {
    NButton,
    NIcon,
    NSpace,
    NGrid,
    NGi,
    NDivider
} from 'naive-ui'

// 图标引入
import {
    ArrowForwardOutline as ArrowIcon,
    ChevronForward as ForwardIcon
} from '@vicons/ionicons5'

// axios 方法 引入
import {UserPost as UserPost} from "../http/moocrequest"

// // base64 引入
// import Base64 from '../utils/base64'

// export default defineComponent({
//   setup () {
//     // 下面代码是超星学习通的登录代码，因被学习通防火墙挡住了，故放弃该策略。
//     // UserPost({
//     //     'fid':-1,
//     //     'uname': '13542709521',
//     //     'password': 'MzI2OTMz',
//     //     'refer': 'http%253A%252F%252Fi.chaoxing.com',
//     //     't': true,
//     //     'forbidotherlogin':0,
//     //     'validate': ''
//     // }).then(console.log)
//     return {
      
//     }
//   },
</script>

<script>
export default {
    methods: {
        codeClick() {
            console.log("点击了箭头")
        }
    }
}
</script>

<template>
    <n-grid :x-gap="12" :y-gap="8" :cols="7">
        <n-gi :span="7" class="home-content">
            <div id="home-logo">
                <div class="front-font">
                    计算机软件基础课程
                </div>
                <div class="front-font">
                    共享数据平台
                </div>
            </div>
            <n-icon size="120" color="rgb(188,188,188)" style="padding-left:36px;" @click="codeClick">
                <ArrowIcon />
            </n-icon>
        </n-gi>
        <n-gi :offset="2" :span="3">
            <n-divider title-placement="center"  class="ak">
                <n-space vertical align='center'>
                    <h2 style="margin-left:10px;margin-bottom:0;letter-spacing:12px;">服务导航</h2>
                    <span style="margin-top: 0">Service navigation</span>
                </n-space>
            </n-divider>
        </n-gi>
        <n-gi></n-gi>
        <n-gi :offset="2">
            <!-- 回溯用的按钮样式 -->
            <!-- <n-button circle size="large" @click="window.location.href='https://i.chaoxing.com'">
                <template #icon>
                    <img src="../assets/学习通.png" alt="" style="margin-left:-55%;margin-top:-55%;width:220%;height:220%;"/>
                </template>
                <span>超星学习通</span>
            </n-button> -->
            <n-button ghost color="rgb(64,144,202)" size="large" @click="'https://i.chaoxing.com'">
                <template #icon>
                    <img src="../assets/学习通.png" alt=""/>
                </template>
                <span>超星学习通</span>
                <n-icon style="padding-left:1em"><ForwardIcon /></n-icon>
            </n-button>
        </n-gi>
        <n-gi>
            <n-button size="large" ghost color="rgb(245,176,32)" >
                <template #icon>
                    <img src="../assets/慕课.jpg" alt=""/>
                </template>
                <span>智慧树慕课</span>
                <n-icon style="padding-left:1em"><ForwardIcon /></n-icon>
            </n-button>
        </n-gi>
        <n-gi>
            <n-button size="large" ghost color="rgb(123,181,81)" >
                <template #icon>
                    <img src="../assets/图书馆.png" alt="">
                </template>
                <span>图书馆首页</span>
                <n-icon style="padding-left:1em"><ForwardIcon /></n-icon>
            </n-button>
        </n-gi>
    </n-grid>
</template>

<style scoped lang="scss">
::v-deep .n-divider {
    --n-color: black !important;
    margin-top: 0;

    .n-space{
        div:first-child {
            margin-bottom: 0px !important;
        }
        div:last-child {
            margin-bottom: 00px;
        }
    }
}

#home-logo {
    height: 50vh;
    width: 40vw;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url(../assets/首页背景图.jpeg);
    background-position: center center;
    background-size: 80vh;
    background-repeat: no-repeat;

    .front-font {
        font-size: 32px;
        font-weight: bold;
        background: black;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
}

.home-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

// :deep(.n-button) {
//     $--WH: 100px;

//     flex-direction: column;
//     align-items: center;
//     width: $--WH;
//     height: $--WH;
//     border-radius: calc($--WH/2);

//     .n-button__icon {
//         margin-left: var(--n-icon-margin);
//         margin-bottom: 18px;
//     }
// }
</style>