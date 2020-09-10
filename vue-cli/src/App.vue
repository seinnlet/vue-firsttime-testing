<template>
  <div id="app">

    <div id="content">
      <NavBar></NavBar>
      <transition mode="out-in" enter-active-class="animate__animated animate__fadeInUp animate__faster">
        <router-view />
      </transition>
    </div>

    <Footer></Footer>

  </div>
</template>

<script type="text/javascript">
  import NavBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue'
  
  export default {
    components:{
      NavBar, Footer
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
  height: 100%;
  display: flex;
  flex-direction: column;
}
#content {
  flex: 1 0 auto;
}
</style>
