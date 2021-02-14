const Ruta = require('../models/Ruta');


export const getRutaPrincipal = async (req, res) => {
   const Rutas = await Ruta.find({}).lean();
   res.render('rutas/ruta', { Rutas });
}
export const createRuta = async (req, res) => {
   const { origen, destino,precio } = req.body;
   const errors = [];
   if (!origen) {
      errors.push({ text: 'Ingrese el origen de la Ruta' });
   }
   if (!destino) {
      errors.push({ text: 'Ingrese el destino de la Ruta' });
   }
   if (!precio) {
      errors.push({ text: 'Ingrese el precio de la Ruta' });
   }
   if (errors.length > 0) {
      const rut = await Ruta.find({}).lean();
      res.render('/guardarRuta/add', { rut,errors});
   } else {
      const newRuta = new Ruta({
         origen,
         destino,
         precio

      });
      await newRuta.save();
      console.log(newRuta);
      res.redirect('/guardarRuta/add')
   }
}

//modificar
export const enabledRuta = async (req, res) => {
   const { id } = req.params;
   const rut = await Ruta.findById(id);
   rut.estado = !rut.estado;
   await rut.save();
   console.log(rut);
   res.redirect('/guardarRuta/add')
}

export const getRutaById = async (req, res) => {
   const Ruta = await Ruta.findById(req.params.id);
   res.render('partials/modificar_Ruta_formulario', { Ruta });
}
export const updateRutaById = async (req, res) => {
   const { id } = req.params;
   const rut = await Ruta.findById(id).lean();
   res.render('rutas/frm_editRutas', { rut })
}

export const editarRutaById = async (req, res) => {
   const { origen, destino,precio } = req.body;
   const err = [];
   if (!origen) {
      err.push({ text: 'Ingrese el nuevo origen de la Ruta' });
   }
   if (!destino) {
      err.push({ text: 'Ingrese el nuevo destino de la Ruta' });
   }
   if (!precio) {
      err.push({ text: 'Ingrese el nuevo precio de la Ruta' });
   }
   if (err.length > 0) {
      const { id } = req.params;
      const rut = await Ruta.findById(id).lean();
      res.render('rutas/frm_editRutas', { rut,err},)
   } else {
   
   const ruta = await Ruta.findByIdAndUpdate(req.params.id, {
      origen,
      destino,
      precio
   });
   console.log(ruta);
   res.redirect('/guardarRuta/add');
}
}        