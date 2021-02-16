const Turno = require('../models/Turno');
const fs = require('fs-extra');
const Frecuencias = require('../models/Frecuencia');
const Unidades = require('../models/Unidad');

const unid = {}
const frec = {}

export const getTurnoPrincipal = async (req, res) => {
   const Turnos = await Turno.find({}).lean();
   const Frecuencia = await Frecuencias.find({}).lean();
   const Unidad = await Unidad.find({}).lean();
   res.render('turnos/turno', {
      Turnos, Frecuencia, Unidad
   });
}

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
      console.log(Frec)
      console.log(unid)
      res.redirect('/guardarTurno/add')
   }
}
//modificar
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
export const updateTurnoById = async (req, res) => {
   const {
      id
   } = req.params;
   const tur = await Turno.findById(id).lean();
   const Frecuencia = await Frecuencias.find({}).lean();
   const unidad = await Unidad.find({}).lean();
   res.render('turnos/frm_editTurnos', {
      tur, Frecuencia, unidad
   })
}

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
         minuto
      });
      console.log(Turn);
      res.redirect('/guardarTurno/add')
   }
}

export const asignarFrecuencias = async (req, res) => {
   const frecuencia = await Frecuencias.findById(req.params.id); 
   frec = frecuencia;
}

export const asignarRutas = async (req, res) => {
   const unidad = await Unidades.findById(req.params.id); 
   unid = unidad;
}

