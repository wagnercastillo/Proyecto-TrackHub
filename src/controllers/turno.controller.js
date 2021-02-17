import { decodeBase64 } from 'bcryptjs';

const Turno = require('../models/Turno');
const fs = require('fs-extra');
const Frecuencias = require('../models/Frecuencia');
const Unidades = require('../models/Unidad');

const listunid = []
const unid = []
const frec = []
//renderizamos vista de administracion de turnos
export const getTurnoPrincipal = async (req, res) => {
   const Turnos = await Turno.find({}).lean();
   const Frecuencia = await Frecuencias.find({}).lean();
   const Unidad = await Unidades.find({}).lean();
//envio la frecuencia de un turno
   const listafrec = await Frecuencias.find({frec:Frecuencia._id})
   console.log(listafrec);
   console.log(Turnos)
   res.render('turnos/turno', {
      Turnos, Frecuencia, Unidad, listafrec
   });
}
//creamos turnos
export const createTurno = async (req, res) => {
   
  
   const {
      hora,
      minuto,
   } = req.body;
   const err = [];
   if (!hora) {
      err.push({
         text: 'Ingrese la hora de la Turno'
      });
   }
   if (!minuto) {
      err.push({
         text: 'Ingrese los minutos del de la Turno'
      });
    }
   if (err.length > 0) {
      const Turnos = await Turno.find({}).lean();
      res.render('turnos/turno', {
         Turnos,
         err
      });
   } else {
      const newTurno = new Turno({
         hora,
         minuto,
         frec,
         unid
      });
      await newTurno.save();
      console.log(newTurno)
      res.redirect('/guardarTurno/add')
   }
}
//modificar el estado
export const enabledTurno = async (req, res) => {
   const {
      id
   } = req.params;
   const tur = await Turno.findById(id);
   tur.estado = !tur.estado;
   await tur.save();
   res.redirect('/guardarTurno/add')
}

export const getTurnoById = async (req, res) => {
   const Turno = await Turno.findById(req.params.id);
   res.render('partials/modificar_Turno_formulario', {
      Turno
   });
}
//redirigimos al formulario de modificacion

export const updateTurnoById = async (req, res) => {
   const {
      id
   } = req.params;
   const tur = await Turno.findById(id).lean();
   const Frecuencia = await Frecuencias.find({}).lean();
   const Unidad = await Unidades.find({}).lean();
   res.render('turnos/frm_editTurnos', {
      tur, Frecuencia, Unidad
   })
}
//editamos los turnos con los datos del formulario

export const editarTurnoById = async (req, res) => {
   const {
      hora,
      minuto
   } = req.body;
   const err = [];
   if (!hora) {
      err.push({
         text: 'Ingrese la nueva hora del Turno'
      });
   }
   if (!minuto) {
      err.push({
         text: 'Ingrese los nuevos minutos del Turno'
      });
   }


   if (err.length > 0) {
      const {
         id
      } = req.params;
      const tur = await Turno.findById(id).lean();
      res.render('turnos/frm_editTurnos', {
         tur,
         err
      }, )
   } else {
      const Turn = await Turno.findByIdAndUpdate(req.params.id, {
         hora,
         minuto,
         frec,
         unid
      });
      console.log(Turn);
      res.redirect('/guardarTurno/add')
   }
}
//asignamos frecuencias al turno
export const asignarFrecuencias = async (req, res) => {
   frec.splice(0,1);
   const frecuencia = await Frecuencias.findById(req.params.id); 
   frec.push(frecuencia.id);
   listunid.push(frecuencia);
   console.log(frec)
}
//asignamos unidades al turno
export const asignarUnidades = async (req, res) => {
   unid.splice(0,1);
   const unidad = await Unidades.findById(req.params.id); 
   unid.push(unidad.id);
   console.log(unid)
}

