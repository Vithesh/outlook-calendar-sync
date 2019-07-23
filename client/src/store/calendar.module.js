import router from '@/router'
import CalendarService from '@/common/calendar.service'
import {
  FETCH_CALENDAR_EVENTS,
  UPDATE_CALENDAR_EVENT,
  FETCH_CALENDAR_EVENT_BY_ID
} from './actions.type'
import {
  SET_ERROR,
  FETCH_END,
  FETCH_START,
  SET_CALENDAR_EVENT
} from './mutations.type'

const initialState = {
  errors: null,
  isLoading: false,
  calendarEvents: [],
  editableCalendarEvent: {}
}

export const state = { ...initialState }

export const actions = {
  [FETCH_CALENDAR_EVENTS] (context) {
    context.commit(FETCH_START)
    return CalendarService.query()
      .then(({ data }) => {
        context.commit(FETCH_END, data)
      })
      .catch(error => {
        context.commit(SET_ERROR, error)
      })
  },
  [FETCH_CALENDAR_EVENT_BY_ID] (context, id) {
    context.commit(FETCH_START)
    return CalendarService.get(id)
      .then(({ data }) => {
        context.commit(SET_CALENDAR_EVENT, data)
      })
      .catch(error => {
        context.commit(SET_ERROR, error)
      })
  },
  [UPDATE_CALENDAR_EVENT] (context, params) {
    return CalendarService.update(params.Id, params)
      .then(({ data }) => {
        router.go(-1)
      })
      .catch(error => {
        context.commit(SET_ERROR, error)
      })
  }
}

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [FETCH_START] (state) {
    state.isLoading = true
  },
  [FETCH_END] (state, calendarEvents) {
    state.isLoading = false
    state.calendarEvents = calendarEvents
  },
  [SET_CALENDAR_EVENT] (state, event) {
    state.isLoading = false
    state.editableCalendarEvent = event
    state.calendarEvents = state.calendarEvents.map(evt => {
      return evt.Id === event.Id ? event : evt
    })
  },
  [SET_ERROR] (state, error) {
    state.errors = error
    state.isLoading = false
  }
}

const getters = {
  calendarEvents (state) {
    return state.calendarEvents
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
