const CartSchema = require('../schemas/CartSchema');

const get = (req, res) => {
    const { id } = req.params;
    const cart = CartSchema.find({ _id: id });
    return res.status(200).json({ data: cart });
}

const register = (req, res) => {
    const cart = req.body;
    const state = CartSchema.create(cart);
    return res.status(200).json(state);
}

module.exports = {
    get,
    register
}