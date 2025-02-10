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
import {redirectToLogin } from "@/utils/auth"; // Importa funções utilitárias

export default {
  name: "LikesPage",

  data() {
    return {
      likes: [], // Lista de curtidas recebidas
      isLoading: true, // Controle de carregamento
      userId: null, // ID do usuário logado
    };
  },

  methods: {
    async fetchLoggedUser() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Token não encontrado");
          redirectToLogin(this.$router);
          return;
        }

        const response = await fetch("http://34.56.213.96:8000/api/users/detail/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        this.userId = data.id; // Define o ID do usuário logado
        console.log("ID do usuário logado:", this.userId);

        if (this.userId) {
          this.fetchLikes(); // Chama a função para buscar curtidas após obter o ID
        }
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    },

    async fetchLikes() {
      if (!this.userId) {
        console.error("ID do usuário logado não encontrado.");
        return;
      }

      try {
        const response = await axios.get(
          `https://rust-swapp-be-407691885788.us-central1.run.app/match/buscar_likes/${this.userId}`
        );

        console.log("Resposta da API:", response.data); // Verifique o que está vindo da API

        // Atribui diretamente os dados, sem filtrar
        this.likes = Array.isArray(response.data) ? response.data : []; 
        console.log("Curtidas recebidas:", this.likes);
      } catch (error) {
        console.error("Erro ao buscar curtidas:", error.response || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async createMatch(like) {
      try {
        const payload = {
          id_deu_like: like[0], // Quem deu o like
          id_liked: this.userId, // Quem recebeu o like (usuário logado)
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
    this.fetchLoggedUser(); // Obtém o ID do usuário logado antes de buscar curtidas
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
