const routes = require('express').Router();
const userApi = require('../controllers/userApi')

routes.post('/login', userApi.loginUser);
routes.post('/signup', userApi.signUpUser);
routes.get('/logout/:email', userApi.logout)
routes.get('/recoverpassword/:email', userApi.recoverPassword);
routes.put('/resetpassword/:recoverToken', userApi.resetPassword);

module.exports = routes;