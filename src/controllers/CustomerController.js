const CustomerService = require('../services/CustomerService');

const save = async (req, res) => {
    const response = await CustomerService.save(req.body);
    res.status(response.code).json(response);
}

const get = async (req, res) => {
    const response = await CustomerService.get(req.params.id);
    res.status(response.code).json(response);
}

module.exports = { save, get }