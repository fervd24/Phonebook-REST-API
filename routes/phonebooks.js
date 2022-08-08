
const { Router } = require("express");
const router = Router();
const {
    isValidId, isValidContactInputs
} = require("../middlewares/validations");
const alreadyExist = require("../middlewares/alreadyExist");
const { 
    getPhones, 
    postPhone, 
    putPhone, 
    delPhone 
} = require("../controllers/phonebooks");
const { validateJWT } = require("../middlewares/validate-jwt");

router.get('/' ,validateJWT , getPhones);

router.post('/', validateJWT, isValidContactInputs, postPhone);

router.put('/:id', isValidId, validateJWT, isValidContactInputs, putPhone);

router.delete('/:id' , isValidId, validateJWT, delPhone)

module.exports = router;
