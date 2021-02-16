import { Schema, model } from 'mongoose';
import bcrypt  from 'bcryptjs'

const usuarioBD = new Schema({
    cedula: {
        type: String,
        unique: true
    },
    nombre: {
        type: String,
        unique: true
    },
    apellido: {
        type: String,
        unique: true
    },
    correo: {
        type: String,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    estado:{
        type:Boolean,
        required: true, 
        default:true
    },  
    roles: [{
        ref: "Rol",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

usuarioBD.statics.encryptPassword = async (contrasenia) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contrasenia, salt);
};
usuarioBD.statics.comparePassword = async (contrasenia, receiveContrasenia) => {
    return await bcrypt.compare(contrasenia, receiveContrasenia)
  }
export default model('Usuario', usuarioBD);
