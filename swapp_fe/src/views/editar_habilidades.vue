<template>
  <div>
    <TheHeaderMenu />
    <div class="form-container">
      <h2>Editar Habilidade</h2>
      <form @submit.prevent="submitForm">

        <!-- Select de Categorias -->
         <div class="form-group">
           <div class="select-category">
             <select v-model="formData.category" @change="updateSubcategories" :disabled="!editableFields.category" required>
               <option value="" disabled hidden>Categoria do serviço</option>
               <option v-for="category in categories" :key="category.id" :value="category.name">
                 {{ category.name }}
               </option>
             </select>
             <button type="button" class="edit-button" :data-field="'category'" @click="enableEdit('category')">
               Editar
             </button>
           </div>
         </div>
        <!-- Select de Subcategorias -->
        <div class="form-group">
          <div class="select-category">
            <select v-model="formData.subcategory" :disabled="!editableFields.subcategory" required>
              <option value="" disabled hidden>Subcategoria</option>
              <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.name">
                {{ subcategory.name }}
              </option>
            </select>
            <button type="button" class="edit-button" :data-field="'subcategory'" @click="enableEdit('subcategory')">
              Editar
            </button>
          </div>
        </div>
        <!-- Campode  Valor -->
        <div class="form-group">
          <div class="text-box">
            <input type="text" v-model="formData.value" :disabled="!editableFields.value"
              placeholder="Valor Estimado (R$)" @input="formatCurrency" />
            <button type="button" class="edit-button" :data-field="'value'" @click="enableEdit('value')">
              Editar
            </button>
          </div>
        </div>
        <!-- Campo de Localização -->
        <div class="form-group">
          <div class="text-box">
            <input type="text" v-model="formData.localization" :disabled="!editableFields.localization"
              placeholder="Localização" required />
            <button type="button" class="edit-button" :data-field="'localization'" @click="enableEdit('localization')">
              Editar
            </button>
          </div>
        </div>
        <!-- Campo de Título -->
        <div class="form-group">
          <div class="text-box">
            <input type="text" v-model="formData.title" :disabled="!editableFields.title"
              placeholder="Título. Ex: corte de cabelo" required />
            <button type="button" class="edit-button" :data-field="'title'" @click="enableEdit('title')">
              Editar
            </button>
          </div>
        </div>
        <!-- Campo de Descrição -->
        <div class="form-group">
          <div class="text-box description-box-container">
            <textarea v-model="formData.description" :disabled="!editableFields.description" placeholder="Descrição"
              required class="description-box"></textarea>
            <button type="button" class="edit-button" :data-field="'description'" @click="enableEdit('description')">
              Editar
            </button>
          </div>
        </div>
        <!-- Campo de Fotos -->
        <div class="form-group">
          <label for="photo-upload" class="upload-button">
            <div class="thumbnail-container">
              <template v-if="formData.photos.length === 0">
                <span class="placeholder-text">Adicionar Foto</span>
              </template>
              <template v-else>
                <div class="photo-grid">
                  <template v-for="(photo, index) in formData.photos">
                    <div class="thumbnail-wrapper" :key="'photo-' + index">
                      <img :src="getPhotoPreview(photo)" alt="Thumbnail" />
                      <button class="delete-button" type="button" @click="removePhoto(index)">X</button>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </label>
          <input id="photo-upload" type="file" @change="handleFileUpload" accept="image/*" multiple
            class="photo-input" />
        </div>

        <button type="submit" class="save-button">Salvar Alterações</button>
      </form>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheHeaderMenu from "@/components/TheHeaderMenu.vue";
import TheFooter from "@/components/TheFooter.vue";
import axios from "axios";

export default {
  name: "EditarHabilidade",
  components: {
    TheHeaderMenu,
    TheFooter,
  },
  data() {
    return {
      formData: {
        category: "",
        subcategory: "",
        localization: "",
        title: "",
        description: "",
        value: "",
        photos: [],
      },
      editableFields: {
        category: false,
        subcategory: false,
        localization: false,
        title: false,
        description: false,
        value: false,
      },
      showAllPhotos: true,
      categories: [
        {
          id: 1,
          name: "Assistência Técnica",
          subcategories: ["Computadores", "Eletrodomésticos"],
        },
        {
          id: 2,
          name: "Aulas",
          subcategories: ["Matemática", "Idiomas", "Música"],
        },
        {
          id: 3,
          name: "Serviços Domésticos",
          subcategories: ["Limpeza", "Cozinha", "Manutenção"],
        },
      ],
      subcategories: [],
    };
  },
  methods: {
    async loadSkill(skillId) {
      try {
        const response = await axios.get(
          `http://0.0.0.0:8000/api/skills/${skillId}/`
        );
        this.formData = { ...response.data };
        this.updateSubcategories();
      } catch (error) {
        console.error("Erro ao carregar habilidade:", error);
        alert("Erro ao carregar habilidade.");
      }
    },
    updateSubcategories() {
      const selectedCategory = this.categories.find(
        (category) => category.name === this.formData.category
      );
      this.subcategories = selectedCategory
        ? selectedCategory.subcategories.map((name, index) => ({
          id: index,
          name,
        }))
        : [];
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.formData.photos = [...this.formData.photos, ...Array.from(files)];
    },
    removePhoto(index) {
      this.formData.photos.splice(index, 1);
    },
    getPhotoPreview(file) {
      return URL.createObjectURL(file);
    },
    enableEdit(field) {
      this.editableFields[field] = true;
      // Adiciona lógica para esconder o botão
      const button = document.querySelector(
        `.edit-button[data-field="${field}"]`
      );
      if (button) {
        button.style.display = "none";
      }
    },
    formatCurrency(event) {
      let value = event.target.value.replace(/\D/g, "");
      value = (value / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      this.formData.value = value;
    },
    async submitForm() {
      // Validação de campos obrigatórios
      if (!this.formData.category || !this.formData.subcategory || !this.formData.value || !this.formData.localization || !this.formData.title || !this.formData.description) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return; // Impede o envio do formulário se algum campo obrigatório estiver vazio
      }

      const formData = new FormData();
      formData.append("category", this.formData.category);
      formData.append("subcategory", this.formData.subcategory);
      formData.append("value", this.formData.value);
      formData.append("localization", this.formData.localization);
      formData.append("title", this.formData.title);
      formData.append("description", this.formData.description);

      this.formData.photos.forEach((file, index) => {
        formData.append(`photo_${index}`, file);
      });

      try {
        await axios.put(
          `http://0.0.0.0:8000/api/skills/${this.$route.params.skillId}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Habilidade atualizada com sucesso!");
      } catch (error) {
        console.error(
          "Erro ao atualizar habilidade:",
          error.response?.data || error.message
        );
        alert("Erro ao atualizar habilidade: " + (error.response?.data || error.message));
      }
    },
  },
  mounted() {
    const skillId = this.$route.params.skillId;
    if (skillId) {
      this.loadSkill(skillId);
    } else {
      alert("ID da habilidade inválido.");
    }
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

.form-container {
  max-width: 400px;
  margin: 20px auto;
  margin-top: 70px;
  margin-bottom: 70px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.select-category {
  position: relative;
  align-items: center;
  display: flex;
  width: 300px;
  height: 20px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  background-color: #d9d9d9;
  margin: auto;
}

.select-category select{
  width: 316px;
  height: 36px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #666;
  text-align: left;

  font-size: 13px;
  appearance: textfield;
}

.select-category select[disabled] {
  color: #666;
  cursor: not-allowed;
  appearance: none;
}

.text-box {
  position: relative;
  align-items: center;
  display: flex;
  width: 300px;
  height: 20px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  background-color: #d9d9d9;
  margin: auto;
}

.text-box input {
  flex: 1;
  border: none;
  background: transparent;
  text-align: left;
  /* Alinha o texto do placeholder à esquerda */
  padding: 8px;
}

.text-box input[disabled] {
  color: #666;
  cursor: not-allowed;
}

.description-box-container {
  position: relative;
  align-items: center;
  display: flex;
  width: 300px;
  height: 80px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  background-color: #d9d9d9;
  margin: auto;
}

.description-box {
  width: 300px;
  height: 80px;
  flex: 1;
  border: none;
  background: transparent;
  text-align: left;
  /* Alinha o texto do placeholder à esquerda */
  padding: 8px;
  resize: none;
  /* Desabilita redimensionamento */
}

.description-box[disabled] {
  color: #666;
  cursor: not-allowed;
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
  color: #14241f;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  /* Transição suave ao passar o mouse */
}

.edit-button:hover {
  background-color: #14241f;
  /* Fundo preenchido ao passar o mouse */
  color: #fff;
}

.upload-button {
  width: 300px;
  min-height: 80px;
  padding: 6px;
  margin: auto;
  border-radius: 6px;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.3s, border-color 0.3s;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.upload-button:hover {
  background-color: #78e0c5;
}

.thumbnail-container {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.placeholder-text {
  font-size: 13px;
  color: #666;
}

.thumbnail-wrapper {
  position: relative;
  width: 60px; /* Largura fixa para cada miniatura */
  height: 60px; /* Altura fixa */
  overflow: hidden; /* Garante que partes fora do limite não sejam exibidas */
  border-radius: 4px;
  border: 1px solid #ccc;
}

.thumbnail-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Garante que a imagem preencha o espaço sem distorcer */
}

.photo-input {
  display: none;
  /* Esconde o input de arquivo */
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Define exatamente 3 colunas */
  gap: 10px; /* Espaçamento entre as miniaturas */
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-button:hover {
  background: darkred;
}

.save-button {
  width: 120px;
  padding: 10px;
  background-color: #89ffdb;
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #89ffdb;
}
</style>