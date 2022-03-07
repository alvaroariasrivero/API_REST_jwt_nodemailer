const mongoose = require("mongoose");

const url = process.env.URL_MONGO;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", error => console.log(error));
db.once('open', () => console.log('Conexión con BD establecida'))

module.exports = mongoose;