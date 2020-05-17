// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css' //解决由于<style lang="less" scoped>中scoped引起的样式失效问题
import ElementUi from 'element-ui'
import axios from 'axios'
import './assets/css/global.css'
Vue.use(ElementUi)

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
