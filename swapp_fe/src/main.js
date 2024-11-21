import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // Importa o roteador configurado

const app = createApp(App);

app.use(router); // Integra o roteador ao app Vue
app.mount('#app'); // Monta o app no elemento HTML