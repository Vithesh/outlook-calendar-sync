<template>
  <div class="home-page">
    <AppCalendarEventsList />
  </div>
</template>

<script>
import AppCalendarEventsList from '@/components/CalendarEventsList'

export default {
  name: 'AppEventsList',
  components: {
    AppCalendarEventsList
  }
}
</script>
