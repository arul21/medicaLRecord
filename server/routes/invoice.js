const express = require('express')
const router = express.Router()
const {addInvoice, findInvoice, findByYear, dataByYear, findData, removeInvoice, getOne} = require('../controllers/invoice-controller')

router.post('/', addInvoice)
router.get('/', findInvoice)
router.delete('/:id', removeInvoice)
router.get('/databyyear', dataByYear)
router.get('/findData', findData)
router.get('/year', findByYear)
router.get('/:id', getOne)

module.exports = router