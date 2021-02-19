const express = require('express')
const bodyParser = require('body-parser')
const db = require('./src/prestart/dbConnection')
const auth = require('./src/routes/auth')
const cardsGetters = require('./src/routes/cardsGetters')
const app = express();
db.dbConnection();
db.initCards(true)
db.usersTable()

app.use(((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    next();
}))
app.use(bodyParser.json())
app.use(auth)
app.use(cardsGetters)
app.listen(8080);
