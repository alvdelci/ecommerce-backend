const Router = require('express').Router;
const route = Router();

const { get, register } = require('../controllers/cart');
const { list, detail, save } = require('../controllers/product');
const { verifyRequiredFields } = require('../middlewares');

route.get('/product', list);
route.get('/product/:id', detail);
route.post('/product', verifyRequiredFields, save);

route.get('/cart', get);
route.post('/cart', register);

module.exports = route;