<template>
  <div class="curtidas-recebidas">
    <main class="likes-grid">
      <!-- Exibe mensagem quando não há curtidas -->
      <div v-if="likes.length === 0">
        <p>Nenhuma curtida encontrada.</p>
      </div>

      <!-- Exibe as curtidas -->
      <div class="like-card" v-else v-for="like in likes" :key="like[0]">
        <h4>
          <strong>{{ like[1] }}</strong> curtiu seu serviço!
        </h4>
        <p>Localização: {{ like[3] }}</p>
        <div class="user-services">
          <h4>Serviços oferecidos:</h4>
          <ul>
            <li>
              {{ like[2] }}
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LikesPage",

  data() {
    return {
      likes: [], // Lista de curtidas
      isLoading: true, // Controle de carregamento
    };
  },

  methods: {
    async fetchLikes() {
      try {
        const userId = 2; // Substitua pelo ID real do usuário logado
        const response = await axios.get(
          `https://rust-swapp-be-407691885788.us-central1.run.app/match/buscar_likes/${userId}`
        );
        this.likes = response.data; // Atualiza os dados da API
      } catch (error) {
        console.error("Erro ao buscar curtidas:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },

  mounted() {
    this.fetchLikes(); // Busca os dados ao carregar a página
  },
};
</script>



<style scoped>
.curtidas-recebidas {
  text-align: center;
  padding: 20px;
}

.likes-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.like-card {
  border: 0.5px solid #ccc;
  border-radius: 15px;
  padding: 15px 20px 15px 20px;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Suaviza o efeito */
  text-align: left; /* Alinha o texto à esquerda */
}

.like-card:hover {
  transform: scale(1.05); /* Aplica o zoom */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adiciona uma sombra para destaque */
}

.user-services {
  margin-top: 10px;
}

.user-services ul {
  padding: 0;
  list-style: none;
}

.user-services li {
  background-color: #f9f9f9;
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 4px;
}
</style>
