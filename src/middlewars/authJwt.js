import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Rol";

//middleware funcion para verificar si existe entre token

export const verifyToken = async (req, res, next) => {
    let token = req.session.token;
    console.log(req.session);
    console.log(req.session.token);
    if (!token) return res.status(403).send({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });

        if (!user) return res.status(404).send({ message: "No user found" });

        next();
    } catch (error) {
        return res.status(401).send({ message: "Unauthorized!" });
    }
}
export const isAdministradorCooperativo = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      
      const roles = await Role.find({ _id: { $in: user.roles } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nombre === "Administrador_Cooperativo") {
            console.log(roles[i])
          next();
          return;
        }
      }
      //console.log('No eres administrador cooperativa')
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };
  export const isAdministradorGeneral = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nombre === "Administrador_General") {
          next();
          return;
        }
      }
  
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };

  export const cerrarSesion = async (req, res, next) => {
    let token = req.session.destroy();
    res.redirect('/');
  }