const Cooperativa = require('../models/Cooperativa');
import Usuario from '../models/User'

///Autentificacion en caludirani
const cloudinary = require('cloudinary');
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');
//Reireccion de los perfiles
export const Principal = async (req, res) => {
   ///
   const user = req.session.usuActivo;
   const roles = req.session.roles;
   if (roles != null) {
      for (let i = 0; i < roles.length; i++) {
         if (roles[i].nombre === "Administrador_General") {
            req.flash('gen_msg', 'general')
         }
         if (roles[i].nombre === "Administrador_Cooperativo") {
            req.flash('cop_msg', 'cooperativa')
         }
         if (roles[i].nombre === "Cliente") {
            console.log('cliente......................................')
            req.flash('cli_msg', 'cliente')
         }
      }
   }
   if (user != null) {
      req.flash('perfil', user.nombre + " " + user.apellido);
   }
   const activo = req.flash('perfil');
   const cli = req.flash('cli_msg')
   const gen = req.flash('gen_msg')
   const coo = req.flash('cop_msg')
   const cooperativas = await Cooperativa.find({}).lean();
   res.render('frm_Principal', { cooperativas, cli, gen, coo, user, activo });
   //console.log(cooperativas)
   console.log('roles...........................')

   console.log('usuario...........................')
}
//Renderizamos la pestana cooperativas
export const getCooperativaPrincipal = async (req, res) => {
   const cooperativas = await Cooperativa.find({}).lean();
   const usuarios = await Usuario.find({}).lean();
   res.render('cooperativas/frm_regCooperativa', { cooperativas, usuarios });
}
//Creamos cooperativa
export const createCooperativa = async (req, res) => {
   //Verificacion de campos vacios
   console.log('verificacion de repeticion');
   const { nombre, direccion, externalIDP , cedula} = req.body;
   const errors = [];
   if (!cedula) {
      errors.push({
         text: 'Selecione un Usuario'
      });
   }
   if (!nombre) {
      errors.push({
         text: 'Ingrese el nombre de la Cooperativa'
      });
   }
   if (!direccion) {
      errors.push({
         text: 'Ingrese el direccion de la Cooperativa'
      });
   }
   if (!req.file) {
      errors.push({
         text: 'No ha selecionado el logo de la Cooperativa'
      });
   }
   //Verificamos si un usuario ya es gerente
   const us = await Usuario.findOne({ cedula: cedula});
   const co = await Cooperativa.findOne({ externalIDP: us._id});
   console.log(co)
   if(co!=null){
      errors.push({
         text: 'El usuario ya es Gerente'
      });
   }
   if (errors.length > 0) {
      const cooperativas = await Cooperativa.find({}).lean();
      const usuarios = await Usuario.find({}).lean();
      res.render('cooperativas/frm_regCooperativa', { cooperativas, usuarios ,errors});

   } else {
      //Guardamos el registro
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const newCoperativa = new Cooperativa({
         nombre,
         direccion,
         imageURL: result.url,
         public_id: result.public_id
      });

      const user = await Usuario.findOne({ cedula: cedula});
      console.log(user)
      newCoperativa.externalIDP = [user._id];

      console.log('//////////////////////////')
      
      await newCoperativa.save();  
      await fs.unlink(req.file.path)
      res.redirect('/guardarCooperativa/add')
   }
}

//modificar
export const enabledCooperativa = async (req, res) => {
   const {
      id
   } = req.params;
   const coop = await Cooperativa.findById(id);
   coop.estado = !coop.estado;
   await coop.save();
   res.redirect('/guardarCooperativa/add')
}
//rendorisamos la pestana modificat
export const getCooperativaById = async (req, res) => {
   const cooperativa = await Cooperativa.findById(req.params.id);
   res.render('partials/modificar_cooperativa_formulario', {
      cooperativa
   });
}
//Editamos los campos de cooperativa
export const updateCooperativaById = async (req, res) => {
   const {
      id
   } = req.params;
   const coop = await Cooperativa.findById(id).lean();
   res.render('cooperativas/frm_editCooperativa', {
      coop
   })
}
//Obtenemos el id del usuario para asignar como gerente
export const obtenerID = async (req, res) => {
   const {
      id
   } = req.params;
   const usu = await Usuario.findById(id).lean();
   const cooperativas = await Cooperativa.find({}).lean();
   res.render('cooperativas/frm_regCooperativa', { usu, cooperativas});
}
//Editamos cooperativa
export const editarCooperativaById = async (req, res) => {
   //Validacion de campos
   const {
      nombre,
      direccion
   } = req.body;
   const errors = [];
   if (!nombre) {
      errors.push({
         text: 'Ingrese el nombre de la Cooperativa'
      });
   }
   if (!direccion) {
      errors.push({
         text: 'Ingrese el direccion de la Cooperativa'
      });
   }
   if (!req.file) {
      errors.push({
         text: 'No ha selecionado el logo de la Cooperativa'
      });
   }
   if (errors.length > 0) {
      const {
         id
      } = req.params;
      const coop = await Cooperativa.findById(id).lean();
      res.render('cooperativas/frm_editCooperativa', { coop, errors },)
   } else {

      const result = await cloudinary.v2.uploader.upload(req.file.path);

      const cooperativa = await Cooperativa.findByIdAndUpdate(req.params.id, {
         nombre,
         direccion,
         imageURL: result.url,
         public_id: result.public_id

      });
      console.log(cooperativa);
      res.redirect('/guardarCooperativa/add');
   }
}   