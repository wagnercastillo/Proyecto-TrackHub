import Usuario from '../models/User'

export const Principal = async (req, res) => {
   
    
    res.render('Usuario/OpcionesUsuario')
}

export const getConfiguracion = async (req, res) => {

    const usu = req.session.usuActivo;
    res.render('Usuario/Configuracion',{usu})

}
//editamos la contraseña
export const editarcontrasenia = async (req, res) => {
    const {
       contra,
       nuevacontra,
       confirmnuevacontra
    } = req.body;
    const errors = [];
    if (!contra) {
        errors.push({
          text: 'Contraseña incorrecta'
       });
    }
    if (!confirmnuevacontra) {
        errors.push({
          text: 'Confirmacion de la contraseña nueva erronea'
       });
    }
    if (!nuevacontra) {
       errors.push({
          text: 'nueva contraseña con problemas'
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
//cambiamos el estado del usuario
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
 
//renderizamos el historial
export const getHistorial = async (req, res) => {

    res.render('Usuario/Historial')

}
