<template>
    <header class="header">
      <router-link to="/">
        <img src="@/assets/logo2.png" alt="Logo" class="logo" />
      </router-link>
    </header>
</template>

<style scoped>
.header {
  background-color: #14241F;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

#app {
  flex: 1; 
}
body {
  background-color: #ececec;
  margin: 0;
  font-family: Arial, sans-serif;
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
}

.logo {
  width: 200px;
  height: auto;
}
</style>