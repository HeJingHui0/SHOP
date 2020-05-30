// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css' //解决由于<style lang="less" scoped>中scoped引起的样式失效问题
import ElementUi, { MessageBox } from 'element-ui'
import axios from 'axios'
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

Vue.use(ElementUi)
Vue.component('tree-table', TreeTable)
Vue.filter('dateFormat', function(originDate) {
  const date = new Date(originDate * 1050)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1 + '').padStart(2, '0')
  const day = (date.getDate() + '').padStart(2, '0')
  const hour = (date.getHours() + '').padStart(2, '0')
  const minute = (date.getMinutes() + '').padStart(2, '0')
  const second = (date.getSeconds() + '').padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
