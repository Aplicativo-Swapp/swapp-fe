import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/home_page.vue';
import LoginPage from '@/views/login.vue';
import CadastroUsuario from '@/views/cadastro_usuario.vue';
import InserirHabilidade from '@/views/inserir_habilidade.vue';
import EditarPerfil from '@/views/editar_perfil.vue';
import HabilidadesCadastradas from '@/views/habilidades_cadastradas.vue';
import EditarSenha from '@/views/editar_senha.vue';
import EditarHabilidade from '@/views/editar_habilidades.vue';
import Match from '@/views/match.vue';
import MinhaAtividade from '@/views/minha_atividade.vue';
import home_page_lgd from '@/views/home_page_lgd.vue';
import ChatPage from '@/views/chat.vue';


const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/home', component: home_page_lgd, name: 'HomeLogada' },
  { path: '/login', component: LoginPage, name: 'login' },
  { path: '/cadastro', component: CadastroUsuario, name: 'CadastroUsuario'},
  { path: '/inserir-habilidade', component: InserirHabilidade, name: 'InserirHabilidade'},
  { path: '/editar-perfil', component: EditarPerfil, name: 'EditarPerfil' },
  { path: '/habilidades-cadastradas', component: HabilidadesCadastradas, name: 'HabilidadesCadastradas' },
  { path: '/editar-senha', component: EditarSenha, name: 'EditarSenha' },
  { path: '/editar-habilidade', component: EditarHabilidade, name: 'EditarHabilidade' },
  { path: '/editar-senha', component: EditarSenha, name: 'EditarSenha' },
  { path: '/match', component: Match, name: 'Match' },
  { path: '/minha-atividade', component: MinhaAtividade, name: 'MinhaAtividade' },
  { path: '/chat/:matchId', component: ChatPage, name: 'Chat' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
