const {
    Router
} = require('express');
const router = Router();

import * as boleteriaControllers from '../controllers/boleto.controller'
import { authJwt } from "../middlewars";


router.get('/Boleto/add', [authJwt.verifyToken, authJwt.isCliente], boleteriaControllers.getBoletoPrincipal )

router.post('/Boleto/add',[authJwt.verifyToken, authJwt.isCliente], boleteriaControllers.createdBoletos)
/*
router.get('/enabledCooperativa/:id', boleteriaControllers.enabledCooperativa)

router.get('/cooperativaEdit/:id', boleteriaControllers.updateCooperativaById)

router.post('/cooperativaEdit/:id', boleteriaControllers.editarCooperativaById)
 */
module.exports = router;