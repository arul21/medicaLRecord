const moongose = require('mongoose')
const Schema = moongose.Schema

const patientSchema = new Schema({
    patientCode: String,
    patientName: String,
    age: String,
    gender: String,
    address: String,
    contact: String,
    deleteAt: {
        type: Date,
        default: null
    }
},{
    timestamps: true
})

const Patient = moongose.model('Patient', patientSchema);
module.exports = Patient