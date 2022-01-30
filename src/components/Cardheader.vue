<script setup>
import { defineProps,ref,computed } from 'vue'
import {
    NTabs,
    NTabPane
} from 'naive-ui'

// 引入vuex状态管理
import {useStore} from "vuex"
const $store = useStore();

// 从vuex读取到面包屑情况
const name = computed(() => $store.state.adminRoute)
const panels = computed(() => $store.state.adminRouteHistory)
</script>

<script>
export default {
    methods: {
        handUpdate(key) {
            this.$store.commit('changeAdminRoute', key)
        },
        handleClose(key) {
            this.$store.commit('deleteAdminRoute', key)
        }
    }
}
</script>

<template>
    <n-tabs
        :value="name"
        type="card"
        closable
        @close="handleClose"
        @update:value="handUpdate"
        tab-style="min-width: 80px;"
    >
        <n-tab-pane
            v-for="panel in panels"
            :key="panel"
            :tab="panel.toString()"
            :name="panel"
        >
        </n-tab-pane>
    </n-tabs>
</template>

<style scoped>

</style>