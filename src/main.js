import Vue from 'vue'
import App from './App.vue'
import router from './router'
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
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
