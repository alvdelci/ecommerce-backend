const mongoose = require('mongoose');

module.exports = function main() {
    try {
        //connct to MongoDB
        mongoose.connect(`${process.env.MONGO_URL}`);
        //test connection
        mongoose.connection.on('open', () => {
            console.log("Connected to MongoDB\nConnection open");
        });

    } catch (error) {
        console.log("Failed to connect to MongoDB\n", error);
    }
}