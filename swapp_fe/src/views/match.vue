<template>
    <div class="match-page">
        <!-- Header -->
        <TheHeaderMenu />

        <!-- Title -->
        <h1 class="page-title">DÊ MATCH DE SERVIÇOS</h1>

        <div class="content">
            <!-- Filters Section -->
            <aside class="filters">
                <h3>Filtros</h3>
                <select v-model="selectedCategory">
                    <option value="">Todas as categorias</option>
                    <template v-if="!isLoadingCategories">
                        <option v-for="category in categories" :key="category.id" :value="category.name">
                            {{ category.name }}
                        </option>
                    </template>
                    <option v-else disabled>Carregando categorias...</option>
                </select>
                <select>
                    <option>Subcategoria</option>
                </select>
                <select>
                    <option>Localização</option>
                </select>
            </aside>

            <!-- Services Grid -->
            <main class="services-grid">
                <div class="service-card" v-for="service in filteredServices" :key="service.id">
                    <img :src="service.image" alt="Imagem do serviço" class="service-image" />
                    <div class="service-info">
                        <h2>{{ service.title }}</h2>
                        <p>Localização: {{ service.location }}</p>
                        <div class="rating">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
                    </div>
                    <div class="actions">
                        <!-- Botão de Like com imagem match.png -->
                        <button @click.stop="likeService(service.id)" class="btn-like">
                            <img src="@/assets/match.png" alt="Curtir" class="action-icon" />
                        </button>
                        <!-- Botão de Dislike com imagem nao.png -->
                        <button @click.stop="dislikeService(service.id)" class="btn-dislike">
                            <img src="@/assets/nao.png" alt="Não Curtir" class="action-icon" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
        <!-- Popup -->
        <CardPage v-if="isPopupOpen" :service="selectedService" actionType="close" @close="closePopup" />

        <!-- Footer -->
        <TheFooter />

    </div>
</template>

<script>
import axios from "axios";
import TheFooter from "@/components/TheFooter.vue";
import TheHeaderMenu from "@/components/TheHeaderMenu.vue";
import CardPage from "@/components/Card.vue";

export default {
    name: "MatchPage",
    components: {
        TheHeaderMenu,
        TheFooter,
        CardPage,
    },
    data() {
        return {
            services: [], // Inicia vazio e será preenchido pela API
            categories: [], // Array para armazenar as categorias da API
            isLoadingCategories: true,
            selectedCategory: "",
            isPopupOpen: false,
            selectedService: null,
        };
    },
    computed: {
        filteredServices() {
            if (!this.selectedCategory) {
                return this.services;
            }

            return this.services.filter((service) => service.category === this.selectedCategory);
        }
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await axios.get("http://localhost:3000/services"); // Substituir pela URL correta da API
                this.categories = response.data;
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            } finally {
                this.isLoadingCategories = false;
            }
        },
        async fetchServices() {
            try {
                const response = await axios.get("http://localhost:3000/services"); // Substituir pela URL correta da API
                this.services = response.data;
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        },
        likeService(id) {
            console.log(`Serviço ${id} curtido!`);
        },
        dislikeService(id) {
            console.log(`Serviço ${id} descartado!`);
        },
        openPopup(service) {
            this.selectedService = service;
            this.isPopupOpen = true;
        },
        closePopup() {
            this.isPopupOpen = false;
            this.selectedService = null;
        },
    },
    mounted() {
        this.fetchCategories();
        this.fetchServices(); // Busca os serviços ao carregar a página
    },
};
</script>

<style scoped>
.action-icon {
    width: 50px;   /* Largura da imagem */
    height: 50px;  /* Altura da imagem */
    object-fit: contain; /* Garante que a imagem não distorça */
    pointer-events: none; /* Evita que o clique passe para a imagem */
}

.btn-like, .btn-dislike {
    background-color: transparent; /* Remove fundo padrão do botão */
    border: none; /* Remove a borda padrão */
    cursor: pointer; /* Adiciona um cursor de clique */
    padding: 0; /* Remove o espaçamento interno */
}


.match-page {
    color: #333;
    background-color: #ececec;
}

.search-bar {
    flex: 1;
    margin: 0 15px;
    padding: 5px;
}

.page-title {
    text-align: center;
    margin: 20px 0;
}

.content {
    display: flex;
    gap: 20px;
    padding: 20px;
}

.filters {
    flex: 1;
    max-width: 200px;
}

.filters select {
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
}

.services-grid {
    flex: 3;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.service-card {
    border: 0.5px solid #ccc;
    border-radius: 15px;
    padding: 10px;
    text-align: center;
    background-color: white;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Suaviza o efeito */
}

.service-card:hover {
    transform: scale(1.05); /* Aplica o zoom */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adiciona uma sombra para destaque */
}

.service-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
}

.actions {
    display: flex;
    justify-content: center; /* Centraliza os botões */
    gap: 25px; /* Adiciona um espaçamento uniforme entre os botões */
    margin-top: 10px;
}

.btn-like,
.btn-dislike {
    font-size: 18px;
    border: none;
    background: none;
    cursor: pointer;
}

.btn-like {
    color: green;
}

.btn-dislike {
    color: red;
}
</style>

