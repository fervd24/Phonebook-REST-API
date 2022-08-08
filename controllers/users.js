const User = require('../models/user');
const bcrypt = require('bcrypt');


const getUsers = async(req, res) => {
    try {      
        const users = await User.find();

        if(!users) {
            res.status(404).json({
                status: "Failed",
                message: "No data on users"
            })
        }

        res.status(200).json({
            status: "Succes",
            data: users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}

const postUser = async(req, res) => {
    try {
        
        const body = req.body;
        const email = body.email;
        const pwd = body.password;
        
        const newUser = new User(body);

        const isAlreadyEmail = await User.findOne({email});

        if(isAlreadyEmail) {
            return res.status(422).json({
                status: "Failed",
                message: "Email already exist"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pwd, salt);

        newUser.password = hash;
        await newUser.save();

        return res.status(200).json({
            status: "Succes",
            data: newUser
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}

const putUser = async(req, res) => {
    try {
        const body = req.body;
        const {id} = req.params;
        const pwd = body.password;

        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(pwd, salt);

        const updUser = await User.findByIdAndUpdate(id, body);

        if(!updUser) {
            return res.status(400).json({
                status: "Update Failed",
                msg: "An user with this id didn't exist"
            });
        }

        return res.status(200).json({
            status: "Update Succes",
            data: updUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
}

const delUser = async(req, res) => {
    try {
        const {id} = req.params;
    
        const uid = req.uid;

        const delUser = await User.findByIdAndDelete(id);
    
        if(!delUser) {
            res.status(400).json({
                status: "Delete Failed",
                msg: "The user doesn't exist"
            });
        }
    
        return res.status(200).json({
            status: "Delete Succes",
            data: delUser,
            uid
        })    
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'ServerError'
        })
    }
}

module.exports = {
    getUsers,
    postUser,
    putUser,
    delUser
}