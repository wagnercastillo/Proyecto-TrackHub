import {
    Schema,
    model
} from 'mongoose'
const Frecuencia = new Schema({
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    estado_frec: {
        type: Boolean,
        required: true,
        default: true
    },
    tipo_frec: {
        type: Boolean,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Frecuencia', Frecuencia);