<template>
  <div>
    <header class="header">
      <nav>
        <img src="@/assets/logo2.png" alt="Logo" class="logo" />
      </nav>
    </header>

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

export default {
    name: "LoginPage",
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
        try {
          const response = await axios.post("http://localhost:8000/api/login/", this.formData);
          console.log("Resposta da API:", response.data);
          alert("Login realizado com sucesso!");
        } catch (error) {
          console.error("Erro ao enviar dados:", error);
          alert("Erro ao realizar login. Tente novamente.");
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

#app {
  flex: 1; 
}
body {
  background-color: #ececec;
  margin: 0;
  font-family: Arial, sans-serif;
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
}

.logo {
  width: 200px;
  height: auto;
}

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
  position: absolute;
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
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

  