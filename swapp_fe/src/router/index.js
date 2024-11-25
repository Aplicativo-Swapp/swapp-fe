import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './../components/home_page.vue';
import LoginPage from './../components/login.vue';
import CadastroUsuario from './../components/cadastro_usuario.vue';
import InserirHabilidade from '@/components/inserir_habilidade.vue';

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
