<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
                <li class="nav-item">
                    <router-link to="/inserir-habilidade" class= "nav-link">Inserir Habilidade</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/editar-perfil" class= "nav-link">Editar Perfil</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/habilidades-cadastradas" class= "nav-link">Habilidades Cadastradas</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/editar-senha" class= "nav-link">Editar Senha</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/match" class= "nav-link">Match</router-link>
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