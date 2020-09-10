import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store.js";
import {currency} from "@/currency.js";

import './assets/css/style.css';

Vue.config.productionTip = false;

Vue.filter('currency', currency);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
