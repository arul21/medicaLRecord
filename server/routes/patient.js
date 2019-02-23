const express = require('express')
const router = express.Router()
const {addPatient, findAllPatient, editPatient, deletePatient} = require('../controllers/patient-controller')

router.post('/', addPatient)
router.get('/', findAllPatient)
router.put('/:id', editPatient)
router.delete('/:id', deletePatient)

module.exports = router