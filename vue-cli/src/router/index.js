import Vue from "vue";

// vue router
import VueRouter from "vue-router";
Vue.use(VueRouter);

// import views
import Home from "../views/Home.vue";
import News from "../views/News.vue";
import Items from "../views/Items.vue";
import Itemdetail from "../views/ItemDetail.vue";

// bootstrap & css
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// bootstrap js
import 'bootstrap';
import { BCarousel } from 'bootstrap-vue'
Vue.component('b-carousel', BCarousel)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }, 
  {
    path: "/news", 
    name: "News", 
    component: News
  }, 
  {
    path: "/items", 
    name: "Items", 
    component: Items
  },
  { 
    path: '/items/:id',
    name: 'ItemDetail',
    component: Itemdetail
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',  // abstract
  linkActiveClass: "active", // active class for non-exact links.
  // linkExactActiveClass: "active"
});

export default router;
