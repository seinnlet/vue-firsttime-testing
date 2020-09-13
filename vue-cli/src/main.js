import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store.js";


// material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)


// bootstrap & css
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// bootstrap js
import 'bootstrap';
// animation
import 'animate.css';


// filters
import {currency} from "@/filters/currency.js";
Vue.filter('currency', currency);
import {formatdatetime} from "@/filters/formatdatetime.js";
Vue.filter('formatDate', formatdatetime)


// custom css
import './assets/css/style.css';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
