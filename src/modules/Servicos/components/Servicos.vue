<template>
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-6">
                            <h4>Serviços</h4>
                        </div>
                        <div class="col-xs-6">
                            <button @click.prevent="novoServico" class="btn btn-default pull-right">Novo</button>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group form-inline">
                                <input type="input"  class="form-control" id="keyword" name="keyword" placeholder="Buscar pela descrição" v-model="keyword">
                                <button @click.prevent="busca" class="btn btn-default">Buscar</button>
                            </div>
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th width="99%">Descrição</th>
                                        <th width="1%"></th>                
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="servico in servicos">
                                        <td role="button" @click.prevent="altera(servico)"><a>{{servico.descricao}}</a></td>   
                                        <td role="button" @click.prevent="excluiServico(servico)"><button type="button" class="btn btn-xs btn-danger glyphicon glyphicon-remove"></button></td>                
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <validator name="validateForm">
                                <form>
                                    <div class="form-group">
                                        <label for="name">Descrição</label>
                                        <input type="input" class="form-control" id="name" placeholder="Nome" v-model="servico.descricao" v-validate:name="{ required: true, minlength: 5 }">
                                        <div v-show="$validateForm.invalid">
                                            <span class="label label-info" v-if="$validateForm.name.required">Campo requerido</span>
                                            &nbsp;
                                            <span class="label label-info" v-if="$validateForm.name.minlength">Mínimo 5 caracteres</span>
                                        </div>
                                        <button v-show="!servico._id && servico.descricao" @click.prevent="salvaServico" class="btn btn-default" :disabled="isLoading||$validateForm.invalid" >Salvar</button>
                                        <button v-show="servico._id" @click.prevent="alteraServico" class="btn btn-default" :disabled="isLoading||$validateForm.invalid" >Alterar</button>
                                    </div>
                                </form>
                            </validator>
                            <Loading></Loading>
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
            this.carregaServicos(this.keyword);
        },
        data() {
            return {
                keyword: "",
                servicos: [],
                servico: {}
            }
        },
        methods: {
            novoServico() {
                this.servico = {}
            },
            salvaServico() {
                this.showLoading();
                this.$http.post(`${URL}/servicos`, this.servico).then(response => {
                    this.servico = response.json();
                    this.carregaServicos();
                }).catch((erro) => {
                    toastr.error(error.body)
                }).finally(() => {
                    this.hideLoading();
                })     
            },
            altera(servico) {
                this.servico = servico
            },
            alteraServico() {
                this.showLoading();
                this.$http.put(`${URL}/servicos/${this.servico._id}`, this.servico).then(response => {
                    this.servico = response.json();
                    this.carregaServicos();
                }).catch((erro) => {
                    toastr.error(erro.body)
                }).finally(() => {
                    this.hideLoading();
                })     
            },
            busca() {
                this.carregaServicos()
            },
            excluiServico(servico) {
                this.servico = servico
                if (confirm(`Deseja apagar ${this.servico.descricao} ?`)) {
                    this.showLoading()
                    this.$http.delete(`${URL}/servicos/${this.servico._id}`).then(response => {
                        this.servico = {};
                        this.carregaServicos();                            
                    }).catch((erro) => {
                        toastr.error(erro.body)
                    }).finally(() => {
                        this.hideLoading();
                    })         
                } 
            },
            carregaServicos() {
                this.showLoading();
                let url = `${URL}/servicos`;
                if (this.keyword != null && this.keyword.trim().length != 0) {
                    url = `${url}/buscaNome/${this.keyword.trim()}`;
                }
                this.$http.get(url).then(response => {
                    this.servicos = response.json();                   
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
        /*font-family: Roboto, Arial, sans-serif;*/
        /*font-family: Arial, sans-serif;        */
        text-decoration: none;
    }    
    .panel {
        font-family: Arial, sans-serif;     
        font-size: 12px;   
    }
</style>