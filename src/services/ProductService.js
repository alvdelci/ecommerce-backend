const ProductSchema = require('../schemas/ProductSchema');

const save = async (data) => {
    try {
        const product = await ProductSchema.create(data);
        return { code: 201, message: "success", data: product };
    } catch (error) {
        return { code: 400, message: "Failed to register product", error: error.message };
    }
}

const list = async () => {
    try {
        const products = await ProductSchema.find({});
        return { code: 200, message: "success", data: products };
    } catch (error) {
        return { code: 400, message: "Failed to get products", error: error.message };
    }
}

const detail = async (id) => {
    try {
        const product = await ProductSchema.findById(id);
        if (!product) {
            return { code: 404, message: "Product not found" };
        }
        return { code: 200, message: "success", data: product };
    } catch (error) {
        return { code: 400, message: "Failed to get product", error: error.message };
    }
}

module.exports = {
    save,
    list,
    detail
}