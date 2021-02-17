import { Router } from "express";
const router = Router();
/** Llamamos o instanciamos  los controladores de cada modelo */
import * as admin from '../controllers/user.controller';

import { authJwt,verifySignup } from "../middlewars";

router.get('/General',[authJwt.verifyToken, authJwt.isAdministradorGeneral], admin.inicioAdmin)

router.get('/regAdministrador/add',[authJwt.verifyToken, authJwt.isAdministradorGeneral], admin.registroAdmin)

router.post("/signupAdm", [authJwt.verifyToken, authJwt.isAdministradorGeneral],admin.singinAdm);


module.exports = router;