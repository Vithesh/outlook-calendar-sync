import express from 'express'
import authRoutes from '../modules/auth'
import calendarRoutes from '../modules/calendar'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/calender/events', calendarRoutes)

export default router
