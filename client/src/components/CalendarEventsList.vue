<template>
  <div class="calendar-events-list">
    <h1 class="f2 fw2 black-90 mv3 tc">
      Events
    </h1>
    <div v-if="isLoading" class="tc">Loading events...</div>
    <div v-else>
      <div v-if="calendarEvents.length === 0" class="tc">
        No events found.
      </div>
      <AppCalendarEvent
        v-for="(calendarEvent) in calendarEvents"
        :calendarEvent="calendarEvent"
        :key="calendarEvent.id"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppCalendarEvent from './CalendarEvent.vue'
import { FETCH_CALENDAR_EVENTS } from '@/store/actions.type'

export default {
  name: 'AppCalendarEventsList',
  mounted () {
    this.$store.dispatch(FETCH_CALENDAR_EVENTS)
  },
  components: {
    AppCalendarEvent
  },
  computed: {
    ...mapState({
      errors: state => state.calendar.errors,
      isLoading: state => state.calendar.isLoading,
      calendarEvents: state => state.calendar.calendarEvents
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .calendar-events-list {
    width: 100%;
    height: 100%;
    padding: 4rem;
  }
</style>
