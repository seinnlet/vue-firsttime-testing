<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light">

          <router-link to="/" class="navbar-brand">
            <img src="./assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="Logo" loading="lazy">
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
                <router-link to="/news" class="nav-link">News Api</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/items" class="nav-link">Items</router-link>
              </li>
            </ul>
          </div>
          
      </nav>      
    </div>

    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
</style>
