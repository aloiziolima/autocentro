<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-6">
                            <h4>Usuários</h4>
                        </div>
                        <div class="col-xs-6">
                            <button @click.prevent="novoUsuario" class="btn btn-default pull-right">Novo</button>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th width="45%">Nome</th>
                                        <th width="40%">Usuário</th>
                                        <th width="5%">Admin</th>
                                        <th width="5%"></th>
                                        <th width="5%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="usuario in usuarios">
                                        <td><a>{{usuario.nome}}</a></td>
                                        <td><a>{{usuario.usuario}}</a></td>
                                        <td><a>{{usuario.admin}}</a></td>
                                        <td role="button" @click.prevent="altera(usuario)"><button type="button" class="btn btn-xs btn-primary glyphicon glyphicon-edit"></button></td>
                                        <td role="button" @click.prevent="exclui(usuario)"><button type="button" class="btn btn-xs btn-danger glyphicon glyphicon-remove"></button></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="col-md-6">
                                <validator name="validateForm">
                                    <form>
                                        <div class="form-group">
                                            <label for="name">Nome</label>
                                            <input type="input" class="form-control" id="nome" placeholder="Nome" v-model="usuario.nome" v-validate:nome="{ required: true, minlength: 5 }">
                                            <div v-show="$validateForm.invalid">
                                                <span class="label label-info" v-if="$validateForm.nome.required">Campo requerido</span>
                                                &nbsp;
                                                <span class="label label-info" v-if="$validateForm.nome.minlength">Mínimo 5 caracteres</span>
                                            </div>
                                            <div class="form-group">
                                                <label for="name">Usuário</label>
                                                <input type="input" class="form-control" id="usuario" placeholder="Usuário'" v-model="usuario.usuario" v-validate:usuario="{ required: true, minlength: 5 }">
                                                <div v-show="$validateForm.invalid">
                                                    <span class="label label-info" v-if="$validateForm.usuario.required">Campo requerido</span>
                                                    &nbsp;
                                                    <span class="label label-info" v-if="$validateForm.usuario.minlength">Mínimo 5 caracteres</span>
                                                </div>
                                                <div class="form-group">
                                                    <label for="name">Nova Senha</label>
                                                    <input type="password" class="form-control" id="senha" placeholder="Senha" v-model="usuario.senha" v-validate:senha="{ required: true, minlength: 5 }">
                                                    <div v-show="$validateForm.invalid">
                                                        <span class="label label-info" v-if="$validateForm.senha.required">Campo requerido</span>
                                                        &nbsp;
                                                        <span class="label label-info" v-if="$validateForm.senha.minlength">Mínimo 5 caracteres</span>
                                                    </div>                                                   
                                                    <div class="form-group">
                                                        <label for="name">Administrador</label>
                                                        <input type="checkbox" id="admin" placeholder="Administrador'" v-model="usuario.admin">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button v-show="!usuario._id && usuario.nome && usuario.usuario" @click.prevent="salvaUsuario" class="btn btn-xs btn-default" :disabled="isLoading||$validateForm.invalid" >Salvar</button>
                                        <button v-show="usuario._id" @click.prevent="alteraUsuario" class="btn btn-xs btn-default" :disabled="isLoading||$validateForm.invalid" >Alterar</button>
                                    </form>
                                </validator>
                                <Loading></Loading>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>                               
    </div>    
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
                isLoading: store => store.Controls.loading
            },
            actions: {
                showLoading, hideLoading
            }
        },
        created() {
            this.carregaUsuarios(this.keyword);
        },
        data() {
            return {
                keyword: "",
                usuarios: [],
                usuario: {}
            }
        },
        methods: {
            novoUsuario() {
                this.usuario = {}
            },
            salvaUsuario() {
                this.showLoading();
                this.$http.post(`${URL}/usuarios`, this.usuario).then(response => {
                    this.usuario = response.json()
                }).catch((erro) => {
                    toastr.error(erro.body)
                }).finally(() => {
                    this.hideLoading();  
                    this.carregaUsuarios();                                             
                }) 
            },
            altera(usuario) {
                this.usuario = usuario
                this.usuario.senha = ""
            },
            alteraUsuario() {
                this.showLoading();
                this.$http.put(`${URL}/usuarios/${this.usuario._id}`, this.usuario).then(response => {
                    this.usuario = response.json()
                }).catch((erro) => {
                    toastr.error(erro.body)
                }).finally(() => {
                    this.hideLoading();  
                    this.carregaUsuarios();                                             
                }) 
            },
            exclui(usuario) {
                this.usuario = usuario
                if (confirm(`Deseja apagar o usuário ${this.usuario.usuario} ?`)) {
                    this.showLoading()
                    this.$http.delete(`${URL}/usuarios/${this.usuario._id}`).then(response => {
                        this.usuario = {}
                    }).catch((erro) => {
                        toastr.error(erro.body)
                    }).finally(() => {
                        this.hideLoading();  
                        this.carregaUsuarios();                                             
                    })   
                }
            },
            carregaUsuarios() {
                this.showLoading();
                this.$http.get(`${URL}/usuarios`).then(response => {
                    this.usuarios = response.json()
                }).catch((erro) => {
                    toastr.error(erro.body)
                }).finally(() => {
                    this.hideLoading();                                               
                })    
            }
        }
    }
</script>

<style scoped>
    .table a {
        text-decoration: none;
    }
</style>