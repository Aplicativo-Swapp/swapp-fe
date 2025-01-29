<template>
    <div class="popup-overlay" @click.self="closePopup">
        <div class="popup-content">

            <!-- Card para Match -->
            <div v-if="service">
                <div v-if="actionType === 'close'">
                    <img :src="service.image" alt="Imagem do serviço" class="service-image" />
                    <div class="service-info">
                        <h2>{{ service.title }}</h2>
                        <div class="texto">
                            <p>Localização: {{ service.location }}</p>
                            <p>{{ service.description }}</p>
                        </div>
                    </div>
                    <button class="btn-close" @click="closePopup">Fechar</button>
                </div>

                <!-- Card para Minhas curtidas -->
                <div v-if="actionType === 'remove'">
                    <img :src="service.image" alt="Imagem do serviço" class="service-image" />
                    <div class="service-info">
                        <h4>Você curtiu o serviço de {{ service.full_name }}</h4>
                        <h2>{{ service.title }}</h2>
                        <h4>Localização: {{ service.location }}</h4>
                    </div>
                    <button class="btn-remove" @click="removeLike">Remover Curtida</button>
                </div>
            </div>
            <div v-else>
                <p>Serviço não encontrado.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardPage",
    props: {
        service: {
            type: Object,
            required: true,
        },
        actionType: {
            type: String,
            default: "close",
        },
    },
    methods: {
        closePopup() {
            this.$emit("close");
        },
        removeLike() {
            this.$emit("remove", this.service.id);
        },
    },
};
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.service-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
}

.service-info {
    text-align: left;
}

.texto {
    font-family: Arial, Helvetica, sans-serif;
}

.btn-close {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    background: #333;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.btn-close:hover {
    background: #555;
}

.btn-close {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    background: #333;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.btn-close:hover {
    background: #555;
}

.btn-remove {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    background: #e53935;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.btn-remove:hover {
    background: #c62828;
}
</style>
