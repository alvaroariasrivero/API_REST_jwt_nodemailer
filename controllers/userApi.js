const jwt = require('jsonwebtoken');
const User = require('../models/user');
const transporter = require('../config/nodemailer');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const loginUser = async(req, res) => {
    let data;
    try {
        data = await User.findOne({'email': req.body.email, 'password': req.body.password}, '-_id -__v');
        if(data){
            const {email, username} = data;
            const userForToken = {
                email: email,
                username: username,
            };
            const token = jwt.sign(userForToken, jwt_secret, {expiresIn: '20m'});
            await User.updateOne({ email: email }, { token: token })
            res
            // .cookie('access_token', token, {
            //     httpOnly: true,
            //     secure: false,
            // })
            .status(200)
            .json({
                msg:'Correct authentication',
                token: token});
        }else {
            res.json({ msg: 'Incorrect user or password'});
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

const signUpUser = async(req, res) => {
    let data;
    try {
        data = await User.create({'email': req.body.email, 'password': req.body.password, 'username': req.body.username});
        res.status(201).json(data);
    } catch (error) {
        console.log('Error:', error);
    }
};

const recoverPassword = async(req, res) => {
    try {
        const recoverToken = jwt.sign({email: req.params.email}, jwt_secret, {expiresIn: '20m'});
        const url = "http://localhost:3000/api/resetPassword/" + recoverToken;
        await transporter.sendMail({
            to: req.params.email,
            subject: 'Recover Password',
            html: `<h3>Recover Password</h3>
                <a href = ${url}>Click to recover password</a>
                <p>Link will expire in 48 hours</p>`
        });
        res.status(200).json({
            message: 'A recovery email has been sent to your mail direction'
        })
    } catch (error) {
        console.log('Error:', error)
    }
};

const resetPassword = async(req, res) => {
    try {
        const recoverToken = req.params.recoverToken;
        const payload = jwt.verify(recoverToken, jwt_secret);
        await User.findOneAndUpdate(
            {email: payload.email},
            {password: req.body.password}
        );
        res.status(200).json({message: 'Password actualized'});
    } catch (error) {
        console.log('Error:', error);
    }
}

const logout = async(req, res) => {
    let data;
    try {
        data = await User.updateOne({ token: req.params.userToken }, { $unset : { token : 1} });
        res.status(200).json({message: 'Token deleted'});
    } catch (error) {
        console.log('Error:', error);
    }
}

const user = {
    loginUser,
    signUpUser,
    recoverPassword,
    resetPassword,
    logout
};

module.exports = user;