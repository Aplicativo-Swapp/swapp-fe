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
      <div>
        <img src="@/assets/banner.jpeg" alt="Banner" class="banner" />
      </div>
    </main>

    <section class="services-section">
      <h2 class="section-title">Serviços mais Procurados</h2>
      <div class="services-container">
        <div class="service-card">
          <img src="@/assets/corte_de_cabelo.png" alt="Corte de cabelo" class="service-image" />
          <h3 class="service-title">Corte de cabelo</h3>
          <p class="service-location">Localização: Xique-Xique - BA</p>
          <p class="service-rating">
            ⭐⭐⭐⭐⭐ <span>(5)</span>
          </p>
        </div>
        <div class="service-card">
          <img src="@/assets/pintura_de_parede.png" alt="Pintura de parede" class="service-image" />
          <h3 class="service-title">Pintura de parede</h3>
          <p class="service-location">Localização: Jacareí - SP</p>
          <p class="service-rating">
            ⭐⭐⭐⭐⭐ <span>(5)</span>
          </p>
        </div>
        <div class="service-card">
          <img src="@/assets/aulas_de_ingles.png" alt="Aula de Inglês" class="service-image" />
          <h3 class="service-title">Aula de Inglês</h3>
          <p class="service-location">Localização: Pindamonhangaba - SP</p>
          <p class="service-rating">
            ⭐⭐⭐⭐⭐ <span>(5)</span>
          </p>
        </div>
        <div class="service-card">
          <img src="@/assets/design_de_post.png" alt="Design de Post" class="service-image" />
          <h3 class="service-title">Design de Post</h3>
          <p class="service-location">Localização: Volta Redonda - RJ</p>
          <p class="service-rating">
            ⭐⭐⭐⭐⭐ <span>(5)</span>
          </p>
        </div>
      </div>
      <a href="/servicos" class="view-more">Ver mais</a>
    </section>

    <section class="about-section">
      <div class="about-content">
        <div class="about-text">
          <h2>Sobre Nós</h2>
          <p>
            O Swapp é um aplicativo que conecta pessoas por meio da troca de habilidades.
            Nosso propósito é criar um ambiente onde todos possam compartilhar seus talentos
            e aprender algo novo, construindo conexões significativas. Com o slogan
            <strong>"Troque talentos, crie conexões"</strong>, incentivamos a colaboração
            e o crescimento mútuo. Aqui, você pode oferecer o que sabe fazer de melhor e
            encontrar quem precisa do seu talento. Seja para aprender, ensinar ou colaborar,
            o Swapp transforma habilidades em oportunidades. Descubra o valor de compartilhar
            e faça parte de uma comunidade onde todos têm algo único para oferecer.
          </p>
        </div>
        <div class="about-image">
          <img src="@/assets/aperto_de_maos.png" alt="Aperto de Mãos" />
        </div>
      </div>
    </section>

    <!-- Componente do Footer -->
    <TheFooter />
  </div>
</template>


<script>
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "HomePage",
  components: {
    TheFooter // Registra o componente TheFooter
  },
  data() {
    return {
      searchQuery: "", // Armazena o texto de busca
      selectedCategory: "", // Armazena a categoria selecionada
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
  background-color: #14241f; /* Cor de fundo */
  display: flex;
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  height: 120px; /* Define altura fixa */
  width: 100%; /* Ocupa 100% da largura */
}

.header-content {
  display: flex;
  align-items: center; /* Alinha os itens verticalmente */
  justify-content: center; /* Centraliza os itens horizontalmente */
  width: 100%; /* Garante que ocupe toda a largura */
  position: relative; /* Necessário para ajustar a logo e dropdown */
}

.logo {
  position: absolute; /* Remove do fluxo normal */
  left: 20px; /* Alinha a logo à esquerda */
  width: 200px;
  height: auto;
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
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  border-radius: 8px;
  width: 350px; 
  margin: 0 auto; 
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
  padding-inline-start: 0;
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

/* Exibe o conteúdo quando o botão for clicado */
.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd; /* Cor de fundo quando passar o mouse */
}

/* Serviços mais Procurados*/

.services-section {
  background-color: #f0f0f0;
  padding: 40px 20px; 
  border-radius: 8px; 
  margin-bottom: 0px; 
}

/* Título da seção */
.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left; 
  padding-left: 10px; 
}

.section-title::after {
  content: ""; /* Cria o pseudo-elemento */
  display: block; /* Faz a linha aparecer abaixo do título */
  width: 300px; /* Largura da linha (ajuste conforme necessário) */
  height: 4px; /* Espessura da linha */
  background-color: #89ffdb; /* Cor verde */
  margin-top: 5px; /* Espaçamento entre o título e a linha */
}

/* Container dos serviços */
.services-container {
  display: flex;
  margin: 0;
  padding: 0;
  flex-wrap: wrap; 
  gap: 5px; 
  justify-content: space-between; 
}

/* Card de serviço */
.service-card {
  background-color: #fff; 
  border: 1px solid #ddd; 
  border-radius: 8px; 
  padding: 10px; 
  width: calc(20% - 40px); 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  text-align: center; 
  transition: transform 0.3s;
}

/* Efeito ao passar o mouse */
.service-card:hover {
  transform: scale(1.05); /* Leve aumento */
}

/* Imagem do serviço */
.service-image {
  width: 70%; /* Ocupa toda a largura do card */
  border-radius: 8px; /* Bordas arredondadas */
  margin-bottom: 3px; /* Espaço abaixo da imagem */
}

/* Título do serviço */
.service-title {
  font-size: 18px; /* Tamanho do texto */
  font-weight: bold; /* Negrito */
  margin-bottom: 10px; /* Espaço abaixo do título */
}

/* Localização */
.service-location {
  font-size: 14px; /* Texto menor */
  color: #666; /* Cinza suave */
  margin-bottom: 10px; /* Espaço abaixo da localização */
}

/* Avaliação */
.service-rating {
  font-size: 14px; /* Texto menor */
  color: #00d1a0; /* Verde */
}

/* Link "Ver mais" */
.view-more {
  display: block; /* Mostra como linha separada */
  text-align: right; /* Alinha à direita */
  margin-top: 20px; /* Espaço acima do link */
  font-size: 14px; /* Texto menor */
  color: #00d1a0; /* Cor verde */
  text-decoration: none; /* Remove o sublinhado */
}

.view-more:hover {
  text-decoration: underline; /* Adiciona sublinhado ao passar o mouse */
}


/* Sobre Nos */
.about-section {
  background-color: #D9D9D9; 
  padding: 40px 20px; 
  display: flex;
  justify-content: center;
}

.about-content {
  display: flex;
  max-width: 1200px; /* Largura máxima da seção */
  width: 100%;
  gap: 20px; /* Espaçamento entre texto e imagem */
}

.about-text {
  flex: 1;
  text-align: left;
}

.about-text h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  position: relative; /* Necessário para o pseudo-elemento */
}

.about-text h2::after {
  content: ""; 
  display: block; 
  width: 125px; 
  height: 6px; 
  background-color: #89ffdb; 
  margin-top: 5px; 
}

.about-text p {
  font-size: 16px;
  line-height: 1.6; 
  color: #333; 
}

.about-image {
  flex: 1; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-image img {
  width: 100%; 
  max-width: 300px;
  height: auto; 
}


</style>
