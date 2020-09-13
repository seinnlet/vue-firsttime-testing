import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
  state: {
    cart: [],
    token: localStorage.getItem('token') || '',
    authStatus: '',
    user: {}
  },

  mutations: {
    addToCart (state, payload) {
      let item = state.cart.find(item => item.id == payload.id);

      if (item) {
      	item.qty += Number(payload.qty);
      } else {
      	state.cart.push(payload);
      }

    }, 
    saveCart(state) {
    	localStorage.setItem('cart', JSON.stringify(state.cart));
    }, 
    removeFromCart (state, payload) {
      state.cart = [...state.cart.filter(item => item.id !== payload)];
    },
    getData(state) {
    	if(localStorage.getItem('cart')){
        state.cart = JSON.parse(localStorage.getItem('cart'));
      }else{
        state.cart = [];
      }
    }, 
    increaseQty(state, payload) {
      const item = state.cart.find(item => item.id == payload);
      if (item.qty < 10) {
        item.qty++;
      }
    },
    decreaseQty(state, payload) {
      let item = state.cart.find(item => item.id == payload);
      if (item.qty > 1) {
        item.qty--;
      }
    },

    auth_request(state){
      state.authStatus = 'loadings...'
    },
    auth_success(state,token){
      state.authStatus = 'success'
      localStorage.setItem('token',token)
      state.token = token
    },
    auth_fail(state){
      state.authStatus = 'fail'
    },
    logout(state){
      // axios.delete('http://localhost:8001/oauth/tokens/' + state.token);
      // localStorage.removeItem('token')
      state.token=null
      state.user={}
    },

    storeUserData(state,user){
      state.user = user
    },
  },

  actions: {
  	addToCart({ commit }, payload) {
  		commit('addToCart', payload)
  		commit('saveCart')
  	},
    removeFromCart({ commit }, payload) {
      commit('removeFromCart', payload)
      commit('saveCart')
    },
  	getData({ commit }) {
  		commit('getData')
  	},
    increaseQty({ commit }, payload) {
      commit('increaseQty', payload)
      commit('saveCart')
    },
    decreaseQty({ commit }, payload) {
      commit('decreaseQty', payload)
      commit('saveCart')
    },

    loginSuccess({commit, dispatch},token){
      commit('auth_success',token)
      dispatch('getUser')
    },
    loginFail({commit}){
      commit('auth_fail')
    },
    logout({commit,dispatch}){
      return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('token')
            // remove the axios default header
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
      
    },

    login({commit,dispatch},user){
      return new Promise((resolve, reject) => {
          commit('auth_request');
          let data = {
              client_id: 2,
              client_secret: 'yZdPMXMaIPwlB88TudinyopgtjjWX0QEwygIcUYU',
              grant_type: 'password',
              username: user.username,
              password: user.password
          };
          axios.post('http://localhost:8001/oauth/token', data)
              .then(res => {
                  const token = res.data.access_token;
                  localStorage.setItem('token', token);

                  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                  commit('auth_success', token);
                  dispatch('getUser');
                  resolve(res);
              })
              .catch(err => {
                  commit('auth_fail');
                  localStorage.removeItem('token');
                  reject(err);
              });
      });
    },
    getUser(state){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8001/api/user')
        .then(res => {
            state.commit('storeUserData', res.data);
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
      });
    },
    storeUserData({commit},user){
      commit('storeUserData',user)
    },

  }, 

  getters: {
    cartItems: (state, getters, rootState) => {
      return state.cart.map(({ id, qty }) => {
        const item = rootState.cart.find(item => item.id === id)
        return {
          name: item.name,
          price: item.price,
          qty
        }
      })
    },

    cartTotalPrice: (state, getters) => {
      return getters.cartItems.reduce((total, item) => {
        return total + item.price * item.qty
      }, 0)
    },

    cartTotalQty: (state, getters) => {
      return getters.cartItems.reduce((total, item) => {
        return total + item.qty
      }, 0)
    },

    isLoggedIn: state => !!state.token,
    authStatus: state => state.authStatus,

  },
  plugins: [createPersistedState()],

})

export default store