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

        <!-- 🔹 Botão para criar match -->
        <button @click="createMatch(like)" class="btn-match">
          Dar Match 🤝
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { getLoggedUserId } from '@/utils/auth.js'; // Importa as funções utilitárias


export default {
  name: "LikesPage",

  data() {
    return {
      likes: [], // Lista de curtidas
      isLoading: true, // Controle de carregamento
      userId: getLoggedUserId(), // ID do usuário logado (temporário, depois será variável global)
    };
  },

  methods: {
    async fetchLikes() {
      try {
        const response = await axios.get(
          `https://rust-swapp-be-407691885788.us-central1.run.app/match/buscar_likes/3`
        );
        this.likes = response.data; // Atualiza os dados da API
      } catch (error) {
        console.error("Erro ao buscar curtidas:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async createMatch(like) {
      try {
        const payload = {
          id_deu_like: this.userId, // Quem deu o like
          id_liked: like[0], // Quem recebeu o like (usuário logado)
        };

        console.log("Payload:", payload);

        await axios.put(
          "https://rust-swapp-be-407691885788.us-central1.run.app/match",
          payload
        );

        alert("Match criado com sucesso! 🎉");
      } catch (error) {
        console.error("Erro ao criar match:", error);
        alert("Erro ao criar match.");
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
  padding: 15px 20px;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;
}

.like-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

/* 🔹 Estilização do botão de match */
.btn-match {
  background-color: #00c896;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.btn-match:hover {
  background-color: #008f6b;
}
</style>
