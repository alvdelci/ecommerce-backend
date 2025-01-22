const ProductService = require('../services/ProductService');

const save = async (req, res) => {
    const response = await ProductService.save(req.body);
    return res.status(response.code).json(response);
}

const list = async (req, res) => {
    const response = await ProductService.list();
    return res.status(response.code).json(response);
}

const detail = async (req, res) => {
    const response = await ProductService.detail(req.params.id);
    return res.status(response.code).json(response);
}

module.exports = {
    list,
    detail,
    save
}