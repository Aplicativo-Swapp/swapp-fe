<template>
    <header class="header">
      <div class="header-content">
        <img src="@/assets/logo2.png" alt="Logo" class="logo" />
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Pesquise por categorias, localização..."
          />
          <button @click="search">buscar</button>
        </div>
        <div class="itens">
          <div class="dropdown">
            <button class="dropbtn">Categorias <span class="arrow">&#9660;</span></button>
            <div class="dropdown-content">
              <a href="#">Assistência Técnica</a>
              <a href="#">Aulas</a>
              <a href="#">Consultoria</a>
              <a href="#">Design e Tecnologia</a>
              <a href="#">Eventos</a>
              <a href="#">Moda e Beleza</a>
              <a href="#">Reformas e Reparos</a>
              <a href="#">Saúde</a>
              <a href="#">Serviços Domésticos</a>
            </div>
          </div>
          <ul class="utility-list">
            <li class="nav-item">
              <a href="/">Contato</a>
            </li>
            <la>
                <div class="user-section">
                    <span>Olá, {{ first_name }}</span>
                        <div class="notification-section">
                            <button @click="toggleNotifications" class="notification-button">
                            <img src="@/assets/notificacao.png" alt="Notificação" class="notification-icon" />
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
            </la>
            </ul>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  
export default {
name: "TheHeaderHome",
data() {
    return {
    searchQuery: "",
    usuarioNome: "",
    showNotifications: false,
    notifications: [],
    };
},

methods: {
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  },
  async buscarUsuarioLogado() {
    try {
      const response = await fetch('http://34.56.213.96:8000/api/users/detail'); // Altere para o endpoint correto
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
    background-color: #14241f;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    width: 100%;
  }
  
  .header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
  }
  
  .logo {
    position: absolute;
    left: 20px;
    width: 200px;
    height: auto;
  }

    .user-section {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    cursor: pointer;
    }

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

  .search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  border-radius: 8px;
  width: 350px; 
  margin: 0 auto; 
  }
  
  .search-bar button {
  padding: 15px 15px;
  border: none;
  border-radius: 0 10px 10px 0;
  background-color: #89ffdb;
  cursor: pointer;
  }

  .search-bar input {
    padding: 15px 10px;
    border: none;
    border-radius: 10px 0 0 10px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }
  
  .search-bar button:hover {
    background-color: #76e3c3;
  }
  
  .utility-list {
    font-family: 'Open Sauce One', sans-serif;
    font-weight: 200;
    list-style: none;
    display: flex;
    padding-inline-start: 0;
  }
  
  .utility-list li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }

  .utility-list select {
  padding: 8px;
  border-radius: 5px;
  border: none;
  background-color: #14241F;
  font-size: 14px;
  }
  
  .utility-list li a:hover {
    color: #89ffdb;
  }

  .utility-list select:focus {
  outline: none;
  background-color: #eaeaea;
  }

  .nav-item{
  margin-top: 10px;
  }

.itens{
  position: absolute;
  right: 30px; /* Alinha os itens à direita */
  display: flex;
  align-items: center;
  }

.dropdown{
  display: flex;
}

.dropbtn {
  font-family: 'Open Sauce One', sans-serif;
  font-weight: 400;
  list-style: none;   
  background-color: #14241F;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.arrow {
  margin-left: 2px; 
}
  
.dropdown-content {
  display: none; 
  position: absolute;
  background-color: #eaeaea;
  min-width: 160px;
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd; /* Cor de fundo quando passar o mouse */
}

.avatar {
width: 30px;
height: 30px;
border-radius: 50%;
border: 2px solid #FFFFFF;
}
  </style>
  