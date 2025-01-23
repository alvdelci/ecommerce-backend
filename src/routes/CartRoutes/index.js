const Router = require('express').Router;
const route = Router();

const cartController = require('../../controllers/CartController');

route.get('/:id', cartController.get);
route.post('/', cartController.save);
route.delete('/:id', cartController.remove);

module.exports = route;