const Turno = require('../models/Turno');
const fs = require('fs-extra');
const Frecuencias = require('../models/Frecuencia');
const Unidad = require('../models/Unidad');

export const getTurnoPrincipal = async (req, res) => {
   const Turnos = await Turno.find({}).lean();
   const Frecuencia = await Frecuencias.find({}).lean();
   const unidad = await Unidad.find({}).lean();
   res.render('turnos/turno', {
      Turnos, Frecuencia, unidad
   });
}
export const createTurno = async (req, res) => {
   const {
      hora,
      minuto
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
      });
      await newTurno.save();
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
   res.render('turnos/frm_editTurnos', {
      tur
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

