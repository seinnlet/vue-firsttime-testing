<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- nav from bootstrap -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="./assets/logo.png" width="30" height="30" alt="" loading="lazy">
        </a>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
              <router-link to="/testing" class="nav-link">Testing</router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Link</a> -->
              <router-link to="/exercise" class="nav-link">Exercise</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/user/2" class="nav-link">User</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="row py-5">
        <div class="col-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Testing from './components/Testing.vue'
// import Exercise from './components/Exercise.vue'

export default {
  name: 'App',
  mounted() {
    this.$router.replace('/testing')
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
  /*margin-top: 60px;*/
}
</style>
