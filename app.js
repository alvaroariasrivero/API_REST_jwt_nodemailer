const express = require('express');
const app = express();
const port = 3000;
const usersApiRouter = require('./routes/userApi');
const productApiRouter = require('./routes/productApi');
const errors = require('./middlewares/errors');

app.use(express.json())

require('dotenv').config();
require('./utils/dbmongo');

app.get('/', (req, res) => {
    res.send('Hola mundo')
});

//Rutas API
app.use('/api', usersApiRouter);
app.use('/api',productApiRouter);

//Capture All 404 errors
app.use(errors.error404);
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});