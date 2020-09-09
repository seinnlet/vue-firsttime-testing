<template>
  <div id="app">
    <NavBar></NavBar>
    <transition mode="out-in" enter-active-class="animate__animated animate__fadeInUp animate__faster">
      <router-view />
    </transition>
  </div>
</template>

<script type="text/javascript">
  import NavBar from './components/NavBar.vue'
  export default {
    components:{
      NavBar
    }
  };
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
