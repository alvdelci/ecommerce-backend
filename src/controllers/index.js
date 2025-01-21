const hello = (req, res) => {
    return res.status(200).json({ message: 'Helo World!' });
}

module.exports = {
    hello
}