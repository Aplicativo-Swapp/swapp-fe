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
        <!-- Exibe a imagem do usuário que curtiu (ou imagem padrão) -->
        <img
          :src="like[4] || defaultImage"
          alt="Imagem do usuário"
          class="user-photo"
          @error="handleImageError"
        />
        <div class="service-info">
          <h4><strong>{{ like[1] }}</strong> curtiu sua habilidade!</h4>
          <!-- Exibe a imagem do serviço associada ao título -->
          <h2>Habilidade oferecida: {{ like[2] }}</h2>
          <img
            :src="getImage(like[2])"
            alt="Imagem do serviço"
            class="service-image"
          />
          <h4><strong>Localização:</strong> {{ like[3] }}</h4>
        </div>
      </div>
    </div>

    <!-- Renderiza o popup apenas se o objeto formatado não for nulo -->
    <CardPage
      v-if="formattedSelectedLike"
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
import defaultImage from "@/assets/default-user.png"; // Imagem de fallback
import fallbackImage from "@/assets/oferecer_serviço.png";

export default {
  name: "LikesPage",
  components: { CardPage },
  data() {
    return {
      likes: [], // Formato: [id, nome, título, localização, (opcional) imagem]
      isLoading: true,
      userId: null,
      selectedLike: null, // Curtida selecionada para exibir no popup
      defaultImage, // Disponível para uso no template e métodos
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
        image: this.selectedLike[4] || defaultImage,
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
          headers: { Authorization: `Bearer ${token}` },
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
        // Remove a curtida da lista após criar o match
        this.likes = this.likes.filter((like) => like[0] !== id_liked);
        this.closePopup();
      } catch (error) {
        console.error("Erro ao criar match:", error);
        alert("Erro ao criar match.");
      }
    },
    handleImageError(event) {
      event.target.src = this.defaultImage;
    },
    getImage(nome) {
      if (!nome) {
        console.warn("O título do serviço está indefinido, usando imagem de fallback.");
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
    formatName(nome) {
      // Converte para minúsculo e substitui espaços por underlines
      return nome.toLowerCase().replace(/\s+/g, "_");
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
  background-color: white;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.user-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px;
}

.service-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.service-info {
  padding: 10px;
  text-align: left;
}

</style>
