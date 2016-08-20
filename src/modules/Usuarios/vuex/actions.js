
import { URL, HEADER } from '../../../config.js'

export function setLogin ({ dispatch }, user) {
    dispatch('SHOW_LOADING')
    const dt = 'grant_type=password&usuario=' + this.user.name + '&senha=' + this.user.password
    this.$http.post(`${URL}/login`, dt, HEADER).then(
    (response) => {
        dispatch('HIDE_LOADING')
        dispatch('SET_LOGIN', response.data)
    },
    (error) => {
        dispatch('HIDE_LOADING')
        console.log(error)
        dispatch('SHOW_ERROR', error.body)
    })
}
export function setLoginFromLocalStorage ({ dispatch }) {
    const login = JSON.parse(localStorage.getItem('login'))
    if ((login != null) && (login.token != null)) {
        const jwtDecode = require('jwt-decode');
        const moment = require('moment');
        const timeout = moment.unix(jwtDecode(login.token).exp).diff();
        if (timeout < 60000 || isNaN(timeout)) { // 60000 (1 minuto)
            dispatch('SET_LOGIN', {})
        }
        else {
            dispatch('SET_LOGIN', login)
        }
    }
}
export function setLogout ({ dispatch }) {
    const login = {
        usuario: { usuario: '', admin: false, id: '' },
        token: null
    }
    dispatch('SET_LOGOUT', login)
}
