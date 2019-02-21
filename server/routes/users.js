const express = require('express');
const router = express.Router();
const {isLogin} = require('../middlewares/auth')
const {signin, signup, getUser, getCurrentUser} = require('../controllers/user-controller')

/* GET users listing. */

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/', isLogin, getUser)
router.get('/:id', getCurrentUser)


module.exports = router;
