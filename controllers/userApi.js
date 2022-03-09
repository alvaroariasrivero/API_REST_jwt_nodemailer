const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = process.env.ULTRA_SECRET_KEY

const loginUser = async(req, res) => {
    let data;
    try {
        data = await User.findOne({'email': req.body.email, 'password': req.body.password}, '-_id -__v')
        if(data){
            const {email, username} = data;
            const userForToken = {
                email: email,
                username: username,
            }
            const token = jwt.sign(userForToken, config, {expiresIn: '1d'})
            res.cookie('jwt',
                token,{
                    httpOnly: true,
                    secure: false //Set to true in production
                })
                .status(200).json({
                email: email,
                username: username,
                msg:'Correct authentication',
                token: token});
        }else {
            res.json({ msg: 'Incorrect user or password'})
        }
    } catch (error) {
        console.log('Error:', error)
    }
}

const signUpUser = async(req, res) => {
    let data;
    try {
        data = await User.create({'email': req.body.email, 'password': req.body.password, 'username': req.body.username})
        res.status(200).json(data);
    } catch (error) {
        console.log('Error:', error)
    }
}

const user = {
    loginUser,
    signUpUser
}

module.exports = user