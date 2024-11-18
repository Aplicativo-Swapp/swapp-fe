<template>
  <div id="app">
    <TheNavigation/>
    <router-view></router-view>  
  </div>
</template>

<script>

import TheNavigation from './components/TheNavigation.vue';

export default {
  name: "App",
  components: {
    TheNavigation,
  },
};
</script>

<style>

body {
  margin: 0; 
  padding: 0; 
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  }

</style>
