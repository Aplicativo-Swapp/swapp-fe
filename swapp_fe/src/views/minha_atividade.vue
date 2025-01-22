<template>
  <div class="main-container">
    <TheHeaderMenu />

    <div class="content">
      <!-- Coluna lateral -->
      <aside class="sidebar">
        <button 
          class="sidebar-button" 
          :class="{ active: activeTab === 'matchs' }" 
          @click="activeTab = 'matchs'"
        >
          Matchs
        </button>
        <button 
          class="sidebar-button" 
          :class="{ active: activeTab === 'curtidasRecebidas' }" 
          @click="activeTab = 'curtidasRecebidas'"
        >
          Curtidas Recebidas
        </button>
        <button 
          class="sidebar-button" 
          :class="{ active: activeTab === 'minhasCurtidas' }" 
          @click="activeTab = 'minhasCurtidas'"
        >
          Minhas Curtidas
        </button>
      </aside>

      <!-- Conteúdo principal -->
      <div class="tab-content">
        <!-- Renderiza o componente correspondente à aba ativa -->
        <component :is="currentTabComponent" />
      </div>
    </div>

    <TheFooterSimp />
  </div>
</template>

<script>
import TheFooterSimp from "@/components/TheFooterSimp.vue";
import TheHeaderMenu from "@/components/TheHeaderMenu.vue";
import MatchsComponent from "@/components/MatchsComponent.vue";
import CurtidasRecebidasComponent from "@/components/CurtidasRecebidasComponent.vue";
import MinhasCurtidasComponent from "@/components/MinhasCurtidasComponent.vue";

export default {
  name: "MinhaAtividade",
  components: {
    TheFooterSimp,
    TheHeaderMenu,
    MatchsComponent,
    CurtidasRecebidasComponent,
    MinhasCurtidasComponent,
  },
  data() {
    return {
      activeTab: "matchs", // Aba ativa inicial
    };
  },
  created() {
    // Obtém a aba da query string, se existir
    const tabFromQuery = this.$route.query.tab;
    if (tabFromQuery) {
      this.activeTab = tabFromQuery;
    }
  },
  computed: {
    currentTabComponent() {
      // Mapeia as abas para os componentes correspondentes
      const tabComponents = {
        matchs: "MatchsComponent",
        curtidasRecebidas: "CurtidasRecebidasComponent",
        minhasCurtidas: "MinhasCurtidasComponent",
      };
      return tabComponents[this.activeTab];
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex: 1;
}

/* Estilo da coluna lateral */
.sidebar {
  width: 200px;
  height: min-content;
  background-color: #e0e0e0; /* Cinza claro */
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-button {
  width: 90%;
  padding: 10px 5px;
  background: transparent;
  border: none;
  text-align: left;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sidebar-button:hover {
  background-color: #d6d6d6;
}

.sidebar-button.active {
  width: 100%;
  background-color: #ffffff;
  font-weight: bold;
}

/* Estilo do conteúdo principal */
.tab-content {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
}
</style>
