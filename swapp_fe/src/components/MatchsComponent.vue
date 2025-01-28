<template>
    <div class="matchs">
      <h2>Histórico de Matchs</h2>
      <div v-if="matches.length === 0" class="no-matches">
        <p>Você ainda não possui nenhum Match.</p>
      </div>
      <div v-else class="matches-list">
        <div v-for="match in matches" :key="match.id" class="match-card">
          <!-- Cabeçalho -->
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
            <!-- Botão de Chat -->
            <div class="action-button">
              <button @click="openChat(match.id)" class="btn-chat">
                <img src="@/assets/chat.png" alt="Chat" class="chat-icon" />
              </button>
              <p class="chat-text">Conversar</p>
            </div>
            <!-- Botão de Dislike -->
            <div class="action-button">
              <button @click="dislikeAction(match.id)" class="btn-dislike">
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
  export default {
    name: "MatchsComponent",
    data() {
      return {
        matches: [
          {
            id: 1,
            them: "Neymar Jr",
            theirSkill: "Serviço de cortar cabelo",
            yourSkill: "Golzinho de Penalty",
            userImage: "https://via.placeholder.com/50",
          },
          {
            id: 2,
            them: "Maria Clara",
            theirSkill: "Aula de inglês",
            yourSkill: "Tradução de textos",
            userImage: "https://via.placeholder.com/50",
          },
        ],
      };
    },
    methods: {
      openChat(id) {
        console.log(`Abrindo chat para o match com ID: ${id}`);
      },
      dislikeAction(id) {
        console.log(`Dislike no match com ID: ${id}`);
      },
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
  .match-header p,
  .match-body p {
    margin: 0.5rem 0;
    font-size: 1rem;
  }
  .divider {
    margin: 1rem 0;
    border: none;
    border-top: 1px solid #ddd;
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
    width: 120px; /* Largura uniforme para alinhar os textos */
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
    width: 70px; /* Tamanho uniforme para ambos os botões */
    height: 70px;
    object-fit: contain;
    pointer-events: none;
  }
  .chat-text,
  .remove-text {
    margin-top: 10px; /* Espaçamento uniforme entre botão e texto */
    font-size: 0.9rem;
    color: #555;
    text-align: center; /* Centraliza o texto */
  }
  </style>
  