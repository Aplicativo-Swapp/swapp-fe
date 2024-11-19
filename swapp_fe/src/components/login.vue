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
  /* Estilo do Header */
  .header {
    background-color: #14241f;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .logo {
    width: 200px;
    height: auto;
  }
  
  body {
    background-color: #ececec;
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  /* Estilo do Formulário */
  .form-container {
    max-width: 500px; /* Aumenta a largura do formulário */
    margin: 0 auto; /* Centraliza horizontalmente */
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center; /* Centraliza horizontalmente */
    justify-content: center; /* Centraliza verticalmente */
  }
  
  .profile-image-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .login {
    width: 50px;
    height: auto;
  }
  
  h2 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input[type="email"],
  input[type="password"] {
    background-color: #d9d9d9;
    width: 100%; /* Ocupará toda a largura do contêiner */
    max-width: 400px; /* Aumenta a largura máxima */
    padding: 12px; /* Aumenta o espaçamento interno */
    font-size: 16px; /* Aumenta o tamanho do texto */
    border: none; /* Remove a borda */
    border-radius: 8px; /* Bordas arredondadas */
    box-sizing: border-box; /* Inclui bordas no cálculo de largura */
  }
  
  button {
    width: 100%; /* Ocupará toda a largura do contêiner */
    max-width: 400px; /* Aumenta a largura máxima */
    padding: 15px; /* Aumenta a altura do botão */
    font-size: 16px; /* Aumenta o tamanho do texto */
    background-color: #89ffdb;
    color: black;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-bottom: 15px; /* Espaço abaixo do botão */
  }
  
  button:hover {
    background-color: #6cffb5;
  }
  
  /* Estilo do link "Cadastre-se" */
  .signup-link {
    font-size: 14px;
    text-align: center;
  }
  
  .signup-link a {
    color: #89ffdb;
    text-decoration: none;
    font-weight: bold;
  }
  
  .signup-link a:hover {
    color: #6cffb5;
  }
  
  /* Estilo do Footer */
  .footer {
    background-color: #d9d9d9;
    color: #404040;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
  }
  </style>
  