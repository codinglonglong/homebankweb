// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Element from 'element-ui'
import VueCookie from 'vue-cookie'
import {backendhost, backendport} from "./conf";


Vue.use(Element);
Vue.use(VueAxios, axios);
Vue.use(VueCookie);

axios.defaults.baseURL = 'http://' + backendhost + ':' + backendport;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
