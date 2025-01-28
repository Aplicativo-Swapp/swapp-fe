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
            <img src="@/assets/entrar_homepage.jpeg" alt="Entrar" class="entrar" />
            <li class="nav-item">
              <router-link to="/login">Entrar</router-link>
            </li>
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
      };
    },
    methods: {
      search() {
        alert(`Você pesquisou por: ${this.searchQuery}`);
      },
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
  
  .entrar {
    width: 40px;
    height: auto;
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
  </style>
  