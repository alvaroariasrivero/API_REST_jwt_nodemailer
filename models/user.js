const mongoose = require('mongoose');

const objectSchema = {
    username: String,
    email: String,
    password: String,
    logged: Boolean
}

const userSchema = mongoose.Schema(objectSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;