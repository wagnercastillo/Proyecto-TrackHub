import Usuario from '../models/User'

export const Principal = async (req, res) => {
   
    
    res.render('Usuario/OpcionesUsuario')

}

export const getConfiguracion = async (req, res) => {

    const usu = req.session.usuActivo;
    res.render('Usuario/Configuracion',{usu})

}

export const editarcontrasenia = async (req, res) => {
    const {
       contra,
       nuevacontra,
       confirmnuevacontra
    } = req.body;
    const errors = [];
    if (!contra) {
        errors.push({
          text: 'Ingrese el nombre de la Cooperativa'
       });
    }
    if (!confirmnuevacontra) {
        errors.push({
          text: 'Ingrese el nombre de la Cooperativa'
       });
    }
    if (!nuevacontra) {
       errors.push({
          text: 'Ingrese el direccion de la Cooperativa'
       });
    }
    if (errors.length > 0) {
       const usu = req.session.usuActivo;
       res.render('Usuario/Configuracion', { usu, errors },)
    } else {
        const usu = req.session.usuActivo;
        if((contra == usu.contrasenia) && (nuevacontra == confirmnuevacontra)){

        }
        const id = req.session.usuActivo._id;
       const usuario = await Usuario.findById(id, {
          
        nuevacontra
 
       });
       console.log(usuario);
       res.redirect('Usuario/Configuracion');
    }
 }  

 export const enabledUsuario = async (req, res) => {
    console.log('-----------')
    console.log(req.session.usuActivo._id)
    console.log('-----------')
    console.log(req.params)
    const id = req.session.usuActivo._id;
    const usu = await Usuario.findById(id);
    usu.estado = !usu.estado;
    usu.save();
    let token = req.session.destroy();
    res.redirect('/');
 }
 

export const getHistorial = async (req, res) => {

    res.render('Usuario/Historial')

}

/*


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
 */