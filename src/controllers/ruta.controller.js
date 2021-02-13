const Ruta = require('../models/Ruta');

const cloudinary = require('cloudinary');
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');

export const Principal = async (req, res) => {
   const Rutas = await Ruta.find({}).lean();
   res.render('frm_Principal', { Rutas });
   console.log(Rutas)
}

export const getRutaPrincipal = async (req, res) => {
   const Rutas = await Ruta.find({}).lean();
   res.render('rutas/ruta', { Rutas });
}
export const createRuta = async (req, res) => {
   const { nombre, direccion } = req.body;
   const errors = [];
   if (!nombre) {
      errors.push({ text: 'Ingrese el nombre de la Ruta' });
   }
   if (!direccion) {
      errors.push({ text: 'Ingrese el direccion de la Ruta' });
   }
   if (!req.file) {
      errors.push({ text: 'No ha selecionado el logo de la Ruta' });
   }
   if (errors.length > 0) {
      const Rutas = await Ruta.find({}).lean();
      res.render('Rutas/frm_regRuta', { Rutas, errors });
   } else {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const newCoperativa = new Ruta({
         nombre,
         direccion,
         imageURL: result.url,
         public_id: result.public_id
      });
      await newCoperativa.save();
      await fs.unlink(req.file.path)
      res.redirect('/guardarRuta/add')
   }
}

//modificar
export const enabledRuta = async (req, res) => {
   const { id } = req.params;
   const coop = await Ruta.findById(id);
   coop.estado = !coop.estado;
   await coop.save();
   res.redirect('/guardarRuta/add')
}

export const getRutaById = async (req, res) => {
   const Ruta = await Ruta.findById(req.params.id);
   res.render('partials/modificar_Ruta_formulario', { Ruta });
}
export const updateRutaById = async (req, res) => {
   const { id } = req.params;
   const coop = await Ruta.findById(id).lean();
   res.render('Rutas/frm_editRuta', { coop })
}

export const editarRutaById = async (req, res) => {
   const { nombre, direccion } = req.body;
   const errors = [];
   if (!nombre) {
      errors.push({ text: 'Ingrese el nombre de la Ruta' });
   }
   if (!direccion) {
      errors.push({ text: 'Ingrese el direccion de la Ruta' });
   }
   if (!req.file) {
      errors.push({ text: 'No ha selecionado el logo de la Ruta' });
   }
   if (errors.length > 0) {
      const { id } = req.params;
      const coop = await Ruta.findById(id).lean();
      res.render('Rutas/frm_editRuta', { coop,errors},)
   } else {
   
   const result = await cloudinary.v2.uploader.upload(req.file.path);

   const Ruta = await Ruta.findByIdAndUpdate(req.params.id, {
      nombre,
      direccion,
      imageURL: result.url,
      public_id: result.public_id

   });
   console.log(Ruta);
   res.redirect('/guardarRuta/add');
}
}        