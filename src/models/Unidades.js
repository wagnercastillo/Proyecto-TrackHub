import {
    Schema,
    model
} from 'mongoose'
const Unidades = new Schema({
    capacidad: {
        type: Number,
        required: true
    },
    marca: {
        type: String,
        requerid: true
    },
    modelo: {
        type: String,
        requerid: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Unidades', Unidades);