const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const transporter = require('../config/nodemailer');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const saltRounds = 10;

const loginUser = async(req, res) => {
    let data;
    try {
        const {email, password} = req.body
        data = await User.findOne({'email': email}, '-_id -__v');
        const match = await bcrypt.compare(password, data.password);
        if(data && match){
            await User.updateOne({ email: req.body.email }, { logged: true })
            const {email, username} = data;
            const userForToken = {
                email: email,
                username: username,
            };
            const token = jwt.sign(userForToken, jwt_secret, {expiresIn: '20m'});
            res
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
        const {email, password, username} = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        data = await User.create({'email': email, 'password': hashPassword, 'username': username, 'logged': false});
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
        const password = req.body.password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        await User.findOneAndUpdate(
            {email: payload.email},
            {password: hashPassword}
        );
        res.status(200).json({message: 'Password actualized'});
    } catch (error) {
        console.log('Error:', error);
    }
}

const logout = async(req, res) => {
    let data;
    try {
        data = await User.updateOne({ email: req.params.email }, { logged: false })
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