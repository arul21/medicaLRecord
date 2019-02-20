const express = require('express');
const router = express.Router();
const users = require('./users')
const medicine = require('./medicine')
/* GET home page. */

router.use('/api/users', users)
router.use('/api/medicine', medicine)

module.exports = router;
