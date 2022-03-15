const routes = require('express').Router();
const userApi = require('../controllers/userApi')

routes.post('/login', userApi.loginUser);
routes.post('/signup', userApi.signUpUser);
routes.get('/logout/:userToken', userApi.logout)
routes.get('/recoverpassword/:email', userApi.recoverPassword);
routes.put('/resetpassword/:recoverToken', userApi.resetPassword);
// routes.post('/logout', (req, res) => {
//     if (req.cookies['access_token']) {
//         res
//         .clearCookie('access_token')
//         .status(200)
//         .json({
//         msg: 'Token deleted'
//         })
//     } else {
//         res.status(401).json({
//             error: 'Invalid jwt'
//         })
//     }
// });

module.exports = routes;