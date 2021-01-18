import { Schema, model } from 'mongoose';
import bcrypt  from 'bcryptjs'
const usuarioBD = new Schema({
    nombreUsuario: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Rol",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

usuarioBD.static.encryptPassword=async (contrasenia) =>{
    const salt= bcrypt.genSalt(10)
    return await bcrypt.hash(contrasenia, salt)
}
usuarioBD.static.comparePassword=async (contrasenia, receiveContrasenia) =>{
    return await bcrypt.compare(contrasenia, receiveContrasenia)
}
export default model('Usuario', usuarioBD);
