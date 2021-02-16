import { Router } from "express";
const router = Router();

import * as admin from '../controllers/user.controller';

import { authJwt,verifySignup } from "../middlewars";

router.get('/General', admin.inicioAdmin)

router.get('/regAdministrador/add', admin.registroAdmin)

router.post("/signupAdm", [authJwt.verifyToken, authJwt.isAdministradorGeneral],admin.singinAdm);


module.exports = router;