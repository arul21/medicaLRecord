const express = require('express')
const router = express.Router()
const {addDokter, findAllDokter, editDokter, deleteDokter} = require('../controllers/dokter-controller')

router.post('/', addDokter)
router.get('/', findAllDokter)
router.put('/:id', editDokter)
router.delete('/:id', deleteDokter)

module.exports = router