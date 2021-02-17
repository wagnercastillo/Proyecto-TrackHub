const {Router} = require('express');
const router = Router();
/** Llamamos los controladores del modelo cooperativas */
import * as cooperativaControllers from '../controllers/cooperativa.controllers'
import { authJwt } from "../middlewars";

router.get('/', cooperativaControllers.Principal)

router.get('/guardarCooperativa/add',[authJwt.verifyToken, authJwt.isAdministradorGeneral],  cooperativaControllers.getCooperativaPrincipal)

router.post('/guardarCooperativa/add' ,[authJwt.verifyToken, authJwt.isAdministradorGeneral], cooperativaControllers.createCooperativa)

router.get('/enabledCooperativa/:id',[authJwt.verifyToken, authJwt.isAdministradorGeneral], cooperativaControllers.enabledCooperativa)

router.get('/cooperativaEdit/:id',[authJwt.verifyToken, authJwt.isAdministradorGeneral], cooperativaControllers.updateCooperativaById)

router.post('/cooperativaEdit/:id',[authJwt.verifyToken, authJwt.isAdministradorGeneral],cooperativaControllers.editarCooperativaById)

router.get('/obtenerId/:id',[authJwt.verifyToken, authJwt.isAdministradorGeneral], cooperativaControllers.obtenerID)

router.get('/test', [authJwt.verifyToken, authJwt.isAdministradorCooperativo],  function(req, res){
    console.log('tienes acceso');
})

module.exports = router;