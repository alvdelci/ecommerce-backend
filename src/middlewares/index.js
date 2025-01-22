
const verifyRequiredFields = (req, res, next) => {
    const { name, price, image, stock } = req.body;

    if (!name || !price || !image || !stock) {
        return res.status(400).json({ message: `Missing required fields` });
    }
    next();
}

module.exports = {
    verifyRequiredFields
}