const CartService = require('../services/CartService');

const get = async (req, res) => {
    const cart = await CartService.get(req.params.id);
    res.status(cart.code).json(cart);
}

const save = async (req, res) => {
    const cart = await CartService.save(req.body);
    res.status(cart.code).json(cart);
}

const remove = async (req, res) => {
    const cart = await CartService.remove(req.params.id);
    res.status(cart.code).json(cart);
}

module.exports = {
    get,
    save,
    remove
}