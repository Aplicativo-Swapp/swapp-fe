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
      <div class="user-section" @click="irParaEditarUsuario">
        <span>Olá, {{ usuarioNome }}</span>
        <img src="@/assets/avatar.png" alt="Avatar" class="avatar" />
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
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
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
    irParaEditarUsuario() {
      // Redireciona para a página de edição do usuário
      this.$router.push("/editar-perfil");
    },
  },
  mounted() {
    this.buscarUsuarioLogado(); // Busca os dados do usuário ao carregar o componente
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
</style>
