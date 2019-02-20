const User = require('../models/User')
const hash = require('../helpers/hash')

module.exports = {
    signin: (req, res) => {
        let user = req.body.user
        let password = req.body.password
        User.findOne({ user: user })
        .then(result => {
            if(hash.decode(password, result.password)) {
                res.status(200).json({
                    err: false,
                    msg: `Succesfully Login`,
                    user: result.user,
                    role: result.role,
                    token: hash.jwtEncode({
                        id: result._id,
                        user: result.user
                    })
                })
            } else {
                res.status(400).json({
                    message: "Password is wrong"
                })
            }
        })
        .catch(err => {
            console.log(err);
            
            res.status(500).json({
                err: err
            })
        })
    },

    signup: (req, res) => {
        let user = req.body.user
        let password = req.body.password
        User.find({ user: user })
        .then(result => {
            if (result.length === 0) {
                User.create({
                        user,
                        password
                    })
                    .then(newUser => {
                        res.status(201).json({
                            err: false,
                            message: `Success to add ${newUser.user}`,
                            data: newUser,
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: `Please input name & password incorrect`
                        })
                    })
            } else {
                res.status(400).json({
                    message: 'username already registered!'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    getUser : (req, res) =>{
        User.findById({
            _id: req.decoded.id
        })
        .then(result =>{
            let user = {
                user: result.user,
                _id: result._id,
                role: result.role
            }
            res.status(200).json(user)
        })
        .catch(err =>{
            res.status(500).json(err)
            console.log(`inii`,err);
        })
    }
}