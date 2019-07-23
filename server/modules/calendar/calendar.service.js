import util from 'util'
import outlook from 'node-outlook'
import { OUTLOOK_ENDPOINT } from '../../constants'

outlook.base.setApiEndpoint(OUTLOOK_ENDPOINT)

outlook.calendar.getEventAsync = util.promisify(outlook.calendar.getEvent)
outlook.calendar.getEventsAsync = util.promisify(outlook.calendar.getEvents)
outlook.calendar.updateEventAsync = util.promisify(outlook.calendar.updateEvent)

// get all events list
export const getAllEvents = async (token, { top = 20 }) => {
  try {
    // Get the events from outlook api
    const result = await outlook.calendar.getEventsAsync({
      token,
      useMe: true,
      odataParams: {
        '$select': 'Subject,Start,End,Attendees,Location',
        '$orderBy': 'Start/DateTime',
        '$top': top
      }
    })
    return { data: result.value }
  } catch (err) {
    return {
      error: {
        code: err.code,
        message: err.message
      }
    }
  }
}

// get event by id
export const getEvent = async (token, eventId) => {
  try {
    // Get the event from outlook api
    const result = await outlook.calendar.getEventAsync({
      token,
      eventId,
      useMe: true,
      odataParams: {
        '$select': 'Subject,Start,End,Attendees,Location'
      }
    })

    return { data: result }
  } catch (err) {
    return {
      error: {
        code: err.code,
        message: err.message
      }
    }
  }
}

// update event by id
export const updateEvent = async (token, eventId, update) => {
  try {
    // Get the first 10 events for the coming week
    const result = await outlook.calendar.updateEventAsync({
      token,
      eventId,
      update,
      useMe: true
    })

    return { data: result }
  } catch (err) {
    return {
      error: {
        code: err.code,
        message: err.message
      }
    }
  }
}
