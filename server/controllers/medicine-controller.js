const Medicine = require('../models/Medicine')

module.exports = {
    addMedicine: (req, res) =>{
        let medicineCode = req.body.medicineCode
        Medicine.find({
            medicineCode: medicineCode
        })
        .then(response =>{
            if(response.length === 0){
                Medicine.create({
                    medicineCode: req.body.medicineCode,
                    medicineName: req.body.medicineName,
                    type: req.body.type,
                    price: req.body.price,
                    unit: req.body.unit,
                })
                .then(result =>{
                    res.status(201).json(result)
                })
                .catch(err =>{
                    res.status(500).json({
                        msg: `Please input data incorrect`
                    })
                })
            } else {
                res.status(400).json({
                    msg: `Medicine already registered`
                })
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    findAllMedicine: (req, res) =>{
        Medicine.find({})
        .then(response =>{
            if(response.length === 0){
                res.status(200).json({
                    msg: `Data not found`,
                })
            } else {
                res.status(200).json(response)
            }
        })
        .catch(err =>{
            res.status(500).json({
                msg: `Data not found`
            })
        })
    },

    editMedicine: (req, res) =>{
        Medicine.findByIdAndUpdate({
            _id: req.params.id
        },{
            medicineCode: req.body.medicineCode,
            medicineName: req.body.medicineName,
            type: req.body.type,
            price: req.body.price,
            unit: req.body.unit,
        })
        .then(response =>{
            res.status(201).json({
                msg: `Succesfully Update`,
                data: response
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    deleteMedicine: (req, res) =>{
        Medicine.findOneAndDelete({
            _id: req.params.id
        })
        .then(response =>{
            res.status(200).json({
                msg: `succes delete`
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
}