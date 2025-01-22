const CartSchema = require('../schemas/CartSchema');

const get = (req, res) => {
    try {
        const cart = CartSchema.find({ _id: req.params.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json({ data: cart });
    } catch (error) {
        return res.status(400).json({ message: "Failed to get cart", error: error.message });
    }
}

const save = (req, res) => {
    try {
        const state = CartSchema.create(req.body);
        return res.status(200).json({ message: "success", data: state });
    } catch (error) {
        return res.status(400).json({ message: "Failed to register cart", error: error.message });
    }
}

module.exports = {
    get,
    save
}