const moongose = require('mongoose')
const Schema = moongose.Schema;

const medicineSchema = new Schema({
    medicineCode: String,
    medicineName: String,
    type: String,
    price: String,
    unit: String,
    deleteAt :{
        type: Date,
        default: null
    }
},{
    timestamps: true
});

const Medicine = moongose.model('Medicine', medicineSchema);
module.exports = Medicine