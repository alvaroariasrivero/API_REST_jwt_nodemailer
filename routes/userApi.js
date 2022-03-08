const routes = require('express').Router();
const userApi = require('../controllers/userApi')

routes.post('/login', userApi.loginUser);
routes.post('/signup', userApi.signUpUser);
// routes.post('/logout', (req, res) => {
//     if (req.cookies['jwt']) {
//         res
//         .clearCookie('jwt')
//         .status(200)
//         // .redirect(
//         //     '/'
//         // )
//     } else {
//         res.status(401).json({
//             error: 'Invalid jwt'
//         })
//     }
// });

module.exports = routes;