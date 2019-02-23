const Patient = require('../models/Patient')

module.exports = {
    addPatient: (req, res) =>{
        Patient.find({
            patientCode: req.body.patientCode
        })
        .then(response =>{
            if(response.length === 0){
                Patient.create({
                    patientCode: req.body.patientCode,
                    patientName: req.body.patientName,
                    age: req.body.age,
                    gender: req.body.gender,
                    address: req.body.address,
                    contact: req.body.contact
                })
                .then(response =>{
                    res.status(201).json(response)
                })
                .catch(err =>{
                    res.status(500).json({
                        msg: `Please input data incorrect`,
                        err: err
                    })
                })
            } else {
                res.status(400).json({
                    msg: `Kode Pasien already registered`
                })
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    findAllPatient: (req, res) =>{
        Patient.find({})
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
                msg: `Server Error`,
                err: err
            })
        })
    },

    editPatient: (req, res) =>{
        Patient.findByIdAndUpdate({
            _id: req.params.id
        },{
            patientCode: req.body.patientCode,
            patientName: req.body.patientName,
            age: req.body.age,
            gender: req.body.gender,
            address: req.body.address,
            contact: req.body.contact
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

    deletePatient: (req, res) =>{
        Patient.findOneAndDelete({
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