const {
    Router
} = require('express');
const router = Router();

import * as rutaControllers from '../controllers/ruta.controller'
import { authJwt } from "../middlewars";


router.get('/guardarRuta/add', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], rutaControllers.getRutaPrincipal)
router.post('/guardarRuta/add', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], rutaControllers.createRuta)
router.get('/enabledRuta/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], rutaControllers.enabledRuta)

router.get('/RutaEdit/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], rutaControllers.updateRutaById)

router.post('/RutaEdit/:id', [authJwt.verifyToken, authJwt.isAdministradorCooperativo], rutaControllers.editarRutaById)
module.exports = router;