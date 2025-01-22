const CartSchema = require('../schemas/CartSchema');

const get = (req, res) => {
    const { id } = req.params;
    try {
        const cart = CartSchema.find({ _id: id });
        return res.status(200).json({ data: cart });
    } catch (error) {
        return res.status(400).json({ message: "Failed to get cart", error: error.message });
    }
}

const save = (req, res) => {
    const cart = req.body;
    try {
        const state = CartSchema.create(cart);
        return res.status(200).json({ message: "success", data: state });
    } catch (error) {
        return res.status(400).json({ message: "Failed to register cart", error: error.message });
    }
}

module.exports = {
    get,
    save
}