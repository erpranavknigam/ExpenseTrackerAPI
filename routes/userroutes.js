const express = require('express');
const auth = require('../controllers/userController');

const router = express.Router();

router.post('/signup', auth.signup);
router.post('/login',auth.login)
module.exports = router;
