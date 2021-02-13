const {
    Router
} = require('express');
const router = Router();

import * as frecuenciaControllers from '../controllers/frecuencia.controller'
import {
    verifyToken
} from '../middlewars'

router.get('/guardarfrecuencia/add', frecuenciaControllers.getFrecuenciaPrincipal)

router.post('/guardarfrecuencia/add', frecuenciaControllers.createFrecuencia)

router.get('/enabledfrecuencia/:id', frecuenciaControllers.enabledFrecuencia)

router.get('/frecuenciaEdit/:id', frecuenciaControllers.updateFrecuenciaById)

router.post('/frecuenciaEdit/:id', frecuenciaControllers.editarFrecuenciaById)

module.exports = router;