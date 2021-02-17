import { Router } from "express";
const router = Router();
/** Llamamos o instanciamos  los controladores de cada modelo */
import * as admin from '../controllers/user.controller';

import { authJwt,verifySignup } from "../middlewars";

router.get('/General', admin.inicioAdmin)

router.get('/regAdministrador/add', admin.registroAdmin)

router.post("/signupAdm", [authJwt.verifyToken, authJwt.isAdministradorGeneral],admin.singinAdm);


module.exports = router;