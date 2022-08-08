const express = require('express');
const router = express.Router();

const { 
    getUsers, 
    postUser,
    putUser,
    delUser,
} = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');
const { 
    isValidEmail,
    isValidPwd 
} = require('../middlewares/validations');

router.get('/', getUsers);
router.post('/', isValidEmail, isValidPwd, postUser);
router.put('/:id',isValidEmail, isValidPwd, putUser );
router.delete('/:id',validateJWT, delUser);

module.exports = router;