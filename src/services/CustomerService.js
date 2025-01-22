const CustomerSchema = require("../schemas/CustomerSchema");

const save = async (data) => {
    try {
        const customer = await CustomerSchema.create(data);
        return { code: 201, message: "success", data: customer };
    } catch (error) {
        return { code: 400, message: "Failed to register customer", error: error.message };
    }
}

const get = async (id) => {
    try {
        const customer = await CustomerSchema.findById(id);
        if (!customer) {
            return { code: 404, message: "Customer not found" };
        }
        return { code: 200, message: "success", data: customer };
    } catch (error) {
        return { code: 400, message: "Failed to get customer", error: error.message };
    }
}

module.exports = { save, get }