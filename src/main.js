import Vue from 'vue'
import App from './App.vue'
import router from './router'
import lodash from 'lodash'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//导入echarts 
import myecharts from 'echarts'
//导入element-ui
import ElementUI from "element-ui"
import "./assets/css/global.css"
//导入全局样式表
import 'element-ui/lib/theme-chalk/index.css'
//导入字体图标
import './assets/fonts/iconfont.css'
//导入axios
import axios from 'axios'
Vue.prototype.$http = axios
Vue.prototype.$echarts = myecharts
Vue.prototype.$_ = lodash
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  nprogress.start();
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
})
axios.interceptors.response.use(config => {
  nprogress.done();
  return config
})
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
