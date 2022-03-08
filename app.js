const express = require('express');
require('dotenv').config();
require('./utils/dbmongo');

const usersApiRouter = require('./routes/userApi');
const productApiRouter = require('./routes/productApi.js');
const errors = require('./middlewares/errors');

const app = express();
const port = 3000;

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hola mundo')
});

//Rutas API
app.use('/api', usersApiRouter);
app.use('/api', productApiRouter);

//Capture All 404 errors
app.use(errors.error404);
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});