
export default {
    SET_LOGIN (store, login) {
        store.login = login  // AutoCentro-API retorna no formato: login.usuario.usuario;
        localStorage.setItem('login', JSON.stringify(store.login))
    },
    SET_LOGOUT (store, login) {
        store.login = login  // AutoCentro-API retorna no formato: login.usuario.usuario;
        localStorage.removeItem('login')
    }
}
