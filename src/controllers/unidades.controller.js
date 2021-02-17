const Unidad = require('../models/Unidad');
      //renderizamos vista de administracion de unidades
      export const getUnidadPrincipal = async (req, res) => {
         const unidades = await Unidad.find({}).lean();
         res.render('Unidad/Unidades', {
            unidades
         });
        
      }
//creamos unidades
      export const createdUnidades = async (req, res) => {

         const {
            capacidad,
            marca,
            modelo,
            placa,
            correoChofer

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
         if (!correoChofer) {
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
               capacidad,
               correoChofer

            });
            await newUnidad.save();
            console.log(newUnidad);
            res.redirect('/guardarUnidades/add')
         }
      }

      //modificar el estado de la unidad
      export const enabledUnidades = async (req, res) => {
         const {
            id
         } = req.params;
         const unidades = await Unidad.findById(id);
         unidades.estado = !unidades.estado;
         await unidades.save();
         res.redirect('/guardarUnidades/add')
      }

      export const getUnidadById = async (req, res) => {
         const unidades = await Unidad.findById(req.params.id);
         res.render('Unidad/editUnidad', {
            unidades
         });
      }
      //redirigimos al formulario de modificacion

      export const updateUnidadesById = async (req, res) => {
         const {
            id
         } = req.params;
         const unid = await Unidad.findById(id).lean();
         res.render('Unidad/editUnidad', {
            unid
         })
      }
//editamos las unidades con los datos del formulario

      export const editarUnidadById = async (req, res) => {
         const {
            placa, 
            marca,
            modelo,
            capacidad,
            correoChofer
           
         } = req.body;
         const rr = [];
         if (!placa) {
            rr.push({
               text: 'Ingrese el nombre de la placa'
            });
         }
         if (!marca) {
            rr.push({
               text: 'Ingrese el nombre de la marca'
            });
         }
         if (!modelo) {
            rr.push({
               text: 'Ingrese del nombre del modelo'
            });
         }
         if (!correoChofer) {
            rr.push({
               text: 'a'
            });
         }
         if (!capacidad) {
            rr.push({
               text: 'Ingrese la capacidad de la unidad'
            });
         }
        
         if (rr.length > 0) {
            const {
               id
            } = req.params;
            const unid = await  Unidad.findById(id).lean();
            res.render('Unidad/editUnidad', {
               unid,
               rr
            }, )
         } else {

            

            const unidades = await Unidad.findByIdAndUpdate(req.params.id, {
               placa,
               marca,
               modelo,
               capacidad,
               correoChofer
            });
            console.log(unidades);
            res.redirect('/guardarUnidades/add');
         }
      }