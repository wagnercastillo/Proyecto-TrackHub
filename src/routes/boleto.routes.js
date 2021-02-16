const {
    Router
} = require('express');
const router = Router();

import * as boleteriaControllers from '../controllers/boleto.controller'
import {
    verifyToken
} from '../middlewars'


router.get('/Boleto/add', boleteriaControllers.getBoletoPrincipal )

router.post('/Boleto/add', boleteriaControllers.createdBoletos)
/*
router.get('/enabledCooperativa/:id', boleteriaControllers.enabledCooperativa)

router.get('/cooperativaEdit/:id', boleteriaControllers.updateCooperativaById)

router.post('/cooperativaEdit/:id', boleteriaControllers.editarCooperativaById)
 */
module.exports = router;