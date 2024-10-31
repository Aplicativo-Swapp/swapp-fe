<template>
  <header class="header">
  <nav>
    <img src="@/assets/logo2.png" alt="Logo" class="logo" />
  </nav>
  </header>
</template>

<script>
export default {
  name: "CadastroUsuario",
};
</script>

<style scoped>
.header {
  background-color: #14241F; 
  display: flex; 
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.logo {
  width: 200px; 
  height: auto; 
}
</style>