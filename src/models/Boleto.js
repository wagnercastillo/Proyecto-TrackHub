import {
    Schema,
    model
} from 'mongoose'
const Boleto = new Schema({
    
    fecha: {
        type: Date,
        deafult: Date.now,
        required: true
    }
   
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Boleto', Boleto);