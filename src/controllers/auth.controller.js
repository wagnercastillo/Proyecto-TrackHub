import Usuario from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Rol from '../models/Rol';
import { json } from 'express';
/** Renderisamos el formulario registro de Clientes */
export const obtenerFrmUsuario = async (req, res) => {
    res.render('users/signup');
}
/** Renderisamos la autentificacion de usuarios en general*/
export const obtenerFrmUsuIni = async (req, res) => {
    const sms = req.flash('errors');
    res.render('users/signin', { sms });
}

export const signUp = async (req, res) => {
     /** obtenemos datos del formulario */
     const { cedula, nombre, apellido, correo, contrasenia, roles } = req.body;
    /**Capturamos errores, campos vacios */
     const err = [];
    if (!nombre) {
        err.push({ text: 'Ingrese  nombre' });
    }
    if (!apellido) {
        err.push({ text: 'Ingrese el appellido' });
    }
    if (!cedula) {
        err.push({ text: 'No ha selecionado el logo de la Cooperativa' });
    }
    if (!correo) {
        err.push({ text: 'No ha selecionado el logo de la Cooperativa' });
    }
    if (!contrasenia) {
        err.push({ text: 'No ha selecionado el logo de la Cooperativa' });
    }
    if (err.length > 0) {
        res.render('users/signup', {err });

    } else {
       
        /**Creamos el objeto
        Encriptamos contrasenias */
        const newUser = new Usuario({
            cedula,
            nombre,
            apellido,
            correo,
            contrasenia: await Usuario.encryptPassword(contrasenia)
        })

        /** verificamos roles */

        const rol = await Rol.findOne({ nombre: "Cliente" });
        newUser.roles = [rol._id];


        /** guardamos en mongo */
        const savedUser = await newUser.save();
        console.log(savedUser)

        /** Creamos un token */
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });
        /**Guardaos el token */
        req.session.token = token;
        req.session.save();
        res.redirect('/');
    }
};
export const signIn = async (req, res) => {
    try {
        /** validar  correo electrónico */
        const userFound = await Usuario.findOne({ correo: req.body.correo }).populate("roles");
        /** Validamos campos */
        if (!userFound) {
            req.flash('errors', 'Usuario no encontrado')
            res.redirect('/frm_inicioUsuario/add');
        }

        if (!userFound.estado) {
            req.flash('errors', 'Cuenta Inhabilitada')
            res.redirect('/frm_inicioUsuario/add');
        }
        /**Comparamos contrasenias */
        const matchPassword = await Usuario.comparePassword(
            req.body.contrasenia,
            userFound.contrasenia
        );
        /**En el caso que no sea correcta redirigimos con error */
        if (!matchPassword) {
            req.flash('errors', 'Contrasenia Incorrecta')
            res.redirect('/frm_inicioUsuario/add');
        } else {
           /** caso contrario seguimos con las operaciones de autentificar */
            const token = jwt.sign({ id: userFound._id }, config.SECRET, {
                expiresIn: 86400, // 24 hours
            });
            /** Capturamos roll */
            const rId = userFound._id;
            const roles = await Rol.find({ _id: { $in: userFound.roles } });
            req.session.roles = roles;
            /** Guardamos el objeto usuario autentificado */
            const usuActivo = await Usuario.findById(rId).lean();
            req.session.usuActivo = usuActivo
            console.log('usuuuaaaarioooooo')
            console.log(usuActivo)
            console.log('ssssssssssssssssssssssssss')
            req.session.roles = roles;
            /** Guardamos e token */
            req.session.token = token;
            req.session.save();
            console.log(req.session);
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
}

