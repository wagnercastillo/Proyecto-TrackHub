import {
    Schema,
    model
} from 'mongoose'
const Ruta = new Schema({
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }}, {
        timestamps: true,
        versionKey: false
});
module.exports = model('Ruta', Ruta);