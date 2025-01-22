const CustomerSchema = require("../schemas/CustomerSchema");
const verifyProductRequiredFields = (req, res, next) => {
    const { name, price, image, stock } = req.body;

    if (!name || !price || !image || !stock) {
        return res.status(400).json({ message: `Missing required fields` });
    }
    next();
}

const verifyCustomerRequiredFields = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: `Missing required fields` });
    }
    next();
}

const verifyEmailAlreadyExists = async (req, res, next) => {
    const { email } = req.body;

    try {
        const customer = await CustomerSchema.findOne({ email });
        if (customer) {
            return res.status(400).json({ message: `Email already exists` });
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: `Failed to get customer`, error: error.message });
    }

}

module.exports = {
    verifyProductRequiredFields,
    verifyCustomerRequiredFields,
    verifyEmailAlreadyExists
}