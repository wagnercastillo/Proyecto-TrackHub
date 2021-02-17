import Usuario from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Rol from '../models/Rol';
import { json } from 'express';
//Renderisamos pestana Administraccion general
export const inicioAdmin = async (req, res) => {
    const sms = req.flash('errors');
    res.render('AdminGeneral/AdminGeneral', sms);
}
//Regitro para usuarios
export const registroAdmin = async (req, res) => {
    const sms = req.flash('errors');
    res.render('users/signupAdm', sms, );
}

export const singinAdm = async (req, res) => {
    //Validamos campos
    const { cedula, nombre, apellido, correo, contrasenia, roles } = req.body;
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
        res.render('users/signupAdm', {err});
    } else {
        //Guardamos el objeto
        const newUser = new Usuario({
            cedula,
            nombre,
            apellido,
            correo,
            contrasenia: await Usuario.encryptPassword(contrasenia)
        })

        if (req.body.roles) {
            const foundRol = await Rol.find({ nombre: { $in: roles } });
            newUser.roles = foundRol.map((rol) => rol._id);
        } else {
            const rol = await Rol.findOne({ nombre: "Administrador_Cooperativo" });
            newUser.roles = [rol._id];
        }
        const savedUser = await newUser.save();
        console.log(savedUser)

        // Creamos un token
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        req.session.token = token;
        req.session.save();
        res.redirect('/');
    }
};