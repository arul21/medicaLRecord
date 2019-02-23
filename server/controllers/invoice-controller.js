const Invoice = require('../models/Invoice')

module.exports = {
    addInvoice: (req, res) =>{
        Invoice.find({
            invoiceCode: req.body.invoiceCode
        })
        .then(response =>{
            if(response.length === 0){
                let medic = req.body.medicines
                Invoice.create({
                    invoiceCode: req.body.invoiceCode,
                    dueDate: req.body.dueDate,
                    dokterId: req.body.dokterId,
                    patientId: req.body.patientId,
                    penyakit: req.body.penyakit,
                    total: req.body.total,
                    medicines: req.body.medicines
                })
                .then(response=>{
                    res.status(201).json(response)
                })
                .catch(err =>{
                    console.log(err);
                    
                    res.status(500).json({
                        msg: `Please input data incorrect`,
                        err: err
                    })
                })
            } else {
                res.status(400).json({
                    msg: `Kode Invoice already registered`
                })
            }
        })
        .catch(err =>{
            console.log(`err`, err);
            
            res.status(500).json(err)
        })
    },

    findInvoice: (req, res) =>{
        Invoice.find({})
        .populate('dokterId')
        .populate('patientId')
        .populate('medicines._id')
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    removeInvoice: (req, res) =>{
        Invoice.findByIdAndRemove({
            _id: req.params.id
        })
        .then(response =>{
            res.status(200).json({
                msg: `Succesfully delete`,
                data: response
            })
        })
        .catch(err =>{
            res.status(500).json({
                msg: `Server Error`,
                data: err
            })
        })
    },

    getOne: (req, res) =>{
        Invoice.findById({
            _id: req.params.id
        })
        .populate('dokterId')
        .populate('patientId')
        .populate('medicines._id')
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err =>{
            res.status(500).json({
                msg: `Server Error`,
                data: err
            })
        })
    }
}