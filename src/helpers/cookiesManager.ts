/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie'

const TOKEN_NAME = 'token'

const setToken = (cvalue: string) => {
    if (!cvalue) {
        return
    }
    Cookies.set(TOKEN_NAME, cvalue, { expires: 1 })
}

const getToken = (url = '') => Cookies.get(TOKEN_NAME)
const deleteToken = () => {
    Cookies.remove(TOKEN_NAME)
}

export { setToken, getToken, deleteToken }
