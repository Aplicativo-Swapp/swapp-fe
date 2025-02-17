<template>
  <div>
    <TheHeaderMenu />
    <div class="form-illustration-container">
      <div class="form-container">
        <h2>Anuncie uma Habilidade</h2>
        <form @submit.prevent="submitForm">
          <!-- Select de Categorias -->
          <div class="select">
            <select v-model="formData.category" @change="fetchSubHabilidades" required class="select-category">
              <option value="" disabled selected hidden>Categorias</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.nome }}
              </option>
            </select>
          </div>

          <!-- Select de Subcategorias -->
          <div class="select">
            <select v-model="formData.subcategory" required class="select-category">
              <option value="" disabled selected hidden>Subcategoria</option>
              <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">
                {{ subcategory.nome }}
              </option>
            </select>
          </div>

          <!-- Restante do formulário -->
          <div class="form-group">
            <input type="text" v-model="formData.value" placeholder="Valor Estimado (R$)" @input="formatCurrency"
              class="text-box" />
          </div>
          <div class="form-group">
            <textarea type="text" v-model="formData.description" placeholder="Descrição" required
              class="description-box"></textarea>
          </div>

          <div class="form-group">
            <!-- Botão de upload com miniaturas -->
            <label for="photo-upload" class="upload-button">
              <div class="thumbnail-container">
                <template v-if="formData.photos.length === 0">
                  <span class="placeholder-text">Adicionar Foto</span>
                </template>
                <template v-else>
                  <template v-for="(photo, index) in formData.photos.slice(0, 3)">
                    <img v-if="index < 2 || formData.photos.length <= 3" :key="'photo-' + index"
                      :src="getPhotoPreview(photo)" alt="Pré-visualização" class="thumbnail" />
                    <div v-else :key="'indicator-' + index" class="more-indicator">
                      +{{ formData.photos.length - 2 }}
                    </div>
                  </template>
                </template>
              </div>
            </label>
            <input id="photo-upload" type="file" @change="handleFileUpload" accept="image/*" multiple
              class="photo-input" />
          </div>

          <button type="submit">Anunciar</button>
        </form>
      </div>

      <div class="illustration">
        <nav>
          <div class="text-illustration">
            <h2>É BOM EM ALGO?</h2>
            <h2>OFEREÇA UM SERVIÇO</h2>
          </div>
          <img src="@/assets/mascote.png" alt="Logo" class="mascote" />
        </nav>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheHeaderMenu from "@/components/TheHeaderMenu.vue";
import TheFooter from "@/components/TheFooter.vue";
import axios from "axios";

export default {
  name: "InserirHabilidade",
  components: {
    TheHeaderMenu,
    TheFooter,
  },
  data() {
    return {
      formData: {
        category: "",
        subcategory: "",
        subcategory_name: "",
        localization: "",
        title: "",
        description: "",
        value: "", // Valor estimado no formato moeda
        photos: [], // Armazenará os arquivos de imagem, mas não serão enviadas
      },
      categories: [],
      subcategories: [],
      idUsuarioLogado: null,
      userFirstName: "",
      userLastName: "",
      isInitialLoad: true, // Indica se estamos carregando os dados pela primeira vez
      formattedValue: "",
    };
  },
  methods: {
    async fetchHabilidades() {
      try {
        const response = await axios.get("https://rust-swapp-be-407691885788.us-central1.run.app/habilidades");
        console.log("Habilidades recebidas:", response.data);
        this.categories = response.data;
      } catch (error) {
        console.error("Erro ao buscar habilidades:", error);
      }
    },
    async fetchSubHabilidades() {
      this.formData.subcategory = ""; // Reseta a subcategoria ao mudar a categoria
      this.subcategories = []; // Limpa as subcategorias antes de buscar novas

      console.log("ID da categoria selecionada:", this.formData.category);

      if (!this.formData.category) return;

      try {
        const response = await axios.get(
          `https://rust-swapp-be-407691885788.us-central1.run.app/sub_habilidade_habilidade/${this.formData.category}`
        );
        console.log("Resposta da API para subcategorias:", response.data);

        if (Array.isArray(response.data)) {
          this.subcategories = response.data;
        } else {
          console.error("Formato inesperado para subcategorias:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar sub habilidades:", error);
      }
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.formData.photos = [...this.formData.photos, ...Array.from(files)];
      console.log("Imagens selecionadas:", this.formData.photos);
    },
    getPhotoPreview(file) {
      return URL.createObjectURL(file); // Cria uma URL local para pré-visualizar as imagens
    },
    formatCurrency(event) {
      // Remove caracteres que não são números
      let value = event.target.value.replace(/\D/g, "");

      // Converte para formato de moeda brasileiro
      value = (value / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      // Atualiza o modelo de dados
      this.formData.value = value;
    },
    // Função auxiliar para converter um valor formatado em moeda para float
    getFloatFromCurrency(value) {
      if (!value) return 0;
      return parseFloat(value.replace(/[^0-9,]/g, "").replace(",", "."));
    },
    async submitForm() {
      // Se o usuário não tiver sido redirecionado por já possuir uma habilidade, prossegue com a inserção
      if (!this.idUsuarioLogado) {
        alert("Você precisa estar logado para cadastrar uma habilidade.");
        return;
      }
      const parentResponse = await axios.get(
        `https://rust-swapp-be-407691885788.us-central1.run.app/habilidade_sub_habilidade/${this.formData.subcategory}`
      );
      if (parentResponse.data && parentResponse.data.length > 0) {
        const parent = parentResponse.data[0];
        this.formData.subcategory_name = parent.nome;
        } else {
        console.error("Não foi possível obter a habilidade associada à sub-habilidade.");
      }

      const postData = {
        descricao: this.formData.description,
        id_sub_habilidade: this.formData.subcategory,
        id_users: this.idUsuarioLogado,
        // Converte o valor formatado para float
        valor: this.getFloatFromCurrency(this.formData.value) || 0,
        first_name: this.userFirstName,
        last_name: this.userLastName,
        nome_sub_habilidade: this.formData.subcategory_name,
      };
      console.log("teste", postData);
      
      try {
        const response = await axios.post(
          "https://rust-swapp-be-407691885788.us-central1.run.app/inserir",
          postData
        );
        alert("Habilidade anunciada com sucesso!");
        console.log("Resposta da API:", response.data);
      } catch (error) {
        console.error("Erro ao cadastrar habilidade:", error.response?.data || error.message);
        alert("Erro ao realizar o cadastro de habilidade. Verifique os dados e tente novamente.");
      }
    },
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
        this.idUsuarioLogado = data.id;
        this.userFirstName = data.first_name;
        this.userLastName = data.last_name;
        console.log("ID do usuário logado:", this.idUsuarioLogado);
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    },
    async checkExistingSkill() {
      try {
        const response = await axios.get(
          `https://rust-swapp-be-407691885788.us-central1.run.app/obter/${this.idUsuarioLogado}`
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          alert("Você já possui uma habilidade cadastrada. Você será redirecionado para a página de edição.");
          this.$router.push({ name: "EditarHabilidade" });
        }
      } catch (error) {
        console.error("Erro ao verificar habilidade existente:", error);
      }
    },
  },
  async mounted() {
    await this.buscarUsuarioLogado();
    if (this.idUsuarioLogado) {
      await this.checkExistingSkill();
    }
    this.fetchHabilidades();
  },
};
</script>


<style scoped>
body {
  background-color: #ececec;
  margin: 0;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app {
  flex: 1;
}

.logo {
  width: 200px;
  height: auto;
}

.form-illustration-container {
  display: flex;
  flex-direction: row-reverse;
  /* Inverte a ordem dos elementos */
}

.form-container {
  width: 400px;
  margin-top: 70px;
  margin-bottom: auto;
  margin-left: -440px;
  margin-right: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.illustration {
  max-width: 400px;
  height: 666px;
  margin-right: auto;
  margin-top: 70px;
  margin-bottom: 70px;
  padding: 20px;
  background-color: #d9d9d9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  /* Adiciona o Flexbox */
  justify-content: center;
  /* Centraliza horizontalmente */
  align-items: center;
  /* Centraliza verticalmente */
}

.text-illustration {
  justify-content: center;
  text-align: left;
}

.mascote {
  width: 420px;
  height: auto;
  display: block;
  /* Garantir que a imagem não tenha comportamento flex */
}

.select-category {
  margin-bottom: 15px;
  width: 316px;
  height: 36px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  background-color: #d9d9d9;
  color: #666;
  font-size: 13px;
  appearance: auto;
}

.form-group {
  margin-bottom: 15px;
}


.description-box {
  width: 300px;
  height: 80px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  background-color: #d9d9d9;
  font-size: 13px;
  font-family: Arial, sans-serif;
  resize: none;
  /* Desabilita o redimensionamento */
}

.upload-button {
  width: 300px;
  height: 80px;
  padding: 6px;
  margin: auto;
  border-radius: 6px;
  background-color: #d9d9d9;
  display: flex;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.3s, border-color 0.3s;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.upload-button:hover {
  background-color: #78E0C5;
}

.thumbnail-container {
  display: flex;
  gap: 5px;
  /* Espaçamento entre as miniaturas */
  align-items: center;
  justify-content: center;
  width: 100%;
  /* Alinha com o botão */
}

.placeholder-text {
  font-size: 13px;
  color: #666;
}

.thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  /* Garante que a imagem preencha o quadrado */
  border-radius: 4px;
  border: 1px solid #ccc;
}

.more-indicator {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  background-color: #d9d9d9;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid #ccc;
}

.photo-input {
  display: none;
  /* Esconde o input de arquivo */
}

.text-box {
  width: 300px;
  height: 20px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  background-color: #d9d9d9;
}

button {
  width: 120px;
  padding: 10px;
  background-color: #89FFDB;
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #89FFDB;
}
</style>
