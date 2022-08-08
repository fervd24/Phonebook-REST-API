const { request } = require("express");

const isValidId = (req = request, res, next) => {
    const { id } = req.params;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            status: 'Failed',
            message: 'id is not valid'
        })
    }

    next();
}

const isValidEmail = (req = request, res, next) => {
    const { email } = req.body;
    const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if(email === undefined || email === null) {
        return res.status(400).json({
            status: "Failed",
            msg: "Please enter an email..."
        }) 
    }

    if(!regexEmail.test(email)) {
        return res.status(400).json({
            status: "Failed",
            msg: "The email doesn't have a correct format"
        })
    }

    next();
}

const isValidPwd = (req = request, res, next) => {
    const {password} = req.body;

    if(password === undefined || password === null) {
        return res.status(400).json({
            status: "Failed",
            msg: "Please enter a password"
        })
    }

    if(password.length < 8) {
        return res.status(400).json({
            status: "Failed",
            msg: "The password must have 8 characters or more."
        })
    }

    next();
}

const isValidContactInputs = (req= request, res, next) => {
    const { name, phone } = req.body;
        if(!name) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Please enter a name'
            })
        }
        if(!phone) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Please enter a phone number'
            })
        }

        next();
}

module.exports = {
    isValidId,
    isValidEmail,
    isValidPwd,
    isValidContactInputs
};