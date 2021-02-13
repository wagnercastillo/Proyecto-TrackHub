const {Router} =require('express');
const router = Router();

import * as cooperativaControllers from '../controllers/cooperativa.controllers'
import {verifyToken} from '../middlewars'
router.get('/', cooperativaControllers.Principal)

router.get('/guardarCooperativa/add',cooperativaControllers.getCooperativaPrincipal)

router.post('/guardarCooperativa/add', cooperativaControllers.createCooperativa)
 
router.get('/enabledCooperativa/:id', cooperativaControllers.enabledCooperativa)

router.get('/editar/:id', cooperativaControllers.updateCooperativaById)

router.delete('/:cooperativaId', cooperativaControllers.deleteCooperativaById)

module.exports= router;