const Router = require('express').Router;
const route = Router();

const { hello } = require('../controllers');

route.get('/hello', hello);


module.exports = route;