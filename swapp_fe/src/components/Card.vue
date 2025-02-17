<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <div v-if="service">
        <!-- Card para exibição genérica com botão de fechar -->
        <div v-if="actionType === 'close'">
          <img :src="service.image" alt="Imagem do serviço" class="service-image" />
          <div class="service-info">
            <h2>{{ service.title }}</h2>
            <div class="texto">
              <p>Localização: {{ service.location }}</p>
              <p>{{ service.description }}</p>
            </div>
          </div>
          <button class="btn-close" @click="closePopup">Fechar</button>
        </div>

        <!-- Card para Minhas Curtidas -->
        <div v-else-if="actionType === 'remove'">
          <img :src="service.image" alt="Imagem do serviço" class="service-image" />
          <div class="service-info">
            <h4>Você curtiu o serviço de {{ service.full_name }}</h4>
            <h2>{{ service.title }}</h2>
            <h4>Localização: {{ service.location }}</h4>
          </div>
          <button class="btn-remove" @click="removeLike">Remover Curtida</button>
        </div>

        <!-- Card para Curtidas Recebidas -->
        <div v-else-if="actionType === 'match'">
          <img :src="service.image" alt="Imagem do serviço" class="service-image" />
          <div class="service-info">
            <h4>{{ service.full_name }} curtiu seu serviço!</h4>
            <h2>Habilidade oferecida: {{ service.title }}</h2>
            <h4>Localização: {{ service.location }}</h4>
          </div>
          <button class="btn-match" @click="matchAction">Dar Match 🤝</button>
        </div>

        <!-- Card para Matchs (Chat) -->
        <div v-else-if="actionType === 'chat'">
          <img :src="service.image" alt="Imagem do serviço" class="service-image" />
          <div class="service-info">
            <h4>Match com {{ service.full_name }}</h4>
            <p>Habilidade dele: {{ service.theirSkill }}</p>
            <p>Sua habilidade: {{ service.yourSkill }}</p>
          </div>
          <button class="btn-chat" @click="chatAction">Conversar</button>
        </div>
      </div>
      <div v-else>
        <p>Serviço não encontrado.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardPage",
  props: {
    service: {
      type: Object,
      required: true,
    },
    actionType: {
      type: String,
      default: "close",
    },
  },
  // Declaramos os eventos que o componente pode emitir:
  emits: ['close', 'remove', 'match', 'chat'],
  methods: {
    closePopup() {
      this.$emit("close");
    },
    removeLike() {
      this.$emit("remove", this.service.id_liked);
    },
    matchAction() {
      this.$emit("match", this.service.id_liked);
    },
    chatAction() {
      this.$emit("chat", this.service.id_liked);
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.service-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  align-self: flex-start;
}
.service-info {
  text-align: left;
}
.texto {
  font-family: Arial, Helvetica, sans-serif;
}
.btn-close {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background: #333;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.btn-close:hover {
  background: #555;
}
.btn-remove {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background: #e53935;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.btn-remove:hover {
  background: #c62828;
}
.btn-match {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background: #00c896;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.btn-match:hover {
  background: #008f6b;
}
.btn-chat {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background: #561dff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.btn-chat:hover {
  background: #3f14cc;
}
</style>
