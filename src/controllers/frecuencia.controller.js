const Frecuencia = require('../models/Frecuencia');
const Ruta = require('../models/Ruta');
import Usuario from '../models/User'

const rutas = [];
/**
 *renderizamos vista administradores
 *
 * @param {*} req -
 * @param {*} res - renderizamos vista administradores
 */
export const Principal = async (req, res) => {
   
   res.render('HomeAdministradores');
}

/**
 *renderizamos boleteria
 *
 * @param {*} req -
 * @param {*} res - renderizamos boleteria
 */
export const BoleteriaAdmin = async (req, res) => {
   res.render('AdBoleteria/AdBoleteria');
}

/**
 *renderizamos configuraciones de cuenta
 *
 * @param {*} req -
 * @param {*} res - renderizamos configuraciones de cuenta
 */
export const CuentaAdmin = async (req, res) => {
   res.render('Usuario/Configuracion', {});
}

/**
 *rederizamos la ventana de administracion de frecuencias
 *
 * @param {*} req -
 * @param {*} res - rederizamos la ventana de administracion de frecuencias
 */
export const getFrecuenciaPrincipal = async (req, res) => {
   const Frecuencias = await Frecuencia.find({}).lean();
   const Rutas = await Ruta.find({}).lean();
   res.render('frecuencias/frecuencia', { Frecuencias, Rutas });
}

/**
 *renderizamos la vista a los datos del administrador
 *
 * @param {*} req - usuario activo
 * @param {*} res - renderizamos la vista a los datos del administrador
 */
export const getConfiguracion = async (req, res) => {

   const usu = req.session.usuActivo;
   res.render('Usuario/Configuracion', { usu })

}

/**
 *creamos frecuencias
 *
 * @param {*} req - valores del formulario
 * @param {*} res - creamos frecuencias
 */
export const createFrecuencia = async (req, res) => {
   const { origen, destino, valor_frec, duracion } = req.body;
   const error = [];
   if (!origen) {
      error.push({ text: 'Ingrese el nombre de la Frecuencia' });
   }
   if (!destino) {
      error.push({ text: 'Ingrese el direccion de la Frecuencia' });
   }
   if (!valor_frec) {
      error.push({ text: 'Ingrese el direccion de la Frecuencia' });
   }
   if (!duracion) {
      error.push({ text: 'Ingrese el direccion de la Frecuencia' });
   }
   if (error.length > 0) {
      const frecuencias = await Frecuencia.find({}).lean();
      res.render('frecuencias/frecuencia', { frecuencias, error });
   } else {
      //const result = await cloudinary.v2.uploader.upload(req.file.path);
      const newFrecuencia = new Frecuencia({
         origen,
         destino,
         valor_frec,
         duracion,
         rutas
      });
      await newFrecuencia.save();
      rutas.splice();
      console.log(newFrecuencia)
      res.redirect('/guardarFrecuencia/add')
   }
}

/**
 *modificar el estado 
 *
 * @param {*} req - identificador de la frecuencia
 * @param {*} res - modificar el estado 
 */
export const enabledFrecuencia = async (req, res) => {
   const { id } = req.params;
   const frecu = await Frecuencia.findById(id);
   frecu.estado_frec = !frecu.estado_frec;
   await frecu.save();
   res.redirect('/guardarFrecuencia/add')
}

export const getFrecuenciaById = async (req, res) => {
   const Frecuencia = await Frecuencia.findById(req.params.id);
   res.render('partials/modificar_Frecuencia_formulario', { Frecuencia });
}

/**
 *redirigimos al formulario de modificacion
 *
 * @param {*} req - identificador de la frecuencia
 * @param {*} res - redirigimos al formulario de modificacion
 */
export const updateFrecuenciaById = async (req, res) => {
   const { id } = req.params;
   const frec = await Frecuencia.findById(id).lean();
   const Rutas = await Ruta.find({}).lean();
   res.render('Frecuencias/frm_editFrecuencia', { frec , Rutas})
}

/**
 *editamos las frecuencias con los datos del formulario
 *
 * @param {*} req - cuerpo del formulario
 * @param {*} res - redirige a la pagina de administracion de frecuencias
 */
export const editarFrecuenciaById = async (req, res) => {
   const { origen, destino, valor_frec, duracion } = req.body;
   const error = [];
   if (!origen) {
      error.push({ text: 'Ingrese el nombre de la Frecuencia' });
   }
   if (!destino) {
      error.push({ text: 'Ingrese el direccion de la Frecuencia' });
   }
   if (!valor_frec) {
      error.push({ text: 'Ingrese el nombre de la Frecuencia' });
   }
   if (!duracion) {
      error.push({ text: 'Ingrese el direccion de la Frecuencia' });
   }
   if (error.length > 0) {
      const { id } = req.params;
      const frec = await Frecuencia.findById(id).lean();
      res.render('Frecuencias/frm_editFrecuencia', { frec, error },)
   } else {

      const frecuencia = await Frecuencia.findByIdAndUpdate(req.params.id, {
         origen,
         destino,
         valor_frec,
         duracion,
         rutas
      });
      console.log(frecuencia);
      res.redirect('/guardarFrecuencia/add');
   }
}

/**
 *asignamos ruta
 *
 * @param {*} req - identificador de la ruta
 * @param {*} res - 
 */
export const asignarRutas = async (req, res) => {
   const ruta = await Ruta.findById(req.params.id); 
   rutas.push(ruta);
}

/**
 *lista rutas
 *
 * @param {*} req - identificador de la ruta
 * @param {*} res - 
 */
export const rutasAsignadas = async (req, res) => {
   const lista = [];
   const frecuencia = Frecuencia.findById(req.params.id);
   for (let x = 0; x < frecuencia.rutas.length; x++) {
      for (let y = 0; y < Ruta.length; y++) {
         if (frecuencia.rutas[x] == Ruta._id[y]) {
            lista.push(Ruta[y]);
         }
      }
   }
   console.log(lista)
}
/**
 *obtenemos datos de usuario activo
 *
 * @param {*} req - identificador del usuario
 * @param {*} res - 
 */
export const getDatos = async (req, res) => {

   const usu = req.session.usuActivo;
   res.render('frecuencias/Configuracion', { usu })

}