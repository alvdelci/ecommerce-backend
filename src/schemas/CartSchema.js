import mongoose from "mongoose";

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
    timestamps: true
});

export default mongoose.model("Cart", CartSchema);