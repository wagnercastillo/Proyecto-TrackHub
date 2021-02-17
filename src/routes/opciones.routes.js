const {
    Router
} = require('express');
const router = Router();

import * as opcionesControllers from '../controllers/opciones.controller'
import { authJwt } from "../middlewars";


router.get('/Opciones', [authJwt.verifyToken, authJwt.isCliente],opcionesControllers.Principal)
router.get('/Configuracion',[authJwt.verifyToken, authJwt.isCliente], opcionesControllers.getConfiguracion)
router.post('/Configuracion',[authJwt.verifyToken, authJwt.isCliente], opcionesControllers.editarcontrasenia)
router.get('/enabledUsuario/:id',[authJwt.verifyToken, authJwt.isCliente], opcionesControllers.enabledUsuario)

router.get('/Historial', [authJwt.verifyToken, authJwt.isCliente],opcionesControllers.getHistorial)

//router.get('/guardarUnidades/add', unidadesControllers.getUnidadPrincipal)

module.exports = router;