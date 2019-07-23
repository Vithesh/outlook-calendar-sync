import router from '@/router'
import ApiService from '@/common/api.service'
import AuthService from '@/common/auth.service'
import { LOGIN, CHECK_AUTH, FETCH_LOGIN_URL, SUBSCRIBE_TO_SOCKET } from './actions.type'
import { SET_AUTH, REMOVE_AUTH, SET_ERROR, SET_LOGIN_URL } from './mutations.type'

const state = {
  errors: null,
  loginURL: null,
  subscriptionId: null,
  isAuthenticated: AuthService.isAuthenticated()
}

const getters = {
  isAuthenticated (state) {
    return state.isAuthenticated
  }
}

const actions = {
  [FETCH_LOGIN_URL] (context) {
    return AuthService.getLoginURL()
      .then(({ data }) => {
        context.commit(SET_LOGIN_URL, data.loginUrl)
        return data
      })
      .catch(({ response }) => {
        context.commit(SET_ERROR, response.data.errors)
      })
  },
  [LOGIN] (context, params) {
    return AuthService.login(params)
      .then(({ data }) => {
        context.commit(SET_AUTH, data)
        context.dispatch(SUBSCRIBE_TO_SOCKET)
        router.push({ name: 'events' })
        return data
      })
      .catch(({ response }) => {
        context.commit(SET_ERROR, response.data.errors)
      })
  },
  [CHECK_AUTH] (context) {
    if (AuthService.isAuthenticated()) {
      context.commit(SET_AUTH, AuthService.getAuthData())
    } else {
      context.commit(REMOVE_AUTH)
      router.push({ name: 'login' })
    }
  },
  [SUBSCRIBE_TO_SOCKET] (context) {
    const id = AuthService.getSubscriptionId()
    if (id) {
      this._vm.$socket.emit('subscribe', id)
    }
  }
}

const mutations = {
  [SET_ERROR] (state, error) {
    state.errors = error
  },
  [SET_LOGIN_URL] (state, loginURL) {
    state.loginURL = loginURL
  },
  [SET_AUTH] (state, data) {
    state.errors = null
    state.isAuthenticated = true
    state.subscriptionId = data.subscriptionId
    AuthService.setAuthData(data)
    ApiService.setToken(data.access_token)
  },
  [REMOVE_AUTH] (state) {
    state.isAuthenticated = false
    state.subscriptionId = null
    state.errors = null
    AuthService.removeAuthData()
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
