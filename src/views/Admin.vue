<script setup>
import {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NMessageProvider
} from 'naive-ui'

import Cardheader from '../components/Cardheader.vue'
import Asidemenu from '../components/Asidemenu.vue'


</script>

<template>
<div>
    <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px;">
            <Asidemenu></Asidemenu>
        </n-layout-sider>
        <n-layout>
            <n-layout-header>
                <Cardheader></Cardheader>
            </n-layout-header>
            <n-layout-content>
                <n-message-provider>
                    <router-view></router-view>
                </n-message-provider>
            </n-layout-content>
        </n-layout>
    </n-layout>
</div>
</template>

<style scoped lang="scss">
.n-layout-sider {
    :deep(.n-layout-sider-scroll-container) {
        padding: 0;
        background-color:rgba(240, 236, 232, 0.432);
        margin-right: 3px;
    }
}
</style>