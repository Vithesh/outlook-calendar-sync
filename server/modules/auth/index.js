import express from 'express'
import * as authCtrl from './auth.ctrl'

const router = express.Router()

router.get('/login-url', authCtrl.getLoginURL)

router.post('/login', authCtrl.login)

export default router
