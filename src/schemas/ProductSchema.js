import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: string,
    },
    image: {
        type: String,
    },
    stock: {
        type: Number,
        required: true,
    }
});

export default mongoose.model("Product", ProductSchema);