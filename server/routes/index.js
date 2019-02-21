const express = require('express');
const router = express.Router();
const users = require('./users')
const medicine = require('./medicine')
const dokter = require('./dokter')
/* GET home page. */

router.use('/api/users', users)
router.use('/api/medicine', medicine)
router.use('/api/dokter', dokter)

module.exports = router;
