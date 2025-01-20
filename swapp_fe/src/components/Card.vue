<template>
    <div class="popup-overlay" @click.self="closePopup">
        <div class="popup-content">
            <div v-if="service">
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
            <div v-else>
                <p>Serviço não encontrado.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardPage",
    props: ["service"],
    methods: {
        closePopup() {
            this.$emit("close");
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

.service-info{
    text-align: left;
}
.texto{
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
</style>
