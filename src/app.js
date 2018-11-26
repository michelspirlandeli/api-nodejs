const express = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const app    = express();
const router = express.Router();

//Connecta ao banco
mongoose.connect('mongodb://michel:michel10@ds041177.mlab.com:41177/dbndstr');

//Carrega os Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//carregar as rotas
const indexRoute   = require('./routes/indexRoute');
const productRoute = require('./routes/productRoute');
const customerRoute = require('./routes/customerRoute');
const orderRoute = require('./routes/orderRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;