const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required...']
    },
    email: {
        type: String,
        required: [true, 'The email is required...'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required...']
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = model('User', userSchema);