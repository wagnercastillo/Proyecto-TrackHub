const {
    Router
} = require('express');
const router = Router();

import * as opcionesControllers from '../controllers/opciones.controller'
import {
    verifyToken
} from '../middlewars'


router.get('/Opciones', opcionesControllers.Principal)
router.get('/Configuracion', opcionesControllers.getConfiguracion)
router.get('/Historial', opcionesControllers.getHistorial)

//router.get('/guardarUnidades/add', unidadesControllers.getUnidadPrincipal)

module.exports = router;