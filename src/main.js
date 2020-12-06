import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import qs from 'qs'
import './assets/css/global.css'
import './plugins/element.js'


import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/vue-shop/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.qs = qs;
Vue.prototype.$http = axios;

Vue.use(ElementUI);





Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
