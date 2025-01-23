const Router = require('express').Router;
const route = Router();

const productController = require('../../controllers/ProductController');
const middleware = require('../../middlewares');

route.get('/', productController.list);
route.get('/:id', productController.detail);
route.post('/', middleware.verifyProductRequiredFields, productController.save);

module.exports = route;