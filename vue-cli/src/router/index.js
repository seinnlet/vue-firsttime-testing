import Vue from "vue";

// vue router
import VueRouter from "vue-router";
Vue.use(VueRouter);

// import views
import Home from "../views/Home.vue";

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

// format date-time 
import moment from 'moment';
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMM YYYY, h:mm a')
  }
})

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }, 
  {
    path: "/orders", 
    name: "order-list", 
    component: () => import(/* webpackChunkName: 'order-list' */ "../views/Orders.vue")
  }, 
  {
    path: "/order/:id", 
    name: "order-detail", 
    component: () => import(/* webpackChunkName: 'order-detail' */ "../views/OrderDetail.vue")
  }, 
  {
    path: "/items", 
    name: "item-list", 
    component: () => import(/* webpackChunkName: 'item-list' */ "../views/Items.vue")
  },
  { 
    path: '/item/:id',
    name: 'item-detail',
    component: () => import(/* webpackChunkName: 'item-detail' */ "../views/ItemDetail.vue")
  },
  { 
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: 'cart' */ "../views/ShoppingCart.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',  // abstract
  linkActiveClass: "active", // active class for non-exact links.
});

export default router;
