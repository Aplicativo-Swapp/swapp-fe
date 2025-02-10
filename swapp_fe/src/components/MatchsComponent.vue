<template>
  <div class="matchs">
    <h2>Histórico de Matchs</h2>
    <div v-if="matches.length === 0" class="no-matches">
      <p>Você ainda não possui nenhum Match.</p>
    </div>
    <div v-else class="matches-list">
      <div v-for="match in matches" :key="match.id" class="match-card">
        <div class="match-header">
          <div class="user-info">
            <img :src="match.userImage" alt="Foto do usuário" class="user-photo" />
            <p><strong>{{ match.them }}</strong> curtiu:</p>
          </div>
          <p>{{ match.theirSkill }}</p>
        </div>
        <hr class="divider" />
        <div class="match-body">
          <p><strong>Você Curtiu:</strong></p>
          <p>{{ match.yourSkill }}</p>
        </div>
        <hr class="divider" />
        <div class="match-actions">
          <div class="action-button">
            <button @click="openChat(match.id)" class="btn-chat">
              <img src="@/assets/chat.png" alt="Chat" class="chat-icon" />
            </button>
            <p class="chat-text">Conversar</p>
          </div>
          <div class="action-button">
            <button @click="dislikeAction(match.id, match.them_id)" class="btn-dislike">
              <img src="@/assets/nao.png" alt="Dislike" class="action-icon" />
            </button>
            <p class="remove-text">Retirar Curtida</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { redirectToLogin } from "@/utils/auth";

export default {
  name: "MatchsComponent",
  data() {
    return {
      matches: [],
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
          this.fetchMatches(); // Chama a função para buscar matches após obter o ID
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
        const response = await axios.get(
          `https://rust-swapp-be-407691885788.us-central1.run.app/match/all/${this.userId}`
        );
        
        console.log("Resposta da API de matches:", response.data);
        
        this.matches = response.data.map(match => ({
          id: match[0],
          them: match[1],
          theirSkill: match[2],
          yourSkill: match[5],
          them_id: match[3],
          userImage: "https://via.placeholder.com/50",
        }));
      } catch (error) {
        console.error("Erro ao buscar matches:", error);
      }
    },

    async dislikeAction(matchId, likedUserId) {
      if (!this.userId) {
        console.error("ID do usuário logado não encontrado.");
        return;
      }

      try {
        const payload = {
          id_deu_like: this.userId,
          id_liked: likedUserId,
        };

        await axios.delete("https://rust-swapp-be-407691885788.us-central1.run.app/match/delete", {
          data: payload,
        });

        this.matches = this.matches.filter(match => match.id !== matchId);
        console.log(`Match ${matchId} removido com sucesso!`);
      } catch (error) {
        console.error("Erro ao remover match:", error);
      }
    },

    openChat(id) {
      console.log(`Abrindo chat para o match com ID: ${id}`);
    },
  },
  
  mounted() {
    this.fetchLoggedUser(); // Obtém o ID do usuário logado antes de buscar matches
  },
};
</script>

<style scoped>
.matchs {
  text-align: center;
  padding: 20px;
}

.no-matches {
  text-align: center;
  color: #555;
}

.matches-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 20px;
}

.match-card {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;
}

.match-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
}

.match-actions {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1.5rem;
}

.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 120px;
}

.btn-chat,
.btn-dislike {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.btn-chat .chat-icon,
.btn-dislike .action-icon {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

.chat-text,
.remove-text {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #555;
}
</style>
