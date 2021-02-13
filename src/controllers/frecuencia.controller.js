const Frecuencia = require('../models/Frecuencia');

const cloudinary = require('cloudinary');
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');

export const getFrecuenciaPrincipal = async (req, res) => {
   const Frecuencias = await Frecuencia.find({}).lean();
   res.render('frecuencias/frecuencia', { Frecuencias });
}
export const createFrecuencia = async (req, res) => {
   const { nombre, direccion } = req.body;
   const errors = [];
   if (!nombre) {
      errors.push({ text: 'Ingrese el nombre de la Frecuencia' });
   }
   if (!direccion) {
      errors.push({ text: 'Ingrese el direccion de la Frecuencia' });
   }
   if (!req.file) {
      errors.push({ text: 'No ha selecionado el logo de la Frecuencia' });
   }
   if (errors.length > 0) {
      const Frecuencias = await Frecuencia.find({}).lean();
      res.render('Frecuencias/frm_regFrecuencia', { Frecuencias, errors });
   } else {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const newCoperativa = new Frecuencia({
         nombre,
         direccion,
         imageURL: result.url,
         public_id: result.public_id
      });
      await newCoperativa.save();
      await fs.unlink(req.file.path)
      res.redirect('/guardarFrecuencia/add')
   }
}

//modificar
export const enabledFrecuencia = async (req, res) => {
   const { id } = req.params;
   const coop = await Frecuencia.findById(id);
   coop.estado = !coop.estado;
   await coop.save();
   res.redirect('/guardarFrecuencia/add')
}

export const getFrecuenciaById = async (req, res) => {
   const Frecuencia = await Frecuencia.findById(req.params.id);
   res.render('partials/modificar_Frecuencia_formulario', { Frecuencia });
}
export const updateFrecuenciaById = async (req, res) => {
   const { id } = req.params;
   const coop = await Frecuencia.findById(id).lean();
   res.render('Frecuencias/frm_editFrecuencia', { coop })
}

export const editarFrecuenciaById = async (req, res) => {
   const { nombre, direccion } = req.body;
   const errors = [];
   if (!nombre) {
      errors.push({ text: 'Ingrese el nombre de la Frecuencia' });
   }
   if (!direccion) {
      errors.push({ text: 'Ingrese el direccion de la Frecuencia' });
   }
   if (!req.file) {
      errors.push({ text: 'No ha selecionado el logo de la Frecuencia' });
   }
   if (errors.length > 0) {
      const { id } = req.params;
      const coop = await Frecuencia.findById(id).lean();
      res.render('Frecuencias/frm_editFrecuencia', { coop, errors },)
   } else {

      const result = await cloudinary.v2.uploader.upload(req.file.path);

      const Frecuencia = await Frecuencia.findByIdAndUpdate(req.params.id, {
         nombre,
         direccion,
         imageURL: result.url,
         public_id: result.public_id

      });
      console.log(Frecuencia);
      res.redirect('/guardarFrecuencia/add');
   }
} 