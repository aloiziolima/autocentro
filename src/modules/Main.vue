<template>
    <nav class="navbar  navbar-inverse">
        <div class="container">
            <a class="navbar-brand" href="#">Centro Automotivo</a>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li v-show="getLogin.usuario.admin" v-link-active><a v-link="{ path: '/profissionais' }">Profissionais</a></li>                    
                    <li v-show="getLogin.usuario.admin" v-link-active><a v-link="{ path: '/servicos' }">Serviços</a></li>
                    <li v-show="getLogin.usuario.admin" v-link-active><a v-link="{ path: '/usuarios' }">Usuários</a></li>
                    <li v-show="getLogin.usuario.admin != true" v-link-active><a v-link="{ path: '/senha' }">Alteração de Senha</a></li>
                    <li @click="logout" v-link-active><a v-link="{ path: '/' }" class="glyphicon glyphicon-log-out"> {{ getLogin.usuario.usuario }}</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { setLogout } from '../modules/Usuarios/vuex/actions'
    
    export default {
        vuex: {
            actions: {
                setLogout
            },
            getters: {
                getLogin: store => store.Usuarios.login
            }
        },
        ready() {
            Vue.http.headers.common['x-access-token'] = this.getLogin.token;
        },
        methods: {
            logout() {
                this.setLogout(this.user);
                this.$router.go('/');
            }
        },
    }
</script>
