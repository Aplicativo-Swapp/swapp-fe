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
            <h2>{{ habilidade.descricao }}</h2>
          </div>
          <button class="editar-btn" @click="editarHabilidade(habilidade.id)">
            Editar
          </button>
          <!-- Botão de excluir -->
          <button class="excluir-btn" @click="excluirHabilidade">
            Excluir
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
import axios from "axios";

export default {
  name: "HabilidadesCadastradas",
  components: {
    TheHeaderMenu,
    TheFooterSimp,
  },
  data() {
    return {
      habilidades: [],
      idUsuarioLogado: null, // Armazena o ID do usuário logado
    };
  },
  methods: {
    // Obtém o ID do usuário logado via API
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
        // Após obter o ID, busca as habilidades cadastradas
        if (this.idUsuarioLogado) {
          this.buscarHabilidades();
        }
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    },

    // Busca as habilidades cadastradas do usuário logado
    async buscarHabilidades() {
      if (!this.idUsuarioLogado) {
        console.error("Usuário não está logado.");
        return;
      }
      try {
        const response = await axios.get(
          `https://rust-swapp-be-407691885788.us-central1.run.app/obter/${this.idUsuarioLogado}`
        );
        if (response.status === 200) {
          this.habilidades = response.data;
          console.log("Habilidades carregadas:", this.habilidades);
        } else {
          console.error("Erro ao buscar habilidades:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar habilidades:", error);
      }
    },

    // Redireciona para edição da habilidade selecionada
    editarHabilidade() {
      this.$router.push(`/editar-habilidade/`);
    },

    // Método para excluir as habilidades do usuário
    async excluirHabilidade() {
      if (!this.idUsuarioLogado) {
        alert("Você precisa estar logado para excluir habilidades.");
        return;
      }
      if (confirm("Tem certeza que deseja excluir todas as suas habilidades?")) {
        try {
          await axios.delete(
            `https://rust-swapp-be-407691885788.us-central1.run.app/deletar/${this.idUsuarioLogado}`
          );
          alert("Habilidade(s) excluída(s) com sucesso!");
          // Atualiza a lista de habilidades (que provavelmente ficará vazia)
          this.habilidades = [];
        } catch (error) {
          console.error("Erro ao excluir habilidades:", error.response?.data || error.message);
          alert("Erro ao excluir habilidades. Tente novamente.");
        }
      }
    },
  },
  mounted() {
    this.buscarUsuarioLogado(); // Obtém o ID do usuário logado ao montar o componente
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
  position: relative;
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

.editar-btn,
.excluir-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  background-color: transparent;
  color: #14241F;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 5px;
}

.editar-btn:hover,
.excluir-btn:hover {
  background-color: #14241F;
  color: #fff;
}
</style>
