const CustomerSchema = require("../schemas/CustomerSchema");

const save = async (req, res) => {
    try {
        const customer = await CustomerSchema.create(req.body);
        res.status(201).json({ message: "success", data: customer });
    } catch (error) {
        res.status(400).json({ message: "Failed to register customer", error: error.message });
    }
}

const get = async (req, res) => {
    try {
        const customer = await CustomerSchema.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "success", data: customer });
    } catch (error) {
        res.status(400).json({ message: "Failed to get customer", error: error.message });
    }
}

module.exports = { save, get }