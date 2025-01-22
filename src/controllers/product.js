const ProductSchema = require('../schemas/ProductSchema');

const save = async (req, res) => {
    const product = req.body;
    const state = await ProductSchema.create(product);
    return res.status(200).json({ message: "success", data: state });
}

const list = async (req, res) => {
    const products = await ProductSchema.find({});
    return res.status(200).json({ message: "success", data: products });
}

const detail = async (req, res) => {
    const { id } = req.params;
    const product = await ProductSchema.findById(id);
    return res.status(200).json({ message: "success", data: product });
}

module.exports = {
    list,
    detail,
    save
}