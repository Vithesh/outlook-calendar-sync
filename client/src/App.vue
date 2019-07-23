<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { SUBSCRIBE_TO_SOCKET, FETCH_CALENDAR_EVENT_BY_ID, FETCH_CALENDAR_EVENTS } from './store/actions.type'

export default {
  name: 'App',
  sockets: {
    connect () {
      this.$store.dispatch(SUBSCRIBE_TO_SOCKET)
    },
    web_hook_notification (data) {
      if (data.ChangeType === 'Updated') {
        this.$store.dispatch(FETCH_CALENDAR_EVENT_BY_ID, data.Id)
      } else {
        this.$store.dispatch(FETCH_CALENDAR_EVENTS)
      }
    }
  }
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
