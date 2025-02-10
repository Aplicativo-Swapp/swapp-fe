<template>
    <div class="minhas-curtidas">
        <h2>Minhas Curtidas</h2>
        <div v-if="likedServices.length === 0">
            <p>Você ainda não curtiu nenhum serviço.</p>
        </div>
        <div class="services-list" v-else>
            <div class="service-card" v-for="likedService in likedServices" :key="likedService.id_liked"
                @click="openPopup(likedService)">
                <div class="service-info">
                    <h4>Você curtiu o serviço de {{ likedService.full_name }}</h4>
                    <h2>{{ likedService.title }}</h2>
                    <h4>Localização: {{ likedService.location }}</h4>
                </div>
            </div>
        </div>

        <!-- Popup do Card -->
        <CardPage v-if="selectedService" :service="selectedService" actionType="remove" @close="closePopup"
            @remove="removeLike" />
    </div>
</template>

<script>
import axios from "axios";
import CardPage from "@/components/Card.vue";
import { getLoggedUserId } from "@/utils/auth.js";


export default {
    name: "MinhasCurtidasComponent",
    components: {
        CardPage,
    },
    data() {
        return {
            likedServices: [], // Lista de serviços será preenchida pela API
            selectedService: null, // Serviço selecionado para exibir no popup
        };
    },
    methods: {
        openPopup(likedService) {
            this.selectedService = likedService;
        },
        closePopup() {
            this.selectedService = null;
        },
        async removeLike(serviceId) {
            try {
                const userId = getLoggedUserId(); // Substitua pelo ID real do usuário logado

                await axios.delete("https://rust-swapp-be-407691885788.us-central1.run.app/match/delete", {
                    data: {
                        id_deu_like: userId,
                        id_liked: serviceId
                    }
                });

                this.likedServices = this.likedServices.filter(service => service.id_liked !== serviceId);
            } catch (error) {
                console.error("Erro ao remover curtida:", error);
            } finally {
                this.closePopup(); // Fecha o popup mesmo se der erro
            }
        },

        async fetchLikedServices() {
            try {
                const userId = getLoggedUserId(); // Substitua pelo ID real do usuário logado
                const response = await axios.get(
                    `https://rust-swapp-be-407691885788.us-central1.run.app/match/buscar_meus_likes/${userId}`
                );

                this.likedServices = response.data.map(like => ({
                    id_liked: like[0],
                    full_name: like[1],
                    title: like[2],
                    location: like[3]
                }));
            } catch (error) {
                console.error("Erro ao buscar serviços curtidos:", error);
            }
        }
    },

    mounted() {
        this.fetchLikedServices(); // Chama a API ao montar o componente
    },
};
</script>


<style scoped>
.minhas-curtidas {
    text-align: center;
    padding: 20px;
}

.services-list {
    display: flex;
    justify-content: center;
    /* Centraliza horizontalmente */
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    /* Dá um espaço no topo */
}

.service-card {
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    text-align: left;
    background-color: white;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.service-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
}

.service-info h3 {
    margin: 10px 0 5px;
}

.service-info p {
    color: #666;
    font-size: 14px;
}
</style>
