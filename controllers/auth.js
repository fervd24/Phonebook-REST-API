const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateJWT = require('../helper/generate-jwt');

const login = async(req, res) => {

    const {email, password} = req.body;
    try {

        const existUser = await User.findOne({email});
        
        if(!existUser) {
            return res.status(400).json({
                msg: 'This email is not registered, please sign up.'
            })
        }
        
        const isCorrectPwd = bcrypt.compareSync(password, existUser.password);
        
        if(!isCorrectPwd) {
            return res.status(400).json({
                msg: 'The password is not correct!'
            })
        }

        const token = await generateJWT(existUser.id);

        res.json({
            msg: 'login ok',
            data: existUser.id,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
}

module.exports = {
    login
}