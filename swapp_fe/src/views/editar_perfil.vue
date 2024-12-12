<template>
    <div>
        <!-- Cabeçalho -->
        <TheHeader />
        <!-- Formulário de edição -->
        <div class="form-container">
            <h2>Editar Perfil</h2>
            <!-- Foto de Perfil -->
            <div class="profile-image-container">
                <img :src="profileImage" alt="Foto de Perfil" class="login" />
                <button class="change-photo-button" @click="triggerFileInput">Alterar foto de perfil</button>
                <input type="file" ref="fileInput" accept="image/*" class="file-input" @change="handleFileUpload"
                    hidden />
            </div>
            <form @submit.prevent="saveChanges">
                <!-- Nome -->
                <div class="form-group">
                    <label>Nome</label>
                    <div class="input-container">
                        <input type="text" v-model="formData.name" :readonly="!editableFields.name"
                            placeholder="Nome" />
                        <button type="button" class="edit-button" @click="enableEdit('name')">Editar</button>
                    </div>
                </div>
                <!-- Sobrenome -->
                <div class="form-group">
                    <label>Sobrenome</label>
                    <div class="input-container">
                        <input type="text" v-model="formData.surname" :readonly="!editableFields.surname"
                            placeholder="Sobrenome" />
                        <button type="button" class="edit-button" @click="enableEdit('surname')">Editar</button>
                    </div>
                </div>
                <!-- Email -->
                <div class="form-group">
                    <label for="email">Email</label>
                    <div class="input-container">
                        <input id="email" type="email" v-model="formData.email" :readonly="!editableFields.email"
                            placeholder="Email" />
                        <button type="button" class="edit-button" @click="enableEdit('email')">Editar</button>
                    </div>
                </div>
                <!-- Data de Nascimento -->
                <div class="form-group">
                    <label for="birthdate">Data de Nascimento</label>
                    <div class="input-container">
                        <input id="birthdate" type="date" v-model="formData.birthdate"
                            :readonly="!editableFields.birthdate" placeholder="Data de Nascimento" />
                        <button type="button" class="edit-button" @click="enableEdit('birthdate')">Editar</button>
                    </div>
                </div>
                <!-- Gênero -->
                <div class="form-group">
                    <label for="gender">Gênero</label>
                    <div class="input-container">
                        <select id="gender" v-model="formData.gender" :disabled="!editableFields.gender"
                            class="select-gender">
                            <option value="" disabled>Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                        <button type="button" class="edit-button" @click="enableEdit('gender')">Editar</button>
                    </div>
                </div>
                <!-- CEP -->
                <div class="form-group">
                    <label for="cep">CEP</label>
                    <div class="input-container">
                        <input id="cep" type="text" v-model="formData.cep" :readonly="!editableFields.cep"
                            placeholder="CEP" @blur="fetchAddressFromCep" />
                        <button type="button" class="edit-button" @click="enableEdit('cep')">Editar</button>
                    </div>
                </div>
                <!-- Estado -->
                <div class="form-group">
                    <label>Estado</label>
                    <div class="input-container">
                        <input type="text" v-model="formData.state" readonly placeholder="Estado" />
                    </div>
                </div>
                <!-- Cidade -->
                <div class="form-group">
                    <label>Cidade</label>
                    <div class="input-container">
                        <input type="text" v-model="formData.city" readonly placeholder="Cidade" />
                    </div>
                </div>
                <!-- Endereço -->
                <div class="form-group">
                    <label>Endereço</label>
                    <div class="input-container">
                        <input type="text" v-model="formData.address" readonly placeholder="Endereço" />
                    </div>
                </div>
                <!-- Número e Complemento -->
                <div class="form-group">
                    <label>Número</label>
                    <div class="input-container">
                        <input type="text" v-model="formData.number" :readonly="!editableFields.number"
                            placeholder="Número" />
                        <button type="button" class="edit-button" @click="enableEdit('number')">Editar</button>
                    </div>
                </div>
                <div class="form-group">
                    <label>Complemento</label>
                    <div class="input-container">
                        <input type="text" v-model="formData.complement" :readonly="!editableFields.complement"
                            placeholder="Complemento" />
                        <button type="button" class="edit-button" @click="enableEdit('complement')">Editar</button>
                    </div>
                </div>
                <!-- Botões de Ação -->
                <div class="action-buttons">
                    <button type="submit" class="save-button">Salvar</button>
                    <button type="button" class="cancel-button" @click="cancelChanges">Cancelar</button>
                </div>
            </form>
        </div>
        <!-- Rodapé -->
        <TheFooter />
    </div>
</template>
<script>
import axios from "axios";
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeaderLogo.vue";
export default {
    name: "EditarPerfil",
    components: {
        TheHeader,
        TheFooter,
    },
    data() {
        return {
            profileImage: "@/assets/login.png",
            formData: {
                name: "",
                surname: "",
                email: "",
                gender: "",
                birthdate: "",
                cep: "",
                state: "",
                city: "",
                address: "",
                number: "",
                complement: "",
            },
            editableFields: {
                name: false,
                surname: false,
                email: false,
                gender: false,
                birthdate: false,
                cep: false,
                number: false,
                complement: false,
            },
        };
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.profileImage = URL.createObjectURL(file);
            }
        },
        enableEdit(field) {
            this.editableFields[field] = true;
        },
        async fetchAddressFromCep() {
            if (!this.formData.cep) return;
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${this.formData.cep}/json/`);
                if (response.data.erro) {
                    alert("CEP não encontrado!");
                } else {
                    this.formData.state = response.data.uf;
                    this.formData.city = response.data.localidade;
                    this.formData.address = response.data.logradouro;
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                alert("Erro ao buscar o CEP. Verifique e tente novamente.");
            }
        },
        saveChanges() {
            alert("Alterações salvas com sucesso!");
            for (const key in this.editableFields) {
                this.editableFields[key] = false;
            }
        },
        cancelChanges() {
            alert("Alterações canceladas!");
        },
    },
};
</script>
<style scoped>
/* Estilo para o contêiner da imagem de perfil */
.profile-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 20px 0;
}
.profile-image-container img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ccc;
    padding: 5px;
    background-color: #f9f9f9;
}
.change-photo-button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #89FFDB;
    color: #000;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
}
.change-photo-button:hover {
    background-color: #76e3c3;
}
.file-input {
    display: none;
}
/* Estilo geral do formulário */
.editar-perfil {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
}
.form-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2 {
    text-align: center;
    margin-bottom: 20px;
}
/* Estilo dos grupos de formulário */
.form-group {
    margin-bottom: 15px;
}
/* Estilo do contêiner de entrada */
.input-container {
    display: flex;
    align-items: center;
    position: relative;
}
/* Estilo para os campos de entrada */
.input-container input {
    flex: 1;
    padding: 8px 40px 8px 8px;
    /* Espaço extra para acomodar o botão */
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    background-color: #f9f9f9;
}
/* Estilo para os campos apenas leitura */
.input-container input[readonly] {
    background-color: #eaeaea;
    color: #666;
    /* Contraste para texto */
    cursor: not-allowed;
    /* Indicador de campo não editável */
}
/* Botão "Editar" dentro do campo */
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
.edit-button:disabled {
    background-color: #eaeaea;
    color: #999;
    cursor: not-allowed;
}
/* Select personalizado */
.select-gender {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    background-color: #f9f9f9;
    color: #333;
}
.select-gender:disabled {
    background-color: #eaeaea;
    color: #999;
}
/* Estilo dos botões de ação (Salvar e Cancelar) */
.action-buttons {
    display: flex;
    justify-content: space-between;
}
.save-button {
    background-color: #89FFDB;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}
.save-button:hover {
    background-color: #76e3c3;
}
.cancel-button {
    background-color: #FF6767;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}
.cancel-button:hover {
    background-color: #e65e5e;
}
</style>