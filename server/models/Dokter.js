const moongose = require('mongoose')
const Schema = moongose.Schema

const dokterSchema = new Schema({
    dokterCode: String,
    name: String,
    specialist: String,
    address: String,
    gender: String,
    contact: String,
    deleteAt:{
        type: Date,
        default: null
    }
},{
    timestamps: true
})

const Dokter = moongose.model('Dokter', dokterSchema);
module.exports = Dokter