import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// naive 字体注册
import 'vfonts/Lato.css' // 通用字体
import 'vfonts/FiraCode.css' // 等宽字体

// vue-echarts全局注册
import ECharts from 'vue-echarts'
import { use } from "echarts/core";

// 手动引入 ECharts 各模块来减小打包体积
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  PieChart,
  LineChart
} from 'echarts/charts'
import {
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  ToolboxComponent,
  VisualMapComponent
} from 'echarts/components'
import { UniversalTransition } from 'echarts/features';

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  DatasetComponent,
  UniversalTransition,
  VisualMapComponent
]);

const app = createApp(App);

// echarts全局注册组件
app.component('v-chart', ECharts)

app.use(router).use(store).mount('#app')
