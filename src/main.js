import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
// 自定义警告处理函数
app.config.warnHandler = (msg, vm, trace) => {
    // 什么都不做，即不输出任何警告信息到控制台
};
app.mount('#app')
