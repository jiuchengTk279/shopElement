// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import ElementUI, { Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import global from './assets/css/global.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import vueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// 导入 nprogress 包对应的js和css
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

Vue.use(ElementUI)
Vue.use(less)
Vue.use(global)
// 将富文本编辑器注册为全局可用的组件
Vue.use(vueQuillEditor)
Vue.config.productionTip = false
//  配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在 request 拦截器中，展示进度条， NProgress.start()
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start()
  // 为请求头对象，添加Token验证的Authorization
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须返回config
  return config
})
// 在 response 拦截器中，隐藏进度条，  NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
// 注册 tree-table组件
Vue.component('tree-table', TreeTable)
// 自定义时间的过滤器
Vue.filter('dateFormat', function(originVal) {
  // 获取传入的日期时间
  const dt = new Date(originVal)
  // 获取传入日期的年份
  const y = dt.getFullYear()
  // 获取传入日期的月份，从0开始，加1到正常月份，加''变为字符串，使用padStart不足位数进行补0
  const m = (dt.getMonth() + 0 + '').padStart(2, '0')
  // 获取传入日期的日子
  const d = (dt.getDate() + '').padStart(2, '0')

  // 获取传入日期的小时
  const hh = (dt.getHours() + '').padStart(2, '0')
  // 获取传入日期的分钟
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  // 获取传入日期的秒数
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  // 返回日期格式
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
