import * as calendarService from './calendar.service'

/**
 *
 * @api {get} / get all events
 * @apiVersion 0.1.0
 * @apiName GetAllEvents
 * @apiDescription Returns all the calendar events
 * @apiGroup Calendar
 *
 */
export const getAllEvents = async (req, res, next) => {
  const { data, error } = await calendarService.getAllEvents(req.headers.authorization, req.query)
  return error ? res.sendStatus(500).json(error) : res.json(data)
}

/**
 *
 * @api {get} /:id get event
 * @apiVersion 0.1.0
 * @apiName GetEvent
 * @apiDescription Get event by id
 * @apiGroup Calendar
 *
 */
export const getEvent = async (req, res, next) => {
  const { data, error } = await calendarService.getEvent(req.headers.authorization, req.params.id)
  return error ? res.sendStatus(500).json(error) : res.json(data)
}

/**
 *
 * @api {patch} /:id update event
 * @apiVersion 0.1.0
 * @apiName UpdateEvent
 * @apiDescription Updates the calendar event with id
 * @apiGroup Calendar
 *
 */
export const updateEvent = async (req, res, next) => {
  const { data, error } = await calendarService.updateEvent(req.headers.authorization, req.params.id, req.body.event)
  return error ? res.sendStatus(500).json(error) : res.json(data)
}
