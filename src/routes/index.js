const Router = require('express').Router;
const route = Router();

const cartController = require('../controllers/cart');
const productController = require('../controllers/product');
const customerController = require('../controllers/customer');
const middleware = require('../middlewares');

route.get('/product', productController.list);
route.get('/product/:id', productController.detail);
route.post('/product', middleware.verifyProductRequiredFields, productController.save);

route.get('/cart/:id', cartController.get);
route.post('/cart', cartController.save);
route.delete('/cart/:id', cartController.remove);

route.post('/customer', [middleware.verifyCustomerRequiredFields, middleware.verifyEmailAlreadyExists], customerController.save);
route.get('/customer/:id', customerController.get);

module.exports = route;