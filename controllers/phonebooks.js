const PhoneBook = require("../models/phonebook");

const getPhones = async(req, res) => {

    const uid = req.header('uid');

    try {
        const phoneBooks = await PhoneBook.find({uid});
        
        if(!phoneBooks) {
            return res.status(400).json({
                message: 'No data found'
            })
        }

        return res.status(200).json({
            status: 'Succes',
            data: {
                phoneBooks
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        })
    }   
}

const postPhone = async(req, res) => {
    const { name, phone } = req.body;
    const uid = req.header('uid');
    const phoneNumber = new PhoneBook({name, phone, uid});
    
    try {

        await phoneNumber.save();
        return res.status(201).json({
            status: 'Succes',
            data: {
                phoneNumber
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}

const putPhone = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, phone } = req.body;
        const uid = req.header('uid');
        
         const phoneBookEl = await PhoneBook.findByIdAndUpdate(id, {name, phone, uid});

        if(!phoneBookEl) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Cannot found any data from that id'
            })
        } 

        return res.status(200).json({
            status: 'Succesfully updated',
            data: phoneBookEl
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

const delPhone = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedPhoneBook = await PhoneBook.findByIdAndDelete(id);

        if(!deletedPhoneBook) {
            return res.status(400).json({
                status: 'Failed to delete',
                message: 'The item doesnt exist'
            })
        }

        return res.status(200).json({
            status: 'Succesfully deleted',
            data: deletedPhoneBook
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error'
        })
    }
}

module.exports = {
    getPhones,
    postPhone,
    putPhone,
    delPhone
}

