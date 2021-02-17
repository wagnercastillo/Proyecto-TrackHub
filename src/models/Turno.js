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
    frec: {
        ref: "frec",
        type: Schema.Types.ObjectId
    },
    unid: {
        ref: "unid",
        type: Schema.Types.ObjectId
    },
}, {
    timestamps: true,
    versionKey: false
});
module.exports = model('Turno', Turno);