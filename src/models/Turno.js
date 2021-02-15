import {
    Schema,
    model
} from 'mongoose'
const Turno = new Schema({
    hora: {
        type: Number,
        required: true
    },
    minuto: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true,
    versionKey: false
});
module.exports = model('Turno', Turno);