import { createApp } from 'vue';
import App from './App.vue';
import HomePage from './components/home_page.vue'
import CadastroUsuario from './components/cadastro_usuario.vue'
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path: '/cadastro',
        name: 'CadastroUsuario',
        component: CadastroUsuario,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Cria a aplicação e usa o roteador
const app = createApp(App);
app.use(router); // Integra o roteador ao app Vue
app.mount('#app'); // Monta o app no elemento HTML
