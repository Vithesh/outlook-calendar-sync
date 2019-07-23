import express from 'express'
import * as calendarCtrl from './calendar.ctrl'

const router = express.Router()

router.get('/', calendarCtrl.getAllEvents)

router.get('/:id', calendarCtrl.getEvent)

router.patch('/:id', calendarCtrl.updateEvent)

export default router
