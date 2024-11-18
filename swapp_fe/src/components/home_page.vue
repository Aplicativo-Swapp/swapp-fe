<template>
  <div>
    <header class="header">
      <div class="header-content">
        <img src="@/assets/logo2.png" alt="Logo" class="logo" />
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Pesquise por categorias, localização..."
          />
          <button @click="search"></button>
        </div>

        <ul class="utility-list">
          <li class="nav-item">
            <a href="/">Categorias</a>
          </li>
          <li class="nav-item">
            <a href="/">Contato</a>
          </li>
          <li class="nav-item">
            <a href="/login">Entrar</a>
          </li>
        </ul>
      </div>
    </header>

    <main>
      <h1>Bem-vindo à Home</h1>
      <p>Este é o conteúdo principal da página Home.</p>
    </main>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      searchQuery: "", //armazena a pesquisa
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
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.header-content {
  background-color: #14241F;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.logo {
  width: 150px;
  height: auto;
}

/* Campo de Pesquisa */
.search-bar {
  display: flex;
  align-items: center;
  gap: 5px;
}

.search-bar input {
  padding: 8px;
  border: none;
  border-radius: 4px;
  outline: none;
  width: 200px;
}

.search-bar button {
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  background-color: #89ffdb;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #76e3c3;
}

/* Lista de Utilidades */
.utility-list {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.utility-list li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.utility-list li a:hover {
  color: #89ffdb;
}
</style>
