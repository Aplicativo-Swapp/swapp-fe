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
      <router-link to="/home">
        <img src="@/assets/logo2.png" alt="Logo" class="logo" />
      </router-link>
    </nav>

    <!-- Saudação e ícone (direita) -->
    <div class="user-section">
      <span>Olá, {{ usuarioNome }}</span>
      <img :src="profileImage || require('@/assets/avatar.png')" alt="Avatar" class="avatar" @click="irParaEditarUsuario" />
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
      usuarioNome: "", // Nome do usuário
      profileImage: null, // URL da imagem de perfil
      showPopup: false,
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
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Token não encontrado");
          return;
        }

        const response = await fetch('http://34.56.213.96:8000/api/users/detail/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        this.usuarioNome = data.first_name;
        this.profileImage = data.profile_picture_url; // Atualiza a imagem de perfil
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    },
    irParaEditarUsuario() {
      this.$router.push("/editar-perfil");
    },
  },
  mounted() {
    this.buscarUsuarioLogado();
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

.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  padding: 0;
}

.menu-icon {
  width: 100%;
  height: 4px;
  background-color: #76e3c3;
  border-radius: 2px;
}

.logo {
  width: 150px;
  margin: 10px 0;
  cursor: pointer;
}

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
  object-fit: cover;
}
</style>
