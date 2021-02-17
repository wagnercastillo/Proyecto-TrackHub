const {
    Router
} = require('express');
const router = Router();

import * as turnoControllers from '../controllers/turno.controller'
import { authJwt } from "../middlewars";

router.get('/guardarTurno/add', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], turnoControllers.getTurnoPrincipal)

router.post('/guardarTurno/add', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], turnoControllers.createTurno)

router.get('/enabledTurno/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], turnoControllers.enabledTurno)

router.get('/TurnoEdit/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], turnoControllers.updateTurnoById)

router.post('/TurnoEdit/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], turnoControllers.editarTurnoById)

router.post('/guardarTurno/frecuencia:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], turnoControllers.editarTurnoById)

router.get('/Turno/frecuencias/:id',  [authJwt.verifyToken, authJwt.isAdministradorCooperativo],turnoControllers.asignarFrecuencias)

router.get('/Turno/unidades/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], turnoControllers.asignarUnidades)

module.exports = router;