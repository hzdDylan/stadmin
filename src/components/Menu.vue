<template>
  <n-menu :value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script>
import { defineComponent, h, ref } from 'vue'
import { NIcon,NMenu } from 'naive-ui'
import {
  BookOutline as BookIcon,
  CodeSlashOutline as CodeIcon,
  PersonOutline as PersonIcon
} from '@vicons/ionicons5'

// 路由引入
import {RouterLink} from 'vue-router'


function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/learn'
          }
        },
        () => "学习"
      ),
    key: 'learn-page',
    icon: renderIcon(BookIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/code'
          }
        },
        () => '编程'
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(CodeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/admin'
          }
        },
        () => '教师端'
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(PersonIcon)
  }
]

export default defineComponent({
  setup () {
    return {
      activeKey: ref(null),
      menuOptions
    }
  },
  components: {
      NMenu
  }
})
</script>

<style lang="scss" scoped>
.n-menu {
  
  :deep(.n-menu-item) {
    margin-right: 5em;
  }
}
</style>