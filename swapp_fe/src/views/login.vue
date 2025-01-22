<template>
  <div>
    
    <TheHeader />

    <div class="form-container">
      <div class="profile-image-container">
        <img src="@/assets/login.png" alt="Login" class="login" />
      </div>
      <h2>Entre na conta</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input type="email" v-model="formData.email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input type="password" v-model="formData.password" placeholder="Senha" required />
        </div>
        <button type="submit">Entrar</button>
        <p class="signup-link">
           Ainda não tem conta? <a href="\cadastro">Cadastre-se</a>
        </p>
      </form>
    </div>
    <footer class="footer">
      <p>Desenvolvido pelo Grupo Lima&copy;</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import TheHeader from "@/components/TheHeaderLogo.vue";



export default {
    name: "LoginPage",
    components: {
      TheHeader
    },
    data() {
      return {
        formData: {
          email: "",
          password: "",
        },
      };
    },

    methods: {
      async submitForm() {
        if (!this.formData.email || !this.formData.password) {
          alert("Preencha todos os campos!");
          return;
        }

        try {
          const response = await axios.post("http://localhost:8000/api/users/login/", {
              email: this.formData.email,
              password: this.formData.password,
          });

          const { access, refresh, message } = response.data; 
          if (access && refresh) {
                   
            // Armazena o token de acesso e o de atualização no local storage
            localStorage.setItem("authToken", access);
            localStorage.setItem("refreshToken", refresh);
          
            alert(message || "Login realizado com sucesso!");
            this.$router.push({ name: "home" }); // Redireciona para a página principal
          } else {  
            alert("Falha ao obter token de autenticação.");
          }          
        } catch (error) {        
          console.error("Erro ao enviar dados:", error.response?.data || error.message);
          alert("Erro ao realizar login. Verifique os dados e tente novamente.");
        }
      },
    },
  };
</script>

<style scoped>

.login {
  width: 50px;
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

.select-gender {
  width: 316px;
  height: 36px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  background-color: #d9d9d9;
  color: #666;
  font-size: 14px;
  appearance: none;
}

.profile-image-container {
  position: relative;
}

.form-group {
  margin-bottom: 15px;
}

.name-surname-group input[type="text"] {
  width: 137px;
  height: 20px;
  margin-right: 5px;
  margin-left: 5px;
}

.footer {
  background-color: #D9D9D9;
  color: #404040;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: light;
}

input[type="text"],
input[type="password"],
input[type="email"] {
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

.login-link {
  font-size: 14px;
  text-align: center;
  margin-top: 15px; 
}

.login-link a {
  color: #89FFDB;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  color: #6cffb5;
}
</style>

  