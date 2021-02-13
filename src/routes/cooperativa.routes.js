const {Router} =require('express');
const router = Router();

import * as cooperativaControllers from '../controllers/cooperativa.controllers'
import {verifyToken} from '../middlewars'
router.get('/', cooperativaControllers.Principal)

router.get('/guardarCooperativa/add',cooperativaControllers.getCooperativaPrincipal)

router.post('/guardarCooperativa/add', cooperativaControllers.createCooperativa)
 
router.get('/enabledCooperativa/:id', cooperativaControllers.enabledCooperativa)

router.get('/cooperativaEdit/:id', cooperativaControllers.updateCooperativaById)

router.post('/cooperativaEdit/:id', cooperativaControllers.editarCooperativaById)

module.exports= router;