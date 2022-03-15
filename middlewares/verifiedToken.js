const express = require('express');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const protectedRoutes = express.Router();

protectedRoutes.use((req, res, next) => {
    const token = req.headers['access_token'];

    if (token) {
      jwt.verify(token, jwt_secret, (err, decoded) => {      
        if (err) {
          return res.json({ msg: 'Invalid token' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          msg: 'Token not provided' 
      });
    }
 });

 module.exports = protectedRoutes;