const {
    Router
} = require('express');
const router = Router();

import * as unidadesControllers from '../controllers/unidades.controller'
import {
    verifyToken
} from '../middlewars'


router.get('/guardarUnidades/add', unidadesControllers.getUnidadPrincipal)

router.post('/guardarUnidades/add', unidadesControllers.createdUnidades)

router.get('/enabledUnidades/:id', unidadesControllers.enabledUnidades)

router.get('/editarUnidades/:id', unidadesControllers.updateUnidadesById)

router.post('/editarUnidades/:id', unidadesControllers.editarUnidadById)

module.exports = router;