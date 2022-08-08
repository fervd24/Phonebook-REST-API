const express = require('express');
const { login } = require('../controllers/auth');
const { isValidEmail, isValidPwd } = require('../middlewares/validations');
const router = express.Router();

router.post('/login', isValidEmail, isValidPwd, login);

module.exports = router;