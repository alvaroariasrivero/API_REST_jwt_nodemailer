const express = require('express');
const jwt = require('jsonwebtoken');
const config = process.env.ULTRA_SECRET_KEY;

const protectedRoutes = express.Router();

protectedRoutes.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
      jwt.verify(token, config, (err, decoded) => {      
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