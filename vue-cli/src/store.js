import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cart: []
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
    }
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
    }
  }

})

export default store