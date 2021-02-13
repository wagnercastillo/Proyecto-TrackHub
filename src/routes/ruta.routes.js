const {
    Router
} = require('express');
const router = Router();

import * as rutaControllers from '../controllers/Ruta.controller'
import {
    verifyToken
} from '../middlewars'


router.get('/guardarRuta/add', rutaControllers.getRutaPrincipal)

router.post('/guardarRuta/add', rutaControllers.createRuta)

router.get('/enabledRuta/:id', rutaControllers.enabledRuta)

router.get('/RutaEdit/:id', rutaControllers.updateRutaById)

router.post('/RutaEdit/:id', rutaControllers.editarRutaById)
module.exports = router;