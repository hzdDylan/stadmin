<script setup>
import { NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutFooter
        } from 'naive-ui'

import Menu from '../components/Menu.vue'
import Code from '../components/Code.vue'


// 导入XLSX文件读取方法
import fn from './admin/XLSXhandle'

// 导入vuex仓库来存学生信息
import {useStore} from 'vuex'
const $store = useStore();

// 获取学生信息
fn().then((infos) => {
    // 存储学生信息
    $store.commit('uploadStudentsInfo', infos);
});
</script>

<template>
<div>
    <n-layout>
      <n-layout-header>
        <Menu></Menu>
      </n-layout-header>
      <n-layout-content content-style="padding: 14px;">
        <router-view/>
      </n-layout-content>
      <n-layout-footer>
        <ul class="footer-column">
          <li>备案号: <a href="https://beian.miit.gov.cn/" ref="noreferrer" target="_blank">粤ICP备2021011187号</a></li>
        </ul>
      </n-layout-footer>
    </n-layout>
</div>
</template>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(105, 168, 219, 0.8);
}

.n-layout-content {
  background: linear-gradient(rgb(249, 254, 255), rgba(255,255,255,1))
}

.footer-column {
  margin-top: 10px;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
}

.footer-column li {
  color: #000000;
}

.footer-column a {
  text-decoration: none;
  color: inherit;
}
</style>