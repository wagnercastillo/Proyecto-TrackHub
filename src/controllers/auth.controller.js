import Usuario from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Rol from '../models/Rol';
import { json } from 'express';

export const obtenerFrmUsuario = async (req, res) => {
    res.render('users/signup');
}
export const obtenerFrmUsuIni = async (req, res) => {
    const sms = req.flash('errors');
    res.render('users/signin', { sms });
}

export const signUp = async (req, res) => {
    try {
        // obtenemos datos del formulario
        const { cedula, nombre, apellido, correo, contrasenia, roles } = req.body;
        //Verificar si el usuario existe

        const newUser = new Usuario({
            cedula,
            nombre,
            apellido,
            correo,
            contrasenia: await Usuario.encryptPassword(contrasenia)
        })

        // verificamos roles
        if (req.body.roles) { 
            const foundRol = await Rol.find({ nombre: { $in: roles } });
            newUser.roles = foundRol.map((rol) => rol._id);
        } else {
            const rol = await Rol.findOne({ nombre: "Cliente" });
            newUser.roles = [rol._id];
        }

        // guardamos en mongo
        const savedUser = await newUser.save();
        console.log(savedUser)

        // Creamos un token
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        req.session.token = token;
        req.session.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error al crear el usuario' });
    }
};
export const signIn = async (req, res) => {
    try {
        // validar  correo electrónico 
        const userFound = await Usuario.findOne({ correo: req.body.correo }).populate("roles");

        if (!userFound) {
            req.flash('errors', 'Usuario no encontrado')
            res.redirect('/frm_inicioUsuario/add');
        }

        const matchPassword = await Usuario.comparePassword(
            req.body.contrasenia,
            userFound.contrasenia
        );
       
        if (!matchPassword) {
            req.flash('errors', 'Contrasenia Incorrecta')
            res.redirect('/frm_inicioUsuario/add');
        } else {
            const token = jwt.sign({ id: userFound._id }, config.SECRET, {
                expiresIn: 86400, // 24 hours
            });
            ////Capturamos roll
            const rId=userFound._id ;
            const roles = await Rol.find({ _id: { $in: userFound.roles } });
            req.session.roles=roles;
            ////
            const usuActivo = await Usuario.findById(rId).lean();
            req.session.usuActivo = usuActivo
            console.log('usuuuaaaarioooooo')
            console.log(usuActivo)
            console.log('ssssssssssssssssssssssssss')
            req.session.roles=roles;
            ///
            req.session.token = token;
            req.session.save();
            console.log(req.session);
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
}

