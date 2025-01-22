<template>
  <div class="curtidas-recebidas">
    <main class="likes-grid">
      <div class="like-card" v-for="like in likes" :key="like.id">
        <h4>{{ like.user }} curtiu seu serviço de {{ like.service.title }}</h4>
        <p>Localização: {{ like.service.location }}</p>
        <div class="user-services">
          <h4>Serviços oferecidos:</h4>
          <ul>
            <li v-for="service in like.userServices" :key="service.id">
              {{ service.title }}
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
//import axios from "axios";

export default {
  name: "LikesPage",

  data() {
    return {
      likes: [], // Armazena as curtidas e serviços relacionados
      isLoading: true,
    };
  },
  methods: {
    async fetchLikes() {
      try {
//para testes
        this.likes = [
                  {
                    id: 1,
                    user: "Neymar Jr",
                    service: { id: 10, title: "Cortar cabelo", location: "São Paulo" },
                    userServices: [
                      { id: 11, title: "Design de barba" },
                      { id: 12, title: "Tratamento capilar" }
                    ]
                  },
                  {
                    id: 2,
                    user: "Lionel Messi",
                    service: { id: 13, title: "Reparação de celular", location: "Barcelona" },
                    userServices: [
                      { id: 14, title: "Instalação de aplicativos" },
                      { id: 15, title: "Configuração de redes" }
                    ]
                  }
                ];

//para a API
        /*const response = await axios.get("http://localhost:3000/likes"); // Substituir pela URL correta da API
        this.likes = response.data;*/
      } catch (error) {
        console.error("Erro ao buscar curtidas:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchLikes(); // Busca os dados ao carregar a página
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
  padding: 15px 20px 15px 20px;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Suaviza o efeito */
  text-align: left; /* Alinha o texto à esquerda */
}

.like-card:hover {
    transform: scale(1.05); /* Aplica o zoom */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adiciona uma sombra para destaque */
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
</style>
