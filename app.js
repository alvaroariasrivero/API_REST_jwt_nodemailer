const express = require('express');
require('dotenv').config();
require('./utils/dbmongo');

const usersApiRouter = require('./routes/userApi');
const productApiRouter = require('./routes/productApi.js');
const errors = require('./middlewares/errors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', (req, res) => {
    res.render('home')
});
app.get('/login', (req, res) => {
    res.render('login')
});
app.get('/signup', (req, res) => {
    res.render('signup')
});
app.get('/products', (req, res) => {
    res.render('products')
});

//Rutas API
app.use('/api', usersApiRouter);
app.use('/api', productApiRouter);

//Capture All 404 errors
app.use(errors.error404);
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});