<template>
    <div>
        <!-- Cabeçalho -->
        <TheHeaderMenu />
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
                        <input type="text" v-model="formData.first_name" :readonly="!editableFields.name"
                            placeholder="Nome" />
                        <button type="button" class="edit-button" @click="enableEdit('name')">Editar</button>
                    </div>
                </div>
                <!-- Sobrenome -->
                <div class="form-group">
                    <label>Sobrenome</label>
                    <div class="input-container">
                        <input type="text" v-model="formData.last_name" :readonly="!editableFields.surname"
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
                        <input id="birthdate" type="date" v-model="formData.birth_date"
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
                        <input id="cep" type="text" v-model="formData.zip_code" :readonly="!editableFields.cep"
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
                <div class="delete-account-container">
                    <span type="button" class="delete-account-link" @click="openDeleteModal">Excluir Conta</span>
                </div>
            </form>
        </div>

        <!-- Modal de Confirmação -->
        <div v-if="showDeleteModal" class="modal-overlay">
            <div class="modal">
                <h3>Você tem certeza de que deseja deletar sua conta?</h3>
                <p>Confirme seu e-mail e senha para continuar:</p>
                <div class="modal-inputs">
                    <input type="email" v-model="confirmEmail" placeholder="E-mail cadastrado" />
                    <input type="password" v-model="confirmPassword" placeholder="Senha" />
                </div>
                <div class="modal-buttons">
                    <button class="modal-confirm-button" @click="confirmDeleteAccount">Sim</button>
                    <button class="modal-cancel-button" @click="closeDeleteModal">Cancelar</button>
                </div>
            </div>
        </div>

        <!-- Rodapé -->
        <TheFooter />

    </div>
</template>

<script>
import axios from "axios";
import TheFooter from "@/components/TheFooter.vue";
import TheHeaderMenu from "@/components/TheHeaderMenu.vue";

export default {
    name: "EditarPerfil",
    components: {
        TheHeaderMenu,
        TheFooter,
    },
    data() {
        return {
            profileImage: require('@/assets/login.png'),
            formData: {
                profile_image: null,
                first_name: "",
                last_name: "",
                email: "",
                gender: "",
                birth_date: "",
                zip_code: "",
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
            showDeleteModal: false, // Controle do modal de deletar conta
            confirmEmail: "", // E-mail inserido no modal
            confirmPassword: "", // Senha inserida no modal
        };
    },
    mounted() {
        this.getUserData(); // Carrega os dados do perfil quando a página é montada
    },
    methods: {
        // GET: Busca dados do usuário autenticado no backend
        async getUserData() {
            try {
                const token = localStorage.getItem("authToken"); // Obtém o token do localStorage

                if (!token) {
                    alert("Token de autenticação não encontrado. Faça login novamente.");
                    this.$router.push({ name: "login" }); // Redireciona para login se o token estiver ausente
                    return;
                }

                const response = await axios.get(
                    "http://34.56.213.96:8000/api/users/detail/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Passa o token no cabeçalho Authorization
                        },
                    }
                );

                // Mapeamento de gênero recebido do backend
                const genderMap = {
                    male: "Masculino",
                    female: "Feminino",
                    other: "Outro",
                };

                if (response.data.profile_picture_url) {
                    this.profileImage = response.data.profile_picture_url; // Atualiza apenas se uma nova imagem for retornada
                }
 

                this.formData = {
                    ...this.formData,
                    ...response.data, // Atualiza o formData com os dados recebidos
                    gender: genderMap[response.data.gender] || "", // Converte para o formato esperado na interface
                };
            } catch (error) {
                console.error("Erro ao buscar os dados do usuário:", error);
                alert("Erro ao carregar os dados do perfil. Tente novamente.");
            }
        },

        // PUT: Atualiza os dados no backend para o usuário autenticado
        async saveChanges() {
            try {

                const token = localStorage.getItem("authToken"); // Obtém o token do localStorage

                if (!token) {
                    alert("Token de autenticação não encontrado. Faça login novamente.");
                    this.$router.push({ name: "login" }); // Redireciona para login se o token estiver ausente
                    return;
                }

                // Mapeamento inverso de gênero para envio ao backend
                const genderMapInverse = {
                    Masculino: "male",
                    Feminino: "female",
                    Outro: "other",
                };

                const formDataToSend = new FormData();
                formDataToSend.append("first_name", this.formData.first_name);
                formDataToSend.append("last_name", this.formData.last_name);
                formDataToSend.append("email", this.formData.email);
                formDataToSend.append("gender", genderMapInverse[this.formData.gender] || "");
                console.log(genderMapInverse[this.formData.gender] || "");
                formDataToSend.append("birth_date", this.formData.birth_date);
                formDataToSend.append("zip_code", this.formData.zip_code);
                formDataToSend.append("state", this.formData.state);
                formDataToSend.append("city", this.formData.city);
                formDataToSend.append("address", this.formData.address);
                formDataToSend.append("number", this.formData.number);
                formDataToSend.append("complement", this.formData.complement);

                if (this.formData.profile_image) {
                    formDataToSend.append("profile_image", this.formData.profile_image);
                }

                await axios.put(
                    "http://34.56.213.96:8000/api/users/update/",
                    formDataToSend,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data", // Passa o token no cabeçalho Authorization
                        },
                    }
                );

                alert("Alterações salvas com sucesso!");
                this.getUserData(); // Atualiza os dados na tela
                for (const key in this.editableFields) {
                    this.editableFields[key] = false; // Torna todos os campos não editáveis novamente
                }
            } catch (error) {
                console.error("Erro ao salvar alterações:", error);
                alert("Erro ao salvar as alterações. Tente novamente.");
            }
        },

        // Exibe input de arquivo
        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        // Processa upload de imagem
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.formData.profile_image = file;
                this.profileImage = URL.createObjectURL(file);
            }
        },

        // Permite editar um campo específico
        enableEdit(field) {
            this.editableFields[field] = true;
        },

        // Busca endereço pelo CEP
        async fetchAddressFromCep() {
            if (!this.formData.zip_code) return;
            try {
                const response = await axios.get(
                    `https://viacep.com.br/ws/${this.formData.zip_code}/json/`
                );
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

        cancelChanges() {
            alert("Alterações canceladas!");
        },

        openDeleteModal() {
            this.showDeleteModal = true; // Exibe o modal
        },

        closeDeleteModal() {
            this.showDeleteModal = false; // Fecha o modal
            this.confirmEmail = ""; // Limpa o campo de e-mail
            this.confirmPassword = ""; // Limpa o campo de senha
        },

         // DELETE: Exclui a conta do usuário autenticado
         async confirmDeleteAccount() {
            if (
                this.confirmEmail === this.formData.email &&
                this.confirmPassword.trim() !== ""
            ) {
                try {
                    const token = localStorage.getItem("authToken"); // Obtém o token do localStorage

                    if (!token) {
                        alert("Token de autenticação não encontrado. Faça login novamente.");
                        this.$router.push({ name: "login" }); // Redireciona para login se o token estiver ausente
                        return;
                    }

                    await axios.delete(
                        "http://34.56.213.96:8000/api/users/delete/",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`, // Passa o token no cabeçalho Authorization
                            },
                            data: {
                                password: this.confirmPassword, // Envia a senha para confirmação
                            },
                        }
                    );
                    alert("Conta deletada com sucesso!");
                    this.closeDeleteModal();
                    this.$router.push({ name: "login" }); // Redireciona para a página de login
                } catch (error) {
                    console.error("Erro ao deletar a conta:", error);
                    alert("Erro ao deletar a conta. Tente novamente.");
                }
            } else {
                alert("O e-mail ou senha está incorreto.");
            }
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
    background-color: #00b089;
    transform: scale(1.05);
}

.change-photo-button:active {
    transform: scale(0.95);
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
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
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
    background-color: #00b089;
    transform: scale(1.05);
}

.save-button:active {
    transform: scale(0.95);
}

.cancel-button {
    background-color: #FF6767;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cancel-button:hover {
    background-color: #e65e5e;
    transform: scale(1.05);
}

.cancel-button:active {
    transform: scale(0.95);
}

/* Botão "Deletar Conta" */
.delete-account-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    width: 100%;
}

.delete-account-link {
  color: #ff0000; 
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none; 
  transition: color 0.3s ease;
}

.delete-account-link:hover {
  color: #d90000; 
}

.delete-account-link:active {
  color: #b00000; 
}

/* Modal Overlay */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Modal Container */
.modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    text-align: center;
}

/* Modal Inputs */
.modal-inputs {
    margin-top: 20px;
}

.modal-inputs input {
    width: 80%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
}

/* Modal Buttons */
.modal-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.modal-confirm-button {
    background-color: #ff0000;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

.modal-confirm-button:hover {
    background-color: #d90000;
}

.modal-cancel-button {
    background-color: #ccc;
    color: #000;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

.modal-cancel-button:hover {
    background-color: #aaa;
}
</style>