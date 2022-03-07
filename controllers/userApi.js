const User = require('../models/user');

const loginUser = async(req, res) => {
    let data;
    try {
        data = await User.find({'email': req.body.email, 'password': req.body.password}, '-_id')
        res.status(200).json(data);
    } catch (error) {
        console.log('Error:', error)
    }
}

const user = {
    loginUser
}

module.exports = user