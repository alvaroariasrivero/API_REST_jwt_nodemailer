const routes = require('express').Router();
const userApi = require('../controllers/userApi')

routes.post('/user', userApi.loginUser);

module.exports = routes;