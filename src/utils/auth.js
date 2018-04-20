import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const CK = 'admin_ck'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getCK() {
  return Cookies.get(CK)
}

export function setCK(ck) {
  return Cookies.set(CK, ck)
}

export function removeCK() {
  return Cookies.remove(CK)
}
