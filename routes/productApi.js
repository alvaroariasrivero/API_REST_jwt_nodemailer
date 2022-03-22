const routes = require('express').Router();
const productApi = require('../controllers/productsApi');
const protectedRoutes = require('../middlewares/verifiedToken')

routes.get('/products/:id?', protectedRoutes, productApi.getProduct);
routes.post('/products', protectedRoutes, productApi.createProduct);

module.exports = routes;