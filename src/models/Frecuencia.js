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
    valor_frec: {
        type: Boolean,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    rutas: [{
        ref: "rutas",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Frecuencia', Frecuencia);