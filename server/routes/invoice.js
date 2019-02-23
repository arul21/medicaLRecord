const express = require('express')
const router = express.Router()
const {addInvoice, findInvoice, removeInvoice, getOne} = require('../controllers/invoice-controller')

router.post('/', addInvoice)
router.get('/', findInvoice)
router.delete('/:id', removeInvoice)
router.get('/:id', getOne)

module.exports = router