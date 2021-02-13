const Unidad = require('../models/Unidades');

const cloudinary = require('cloudinary');
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');

export const Principal = async (req, res) => {
   const cooperativas = await Cooperativa.find({}).lean();
   res.render('frm_Principal', { cooperativas });
   console.log(cooperativas)
}

export const getUnidades = async (req, res) => {
   const Unidades = await Unidad.find({}).lean();
   res.render('Unidad/Unidades', { Unidades });
}
export const createUnidades = async (req, res) => {
   const { nombre, direccion } = req.body;
   console.log('hola');
   const result = await cloudinary.v2.uploader.upload(req.file.path);
   const newCoperativa = new Cooperativa({
      nombre,
      direccion,
      imageURL: result.url,
      public_id: result.public_id
   });
   await newCoperativa.save();
   await fs.unlink(req.file.path)
   res.redirect('/guardarCooperativa/add')
}

//modificar
export const enabledUnidades = async (req, res) => {
   const { id } = req.params;
   const coop= await Cooperativa.findById(id);
   coop.estado=!coop.estado;
   await coop.save();
   res.redirect('/guardarCooperativa/add')
}

export const getUnidadesById = async (req, res) => {
   const cooperativa = await Cooperativa.findById(req.params.id);
   res.render('partials/modificar_cooperativa_formulario', { cooperativa });
}
export const updateUnidadesaById = async (req, res) => {
   const { id } = req.params;
   const coop= await Cooperativa.findById(id);
   res.render('cooperativas/modificar_cooperativa',{coop})
   //const { nombre, direccion } = req.body;
   //await Cooperativa.findByIdAndUpdate(req.params.id, { nombre, direccion });
   //res.redirect('/guardarCooperativa/add');
}

export const deleteUnidadesById = async (req, res) => {

}