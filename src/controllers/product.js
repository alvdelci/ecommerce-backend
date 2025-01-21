const ProductSchema = require('../schemas/ProductSchema');

const list = async (req, res) => {
    const products = await ProductSchema.find({});
    return res.status(200).json({ data: products });
}

const detail = async (req, res) => {
    const { id } = req.params;
    const product = await ProductSchema.findById(id);
    return res.status(200).json({ data: product.toJSON() });
}

module.exports = {
    list,
    detail
}