const Router = require('express').Router;
const route = Router();

const { get, save } = require('../controllers/cart');
const { list, detail } = require('../controllers/product');

route.get('/product', list);
route.get('/product/:id', detail);
route.get('/cart', get);
route.post('/cart', save);


module.exports = route;