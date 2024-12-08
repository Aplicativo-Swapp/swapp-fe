<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="@/assets/logo2.png" alt="Logo Swapp" class="logo-image" />
        </div>
        <div class="footer-links">
          <div class="footer-section">
            <h3>Início</h3>
            <ul>
              <li><a href="#">Categorias</a></li>
              <li><a href="#">Serviços</a></li>
              <li><a href="#">Entrar</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Sobre nós</h3>
            <ul>
              <li><a href="#">Informações da empresa</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Suporte</h3>
            <ul>
              <li><a href="#">Entre em contato</a></li>
              <li><a href="#">Perguntas frequentes</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-contact">
          <a href="/contato">
            <div class="footer-social">
              <img src="@/assets/midias_sociais_logo.png" alt="Midias Sociais" class="footer-social-logo" />
            </div>
          </a>
          <a href="/contato">
            <button class="contact-button">Contato</button>
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Desenvolvido pelo Grupo Lima</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "TheFooter",
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #14241f;
    color: #fff;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer {
  background-color: #14241f; 
  color: #fff; 
  padding: 20px 0; 
  display: flex;
  flex-direction: column; 
  align-items: center; 
}

.logo-image {
  width: 300px; /* Ajuste o tamanho conforme necessário */
  height: auto; /* Mantém as proporções da logo */
  margin-right: 20px; /* Adiciona um deslocamento à direita */
  margin-top: 30px;
}

.footer-content {
  display: flex; 
  justify-content: space-between; 
  width: 100%;
  max-width: 1200px; 
  padding: 0 50px; 
}

.footer-links {
  display: flex; 
  justify-content: space-between;
  gap: 100px; /* Espaçamento horizontal entre as colunas */
  flex-wrap: wrap;
}

.footer-section {
  flex: 1; 
  text-align: center; 
}

.footer-section h3 {
  font-size: 18px; 
  margin-bottom: 10px; 
  font-weight: bold; 
}

.footer-section ul {
  list-style: none; 
  padding: 0; 
}

.footer-section ul li {
  margin: 8px 0; 
}

.footer-section ul li a {
  color: #ccc; 
  text-decoration: none; 
  transition: color 0.3s; 
}

.footer-section ul li a:hover {
  color: #00d1a0; 
}

.footer-contact {
  display: flex;
  flex-direction: column;  
  align-items: center;
  justify-content: center;
  margin: 0 auto;

}

.footer-social {
  margin-bottom: 10px; /* Espaçamento entre os ícones e o botão */
}

.footer-social-logo {
  width: 100px;
  height: auto;
}

.contact-button {
  background-color: #00d1a0; 
  color: #fff; 
  border: none; 
  border-radius: 20px; 
  padding: 10px 20px; 
  font-size: 16px; 
  font-weight: bold; 
  cursor: pointer; 
  transition: background-color 0.3s, transform 0.3s; 
  margin-left: 0; /* Adiciona um deslocamento à direita */
}

.contact-button:hover {
  background-color: #00b089; 
  transform: scale(1.05); 
}

.contact-button:active {
  transform: scale(0.95); 
}


.footer-bottom {
  text-align: center; /* Centraliza o texto */
  margin-top: 20px; /* Espaçamento entre o conteúdo e o rodapé inferior */
  font-size: 14px; /* Tamanho do texto */
  padding-top: 10px; /* Espaço acima da linha */
}
  /* Inclua aqui outros estilos relacionados ao footer */
  </style>
  