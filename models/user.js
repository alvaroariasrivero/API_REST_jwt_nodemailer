const mongoose = require('mongoose');

const objectSchema = {
    username: {
        type: String, 
        unique : true,
        require: true
    },
    email: {
        type: String, 
        unique : true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    logged: Boolean
}

const userSchema = mongoose.Schema(objectSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;