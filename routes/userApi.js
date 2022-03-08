const routes = require('express').Router();
const userApi = require('../controllers/userApi')

routes.post('/user', userApi.loginUser);
routes.post('/signup', userApi.signUpUser);

module.exports = routes;