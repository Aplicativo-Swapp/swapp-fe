<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Vue Routing</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/" class= "nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/cadastro" class= "nav-link">Cadastro de Usuário</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login" class= "nav-link">Login</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {};
</script>
<style scoped>
a.active {
    background: #bbb;
}
</style>