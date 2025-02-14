<template>
  <div>
    <TheHeader />
    <div class="chat-container">
      <header class="chat-header">
        <h2>Chat com {{ otherUser.name }}</h2>
      </header>
      <div class="chat-messages" ref="chatMessages">
        <div v-for="(msg, index) in messages" :key="index" :class="{
          'message-sent': msg.sender === currentUser.id,
          'message-received': msg.sender === otherUser.id
        }">
          <div class="message-info">
            <strong>{{ getSenderName(msg.sender) }}</strong>
          </div>
          <div class="message-text">
            {{ msg.message }}
          </div>
          <div class="timestamp">{{ formatTimestamp(msg.timestamp) }}</div>
        </div>
      </div>
      <div class="chat-input">
        <input type="text" v-model="newMessage" placeholder="Digite sua mensagem..." @keypress.enter="sendMessage" />
        <button @click="sendMessage">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TheHeader from "@/components/TheHeaderLogo.vue";

export default {
  name: "ChatPage",
  components: {
    TheHeader,
  },
  data() {
    return {
      // Definindo os usuários com id e nome
      currentUser: { id: "user1", name: "Alice" },
      otherUser: { id: "user2", name: "Bob" },
      messages: [],
      newMessage: "",
      API_URL: "https://chat-swapp-2-407691885788.us-central1.run.app",
    };
  },
  methods: {
    async buscarUsuarioLogado() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Token não encontrado");
          return;
        }

        const response = await fetch("http://34.56.213.96:8000/api/users/detail/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        this.currentUser.id = data.id; // Obtém o ID do usuário logado
        console.log("xxx ID do usuário logado:", this.currentUser.id);
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    },
    async updateChat() {
      try {
        const response = await axios.get(`${this.API_URL}/get_chat_history`, {
          params: {
            user1: this.currentUser.id,
            user2: this.otherUser.id,
          },
        });
        // Atualiza o array de mensagens com os dados recebidos
        this.messages = response.data;
        this.scrollToBottom();
      } catch (error) {
        console.error("Erro ao atualizar o chat:", error);
      }
    },
    async sendMessage() {
      const message = this.newMessage.trim();
      console.log("eu:", this.currentUser.id, ", ele:", this.otherUser.id,", msg:", message);
      if (!message) return;
      try {
        await axios.post(`${this.API_URL}/send_message`, {
          sender_id: this.currentUser.id,
          receiver_id: this.otherUser.id,
          message: message,
        });
        this.newMessage = "";
        await this.updateChat(); // Atualiza logo após enviar
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatDiv = this.$refs.chatMessages;
        if (chatDiv) {
          chatDiv.scrollTop = chatDiv.scrollHeight;
        }
      });
    },
    formatTimestamp(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
    getSenderName(senderId) {
      if (senderId === this.currentUser.id) return this.currentUser.name;
      if (senderId === this.otherUser.id) return this.otherUser.name;
      return senderId;
    },
  },
  mounted() {
    //this.buscarUsuarioLogado();
    // Carrega as mensagens inicialmente e atualiza a cada 1 segundo
    this.updateChat();
    setInterval(this.updateChat, 1000);
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}

.chat-header {
  text-align: center;
  margin-bottom: 15px;
}

.chat-messages {
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #eee;
  margin-bottom: 15px;
  border-radius: 4px;
}

.message-sent,
.message-received {
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 4px;
  max-width: 70%;
  position: relative;
}

.message-sent {
  background-color: #e3f2fd;
  margin-left: auto;
  text-align: right;
}

.message-received {
  background-color: #f8f9fa;
  margin-right: auto;
  text-align: left;
}

.message-info {
  font-size: 0.9em;
  margin-bottom: 4px;
}

.message-text {
  font-size: 1em;
}

.timestamp {
  font-size: 0.8em;
  color: #666;
  margin-top: 4px;
}

.chat-input {
  display: flex;
  justify-content: space-between;
}

.chat-input input {
  width: 80%;
  padding: 8px;
  margin-right: 5px;
}

.chat-input button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
