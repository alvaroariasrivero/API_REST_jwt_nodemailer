const routes = require('express').Router();
const productApi = require('../controllers/productsApi');
const protectedRoutes = require('../middlewares/verifiedToken')



/***************RUTAS PARA LA API*****************/
// http://localhost:3000/api/products/5?API_KEY="hola123"
// http://localhost:3000/api/products/3
// http://localhost:3000/api/products
routes.get('/products/:id?', protectedRoutes, productApi.getProduct);
routes.post('/products', protectedRoutes, productApi.createProduct); // se pide API_KEY para crear productos

module.exports = routes;