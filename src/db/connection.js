const mongoose = require('mongoose');

module.exports = async function main() {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Connected to MongoDB");

    } catch (error) {
        console.log("Failed to connect to MongoDB\n", error);
    }
}