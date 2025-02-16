<template>
    <div class="popup-overlay" @click.self="closePopup">
      <div class="popup-content match-card">
        <div v-if="service">
          <div class="card-header">
            <img
              :src="service.image"
              alt="Foto do usuário"
              class="user-photo-small"
            />
            <h4>{{ service.full_name || service.title }}</h4>
          </div>
          <div class="card-body">
            <p><strong>Localização:</strong> {{ service.location }}</p>
            <p>{{ service.description }}</p>
          </div>
          <div class="card-actions">
            <template v-if="actionType === 'match'">
              <button class="btn-match" @click="matchAction">Dar Match 🤝</button>
            </template>
            <!-- Outras ações podem ser adicionadas aqui conforme necessário -->
          </div>
          <button class="btn-close" @click="closePopup">×</button>
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
    methods: {
      closePopup() {
        this.$emit("close");
      },
      matchAction() {
        this.$emit("match", this.service.id_liked);
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
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  
  .match-card {
    text-align: left;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .user-photo-small {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  
  .card-body {
    margin-bottom: 20px;
  }
  
  .card-actions {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .btn-match {
    background-color: #00c896;
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .btn-match:hover {
    background-color: #008f6b;
  }
  
  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  </style>
  