import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/home_page.vue';
import LoginPage from '@/views/login.vue';
import CadastroUsuario from '@/views/cadastro_usuario.vue';
import InserirHabilidade from '@/views/inserir_habilidade.vue';

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/login', component: LoginPage, name: 'login' },
  { path: '/cadastro', component: CadastroUsuario, name: 'CadastroUsuario'},
  { path: '/inserir-habilidade', component: InserirHabilidade, name: 'InserirHabilidade'}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
