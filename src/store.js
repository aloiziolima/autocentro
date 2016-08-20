
import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'
import Usuarios from './modules/Usuarios/vuex/store'
import Profissionais from './modules/Profissionais/vuex/store'
import Controls from './controls/vuex/store'

Vue.use(Vuex)

export default new Vuex.Store({
    // state, mutations,
    modules: {
        Usuarios, Profissionais, Controls
    }
})
