const hello = (req, res) => {
    return res.status(200).json({ message: 'Helo World!' });
}

const list = (req, res) => {
    return res.status(200).json({ message: 'List of products' });
}

const detail = (req, res) => {
    return res.status(200).json({ message: 'Detail of product' });
}

module.exports = {
    hello,
    list,
    detail
}