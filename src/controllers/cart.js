const get = (req, res) => {
    return res.status(200).json({ message: 'Get cart' });
}

const save = (req, res) => {
    return res.status(200).json({ message: 'Save cart' });
}

module.exports = {
    get,
    save
}