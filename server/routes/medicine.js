const express = require('express')
const router = express.Router()
const {addMedicine, findAllMedicine, editMedicine, deleteMedicine} = require('../controllers/medicine-controller')

router.post('/', addMedicine)
router.get('/', findAllMedicine)
router.put('/:id', editMedicine)
router.delete('/:id', deleteMedicine)


module.exports = router