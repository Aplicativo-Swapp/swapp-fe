<template>
  <div>
    <header class="header">
      <nav>
        <img src="@/assets/logo2.png" alt="Logo" class="logo" />
      </nav>
    </header>
    <div class="form-illustration-container">
      <div class="form-container">
        <h2>Anuncie uma Habilidade</h2>
        <form @submit.prevent="submitForm">
  
          <!-- Select de Categorias -->
          <div class="select">
            <select v-model="formData.category" @change="updateSubcategories" required class="select-category">
              <option value="" disabled selected hidden>Categoria do serviço</option>
              <option v-for="category in categories" :key="category.id" :value="category.name">
                {{ category.name }}
              </option>
            </select>
          </div>
  
          <!-- Select de Subcategorias -->
          <div class="select">
            <select v-model="formData.subcategory" required class="select-category">
              <option value="" disabled selected hidden>Subcategoria</option>
              <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.name">
                {{ subcategory.name }}
              </option>
            </select>
          </div>
  
          <div class="form-group">
            <input type="text" v-model="formData.localization" placeholder="Localização" required class="text-box" />
          </div>
          <div class="form-group">
            <input type="text" v-model="formData.title" placeholder="Título. Ex: corte de cabelo" required class="text-box" />
          </div>
          <div class="form-group">
            <textarea type="text" v-model="formData.description" placeholder="Descrição" required class="description-box"></textarea>
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
                    <img v-if="index < 2 || formData.photos.length <= 3" :key="'photo-' + index" :src="getPhotoPreview(photo)" alt="Pré-visualização" class="thumbnail"/>
                    <div v-else :key="'indicator-' + index" class="more-indicator">
                      +{{ formData.photos.length - 2 }}
                    </div>
                  </template>
                </template>
              </div>
            </label>
            <input id="photo-upload" type="file" @change="handleFileUpload" accept="image/*" multiple class="photo-input" />
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
    
    <footer class="footer">
      <p>Desenvolvido pelo Grupo Lima&copy;</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InserirHabilidade",
  data() {
  return {
    formData: {
      category: "",
      subcategory: "",
      localization: "",
      title: "",
      description: "",
      photos: [], // Armazenará os arquivos de imagem
    },
    categories: [
      { id: 1, name: "Assistência Técnica", subcategories: ["Computadores", "Eletrodomésticos"] },
      { id: 2, name: "Aulas", subcategories: ["Matemática", "Idiomas", "Música"] },
      { id: 3, name: "Serviços Domésticos", subcategories: ["Limpeza", "Cozinha", "Manutenção"] },
    ],
    subcategories: [],
  };
},
  methods: {
    updateSubcategories() {
      const selectedCategory = this.categories.find(
        (category) => category.name === this.formData.category
      );
      this.subcategories = selectedCategory
        ? selectedCategory.subcategories.map((name, index) => ({ id: index, name }))
        : [];
      this.formData.subcategory = ""; // Reseta o valor da subcategoria
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.formData.photos = Array.from(files); // Armazena todas as imagens selecionadas
      console.log("Imagens selecionadas:", this.formData.photos);
    },
    getPhotoPreview(file) {
      return URL.createObjectURL(file); // Cria uma URL local para pré-visualizar as imagens
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("category", this.formData.category);
      formData.append("subcategory", this.formData.subcategory);
      formData.append("localization", this.formData.localization);
      formData.append("title", this.formData.title);
      formData.append("description", this.formData.description);

      // Adiciona as imagens ao FormData
      this.formData.photos.forEach((file, index) => {
        formData.append(`photo_${index}`, file);
      });

      try {
        const response = await axios.post("http://0.0.0.0:8000/api/users/register/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Cadastro realizado com sucesso!");
        console.log("Resposta da API:", response.data);
      } catch (error) {
        console.error("Erro ao registrar:", error.response?.data || error.message);
        alert("Erro ao realizar cadastro. Verifique os dados e tente novamente.");
      }
    },
  },
};
</script>


<style scoped>
.header {
  background-color: #14241F;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

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
  flex-direction: row-reverse; /* Inverte a ordem dos elementos */
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
  display: flex; /* Adiciona o Flexbox */
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
}

.text-illustration {
  justify-content: center;
  text-align: left;
}

.mascote {
  width: 420px;
  height: auto;
  display: block; /* Garantir que a imagem não tenha comportamento flex */
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

.footer {
  background-color: #D9D9D9;
  color: #404040;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
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
  resize: none; /* Desabilita o redimensionamento */
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
  gap: 5px; /* Espaçamento entre as miniaturas */
  align-items: center;
  justify-content: center;
  width: 100%; /* Alinha com o botão */
}

.placeholder-text {
  font-size: 13px;
  color: #666;
}

.thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover; /* Garante que a imagem preencha o quadrado */
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
  display: none; /* Esconde o input de arquivo */
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
