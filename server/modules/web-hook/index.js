import express from 'express'
import * as webHooksCtrl from './web-hook.ctrl'

const router = express.Router()

router.post('/', webHooksCtrl.listen)

export default router
