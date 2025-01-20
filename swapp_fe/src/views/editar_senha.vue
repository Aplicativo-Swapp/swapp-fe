<template>
    <div>
        <!-- Cabeçalho -->
        <TheHeader />

        <!-- Formulário de edição -->
        <div class="form-container">
            <h2>Editar Senha</h2>

            <form @submit.prevent="saveChanges">
                <!-- Senha Atual -->
                <div class="form-group">
                    <div class="input-container">
                        <input type="password" v-model="formData.currentPassword" placeholder="Senha Atual" required />
                    </div>
                </div>

                <!-- Nova Senha -->
                <div class="form-group">
                    <div class="input-container">
                        <input type="password" v-model="formData.newPassword" placeholder="Nova Senha" required />
                    </div>
                </div>

                <!-- Confirmar Nova Senha -->
                <div class="form-group">
                    <div class="input-container">
                        <input type="password" v-model="formData.confirmNewPassword" placeholder="Confirmar Nova Senha" required />
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
        <TheFooterSimp />
    </div>
</template>

<script>
import axios from "axios";
import TheFooterSimp from "@/components/TheFooterSimp.vue";
import TheHeader from "@/components/TheHeaderLogo.vue";

export default {
    name: "EditarSenha",
    components: {
        TheHeader,
        TheFooterSimp,
    },
    data() {
        return {
            formData: {
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
                first_name: "",
                last_name: "",
                email: "",
            },
            editableFields: {
                first_name: false,
                last_name: false,
                email: false,
            },
        };
    },
    mounted() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            this.$router.push({ name: "login" }); // Redireciona para a página de login
        }
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
        saveChanges() {
            if (this.formData.newPassword !== this.formData.confirmNewPassword) {
                alert("As senhas não coincidem!");
                return;
            }

            const token = localStorage.getItem("authToken"); // Obtém o token do localStorage

            if (!token) {
                alert("Token de autenticação não encontrado. Faça login novamente.");
                this.$router.push({ name: "login" }); // Redireciona para login se o token estiver ausente
                return;
            }
            // Enviando os dados para o backend
            axios.put('http://localhost:8000/api/users/change-password/', this.formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    alert("Senha alterada com sucesso!");
                    this.resetForm(); // Limpando os campos do formulário
                    this.resetEditableFields();
                })
                .catch((error) => {
                    if(error.response && error.response.data) {
                        alert(error.response.data.error || "Erro ao alterar a senha!");                       
                    } else {
                        alert("Erro ao alterar a senha!");
                    }
                });
        },
        cancelChanges() {
            alert("Alterações canceladas!");
            this.resetForm();
        },
        resetEditableFields() {
            for (const key in this.editableFields) {
                this.editableFields[key] = false;
            }
        },
        resetForm() {
            this.formData.confirmNewPassword = "";
            this.formData.newPassword = "";
            this.formData.currentPassword = "";
        },
    }
};
</script>

<style scoped>
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
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    background-color: #f9f9f9;
}

/* Estilo para os campos apenas leitura */
.input-container input[readonly] {
    background-color: #eaeaea;
    color: #666;
    cursor: not-allowed;
}

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
