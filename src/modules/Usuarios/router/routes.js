import Usuarios from '../../../modules/Usuarios/components/Usuarios.vue'
import Senha from '../../../modules/Usuarios/components/Senha.vue'
import Login from '../../../modules/Usuarios/components/Login.vue'

const Routes = {
    '/usuarios': {
        component: Usuarios
    },
    '/senha': {
        component: Senha
    },
    '/login': {
        component: Login
    },
}
export default Routes;