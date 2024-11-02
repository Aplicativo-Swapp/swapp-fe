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
      <h2>Crie sua conta</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group name-surname-group">
          <input type="text" v-model="formData.name" placeholder="Nome" required />
          <input type="text" v-model="formData.surname" placeholder="Sobrenome" required />
        </div>
        <div class="form-group">
          <input type="password" v-model="formData.password" placeholder="Senha" required />
        </div>
        <div class="form-group">
          <input type="password" v-model="formData.confirmPassword" placeholder="Confirmar Senha" required />
        </div>
        <div class="form-group">
          <input type="text" v-model="formData.cpf" placeholder="CPF" required />
        </div>
        <div class="form-group">
          <select v-model="formData.gender" required class="select-gender">
            <option value="" disabled selected hidden>Gênero</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>
        </div>
        <div class="form-group">
          <input type="text" v-model="formData.contact" placeholder="Contato" required />
        </div>
        <div class="form-group">
          <input type="text" v-model="formData.state" placeholder="Estado" required />
        </div>
        <div class="form-group">
          <input type="text" v-model="formData.city" placeholder="Cidade" required />
        </div>
        <div class="form-group">
          <input type="text" v-model="formData.address" placeholder="Endereço" required />
        </div>
        <button type="submit">Criar conta</button>
      </form>
    </div>
     <footer class="footer">
      <p>Desenvolvido pelo Grupo Lima&copy; </p>
  </footer>
</div>

</template>


<script>
export default {
  name: "CadastroUsuario",
  data() {
    return {
      formData: {
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        cpf: "",
        gender: "",
        contact: "",
        state: "",
        city: "",
        address: ""
      }
    };
  },
  methods: {
    submitForm() {
      console.log("Dados do formulário:", this.formData);
      alert(`Cadastro realizado com sucesso!`);
    }
  }
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
}

.logo {
  width: 200px;
  height: auto;
}

.login{
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
  top: 145px;
  left: 50%;
  transform: translateX(-50%);
}

.form-group {
  margin-bottom: 15px;
}

.name-surname-group input[type="text"] {
  width:137px; 
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
  position: relative;
  width: 100%;
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
  padding:10px;
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
