const {
    Router
} = require('express');
const router = Router();

import * as turnoControllers from '../controllers/turno.controller'
import {
    verifyToken
} from '../middlewars'

router.get('/guardarTurno/add', turnoControllers.getTurnoPrincipal)

router.post('/guardarTurno/add', turnoControllers.createTurno)

router.get('/enabledTurno/:id', turnoControllers.enabledTurno)

router.get('/TurnoEdit/:id', turnoControllers.updateTurnoById)

router.post('/TurnoEdit/:id', turnoControllers.editarTurnoById)

router.post('/guardarTurno/frecuencia:id', turnoControllers.editarTurnoById)

module.exports = router;