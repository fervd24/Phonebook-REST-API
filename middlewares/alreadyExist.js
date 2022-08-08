const { request } = require("express");
const PhoneBook = require("../models/phonebook");

const alreadyExist = async(req = request, res, next) => {
    const { name, phone } = req.body;

    const nameAlreadyExist = await PhoneBook.findOne({name});
    const phoneAlreadyExist = await PhoneBook.findOne({phone});
    
    if(nameAlreadyExist) {
        return res.status(400).json({
            status: 'Failed name error',
            message: 'This name is already registered'
        });  
    }

    if(phoneAlreadyExist) {
        return res.status(400).json({
            status: 'Failed phone error',
            message: 'This number is already registered'
        });
    }
    
    next();
}

module.exports = alreadyExist;