const {
    Router
} = require('express');
const router = Router();

import * as frecuenciaControllers from '../controllers/frecuencia.controller'
import { authJwt } from "../middlewars";

router.get('/Administrador', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], frecuenciaControllers.Principal)

router.get('/guardarfrecuencia/add', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], frecuenciaControllers.getFrecuenciaPrincipal)

router.post('/guardarfrecuencia/add', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], frecuenciaControllers.createFrecuencia)

router.get('/enablefrecuencia/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], frecuenciaControllers.enabledFrecuencia)

router.get('/frecuenciaEdit/:id',  [authJwt.verifyToken, authJwt.isAdministradorCooperativo],frecuenciaControllers.updateFrecuenciaById)

router.post('/frecuenciaEdit/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], frecuenciaControllers.editarFrecuenciaById)

router.get('/frecuencia/rutas/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], frecuenciaControllers.asignarRutas)

router.get('/frecuencia/rutasAsignadas/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], frecuenciaControllers.rutasAsignadas)

router.get('/Administrador/Boleteria',  [authJwt.verifyToken, authJwt.isAdministradorCooperativo],frecuenciaControllers.BoleteriaAdmin)

router.get('/Administrador/Cuenta', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], frecuenciaControllers.getDatos)

module.exports = router;