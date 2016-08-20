<template>
    <Login v-if="!isLogged"></Login>
    <Main v-else>
    </main>
</template>

<script>
    import store from './store'
    import { setLoginFromLocalStorage } from './modules/Usuarios/vuex/actions'

    import Login from './modules/Usuarios/components/Login.vue'
    import Main from './modules/Main.vue'

    export default {
        components: {
            Login, Main
        },
        vuex: {
            getters: {
                isLogged: store => store.Usuarios.login.token != null              
            },
            actions: {
                setLoginFromLocalStorage
            }
        },
        store,
        created() {
            this.setLoginFromLocalStorage();
            this.showModal = false;
        }
    }
</script>