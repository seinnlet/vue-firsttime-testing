import Vue from "vue";
import store from "../store.js";

// vue router
import VueRouter from "vue-router";
Vue.use(VueRouter);

// import views
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }, 
  {
    path: "/orders", 
    name: "order-list", 
    component: () => import(/* webpackChunkName: 'order-list' */ "../views/Orders.vue"),
    meta:{
      requiresAuth: true,
    }
  }, 
  {
    path: "/order/:id", 
    name: "order-detail", 
    component: () => import(/* webpackChunkName: 'order-detail' */ "../views/OrderDetail.vue"),
    meta:{
      requiresAuth: true
    }
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
  },
  { 
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: 'register' */ "../views/Register.vue")
  },
  { 
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'cart' */ "../views/Login.vue")
  },
  {
    path: "*",
    component: () => import("../views/PageNotFound.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',  // abstract
  linkActiveClass: "active", // active class for non-exact links.
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  }else{
    next()
  }
})

export default router;
