<template>
  <article class="ba b--black-10">
    <router-link :to="eventLink" class="db pv4 ph3 ph0-l no-underline black dim">
      <div class="flex flex-column flex-row-ns">
        <div class="w-100 w-60-ns pl3-ns">
          <h2 class="f3 fw1 baskerville mt0 lh-title">{{calendarEvent.Subject}}</h2>
          <p class="f6 f5-l lh-copy">
            From: {{calendarEvent.Start | dateTime }}
            <br>
            To: {{calendarEvent.End | dateTime }}
          </p>
          <p class="f6 lh-copy mv0">Location: {{calendarEvent.Location.DisplayName}}</p>
          <dl class="lh-title" v-if="calendarEvent.Attendees.length">
            <dt class="f6 b">Attendees</dt>
            <dd
              class="f7 ml0"
              v-for="(attendee, index) in calendarEvent.Attendees"
              :key="attendee.EmailAddress.Name + index"
            >
              {{attendee.EmailAddress.Name}}
            </dd>
          </dl>

        </div>
      </div>
    </router-link>
  </article>
</template>

<script>

export default {
  name: 'AppCalendarEvent',
  props: {
    calendarEvent: { type: Object, required: true }
  },
  computed: {
    eventLink () {
      return {
        name: 'editEvent',
        params: {
          id: this.calendarEvent.Id
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
