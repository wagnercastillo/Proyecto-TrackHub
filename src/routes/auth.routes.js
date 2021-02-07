import {Router} from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controller'
import {verifyToken} from '../middlewars'
router.post('/signup', authCtrl.signUp)
router.post('/signin', authCtrl.signIp)
router.get('/frm_Registro_Usuario/add',authCtrl.obtenerFrmUsuario)
module.exports=router;