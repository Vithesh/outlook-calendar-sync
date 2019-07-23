<template>
  <div class="login-page">
    <a class="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue" v-bind:href="loginURL">Login with Outlook</a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { FETCH_LOGIN_URL } from '@/store/actions.type'

export default {
  name: 'AppLogin',
  mounted () {
    this.$store.dispatch(FETCH_LOGIN_URL)
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors,
      loginURL: state => state.auth.loginURL
    })
  }
}
</script>
<style scoped>
  .login-page {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
