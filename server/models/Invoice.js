const moongose = require('mongoose')
const Schema = moongose.Schema


const invoiceSchema = new Schema({
    invoiceCode: String,
    dueDate: Date,
    dokterId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Dokter'
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    penyakit: String,
    total: Number,
    medicines: [{
        _id: {
            type: Schema.Types.ObjectId, 
            ref: 'Medicine'
        },
        quantity: Number,
    }],
    cluster: Number,
    deleteAt: {
        type: Date,
        default: null
    }
},{
    timestamps: true
})

const Invoice = moongose.model('Invoice', invoiceSchema)
module.exports = Invoice