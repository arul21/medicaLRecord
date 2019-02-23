const express = require('express');
const router = express.Router();
const users = require('./users')
const medicine = require('./medicine')
const dokter = require('./dokter')
const patient = require('./patient')
const invoice = require('./invoice')
/* GET home page. */

router.use('/api/users', users)
router.use('/api/medicine', medicine)
router.use('/api/dokter', dokter)
router.use('/api/patient', patient)
router.use('/api/invoice', invoice)

module.exports = router;
