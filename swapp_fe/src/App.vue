<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
};
</script>

<style>

@font-face {
  font-family: 'Open Sauce One';
  src: url('@/assets/fonts/OpenSauceOne-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Open Sauce One';
  src: url('@/assets/fonts/OpenSauceOne-Light.ttf') format('truetype');
  font-weight: 200;
  font-style: normal;
}

body {
  margin: 0; 
  padding: 0; 
  height: 100vh;
  font-family: 'Open Sauce One', sans-serif;
}

#app {
  font-family: 'Open Sauce One', sans-serif; /* Define a fonte para todo o app */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  }

</style>
