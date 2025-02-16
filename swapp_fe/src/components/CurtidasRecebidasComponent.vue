<template>
  <div class="curtidas-recebidas">
    <h2>Curtidas Recebidas</h2>
    <div v-if="likes.length === 0">
      <p>Nenhuma curtida encontrada.</p>
    </div>
    <div class="services-list" v-else>
      <div
        class="service-card"
        v-for="like in likes"
        :key="like[0]"
        @click="openPopup(like)"
      >
        <div class="service-info">
          <h4>
            <strong>{{ like[1] }}</strong> curtiu seu serviço!
          </h4>
          <h2>{{ like[2] }}</h2>
          <h4>Localização: {{ like[3] }}</h4>
        </div>
      </div>
    </div>

    <!-- Popup para criação do match -->
    <CardPage
      v-if="selectedLike"
      :service="formattedSelectedLike"
      actionType="match"
      @close="closePopup"
      @match="createMatchFromPopup"
    />
  </div>
</template>

<script>
import axios from "axios";
import { redirectToLogin } from "@/utils/auth";
import CardPage from "@/components/Card.vue";

export default {
  name: "LikesPage",
  components: { CardPage },
  data() {
    return {
      likes: [], // Array com as curtidas recebidas (cada item é um array: [id, nome, título, localização, (opcional) imagem])
      isLoading: true,
      userId: null, // ID do usuário logado
      selectedLike: null, // Curtida selecionada para exibir no popup
    };
  },
  computed: {
    // Formata os dados da curtida para o formato esperado pelo CardPage
    formattedSelectedLike() {
      if (!this.selectedLike) return null;
      return {
        id_liked: this.selectedLike[0],
        full_name: this.selectedLike[1],
        title: this.selectedLike[2],
        location: this.selectedLike[3],
        image: this.selectedLike[4] || require("@/assets/default-user.png"),
        description: `Serviços oferecidos: ${this.selectedLike[2]}`,
      };
    },
  },
  methods: {
    openPopup(like) {
      this.selectedLike = like;
    },
    closePopup() {
      this.selectedLike = null;
    },
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
        this.userId = data.id;
        console.log("ID do usuário logado:", this.userId);
        if (this.userId) {
          this.fetchLikes();
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
        console.log("Resposta da API:", response.data);
        this.likes = Array.isArray(response.data) ? response.data : [];
        console.log("Curtidas recebidas:", this.likes);
      } catch (error) {
        console.error("Erro ao buscar curtidas:", error.response || error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async createMatchFromPopup(id_liked) {
      // id_liked: ID do usuário que curtiu seu serviço
      try {
        const payload = {
          id_deu_like: id_liked,
          id_liked: this.userId,
        };
        console.log("Payload:", payload);
        await axios.put(
          "https://rust-swapp-be-407691885788.us-central1.run.app/match",
          payload
        );
        alert("Match criado com sucesso! 🎉");
        // Opcional: remova a curtida da lista
        this.likes = this.likes.filter((like) => like[0] !== id_liked);
        this.closePopup();
      } catch (error) {
        console.error("Erro ao criar match:", error);
        alert("Erro ao criar match.");
      }
    },
  },
  mounted() {
    this.fetchLoggedUser();
  },
};
</script>

<style scoped>
.curtidas-recebidas {
  text-align: center;
  padding: 20px;
}

.services-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.service-card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: left;
  background-color: white;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.service-info h2 {
  margin: 10px 0;
}

.service-info h4 {
  margin: 5px 0;
}
</style>
