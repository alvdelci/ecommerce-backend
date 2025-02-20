const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    products: {
        type: [{
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Cart", CartSchema);