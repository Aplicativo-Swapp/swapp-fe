<template>
  <div>
    <TheHeader />
    <div class="chat-container">
      <header class="chat-header">
        <h2 v-if="otherUser.name">Chat com {{ otherUser.name }}</h2>
        <h2 v-else>Carregando...</h2>
      </header>
      <div class="chat-messages" ref="chatMessages">
        <div v-if="messages.length === 0" class="no-messages">
          Nenhuma mensagem encontrada.
        </div>
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="{
            'message-sent': msg.sender === currentUser.id,
            'message-received': msg.sender === otherUser.id
          }"
        >
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
  components: { TheHeader },
  data() {
    return {
      currentUser: { id: "", name: "eu" },
      otherUser: { id: "", name: "ele" },
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
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        this.currentUser.id = data.id;
        this.currentUser.name = data.first_name;
        console.log("Usuário logado:", this.currentUser);
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    },

    async updateChat() {
      if (!this.currentUser.id || !this.otherUser.id) {
        console.log("IDs de usuário não definidos. currentUser:", this.currentUser, "otherUser:", this.otherUser);
        return;
      }
      try {
        const response = await axios.get(`https://chat-swapp-2-407691885788.us-central1.run.app/get_chat_history?user1=id${this.currentUser.id}&user2=id${this.otherUser.id}`);
        this.messages = response.data;
        console.log("Histórico de chat recebido:", this.messages);
        this.scrollToBottom();
      } catch (error) {
        console.error("Erro ao atualizar o chat:", error);
      }
    },

    async sendMessage() {
      const message = this.newMessage.trim();
      console.log("Tentando enviar mensagem. Eu:", this.currentUser.id, ", Ele:", this.otherUser.id, ", Mensagem:", message);
      if (!message) return;
      try {
        const res = await axios.post(
          `${this.API_URL}/send_message`,
          { sender_id: `id${this.currentUser.id}`, receiver_id: `id${this.otherUser.id}`, message: message },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Resposta do send_message:", res.data);
        this.newMessage = "";
        await this.updateChat();
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatDiv = this.$refs.chatMessages;
        if (chatDiv) chatDiv.scrollTop = chatDiv.scrollHeight;
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
  async mounted() {
    await this.buscarUsuarioLogado();
    // Define o id do outro usuário a partir da rota
    this.otherUser.id = this.$route.params.matchId;
    console.log("ID do outro usuário:", this.otherUser.id);
    // Opcional: aqui você pode buscar o nome do outro usuário, se houver um endpoint para isso.
    this.updateChat();
    // Tente aumentar o intervalo para testar, ex.: 3000ms
    setInterval(this.updateChat, 3000);
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
.no-messages {
  text-align: center;
  color: #999;
  padding: 20px;
}
</style>
