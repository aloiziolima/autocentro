import Vue from 'vue'
import App from './App.vue'
import VueValidator from 'vue-validator'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import Usuarios from './modules/Usuarios/router/routes'
import Profissionais from './modules/Profissionais/router/routes'
import Servicos from './modules/Servicos/router/routes'

Vue.use(VueValidator)
Vue.use(VueResource)
Vue.use(VueRouter)
const router = new VueRouter({
    linkActiviveClass: 'active',
})
const routes = Object.assign(Usuarios, Profissionais, Servicos)
router.map(routes)
router.start(App, 'App')
