const {Router} = require('express');
const router = Router();
//Llamamos los controladores del modelo cooperatyivs
import * as cooperativaControllers from '../controllers/cooperativa.controllers'
import { authJwt } from "../middlewars";

router.get('/', cooperativaControllers.Principal)

router.get('/guardarCooperativa/add',  cooperativaControllers.getCooperativaPrincipal)

router.post('/guardarCooperativa/add' , cooperativaControllers.createCooperativa)

router.get('/enabledCooperativa/:id', cooperativaControllers.enabledCooperativa)

router.get('/cooperativaEdit/:id', cooperativaControllers.updateCooperativaById)

router.post('/cooperativaEdit/:id',cooperativaControllers.editarCooperativaById)

router.get('/obtenerId/:id', cooperativaControllers.obtenerID)

router.get('/test', [authJwt.verifyToken, authJwt.isAdministradorCooperativo],  function(req, res){
    console.log('tienes acceso');
})

module.exports = router;