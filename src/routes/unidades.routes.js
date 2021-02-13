const {
    Router
} = require('express');
const router = Router();

import * as unidadesControllers from '../controllers/unidades.controller'
import {
    verifyToken
} from '../middlewars'
router.get('/', unidadesControllers.Principal)

router.get('/guardarUnidades/add', unidadesControllers.getUnidades)

router.post('/guardarUnidades/add', unidadesControllers.createUnidades)

router.get('/enabledUnidades/:id', unidadesControllers.enabledUnidades)

router.get('/editarUnidades/:id', unidadesControllers.updateUnidadesaById)

router.delete('/:unidadesId', unidadesControllers.deleteUnidadesById)

module.exports = router;