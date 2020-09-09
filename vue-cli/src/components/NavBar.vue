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
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'new-list'}" class="nav-link">News Api</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'item-list'}" class="nav-link">Items</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'cart'}" class="nav-link pl-0 pl-lg-3">
                <span class="d-lg-none pr-2">My Cart</span>
                <b-icon icon="cart2" aria-hidden="true"></b-icon>

                <sup>
                  <transition
                    mode="out-in"
                    enter-active-class="animate__animated animate__bounceIn animate__fast"
                    leave-active-class="animate__animated animate__bounceOut"
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

<style> 
#nav {
  margin-bottom: 40px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  box-shadow: 2px 0 5px -2px #888;
  padding-right: 5%;
  padding-left: 5%;
}

#nav a.nav-link {
  color: #667489;
}

#nav a.router-link-exact-active {
  color: #41B883;
  font-weight: bold;
}

#nav a.router-link-exact-active span {
  color: #2c3e50;
}

.custom-badge {
  color: #fff !important;
  background-color: #41B883;
}

</style>