const express = require('express')
const router = express.Router()
const {addInvoice, findInvoice, findByYear, dataByYear, findData, removeInvoice, getOne, AnalisaMedicine} = require('../controllers/invoice-controller')

router.post('/', addInvoice)
router.post('/findData', findData)
router.get('/', findInvoice)
router.delete('/:id', removeInvoice)
router.get('/databyyear', dataByYear)
router.get('/year', findByYear)
router.get('/:id', getOne)
router.post('/medicine', AnalisaMedicine)

module.exports = router