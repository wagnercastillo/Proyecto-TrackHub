const Unidad = require('../models/Unidad');

      export const getUnidadPrincipal = async (req, res) => {
         const unidades = await Unidad.find({}).lean();
         res.render('Unidad/Unidades', {
            unidades
         });
        
      }

      export const createdUnidades = async (req, res) => {

         const {
            capacidad,
            marca,
            modelo,
            placa,

         } = req.body;
         const rr = [];
         if (!placa) {
            rr.push({
               text: 'Ingrese el numero de la placa '
            });
         }
         if (!marca) {
            rr.push({
               text: 'Ingrese el campo de la marca de la unidad'
            });
         }
         if (!modelo) {
            rr.push({
               text: 'Ingrese el modelo de la unidad'
            });
         }
         if (!capacidad) {
            rr.push({
               text: 'Ingrese la capacidad de la unidad'
            });
         }

         if (rr.length > 0) {
            const unidades = await Unidad.find({}).lean();
            res.render('Unidad/Unidades', {
               unidades,
               rr
            });
         } else {
            //Revisar aqui en caso de error
            const newUnidad = new Unidad({
               placa,
               marca,
               modelo,
               capacidad

            });
            await newUnidad.save();
            console.log(newUnidad);
            res.redirect('/guardarUnidades/add')
         }
      }

      //modificar
      export const enabledUnidades = async (req, res) => {
         const {
            id
         } = req.params;
         const unidades = await Unidad.findById(id);
         unidades.estado = !unidades.estado;
         await unidades.save();
         res.redirect('/guardarCooperativa/add')
      }

      export const getUnidadById = async (req, res) => {
         const unidades = await Unidad.findById(req.params.id);
         res.render('partials/modificar_cooperativa_formulario', {
            cooperativa
         });
      }
      export const updateUnidadesById = async (req, res) => {
         const {
            id
         } = req.params;
         const coop = await Cooperativa.findById(id).lean();
         res.render('cooperativas/frm_editCooperativa', {
            coop
         })
      }

      export const editarUnidadById = async (req, res) => {
         const {
            nombre,
            direccion
         } = req.body;
         const errors = [];
         if (!nombre) {
            rr.push({
               text: 'Ingrese el nombre de la Cooperativa'
            });
         }
         if (!direccion) {
            rr.push({
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
            res.render('cooperativas/frm_editCooperativa', {
               coop,
               errors
            }, )
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