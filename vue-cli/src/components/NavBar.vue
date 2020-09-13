<template>
	
	<div id="nav" class="sticky-top">
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
              <router-link :to="{name: 'cart'}" class="nav-link">
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
            <li class="nav-item dropdown" v-if="isLoggedIn">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{authUser.name}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link :to="{name:'order-list'}" class="dropdown-item">Order List</router-link>
                <div class="dropdown-divider"></div>
                <a @click="logout()" class="dropdown-item" href="#">Log Out</a>
              </div>
            </li>
            <li class="nav-item" v-else>
              <router-link :to="{name:'login'}" class="btn-login shadow-sm">Log In</router-link>
            </li>
          </ul>
        </div>
        
    </nav>      
  </div>

</template>

<script type="text/javascript">
  import Swal from 'sweetalert2'

  export default {
    methods:{
      logout(){
        Swal.fire({
            title: 'Do you want to Log Out?',
            text: '',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Log Out',
            confirmButtonColor: '#E9625E',
            showCloseButton: true,
            allowEscapeKey: true,
            focusConfirm: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.$store.dispatch('logout')
              this.$router.push('/')
            }
          })
      }
    },
    computed: {
      cartCount() {
        this.$store.dispatch('getData')
        return this.$store.getters.cartTotalQty;
      },
      isLoggedIn() { 
        return this.$store.getters.isLoggedIn
      },
      authUser(){
        return this.$store.state.user
      }
    }
  };
</script>