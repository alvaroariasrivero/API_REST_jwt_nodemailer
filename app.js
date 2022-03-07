require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

require('./utils/dbmongo');

app.get('/', (req, res) => {
    res.send('Mierda mundo')
});
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});