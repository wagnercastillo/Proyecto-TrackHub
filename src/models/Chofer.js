import {
    Schema,
    model
} from 'mongoose'
const Chofer = new Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    imageURL: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Chofer', Chofer);