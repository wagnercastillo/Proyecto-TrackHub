const {
    Router
} = require('express');
const router = Router();

import * as opcionesControllers from '../controllers/opciones.controller'
import { authJwt } from "../middlewars";


router.get('/Opciones', opcionesControllers.Principal)
router.get('/Configuracion', opcionesControllers.getConfiguracion)
router.post('/Configuracion', opcionesControllers.editarcontrasenia)
router.get('/enabledUsuario/:id', opcionesControllers.enabledUsuario)

router.get('/Historial', opcionesControllers.getHistorial)

//router.get('/guardarUnidades/add', unidadesControllers.getUnidadPrincipal)

module.exports = router;