const Dokter = require('../models/Dokter')

module.exports = {
    addDokter: (req, res) =>{
        Dokter.find({
            dokterCode: req.body.dokterCode
        })
        .then(response =>{
            if(response.length === 0){
                Dokter.create({
                    dokterCode: req.body.dokterCode,
                    name: req.body.name,
                    specialist: req.body.specialist,
                    address: req.body.address,
                    gender: req.body.gender,
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
                    msg: `Kode Dokter already registered`
                })
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    findAllDokter: (req, res) =>{
        Dokter.find({})
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

    editDokter: (req, res) =>{
        Dokter.findByIdAndUpdate({
            _id: req.params.id
        },{
            dokterCode: req.body.dokterCode,
            name: req.body.name,
            specialist: req.body.specialist,
            address: req.body.address,
            gender: req.body.gender,
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

    deleteDokter: (req, res) =>{
        Dokter.findOneAndDelete({
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