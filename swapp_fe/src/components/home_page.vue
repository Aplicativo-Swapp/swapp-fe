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
          <button @click="search">buscar</button>
        </div>

        <ul class="utility-list">
          <li class="nav-item">
            <a href="/"></a>
            <select v-model="Categorias" @change="categoryChanged">
            <option value="" disabled selected style="color: white;">Categorias</option>
            <option value="assistencia">Assistência técnica</option>
            <option value="aulas">Aulas</option>
            <option value="autos">Autos</option>
            <option value="consultoria">Consultoria</option>
            <option value="tecnologia">Design e Tecnologia</option>
            <option value="eventos">Eventos</option>
            <option value="moda">Moda e beleza</option>
            <option value="reforma">Reforma e reparos</option>
            <option value="saude">Saúde</option>
            <option value="servicos">Serviços Domésticos</option>
          </select>

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
    </main>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      searchQuery: "", // armazena a pesquisa
      selectedCategory: "", // armazena a categoria selecionada
    };
  },
  methods: {
    search() {
      alert(`Você pesquisou por: ${this.searchQuery}`);
    },
    categoryChanged() {
      alert(`Categoria selecionada: ${this.selectedCategory}`);
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
  width: 200px;
  margin-left: 50px;
  height: auto;
  margin-right: 350px;
}

.search-bar {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center;
  background-color: #eaeaea;
  border-radius: 8px;
  width: 350px; /* Tamanho total da barra de pesquisa */
}

.search-bar input {
  padding: 15px 10px;
  border: none;
  border-radius: 10px 0 0 10px; /* Cantos arredondados para o lado esquerdo */
  outline: none;
  width: 100%; /* Use uma porcentagem para ajustar proporcionalmente */
  box-sizing: border-box;
}

.search-bar button {
  padding: 15px 15px;
  border: none;
  border-radius: 0 10px 10px 0;
  background-color: #89ffdb;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #76e3c3;
}

.utility-list {
  font-family: 'Open Sauce One', sans-serif;
  font-weight: 200;
  list-style: none;
  display: flex;
  gap: 5px;
  margin: 0;
  padding: 0;
  margin-left: 300px;
}

.utility-list li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.utility-list li a:hover {
  color: #89ffdb;
}

.utility-list select {
  padding: 8px;
  border-radius: 5px;
  border: none;
  margin-left: 10px; 
  background-color: #14241F;
  font-size: 14px;
}

.utility-list select:focus {
  outline: none;
  background-color: #eaeaea;
}

</style>
