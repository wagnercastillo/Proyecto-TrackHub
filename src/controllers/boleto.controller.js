const Boleto = require('../models/Boleto');

export const getBoletoPrincipal = async (req, res) => {
    const boletos = await Boleto.find({}).lean();
    res.render('boleto/Boleto', {
        boletos
    });

}

export const createdBoletos = async (req, res) => {

    const {
        
        
        fecha,
   
    } = req.body;
    const rr = [];
  
    if (!fecha) {
        rr.push({
            text: 'Ingrese la fecha '
        });
    }
   
    if (rr.length > 0) {
        const boleteria = await Boleto.find({}).lean();
        res.render('boleto/Boletos', {
            boleteria,
            rr
        });
    } else {
        //Revisar aqui en caso de error
        const newBoleto = new Boleto({
            
            fecha

        });
        await newBoleto.save();
        
        res.redirect('/Boleteria/add')
    }
}

export const updateBoletoById = async (req, res) => {
    const {
        id
    } = req.params;
    const boleto = await Boleto.findById(id).lean();
    res.render('Unidad/editUnidad', {
        boleto
    })
}

export const editarBoletoById = async (req, res) => {
    const {
        
        placa,
        marca,
        modelo,
        capacidad,

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
    if (!capacidad) {
        rr.push({
            text: 'Ingrese la capacidad de la unidad'
        });
    }

    if (rr.length > 0) {
        const {
            id
        } = req.params;
        const unid = await Boleto.findById(id).lean();
        res.render('Unidad/editUnidad', {
            unid,
            rr
        }, )
    } else {



        const unidades = await Boleto.findByIdAndUpdate(req.params.id, {
            placa,
            marca,
            modelo,
            capacidad


        });
        console.log(unidades);
        res.redirect('/Boleteria/add');
    }
}