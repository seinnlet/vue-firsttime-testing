import Vue from "vue";

// vue router
import VueRouter from "vue-router";
Vue.use(VueRouter);

// import views
import Home from "../views/Home.vue";
import News from "../views/News.vue";
import Items from "../views/Items.vue";
import Itemdetail from "../views/ItemDetail.vue";
import ShoppingCart from "../views/ShoppingCart.vue";

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

// animation
import 'animate.css';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }, 
  {
    path: "/news", 
    name: "new-list", 
    component: News
  }, 
  {
    path: "/items", 
    name: "item-list", 
    component: Items
  },
  { 
    path: '/item/:id',
    name: 'item-detail',
    component: Itemdetail
  },
  { 
    path: '/cart',
    name: 'cart',
    component: ShoppingCart
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',  // abstract
  linkActiveClass: "active", // active class for non-exact links.
});

export default router;
