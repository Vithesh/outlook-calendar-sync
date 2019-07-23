<template>
  <div class="edit-event">
    <div v-if="isLoading && !editableCalendarEvent" class="tc">Loading event...</div>
    <div v-else>
      <form v-on:submit.prevent="submit" class="pa4 black-80">
        <div class="measure mb3">
          <label for="subject" class="f6 b db mb2">Subject</label>
          <input id="subject" v-model="editableCalendarEvent.Subject" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text">
        </div>
        <div class="measure tc">
          <button type="submit" class="f6 bn dim ph3 pv2 mb2 dib white bg-dark-blue">Edit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { FETCH_CALENDAR_EVENT_BY_ID, UPDATE_CALENDAR_EVENT } from '@/store/actions.type'

export default {
  name: 'AppEditCalendarEvent',
  mounted () {
    this.$store.dispatch(FETCH_CALENDAR_EVENT_BY_ID, this.$route.params.id)
  },
  methods: {
    submit () {
      this.$store.dispatch(UPDATE_CALENDAR_EVENT, {
        Id: this.editableCalendarEvent.Id,
        Subject: this.editableCalendarEvent.Subject
      })
    }
  },
  computed: {
    ...mapState({
      errors: state => state.calendar.errors,
      isLoading: state => state.calendar.isLoading,
      editableCalendarEvent: state => state.calendar.editableCalendarEvent
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit-event {
  padding: 2rem;
  margin: 0 auto;
  max-width: 40rem;
}

</style>
