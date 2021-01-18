import {Router} from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controller'

router.post('/signup', authCtrl.signUp)
router.post('/signin', authCtrl.signIp)

export default router;