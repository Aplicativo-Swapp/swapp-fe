<template>
    <div>
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
                        <button @click="likeService(service.id)" class="btn-like">&#10084;</button>
                        <button @click="dislikeService(service.id)" class="btn-dislike">&#10060;</button>
                    </div>
                </div>
            </main>
        </div>

        <!-- Footer -->
        <TheFooter />

    </div>
</template>

<script>
import axios from "axios";
import TheFooter from "@/components/TheFooter.vue";
import TheHeaderMenu from "@/components/TheHeaderMenu.vue";

export default {
    name: "MatchPage",
    components: {
        TheHeaderMenu,
        TheFooter,
    },
    data() {
        return {
            services: [], // Inicia vazio e será preenchido pela API
            categories: [], // Array para armazenar as categorias da API
            isLoadingCategories: true,
            selectedCategory: "",
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
    },
    mounted() {
        this.fetchCategories();
        this.fetchServices(); // Busca os serviços ao carregar a página
    },
};
</script>

<style scoped>
.match-page {
    font-family: Arial, sans-serif;
    color: #333;
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
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    background-color: #f9f9f9;
}

.service-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
}

.actions {
    display: flex;
    justify-content: space-around;
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
