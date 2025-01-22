const CartSchema = require('../schemas/CartSchema');

const get = async (req, res) => {
    try {
        const cart = await CartSchema.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json({ message: "success", data: cart });
    } catch (error) {
        return res.status(400).json({ message: "Failed to get cart", error: error.message });
    }
}

const save = async (req, res) => {
    try {
        const state = await CartSchema.create(req.body);
        return res.status(200).json({ message: "success", data: state });
    } catch (error) {
        return res.status(400).json({ message: "Failed to register cart", error: error.message });
    }
}

module.exports = {
    get,
    save
}