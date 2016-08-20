<template>
    <div class="container">
        <div class="panel-heading">
            <div class="row">
                    <div class="col-xs-6">
                        <h4 v-if="edicao">Profissional</h4>
                    </div>
            </div>
        </div> 
        <ul class="nav nav-tabs">
            <li v-show="!edicao" class="active"><a data-toggle="tab" href="#aba1">Profissionais</a></li>
            <li v-show="edicao"><a data-toggle="tab" href="#aba2">Dados Principais</a></li>
            <li v-show="edicao"><a data-toggle="tab" href="#aba3">Endereço</a></li>
            <li v-show="edicao"><a data-toggle="tab" href="#aba4">Documentação</a></li>
        </ul>
        <div class="tab-content">
            <div id="aba1" v-show="!edicao" class="tab-pane fade in active">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group form-inline">
                                <input type="input"  class="form-control" id="keyword" name="keyword" placeholder="Buscar pela descrição" v-model="keyword">
                                <button @click.prevent="buscar" class="btn btn-default">Buscar</button>
                                <button v-show="!profissional._id" @click.prevent="incluir" class="btn btn-default">Incluir</button>
                            </div>
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th width="99%">Descrição</th>
                                        <th width="1%"></th>                
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="profissional in profissionais">
                                        <td role="button" @click.prevent="selecionar(profissional)"><a>{{profissional.nome}}</a></td>   
                                        <td role="button" @click.prevent="excluirProfissional(profissional)"><button type="button" class="btn btn-xs btn-danger glyphicon glyphicon-remove"></button></td>                
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="aba2" class="tab-pane fade">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="input" class="form-control" id="nome" placeholder="Nome" v-model="profissional.nome">
                    <label for="name">Email</label>
                    <input type="input" class="form-control" id="email" placeholder="Email" v-model="profissional.email">
                    <label for="name">DDD</label>
                    <input type="input" class="form-control" id="ddd" placeholder="DDD" v-model="profissional.telefone.ddd">
                    <label for="name">Telefones</label>
                    <input type="input" class="form-control" id="celular" placeholder="Celular" v-model="profissional.telefone.celular">
                    <input type="input" class="form-control" id="fixo" placeholder="Fixo" v-model="profissional.telefone.fixo">
                    <label for="name">Ativo</label>
                    <input type="checkbox" id="ativo" v-model="profissional.ativo">
                </div>
            </div>
            <div id="aba3" class="tab-pane fade">
                <div class="form-group">
                    <input type="input" class="form-control" id="logradouro" placeholder="Endereço" v-model="profissional.endereco.logradouro">
                    <input type="input" class="form-control" id="endereco.numero" placeholder="Número do endereço" v-model="profissional.endereco.numero">
                    <input type="input" class="form-control" id="complemento" placeholder="Complemento do endereço, número apto, andar, etc" v-model="profissional.endereco.complemento">
                    <input type="input" class="form-control" id="bairro" placeholder="Bairro" v-model="profissional.endereco.bairro">
                    <input type="input" class="form-control" id="cep" placeholder="CEP" v-model="profissional.endereco.cep">
                </div>
            </div>
            <div id="aba4" class="tab-pane fade">
                <div class="form-group">
                    <label for="name">CPF</label>
                    <input type="input" class="form-control" id="cpf" placeholder="CPF" v-model="profissional.documento.cpf">
                    <label for="name">Identidade</label>                                
                    <input type="input" class="form-control" id="identidade.numero" placeholder="Identidade Número" v-model="profissional.documento.identidade.numero">
                    <input type="input" class="form-control" id="identidade.orgao" placeholder="Identidade Orgão Emissor" v-model="profissional.documento.identidade.orgaoEmissor">
                </div>
            </div>
        </div>  
        <button v-show="!profissional._id && profissional.nome" @click.prevent="salvarProfissional" class="btn btn-default" :disabled="isLoading">Salvar</button>
        <button v-show="profissional._id" @click.prevent="alterarProfissional" class="btn btn-default" :disabled="isLoading">Confirmar alteração</button>
        <button v-show="edicao" @click.prevent="cancelar" class="btn btn-default" :disabled="isLoading">Cancelar</button>
        <Loading></Loading>              
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
            this.carregarProfissionais(this.keyword);
        },      
        data() {
            return {
                edicao: false,
                keyword: "",
                profissionais: [],
                profissional: { 
                    nome: "", email: "", 
                    telefone: {
                        ddd: "", celular: "", fixo: ""
                    },
                    documento: {
                        cpf: "", 
                        identidade: {
                            numero: "", orgaoEmissor: ""
                        }
                    },
                    endereco: {
                        logradouro: "", numero: "", complemento: "", bairro: "", cep: ""
                    },
                    ativo: true
                }
            }
        },
        methods: {
            limparCampos()  {
                this.profissional =  { 
                        nome: "", email: "", 
                        telefone: {
                            ddd: "", celular: "", fixo: ""
                        },
                        documento: {
                            cpf: "", 
                            identidade: {
                                numero: "", orgaoEmissor: ""
                            }
                        },
                        endereco: {
                            logradouro: "", numero: "", complemento: "", bairro: "", cep: ""
                        },
                        ativo: true
                    };
                    this.edicao = false;     
            },
            incluir() {
                this.limparCampos();
                this.edicao = true;                
                $('.nav-tabs a[href="#aba2"]').tab('show');
            },
            salvarProfissional() {
                this.showLoading();
                this.$http.post(`${URL}/profissionais`, this.profissional).then(response => {
                    this.limparCampos();
                    $('.nav-tabs a[href="#aba1"]').tab('show');                                
                }).catch((erro) => {
                    toastr.error(erro.body)
                }).finally(() => {
                    this.hideLoading();
                    this.carregarProfissionais();      
                })             
            },
            selecionar(profissional) {
                this.profissional = profissional;
                this.edicao = true;
                $('.nav-tabs a[href="#aba2"]').tab('show');   
            },
            alterarProfissional() {
                this.showLoading();
                this.$http.put(`${URL}/profissionais/${this.profissional._id}`, this.profissional).then(response => {
                    this.limparCampos();
                    $('.nav-tabs a[href="#aba1"]').tab('show');                                
                }).catch((erro) => {
                    toastr.error(erro.body)
                }).finally(() => {
                    this.hideLoading();
                    this.carregarProfissionais();                            
                })      
            },
            cancelar() {
                $('.nav-tabs a[href="#aba1"]').tab('show');       
                this.limparCampos();               
            },
            buscar() {
                this.carregarProfissionais()
            },
            excluirProfissional(profissional) {
                this.profissional = profissional
                if (confirm(`Deseja apagar ${this.profissional.nome} ?`)) {
                    this.showLoading()
                    this.$http.delete(`${URL}/profissionais/${this.profissional._id}`).then(response => {
                        this.profissional = {};              
                    }).catch((erro) => {
                        toastr.error(erro.body)
                    }).finally(() => {
                        this.hideLoading();
                        this.carregarProfissionais();                                                  
                    })      
                } else {  
                    this.limparCampos();                                             
                }
            },
            carregarProfissionais() {
                this.showLoading();
                let url = `${URL}/profissionais`;
                if (this.keyword != null && this.keyword.trim().length != 0) {
                    url = `${url}/buscaNome/${this.keyword.trim()}`;
                }
                this.$http.get(url).then(response => {
                    this.profissionais = response.json()
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
        /*font-family: Roboto, Arial, sans-serif;*/
    }
</style>