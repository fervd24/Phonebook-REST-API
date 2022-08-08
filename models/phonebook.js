const {Schema, model} = require('mongoose');

const PhoneBookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    uid: {
        type: String,
        required: true
    }
});

const PhoneBook = model('PhoneBook', PhoneBookSchema);

module.exports = PhoneBook;