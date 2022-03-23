const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const transporter = require('../config/nodemailer');
const regex = require('../utils/regex');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const urlRecoverPassword = process.env.URL_RECOVER;
const saltRounds = 10;

const loginUser = async(req, res) => {
    let data;
    try {
        const {email, password} = req.body
        data = await User.findOne({'email': email}, '-_id -__v');
        if(!data){
            res.status(400).json({ msg: 'Incorrect user or password'}); 
        }else{
            const match = await bcrypt.compare(password, data.password);
            if(match){
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
                res.status(400).json({ msg: 'Incorrect user or password'});
            }
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
        if(regex.validateEmail(email) && regex.validatePassword(password)){
            data = await User.create({'email': email, 'password': hashPassword, 'username': username, 'logged': false});
            res.status(201).json(data);
        }else{
            res.status(400).json({msg: 'Invalid email or password'});
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

const recoverPassword = async(req, res) => {
    try {
        const recoverToken = jwt.sign({email: req.params.email}, jwt_secret, {expiresIn: '20m'});
        const url = `${urlRecoverPassword}/api/resetpassword/` + recoverToken;
        await transporter.sendMail({
            to: req.params.email,
            subject: 'Recover Password',
            html: `<h3>Recover Password</h3>
                <a href = ${url}>Click to recover password</a>
                <p>Link will expire in 20 minutes</p>`
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
        if(regex.validatePassword(password)){
            const hashPassword = await bcrypt.hash(password, saltRounds);
            await User.findOneAndUpdate(
                {email: payload.email},
                {password: hashPassword}
            );
        }else{
            res.status(400).json({msg: 'Password must have at least 8 characters, one uppercase, one lowercase and one special character'});
        }
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