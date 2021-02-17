const {
    Router
} = require('express');
const router = Router();

import * as unidadesControllers from '../controllers/unidades.controller'
import { authJwt } from "../middlewars";

router.get('/guardarUnidades/add', [authJwt.verifyToken, authJwt.isAdministradorCooperativo],unidadesControllers.getUnidadPrincipal)

router.post('/guardarUnidades/add', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], unidadesControllers.createdUnidades)

router.get('/enabledUnidades/:id',  [authJwt.verifyToken, authJwt.isAdministradorCooperativo],unidadesControllers.enabledUnidades)

router.get('/editarUnidades/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], unidadesControllers.updateUnidadesById)

router.post('/editarUnidades/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], unidadesControllers.editarUnidadById)

module.exports = router;