const mongoose = require('mongoose');

const objectSchema = {
    username: {type: String, unique : true},
    email: {type: String, unique : true},
    password: String,
    logged: Boolean
}

const userSchema = mongoose.Schema(objectSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;