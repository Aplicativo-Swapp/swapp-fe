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
                </select>
            </aside>

            <!-- Services Grid -->
            <main class="services-grid">
                <div class="service-card" v-for="service in services" :key="service.id_users">
                    <div class="service-info">
                        <h2>{{ service.fullName }}</h2>
                        <p>Habilidade: {{ service.habilidade }}</p>
                        <p>Descrição: {{ service.descricao }}</p>
                        <p>Valor: R$ {{ service.valor.toFixed(2) }}</p>
                    </div>
                    <div class="actions">
                        <button @click="likeService(service.id_users)" class="btn-like">&#10084;</button>
                        <button @click="dislikeService(service.id_users)" class="btn-dislike">&#10060;</button>
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
            services: [], // Dados processados da API
        };
    },
    methods: {
        async fetchServices() {
            try {
                // Substitua pela URL correta da sua API
                const response = await axios.get("http://localhost:8081/obter_tudo");
                this.services = response.data.map((item) => ({
                    id_users: item.id_users,
                    fullName: `${item.first_name} ${item.last_name}`,
                    habilidade: item.nome_sub_habilidade || "Habilidade não especificada",
                    descricao: item.descricao || "Sem descrição",
                    valor: item.valor || 0,
                }));
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        },
        likeService(id) {
            alert(`Serviço do usuário ${id} curtido!`);
        },
        dislikeService(id) {
            alert(`Serviço do usuário ${id} descartado!`);
        },
    },
    mounted() {
        this.fetchServices(); // Busca os serviços ao carregar a página
    },
};
</script>

<style scoped>
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
    box-shadow: 2px 2px 8px #ddd;
}

.service-info h2 {
    margin-bottom: 5px;
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
