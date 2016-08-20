<template>
    <h4>Alteração de Senha</h4>
    <label for="inputPassword" class="sr-only">Password</label>
    <validator name="validation">
        <form class="form-signin" novalidate >
            <label for="inputPassword" class="sr-only">Nova Senha</label>
            <input type="password" id="inputPassword"
            class="form-control"
            placeholder="Digite a nova senha"
            required v-model="usuario.senha"
            v-validate:password="{ minlength: 6 }"
            >
            <input type="password" id="inputPassword"
            class="form-control"
            placeholder="Confirme a nova senha"
            required v-model="confirmaSenha"
            v-validate:password="{ minlength: 6 }"
            v-show="usuario.senha != ''">
            <div class="alert alert-danger" v-show="confirmaSenha != null && usuario.senha != confirmaSenha">
            As senhas devem ser iguais</div>
            <button v-show="usuario.senha === confirmaSenha" @click.prevent="alteraSenha" class="btn btn-primary" :disabled="!$validation.valid||isLoading">Confirmar alteração</button>
            <loading></loading>
        </form>
    </validator>
</template>

<script>
    import { showLoading, hideLoading } from '../../../controls/vuex/actions.js'
    import Loading from '../../../controls/components/Loading.vue'
    import { URL } from '../../../config.js'
    export default {
        components: {
            Loading
        },
        vuex: {
            getters: {
                isLoading: store => store.Controls.loading,
                getLogin: store => store.Usuarios.login
            },
            actions: {
                showLoading, hideLoading
            },
        },
        data() {
            return {
                usuario: {
                    senha: ""
                },
                confirmaSenha: null
            }
        },
        methods: {
            alteraSenha() {
                this.showLoading();
                this.$http.put(`${URL}/usuarios/alteraSenha/${this.getLogin.usuario.id}`, this.usuario).then(response => {
                    this.usuario = response.json()
                }).catch((erro) => {
                    toastr.error(erro.body)
                }).finally(() => {
                    this.hideLoading();
                    this.$router.go('/');                         
                })  
            },
        }
    }
</script>