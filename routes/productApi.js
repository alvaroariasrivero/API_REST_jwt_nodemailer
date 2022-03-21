const routes = require('express').Router();
const productApi = require('../controllers/productsApi');
const protectedRoutes = require('../middlewares/verifiedToken')

routes.get('/products/:id?', protectedRoutes, productApi.getProduct);
routes.post('/products', protectedRoutes, productApi.createProduct); // se pide API_KEY para crear productos

module.exports = routes;