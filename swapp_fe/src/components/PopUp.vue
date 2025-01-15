<template>
  <div v-if="true" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <div class="popup-header">
        <img src="@/assets/login.png" alt="Avatar" class="avatar" />
        <div class="user-info">
          <h3>Nome Sobrenome</h3>
          <p>e-mail@gmail.com</p>
        </div>
      </div>
      <ul class="popup-menu">
        <ul class="popup-menu">
        <li @click="navegar('/')">Home Page</li>
        <li @click="navegar('/editar-perfil')">Editar Perfil</li>
        <li @click="navegar('/editar-senha')">Editar Senha</li>
        <li @click="navegar('/editar-habilidade')">Editar Habilidade</li>
        <li class="logout" @click="logout">Sair</li>
      </ul>
      </ul>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "PopupMenu",
  methods: {
    closePopup() {
      this.$emit("close");
    },
    navegar(destino) {
      this.$router.push(`${destino}`);
      this.closePopup();
    },
    logout() {
      alert("Você saiu!");
      this.closePopup();
    },
  },
};
</script>

<style scoped>
/* Botão de abrir o popup */
.open-popup-btn {
  padding: 10px 20px;
  background-color: #004d40;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.open-popup-btn:hover {
  background-color: #003730;
}

/* Estilo do overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Estilo do conteúdo do popup */
.popup-content {
  background-color: #fff;
  border-radius: 8px;
  width: 300px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.popup-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info h3 {
  margin: 0;
  font-size: 16px;
}

.user-info p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

/* Estilo do menu */
.popup-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.popup-menu li {
  text-align: left; 
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  color: black;
}

.popup-menu li:hover {
  background-color: #f0f0f0;
}

.popup-menu .selected {
  background-color: #ddd;
  font-weight: bold;
}

.popup-menu .logout {
  color: red;
  font-weight: bold;
}

.popup-menu .logout:hover {
  background-color: #ffe6e6;
}
</style>
