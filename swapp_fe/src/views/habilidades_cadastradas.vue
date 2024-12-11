<template>
    <div>
      <TheHeaderMenu />
      <div class="habilidades-cadastradas">
        <h1>Suas Habilidades Cadastradas</h1>
        <div v-if="habilidades.length > 0" class="habilidades-lista">
          <div
            v-for="habilidade in habilidades"
            :key="habilidade.id"
            class="habilidade-item"
          >
            <img
              :src="habilidade.foto"
              alt="Ícone de habilidade"
              class="habilidade-foto"
            />
            <div class="habilidade-info">
              <h2>{{ habilidade.titulo }}</h2>
            </div>
            <button class="editar-btn" @click="editarHabilidade(habilidade.id)">
              Editar
            </button>
          </div>
        </div>
        <div v-else>
          <p>Você ainda não cadastrou habilidades.</p>
        </div>
      </div>
      <TheFooterSimp />
    </div>
  </template>
  
  <script>
  import TheFooterSimp from "@/components/TheFooterSimp.vue";
  import TheHeaderMenu from "@/components/TheHeaderMenu.vue";
  
  export default {
    name: "HabilidadesCadastradas",
    components: {
      TheHeaderMenu,
      TheFooterSimp,
    },
    data() {
      return {
        habilidades: [],
      };
    },
    methods: {
      async buscarHabilidades() {
        try {
          const response = await fetch("/api/usuario/habilidades"); // Atualize o endpoint
          if (response.ok) {
            this.habilidades = await response.json();
          } else {
            console.error("Erro ao buscar habilidades:", response.statusText);
          }
        } catch (error) {
          console.error("Erro ao buscar habilidades:", error);
        }
      },
      editarHabilidade(id) {
        this.$router.push(`/editar-habilidade/${id}`); // Navega para a página de edição
      },
    },
    mounted() {
      this.buscarHabilidades(); // Busca as habilidades ao carregar o componente
    },
  };
  </script>
  
  
  <style scoped>
  .habilidades-cadastradas {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
  }
  
  .habilidades-lista {
    display: flex;
    flex-direction: column;
    gap: 10px;

  }
  
  .habilidade-item {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .habilidade-item img {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
  
  .habilidade-info {
    flex: 1;
    text-align: left;
  }
  
  .habilidade-info h2 {
    font-size: 18px;
    margin: 0;
  }
  
  .edit-button {
    position: absolute;
    right: 10px;
    /* Alinha o botão à direita */
    top: 50%;
    /* Centraliza verticalmente */
    transform: translateY(-50%);
    padding: 6px 12px;
    border: none;
    border-radius: 20px;
    background-color: transparent;
    color: #14241F;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    /* Transição suave ao passar o mouse */
}
  
.edit-button:hover {
    background-color: #14241F;
    /* Fundo preenchido ao passar o mouse */
    color: #fff;
}

  </style>
  