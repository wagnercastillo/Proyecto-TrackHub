import {
    Schema,
    model
} from 'mongoose'
const Persona = new Schema({
    cedula: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
        default: true
    
    }}, {
        timestamps: true,
        versionKey: false
});
module.exports = model('Persona', Persona);