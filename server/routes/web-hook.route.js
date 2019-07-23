import express from 'express'
import webHookRoute from '../modules/web-hook'

const router = express.Router()

router.use('/listen', webHookRoute)

export default router
