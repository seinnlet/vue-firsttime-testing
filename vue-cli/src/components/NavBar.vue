<template>
	
	<div id="nav">
    <nav class="navbar navbar-expand-lg navbar-light">

        <router-link to="/" class="navbar-brand">
          <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="Logo" loading="lazy">
          <span class="ml-1 font-weight-bold">Vue CLI</span>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'item-list'}" class="nav-link">Items</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'order-list'}" class="nav-link">Order List</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'cart'}" class="nav-link pl-0 pl-lg-3">
                <span class="d-lg-none pr-2">My Cart</span>
                <b-icon icon="cart2" aria-hidden="true"></b-icon>

                <sup>
                  <transition
                    mode="out-in"
                    enter-active-class="animate__animated animate__heartBeat animate__fast"
                  >
                    <span class="badge badge-pill custom-badge" v-if="cartCount > 0" :key="cartCount">{{ cartCount }}</span>
                </transition>
                </sup>
              </router-link>
            </li>
          </ul>
        </div>
        
    </nav>      
  </div>

</template>

<script type="text/javascript">
  export default {
    computed: {
      cartCount() {
        this.$store.dispatch('getData')
        return this.$store.getters.cartTotalQty;

      }
    }
  };
</script>