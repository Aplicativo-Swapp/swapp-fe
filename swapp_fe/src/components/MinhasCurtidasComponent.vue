<template>
  <div class="minhas-curtidas">
    <h2>Minhas Curtidas</h2>
    <div v-if="likedServices.length === 0">
      <p>Você ainda não curtiu nenhum serviço.</p>
    </div>
    <div class="services-list" v-else>
      <div class="service-card" v-for="likedService in likedServices" :key="likedService.id_liked"
        @click="openPopup(likedService)">
        <div class="service-info">
          <h4>Você curtiu o serviço de {{ likedService.full_name }}</h4>
          <img :src="getImage(likedService.title)" alt="Imagem do serviço" class="service-image" />
          <h2>Habilidade: {{ likedService.title }}</h2>
          <h4>Localização: {{ likedService.location }}</h4>
        </div>
      </div>
    </div>

    <!-- Popup do Card -->
    <CardPage v-if="selectedService" :service="selectedService" actionType="remove" @close="closePopup"
      @remove="removeLike" />
  </div>
</template>

<script>
import axios from "axios";
import CardPage from "@/components/Card.vue";
import fallbackImage from "@/assets/oferecer_serviço.png";

export default {
  name: "MinhasCurtidasComponent",
  components: {
    CardPage,
  },
  data() {
    return {
      likedServices: [], // Lista de serviços curtidos
      selectedService: null, // Serviço selecionado para exibir no popup
      idUsuarioLogado: null, // ID do usuário logado
    };
  },
  methods: {
    // Abre o popup para exibir detalhes do serviço
    openPopup(likedService) {
      this.selectedService = likedService;
    },
    // Fecha o popup
    closePopup() {
      this.selectedService = null;
    },
    // Remove o like de um serviço
    async removeLike(serviceId) {
      if (!this.idUsuarioLogado) {
        alert("Você precisa estar logado para remover curtidas!");
        return;
      }

      try {
        const payload = {
          id_deu_like: this.idUsuarioLogado,
          id_liked: serviceId,
        };

        await axios.delete("https://rust-swapp-be-407691885788.us-central1.run.app/match/delete", { data: payload });
        this.likedServices = this.likedServices.filter(service => service.id_liked !== serviceId);
        console.log("Like removido com sucesso.");
        alert("Like removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover curtida:", error);
        alert("Erro ao remover o like.");
      } finally {
        this.closePopup(); // Fecha o popup após a operação
      }
    },
    // Busca os serviços curtidos pelo usuário logado
    async fetchLikedServices() {
      if (!this.idUsuarioLogado) {
        alert("Você precisa estar logado para ver seus serviços curtidos.");
        return;
      }

      try {
        const response = await axios.get(
          `https://rust-swapp-be-407691885788.us-central1.run.app/match/buscar_meus_likes/${this.idUsuarioLogado}`
        );
        console.log("Serviços curtidos recebidos:", response.data);
        this.likedServices = response.data.map(like => ({
          id_liked: like[0], // ID do serviço curtido
          full_name: like[1], // Nome do serviço
          title: like[2], // Título do serviço
          location: like[3], // Localização do serviço
        }));
        console.log("Serviços curtidos processados:", this.likedServices);
      } catch (error) {
        console.error("Erro ao buscar serviços curtidos:", error);
        alert("Erro ao carregar serviços curtidos.");
      }
    },
    // Obtém o ID do usuário logado
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
        this.idUsuarioLogado = data.id; // Obtém o ID do usuário logado
        console.log("ID do usuário logado:", this.idUsuarioLogado);

        // Chama a função para buscar os serviços depois que o ID do usuário foi obtido
        if (this.idUsuarioLogado) {
          this.fetchLikedServices();
        }

      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    },
    formatName(name) {
      return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "")
        .replace(/-/g, "");
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
  },
  mounted() {
    this.buscarUsuarioLogado(); // Obtém o ID do usuário logado assim que o componente é montado
  },
};
</script>


<style scoped>
.minhas-curtidas {
  text-align: center;
  padding: 20px;
}

.services-list {
  display: flex;
  justify-content: center;
  /* Centraliza horizontalmente */
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  /* Dá um espaço no topo */
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

.service-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
