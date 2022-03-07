const User = require('../models/user');

const getUser = async(req, res) => {
    let data;
    try {
        data = await User.find({'username': req.body.username, 'password': req.body.password}, )
        res.status(200).json(data);
    } catch (error) {
        console.log('Error:', error)
    }
}

const user = {
    getUser
}

module.exports = user