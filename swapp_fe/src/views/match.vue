<template>
  <div class="match-page">
    <TheHeaderMenu />
    <h1 class="page-title">DÊ MATCH DE SERVIÇOS</h1>

    <!-- 🔹 Container para os filtros -->
    <div class="filters-container">
      <div class="filter-group">
        <label>Categoria:</label>
        <select v-model="selectedCategory">
          <option value="">Todas as categorias</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Subcategoria:</label>
        <select v-model="selectedSubcategory">
          <option value="">Todas as subcategorias</option>
          <option v-for="subcategory in filteredSubcategories" :key="subcategory" :value="subcategory">
            {{ subcategory }}
          </option>
        </select>
      </div>
    </div>

    <!-- 🔹 Grid de Serviços -->
    <main class="services-grid">
      <div class="service-card" v-for="service in filteredServices" :key="service.id_users">
        <img 
          :src="getImage(service.nome_sub_habilidade)" 
          alt="Imagem do serviço" 
          class="service-image"
          @error="handleImageError"
        />
        <div class="service-info">
          <h2 class="service-title">{{ service.descricao }}</h2>
          <p class="service-provider">Prestador: {{ service.first_name }} {{ service.last_name }}</p>
          <p class="service-category">Categoria: {{ service.nome_sub_habilidade }}</p>
          <p class="service-price">Valor: <span>R$ {{ service.valor }}</span></p>
        </div>

        <!-- 🔹 Botão de Like Centralizado -->
        <div class="like-container">
          <button @click.stop="likeService(service.id_users)" class="btn-like">
            <img src="@/assets/match.png" alt="Curtir" class="like-icon" />
          </button>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script>
import axios from "axios";
import TheFooter from "@/components/TheFooter.vue";
import TheHeaderMenu from "@/components/TheHeaderMenu.vue";
// Importa a imagem de fallback via webpack
import fallbackImage from "@/assets/oferecer_serviço.png";

export default {
  name: "MatchPage",
  components: {
    TheHeaderMenu,
    TheFooter,
  },
  data() {
    return {
      services: [],
      categories: [],
      subcategories: [],
      selectedCategory: "",
      selectedSubcategory: "",
      idUsuarioLogado: null, // Inicializa como null
    };
  },
  computed: {
    filteredSubcategories() {
      if (!this.selectedCategory) {
        return this.subcategories;
      }
      return this.subcategories.filter(sub => sub.category === this.selectedCategory);
    },
    filteredServices() {
      return this.services.filter(service => {
        return (
          (this.selectedCategory === "" || service.nome_sub_habilidade === this.selectedCategory) &&
          (this.selectedSubcategory === "" || service.descricao === this.selectedSubcategory)
        );
      });
    }
  },
  methods: {
    // Formata o nome conforme as regras: tudo minúsculo, sem espaços, sem traços, sem acentos e sem ç
    formatName(name) {
      return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "")
        .replace(/-/g, "");
    },
    getImage(nome) {
      if (!nome) {
        console.warn("nome_sub_habilidade está undefined, usando imagem de fallback.");
        return fallbackImage;
      }
      const formattedName = this.formatName(nome);
      try {
        // Tenta importar a imagem dinamicamente com o nome formatado
        return require(`@/assets/${formattedName}.jpg`);
      } catch (error) {
        // Se não encontrar, retorna a imagem de fallback
        return fallbackImage;
      }
    },
    // Método para tratar o erro de carregamento da imagem e evitar loop infinito
    handleImageError(event) {
      if (!event.target.dataset.fallback) {
        event.target.dataset.fallback = "true";
        event.target.src = fallbackImage;
      }
    },
    async fetchServices() {
      try {
        const response = await axios.get("https://rust-swapp-be-407691885788.us-central1.run.app/obter_tudo");
        console.log("Dados recebidos da API:", response.data);

        this.services = response.data.map(item => ({
          id_users: item.id_users,
          first_name: item.first_name,
          last_name: item.last_name,
          nome_sub_habilidade: item.nome_sub_habilidade,
          descricao: item.descricao,
          valor: item.valor,
          image: this.getImage(item.nome_sub_habilidade)
        }));

        this.categories = [...new Set(this.services.map(s => s.nome_sub_habilidade))];
        this.subcategories = [...new Set(this.services.map(s => s.descricao))];
      } catch (error) {
        console.error("Erro ao buscar habilidades:", error);
      }
    },
    async likeService(id_liked) {
      if (!this.idUsuarioLogado) {
        alert("Você precisa estar logado para dar like!");
        return;
      }
      try {
        const payload = {
          id_deu_like: this.idUsuarioLogado,
          id_liked: id_liked,
        };
        await axios.post("https://rust-swapp-be-407691885788.us-central1.run.app/match/add_like", payload);
        console.log(`Like enviado com sucesso: ${JSON.stringify(payload)}`);
        alert("Like registrado com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar like:", error);
        alert("Erro ao registrar o like.");
      }
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
        this.idUsuarioLogado = data.id;
        console.log("ID do usuário logado:", this.idUsuarioLogado);
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    },
  },
  mounted() {
    this.buscarUsuarioLogado();
    this.fetchServices();
  },
};
</script>

<style scoped>
/* 🔹 Layout principal */
.match-page {
  background-color: #f5f5f5;
  padding: 20px;
}

/* 🔹 Título da página */
.page-title {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

/* 🔹 Filtros na horizontal e centralizados */
.filters-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

/* 🔹 Grupo de filtros */
.filter-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

/* 🔹 Selects dos filtros */
.filters-container select {
  width: 220px;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

/* 🔹 Efeito ao passar o mouse */
.filters-container select:hover {
  border-color: #00c896;
}

.filters-container select:focus {
  outline: none;
  border-color: #00c896;
  box-shadow: 0px 0px 5px rgba(0, 200, 150, 0.5);
}

/* 🔹 Grid de Serviços */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 0 50px;
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;
}

/* 🔹 Estilo dos cards */
.service-card {
  background: white;
  border-radius: 10px;
  width: 250px;
  padding: 8px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* 🔹 Ajuste da imagem do serviço */
.service-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
}

/* 🔹 Informações do serviço */
.service-info h2 {
  font-size: 14px;
  font-weight: bold;
}

/* 🔹 Preço do serviço */
.service-price {
  font-size: 16px;
  font-weight: bold;
  color: #27ae60;
}

/* 🔹 Contêiner do botão de like */
.like-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

/* 🔹 Estilo do botão de like */
.btn-like {
  background: none;
  border: none;
  cursor: pointer;
}

/* 🔹 Ajuste do ícone do botão de like */
.like-icon {
  width: 45px;
  height: 45px;
  transition: transform 0.2s ease-in-out;
}

/* 🔹 Efeito ao passar o mouse */
.btn-like:hover .like-icon {
  transform: scale(1.1);
}
</style>
