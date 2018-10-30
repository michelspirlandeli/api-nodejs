const express = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const app    = express();
const router = express.Router();

//Connecta ao banco
mongoose.connect('mongodb://michel:michel10@ds041177.mlab.com:41177/dbndstr');

//Carrega os Models
const Product = require('./models/product');

//carregar as rotas
const indexRoute   = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;