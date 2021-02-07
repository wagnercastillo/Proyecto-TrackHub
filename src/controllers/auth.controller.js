import Usuario from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Rol from '../models/Rol';
import { json } from 'express';

export const obtenerFrmUsuario = async (req, res) => {
    res.render('users/signup');
 }

export const signUp = async (req, res) =>{
    const {nombreUsuario, email, contrasenia, roles}=req.body;
    //Verificar si el usuario existe
    Usuario.find({email})
    const newUsuario= new Usuario({
        nombreUsuario,
        email,
        contrasenia: Usuario.encryptPassword(contrasenia)
    })
    if(roles){
        const foundRoles = await Rol.find({name: {$in: roles}})
        newUsuario.roles=foundRoles.map(rol => rol._id)
    }else{
        const rol=await Rol.findOne({name: "cliente"})
        newUsuario.roles=[rol._id];
    }
    const saveUsuario =await newUsuario.save();
    
    const token=  jwt.sign({id:saveUsuario._id},config.SECRET,{expiresIn: 84600
    })
    res.status(200).json({token})
}
export const signIp = async (req, res) =>{
    const userFound = await (await Usuario.findOne({email: req.body.email})).populated("roles");
    if(!userFound )return res.status(400).json({message: 'user not found'})

    const matchContrasenia= await Usuario.comparePassword(req.body.contrasenia, userFound.contrasenia)
    if(!matchContrasenia) return res.status(401).json({token: null, message:' Contrasenia Invalidad'})
    
    const token= jwt.sign({id: userFound._id}, config.SECRET,{
        expiresIn:86400
    })
    res.json({token})
}