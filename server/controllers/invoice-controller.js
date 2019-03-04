const Invoice = require('../models/Invoice')
const Dokter = require('../models/Dokter')

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
    },

    findByYear: (req, res) =>{
        Invoice.aggregate([
            { $project: { _id: 0, year: { $year: "$dueDate" }}},
            { $group: { "_id": null, years: { $push: "$year" } } }
        ]
        , function(err, result){
            if(err){
                res.status(500).json(err)
            }
            let year = result[0].years.sort()
            let arr = year
            var filteredArray = arr.filter(function(item, pos){
                return arr.indexOf(item) == pos; 
              });
            res.status(200).json({
                data: filteredArray
            })
        });   
    },

    dataByYear: (req, res) =>{
        let yeear = 2019
        Invoice.aggregate([{
            $group: {
                _id: {
                    year: {
                        $year: '$dueDate',
                    },
                },
                result: {
                    $push: '$$ROOT'
                }
            }
        }])
        .exec(function (error, result) {
            if (error) { 
                return next(error); 
            }
            res.status(200).json(result)
        });
    },

    findData: (req, res) =>{
        let yeear = 2019
        Invoice.find({ 
            $expr: {
                $eq: [{ $year: "$dueDate" }, yeear]
            }
        })   
        .populate('dokterId')
        .populate('medicines._id')
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
}