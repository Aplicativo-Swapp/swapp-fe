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
    </header>
   </div>

    <main class="main">
      <div class="categories">
        <div class="category-item">
          <a href="/assistencia_tecnica">
            <img src="@/assets/Assistência Técnica.png" alt="Assistência Técnica" class="category-icon" />
            <p class="category-text">Assistência Técnica</p>
          </a>
        </div>
        <div class="category-item">
          <a href="/aulas">
            <img src="@/assets/Aulas.png" alt="Aulas" class="category-icon" />
            <p class="category-text">Aulas</p>
          </a>
        </div>
        <div class="category-item">
          <a href="/consultoria">
            <img src="@/assets/Consultoria.png" alt="Consultoria" class="category-icon" />
            <p class="category-text">Consultoria</p>
          </a>
        </div>
        <div class="category-item">
          <a href="/design_e_tecnologia">
            <img src="@/assets/Design e Tecnologia.png" alt="Design e Tecnologia" class="category-icon" />
            <p class="category-text">Design e Tecnologia</p>
          </a>
        </div>
        <div class="category-item">
          <a href="/eventos">
            <img src="@/assets/Eventos.png" alt="Eventos" class="category-icon" />
            <p class="category-text">Eventos</p>
          </a>
        </div>
        <div class="category-item">
          <a href="/moda_e_beleza">
            <img src="@/assets/Moda e Beleza.png" alt="Moda e Beleza" class="category-icon" />
            <p class="category-text">Moda e Beleza</p>
          </a>
        </div>
        <div class="category-item">
          <a href="/reformas_e_reparos">
            <img src="@/assets/Reformas e Reparos.png" alt="Reformas e Reparos" class="category-icon" />
            <p class="category-text">Reformas e Reparos</p>
          </a>
        </div>
        <div class="category-item">
          <a href="/saude">
            <img src="@/assets/Saúde.png" alt="Saude" class="category-icon" />
            <p class="category-text">Saúde</p>
          </a>
        </div>
        <div class="category-item">
          <a href="/servicos_domesticos">
            <img src="@/assets/Serviços Domésticos.png" alt="Serviços Domésticos" class="category-icon" />
            <p class="category-text">Serviços Domésticos</p>
          </a>
        </div>
      </div>
      <div class="header-content">
        <img src="@/assets/banner.jpeg" alt="Banner" class="banner" />
        </div>
    </main>

    <!--Footer-->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <div class="footer-logo">
            <img src="@/assets/logo2.png" alt="Logo Swapp" class="logo-image" />
          </div>
        </div>
        <div class="footer-links">
          <div class="footer-section">
            <h3>Início</h3>
            <ul>
              <li><a href="#">Categorias</a></li>
              <li><a href="#">Serviços</a></li>
              <li><a href="#">Entrar</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Sobre nós</h3>
            <ul>
              <li><a href="#">Informações da empresa</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Suporte</h3>
            <ul>
              <li><a href="#">Entre em contato</a></li>
              <li><a href="#">Perguntas frequentes</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-contact">
          <a href="/contato">
            <div class="footer-social">
              <img src="@/assets/midias_sociais_logo.png" alt="Midias Sociais" class="footer-social-logo" />
            </div>
          </a>
          <a href="/contato">
            <button class="contact-button">Contato</button>
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Desenvolvido pelo Grupo Lima</p>
      </div>
    </footer>
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

.main{
  background-color: #ffffff;
}

.header {
  background-color: #14241f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.header-content {
  background-color: #14241f;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
}

.logo {
  width: 200px;
  margin-left: 50px;
  height: auto;
  margin-right: 350px;
}

.entrar {
  width: 40px;
  height: auto;
}

.banner{
  width: 1520px;
  height: auto;
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

.categories {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin: 40px;
}

.category-item {
  text-align: center;
  width: 120px; /* Ajuste conforme necessário */
}

.category-icon {
  width: 60px; /* Tamanho do ícone */
  height: 60px;
}

.category-text {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.category-item a {
  text-decoration: none;
  color: inherit;
}

.category-item a:hover .category-text {
  color: #89ffdb; /* Altere para a cor desejada ao passar o mouse */
}

.nav-item{
  margin-top: 10px;
}

/* Estilo para o botão do dropdown */
.dropdown {
  position: relative;
  display: inline-block;
  margin-left: 190px;
}

.dropbtn {
  font-family: 'Open Sauce One', sans-serif;
  font-weight: 200;
  list-style: none;   
  background-color: #14241F;
  color: white;
  padding: 10px 20px;
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

/* Exibe o conteúdo quando o botão for clicado */
.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd; /* Cor de fundo quando passar o mouse */
}

/* Footer */
.footer {
  background-color: #14241f; 
  color: #fff; 
  padding: 20px 0; 
  display: flex;
  flex-direction: column; 
  align-items: center; 
}

.logo-image {
  width: 300px; /* Ajuste o tamanho conforme necessário */
  height: auto; /* Mantém as proporções da logo */
  margin-right: 20px; /* Adiciona um deslocamento à direita */
  margin-top: 30px;
}

.footer-content {
  display: flex; 
  justify-content: space-between; 
  width: 100%;
  max-width: 1200px; 
  padding: 0 50px; 
}

.footer-links {
  display: flex; 
  justify-content: space-between;
  gap: 100px; /* Espaçamento horizontal entre as colunas */
  flex-wrap: wrap;
}

.footer-section {
  flex: 1; 
  text-align: center; 
}

.footer-section h3 {
  font-size: 18px; 
  margin-bottom: 10px; 
  font-weight: bold; 
}

.footer-section ul {
  list-style: none; 
  padding: 0; 
}

.footer-section ul li {
  margin: 8px 0; 
}

.footer-section ul li a {
  color: #ccc; 
  text-decoration: none; 
  transition: color 0.3s; 
}

.footer-section ul li a:hover {
  color: #00d1a0; 
}

.footer-contact {
  display: flex;
  flex-direction: column;  
  align-items: center;
  justify-content: center;
  margin: 0 auto;

}

.footer-social {
  margin-bottom: 10px; /* Espaçamento entre os ícones e o botão */
}

.footer-social-logo {
  width: 100px;
  height: auto;
}

.contact-button {
  background-color: #00d1a0; 
  color: #fff; 
  border: none; 
  border-radius: 20px; 
  padding: 10px 20px; 
  font-size: 16px; 
  font-weight: bold; 
  cursor: pointer; 
  transition: background-color 0.3s, transform 0.3s; 
  margin-left: 0; /* Adiciona um deslocamento à direita */
}

.contact-button:hover {
  background-color: #00b089; 
  transform: scale(1.05); 
}

.contact-button:active {
  transform: scale(0.95); 
}


.footer-bottom {
  text-align: center; /* Centraliza o texto */
  margin-top: 20px; /* Espaçamento entre o conteúdo e o rodapé inferior */
  font-size: 14px; /* Tamanho do texto */
  padding-top: 10px; /* Espaço acima da linha */
}



</style>
