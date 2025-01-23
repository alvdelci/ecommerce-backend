const Router = require('express').Router;
const route = Router();

const customerController = require('../../controllers/CustomerController');
const middleware = require('../../middlewares');

route.post('/', [middleware.verifyCustomerRequiredFields, middleware.verifyEmailAlreadyExists], customerController.save);
route.get('/:id', customerController.get);

module.exports = route;