import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './Utils/register-vant' // vant组件注册

import 'normalize.css' // 引入预处理样式文件
import 'amfe-flexible' // rem 处理器

import './style/index.less' // 注册全局样式
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
