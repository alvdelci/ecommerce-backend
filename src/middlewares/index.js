
const verifyRequiredFields = (req, res, next) => {
    const { name, price, image, stock } = req.body;

    if (!name || !price || !image || !stock) {
        return res.status(400).json({ message: `Missing required fields` });
    }
    if (name == "" || price == 0 || image == "" || stock == 0) {
        return res.status(400).json({ message: `Empty required fields` });
    }
    next();
}

module.exports = {
    verifyRequiredFields
}