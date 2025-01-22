const ProductSchema = require('../schemas/ProductSchema');

const save = async (req, res) => {
    const product = req.body;
    try {
        const state = await ProductSchema.create(product);
        return res.status(200).json({ message: "success", data: state });
    } catch (error) {
        return res.status(400).json({ message: "Failed to register product", error: error.message });
    }
}

const list = async (req, res) => {
    try {
        const products = await ProductSchema.find({});
        return res.status(200).json({ message: "success", data: products });
    } catch (error) {
        return res.status(400).json({ message: "Failed to get products", error: error.message });
    }
}

const detail = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductSchema.findById(id);
        return res.status(200).json({ message: "success", data: product });
    } catch (error) {
        return res.status(400).json({ message: "Failed to get product", error: error.message });
    }
}

module.exports = {
    list,
    detail,
    save
}