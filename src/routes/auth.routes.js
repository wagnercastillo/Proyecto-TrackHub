import {
    Router
} from 'express'
const router = Router()
//Llamamos los controladores de cada modelo
import * as authCtrl from '../controllers/auth.controller'

import { authJwt } from "../middlewars";
router.get('/frm_registroUsuario/add', authCtrl.obtenerFrmUsuario)

router.post('/signup/add', authCtrl.signUp)

router.get('/frm_inicioUsuario/add', authCtrl.obtenerFrmUsuIni)

router.post('/signin/add', authCtrl.signIn)

router.get('/cerrarSesion',authJwt.cerrarSesion)
    
module.exports = router;