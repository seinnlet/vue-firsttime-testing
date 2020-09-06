import Vue from 'vue'

// vue router
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// new router
import Testing from './components/Testing.vue'
import Exercise from './components/Exercise.vue'

// dynamic route test
import User from "./components/User.vue";

const router = new VueRouter({
	routes: [
		{
			path: '/testing', 
			component: Testing
		}, 
		{
			path: '/exercise', 
			component: Exercise
		}, 
		{
			path: '/user/:id', 
			component: User
		}
	],
	mode: 'history',	// abstract
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active"
})

export default router