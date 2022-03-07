require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const usersApi = require('./controllers/usersapi')

require('./utils/dbmongo');

app.get('/', (req, res) => {
    res.send('Mierda mundo')
});

app.get('/api/users', usersApi.getUser)
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});