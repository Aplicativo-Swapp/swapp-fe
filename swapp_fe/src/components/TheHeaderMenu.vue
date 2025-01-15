<template>
  <header class="header">
    <!-- Menu (esquerda) -->
    <button @click="togglePopup" class="menu-button">
      <span class="menu-icon"></span>
      <span class="menu-icon"></span>
      <span class="menu-icon"></span>
    </button>

    <!-- Logotipo (centro) -->
    <nav>
      <img src="@/assets/logo2.png" alt="Logo" class="logo" />
    </nav>

    <!-- Saudação e ícone (direita) -->
    <div class="user-section">
      <span>Olá, {{ usuarioNome }}</span>
      <div class="notification-section">
        <button @click="toggleNotifications" class="notification-button">
          <img src="@/assets/notification.png" alt="Notificação" class="notification-icon" />
          <span v-if="notifications.length > 0" class="notification-count">
            {{ notifications.length }}
          </span>
        </button>
        <div v-if="showNotifications" class="notification-popup">
          <ul>
            <li v-if="notifications.length === 0">Sem notificações.</li>
            <li v-else v-for="(notification, index) in notifications" :key="index">
              {{ notification.message }}
            </li>
          </ul>
        </div>
      </div>
      <img src="@/assets/avatar.png" alt="Avatar" class="avatar" @click="irParaEditarUsuario" />
    </div>

    <!-- Popup -->
    <PopupMenu v-if="showPopup" @close="togglePopup" />
  </header>
</template>

<script>
import PopupMenu from "@/components/PopUp.vue";

export default {
name: "TheHeaderMenu",
components: {
  PopupMenu,
},
data() {
  return {
    usuarioNome: "", // Nome do usuário será armazenado aqui
    showPopup: false, // Adicionado para controlar o estado do popup
    showNotifications: false,
    notifications: [],
  };
},
methods: {
  togglePopup() {
    this.showPopup = !this.showPopup;
  },
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  },
  async buscarUsuarioLogado() {
    try {
      const response = await fetch('/api/usuario-logado'); // Altere para o endpoint correto
      const data = await response.json();
      this.usuarioNome = data.nome; // Salva o nome do usuário
    } catch (error) {
      console.error("Erro ao buscar usuário logado:", error);
    }
  },
  async buscarNotificacoes() {
    try {
      const response = await fetch('/api/notificacoes'); // Altere para o endpoint correto
      const data = await response.json();
      this.notifications = data || [];
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
      this.notifications = [];
    }
  },
  irParaEditarUsuario() {
    // Redireciona para a página de edição do usuário
    this.$router.push("/editar-perfil");
  },
},
mounted() {
  this.buscarUsuarioLogado(); // Busca os dados do usuário ao carregar o componente
  if (this.usuarioNome) {
    this.buscarNotificacoes(); // Busca as notificações ao carregar o componente
  }
},
};

</script>

<style scoped>
.header {
background-color: #14241F;
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px 20px;
color: #FFFFFF;
}

/* Botão de menu (esquerda) */
.menu-button {
background: none;
border: none;
cursor: pointer;
display: flex;
flex-direction: column;
justify-content: space-between; /* Garante espaçamento igual entre as barras */
width: 30px; /* Define a largura total do botão */
height: 24px; /* Altura total para acomodar as 3 barras */
padding: 0; /* Remove o espaçamento padrão */

}

.menu-icon {
width: 100%; /* Barra ocupa toda a largura do botão */
height: 4px; /* Altura de cada barra */
background-color: #76e3c3; /* Cor branca para as barras */
border-radius: 2px; /* Borda arredondada para um visual mais suave */
}

/* Logotipo (centro) */
.logo {
width: 150px;
margin-top: 10px;
margin-bottom: 10px;
height: auto;
}

/* Seção de usuário (direita) */
.user-section {
display: flex;
align-items: center;
gap: 10px;
font-size: 14px;
cursor: pointer;
}

.avatar {
width: 30px;
height: 30px;
border-radius: 50%;
border: 2px solid #FFFFFF;
}

/* Notificaçãoes */
.notification-section {
position: relative;
}

.notification-button {
background: none;
border: none;
cursor: pointer;
position: relative;
}

.notification-icon {
width: 20px;
height: 20px;
}

.notification-count {
position: absolute;
top: -5px;
right: -5px;
background-color: red;
color: white;
font-size: 12px;
font-weight: bold;
border-radius: 50%;
padding: 2px 6px;
}

.notification-popup {
position: absolute;
top: 30px;
right: 0;
background: white;
border: 1px solid #ccc;
border-radius: 5px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
width: 200px;
z-index: 1000;
}

.notification-popup ul {
list-style: none;
margin: 0;
padding: 10px;
}

.notification-popup li {
padding: 8px;
border-bottom: 1px solid #eee;
}

.notification-popup li:last-child {
border-bottom: none;
}

.notification-popup li:hover {
background-color: #f9f9f9;
cursor: pointer;
}

</style>
