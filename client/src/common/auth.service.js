import ApiService from '@/common/api.service'

const AUTH_STORAGE_KEY = 'auth_data'

const getAuth = () => {
  const auth = window.localStorage.getItem(AUTH_STORAGE_KEY)
  return auth ? JSON.parse(auth) : null
}

const setAuth = data => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data))
}

const removeAuth = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

const AuthService = {
  getAuthData () {
    return getAuth()
  },
  setAuthData (data) {
    setAuth(data)
  },
  removeAuthData () {
    removeAuth()
  },
  isAuthenticated () {
    const auth = getAuth()
    return auth ? auth.expires_at > Date.now() : false
  },
  getSubscriptionId () {
    const auth = getAuth()
    return auth ? auth.subscriptionId : null
  },
  getLoginURL () {
    return ApiService.query('auth/login-url')
  },
  login (data) {
    return ApiService.post('auth/login', data)
  }
}

export default AuthService
