<template>
  <div class="meus-matchs">
    <h2>Histórico de Matchs</h2>
    <div v-if="matches.length === 0" class="no-matches">
      <p>Você ainda não possui nenhum Match.</p>
    </div>
    <div v-else class="matches-list">
      <div v-for="match in matches" :key="match.id" class="match-card" @click="openPopup(match)">
        <div class="match-info">
          <img :src="match.userImage" alt="Foto do usuário" class="user-photo" />
          <h2>Match com {{ match.them }}</h2>
          <h4>Habilidade dele: {{ match.theirSkill }}</h4>
          <img :src="getImage(match.theirSkill)" alt="Imagem do serviço" class="service-image"
            @error="handleImageError" />
          <h4>Sua habilidade: {{ match.yourSkill }}</h4>
        </div>
      </div>
    </div>

    <!-- Popup do Card para Match -->
    <CardPage v-if="selectedMatch" :service="formattedSelectedMatch" actionType="chat" @close="closePopup"
      @remove="removeMatch" @chat="openChatFromCard" />
  </div>
</template>

<script>
import axios from "axios";
import CardPage from "@/components/Card.vue";
import { redirectToLogin } from "@/utils/auth";
import fallbackImage from "@/assets/oferecer_serviço.png";

export default {
  name: "MatchsComponent",
  components: {
    CardPage,
  },
  data() {
    return {
      matches: [], // Array com os dados dos matchs
      userId: null, // ID do usuário logado
      loggedUserSkill: "", // Habilidade do usuário logado
      selectedMatch: null, // Match selecionado para exibir no popup
    };
  },
  computed: {
    // Adapta os dados do match para o formato esperado pelo CardPage
    formattedSelectedMatch() {
      if (!this.selectedMatch) return null;
      return {
        id_liked: this.selectedMatch.id,
        full_name: this.selectedMatch.them,
        theirSkill: this.selectedMatch.theirSkill,
        image: this.selectedMatch.userImage,
        yourSkill: this.selectedMatch.yourSkill,
      };
    },
  },
  methods: {
    openPopup(match) {
      this.selectedMatch = match;
    },
    closePopup() {
      this.selectedMatch = null;
    },
    async removeMatch(matchId) {
      if (!this.userId) {
        console.error("ID do usuário logado não encontrado.");
        return;
      }
      try {
        const payload = {
          id_deu_like: this.userId,
          id_liked: this.selectedMatch.them_id, // Usa o ID do outro usuário no match
        };

        await axios.delete(
          "https://rust-swapp-be-407691885788.us-central1.run.app/match/delete",
          { data: payload }
        );

        this.matches = this.matches.filter((match) => match.id !== matchId);
        console.log(`Match ${matchId} removido com sucesso!`);
      } catch (error) {
        console.error("Erro ao remover match:", error);
      } finally {
        this.closePopup();
      }
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
          // Busca detalhes do usuário logado para obter sua habilidade
          const userDetails = await axios.get(
            `https://rust-swapp-be-407691885788.us-central1.run.app/obter/${this.userId}`
          );
          if (userDetails.data && userDetails.data.length > 0) {
            const loggedData = userDetails.data[0];
            this.loggedUserSkill = loggedData.nome_sub_habilidade;
          }
          this.fetchMatches();
        }
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    },
    async fetchMatches() {
      if (!this.userId) {
        console.error("ID do usuário logado não encontrado.");
        return;
      }
      try {
        // Busca os IDs dos matchs
        const response = await axios.get(
          `https://rust-swapp-be-407691885788.us-central1.run.app/match/${this.userId}`
        );
        console.log("Resposta da API de matches:", response.data);

        const matchIds = response.data; // Array de IDs dos usuários com match

        // Para cada ID, busca os dados completos usando o endpoint "obter"
        const matchPromises = matchIds.map((matchId) =>
          axios.get(
            `https://rust-swapp-be-407691885788.us-central1.run.app/obter/${matchId}`
          )
        );
        const matchDetailsResponses = await Promise.all(matchPromises);

        // Mapeia os dados para o formato que usaremos na tela
        this.matches = matchDetailsResponses
          .map((resp) => {
            const dataArray = resp.data;
            if (dataArray && dataArray.length > 0) {
              const userData = dataArray[0];
              console.log("teste", userData);
              return {
                id: userData.id_users,
                them: `${userData.first_name} ${userData.last_name}`,
                theirSkill: userData.nome_sub_habilidade,
                yourSkill: this.loggedUserSkill,
                them_id: userData.id_users,
                userImage: userData.userImage || require("@/assets/default-user.png"),
              };
            }
            return null;
          })
          .filter((item) => item !== null);
      } catch (error) {
        console.error("Erro ao buscar matches:", error);
      }
    },
    openChat(matchId) {
      this.$router.push(`/chat/${matchId}`);
      console.log(`Abrindo chat para o match com ID: ${matchId}`);
    },
    openChatFromCard(id) {
      this.openChat(id);
    },
    getImage(nome) {
      if (!nome) {
        console.warn("nome_sub_habilidade está undefined, usando imagem de fallback.");
        return fallbackImage;
      }
      const formattedName = this.formatName(nome);
      console.log()
      try {
        // Tenta importar a imagem dinamicamente com o nome formatado
        return require(`@/assets/${formattedName}.jpg`);
      } catch (error) {
        // Se não encontrar, retorna a imagem de fallback
        return fallbackImage;
      }
    },

    formatName(nome) {
      // Exemplo de formatação: tudo minúsculo e espaços substituídos por underline
      return nome.toLowerCase().replace(/\s+/g, "_");
    },
    handleImageError(event) {
      event.target.src = fallbackImage;
    },
  },
  mounted() {
    this.fetchLoggedUser();
  },
};
</script>

<style scoped>
.meus-matchs {
  text-align: center;
  padding: 20px;
}

.no-matches {
  text-align: center;
  color: #555;
}

.matches-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.match-card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: left;
  background-color: white;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.match-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.match-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  align-self: flex-start;
}

/* 🔹 Ajuste da imagem do serviço */
.service-image {
  width: 50%;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
  display: block;
  margin: 0 auto;
}
</style>
